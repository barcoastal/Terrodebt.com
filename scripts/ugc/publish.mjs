import fs from "node:fs";
import { graphClient, SITE, writeState } from "./runtime.mjs";

// Persist intent before every mutation. An ambiguous response stops for reconciliation,
// rather than guessing and publishing a duplicate on the next scheduled run.
export async function publishReel({ file, videoUrl, caption, slug, env, fetchImpl = fetch, sleep = ms => new Promise(r => setTimeout(r, ms)) }) {
  const state = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : { videoUrl, caption, slug };
  if (state.videoUrl !== videoUrl || state.caption !== caption || state.slug !== slug) throw new Error("Publish journal belongs to different content");
  const save = () => writeState(file, state);
  const graph = graphClient(env.FB_PAGE_TOKEN, fetchImpl);
  async function once(name, action) {
    if (state[name]?.done) return state[name].result;
    if (state[name]?.started) throw new Error(`${name} has an ambiguous outcome. Reconcile before retrying.`);
    state[name] = { started: new Date().toISOString() }; save();
    const result = await action();
    state[name] = { ...state[name], done: true, result }; save();
    return result;
  }
  const igContainer = await once("igContainer", async () => {
    const r = await graph(`/${env.IG_USER_ID}/media`, { media_type: "REELS", video_url: videoUrl, caption, share_to_feed: "true" }, "POST");
    if (!r.id) throw new Error("Meta did not return an Instagram container ID");
    return r;
  });
  if (!state.igPublished?.done) {
    let ready = false;
    for (let i = 0; i < 30; i++) {
      const s = await graph(`/${igContainer.id}`, { fields: "status_code,status" });
      if (s.status_code === "FINISHED") { ready = true; break; }
      if (["ERROR", "EXPIRED", "PUBLISHED"].includes(s.status_code)) throw new Error(`Instagram container ${s.status_code}; inspect before proceeding`);
      await sleep(10000);
    }
    if (!ready) throw new Error("Instagram processing still pending; resume the same container later");
  }
  const ig = await once("igPublished", async () => {
    const r = await graph(`/${env.IG_USER_ID}/media_publish`, { creation_id: igContainer.id }, "POST");
    if (!r.id) throw new Error("Instagram publish response missing ID");
    return r;
  });
  if (!state.igPermalink) {
    state.igPermalink = (await graph(`/${ig.id}`, { fields: "permalink" })).permalink;
    save();
  }
  const fb = await once("fbContainer", async () => {
    const r = await graph(`/${env.FB_PAGE_ID}/video_reels`, { upload_phase: "start" }, "POST");
    if (!r.video_id || !r.upload_url) throw new Error("Facebook upload response missing fields");
    if (new URL(r.upload_url).origin !== "https://rupload.facebook.com") throw new Error("Untrusted Facebook upload origin");
    return r;
  });
  await once("fbUpload", async () => {
    if (new URL(fb.upload_url).origin !== "https://rupload.facebook.com") throw new Error("Untrusted Facebook upload origin");
    const r = await fetchImpl(fb.upload_url, { method: "POST", redirect: "error", signal: AbortSignal.timeout(120000), headers: { Authorization: `OAuth ${env.FB_PAGE_TOKEN}`, file_url: videoUrl } });
    const body = await r.json();
    if (!r.ok || body.success !== true) throw new Error(`Facebook upload failed (${r.status})`);
    return { success: true };
  });
  await once("fbPublished", async () => {
    const r = await graph(`/${env.FB_PAGE_ID}/video_reels`, { upload_phase: "finish", video_state: "PUBLISHED", video_id: fb.video_id, description: caption }, "POST");
    if (r.success !== true) throw new Error("Facebook did not accept reel publication");
    return r;
  });
  if (!state.fbVerified) {
    for (let i = 0; i < 30; i++) {
      const r = await graph(`/${fb.video_id}`, { fields: "status" });
      const s = r.status;
      if (s?.publishing_phase?.status === "complete") { state.fbVerified = true; save(); break; }
      if (s?.video_status === "error" || [s?.uploading_phase?.status, s?.processing_phase?.status, s?.publishing_phase?.status].includes("error")) throw new Error("Facebook reel processing failed");
      await sleep(10000);
    }
    if (!state.fbVerified) throw new Error("Facebook publication is still processing; verify the same video later");
  }
  await once("calendar", async () => {
    const r = await fetchImpl(SITE + "/api/social/log", {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(30000),
      headers: { "content-type": "application/json", "x-social-secret": env.SOCIAL_LOG_SECRET },
      body: JSON.stringify({ slug, type: "reel", caption, mediaUrl: videoUrl, fbPostId: fb.video_id, igMediaId: ig.id, igPermalink: state.igPermalink }),
    });
    if (!r.ok) throw new Error(`Calendar log failed (${r.status}); reels are already published`);
    const body = await r.json();
    if (!body.ok || !body.id) throw new Error("Calendar did not confirm saved post");
    return { id: body.id };
  });
  state.completedAt ||= new Date().toISOString(); save();
  return { instagram: state.igPermalink, facebook: `https://www.facebook.com/reel/${fb.video_id}`, calendarId: state.calendar.result.id };
}
