// Generate and publish a BDI reel (IG Reel + FB video) using Gemini + Veo 3.1.
//
// Pipeline: pick an unused insight article -> Gemini writes a Veo scene prompt +
// caption -> Veo 3.1 fast generates an 8s 9:16 clip -> deploy mp4 via git push ->
// publish IG Reel + FB Page video -> log to the admin calendar.
//
// Usage:
//   node scripts/generate-reel.mjs            # full run
//   node scripts/generate-reel.mjs --dry-run  # generate video locally, no deploy/post
//
// State: scripts/social-reels.json

import fs from "node:fs";
import { execSync } from "node:child_process";

const ROOT = new URL("..", import.meta.url).pathname;
const env = Object.fromEntries(
  fs.readFileSync(ROOT + ".env", "utf8").split("\n").filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).replace(/^"|"$/g, "")])
);
const DRY = process.argv.includes("--dry-run");
const SITE = "https://businessdebtinsider.com";
const GEM = "https://generativelanguage.googleapis.com/v1beta";
const G = "https://graph.facebook.com/v25.0";
const STATE_FILE = ROOT + "scripts/social-reels.json";

// 1. Pick an article not yet used for a reel
const state = fs.existsSync(STATE_FILE) ? JSON.parse(fs.readFileSync(STATE_FILE, "utf8")) : { posted: [] };
const sitemap = await fetch(SITE + "/sitemap.xml").then((r) => r.text());
const slugs = [...sitemap.matchAll(/<loc>[^<]*\/insights\/([^<]+)<\/loc>/g)].map((m) => m[1]);
const candidates = slugs.filter((s) => !state.posted.includes(s));
if (!candidates.length) { console.log("No unused articles left for reels."); process.exit(0); }
const slug = candidates[Math.floor(Math.random() * candidates.length)];
const articleText = (await fetch(`${SITE}/insights/${slug}`).then((r) => r.text()))
  .replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 5000);
console.log("Article:", slug);

// 2. Gemini writes the reel concept
const geminiPrompt = `You create short-form video for Business Debt Insider, a consulting practice for small businesses stuck in MCA and short-term debt. Voice: calm, direct, insider. Hard rules: NEVER use em dashes anywhere. No emojis in the veoPrompt.

Based on this article, return JSON with keys:
- veoPrompt: a prompt for an 8 second vertical (9:16) cinematic video. Describe one continuous scene related to small business financial stress or relief (a real workplace: restaurant, truck cab, shop floor, office). Include a voiceover line in double quotes that a calm narrator speaks, max 20 words, delivering the single sharpest insight from the article. Professional documentary style, moody lighting with a subtle green accent. No on-screen text.
- caption: 2-3 sentences for the post caption, plain language, ends with "Full guide at businessdebtinsider.com"
- hashtags: 4-6 hashtags as one space-separated string

Article: ${articleText}`;

let copy;
for (let attempt = 1; attempt <= 3; attempt++) {
  const gem = await fetch(`${GEM}/models/gemini-flash-latest:generateContent`, {
    method: "POST",
    headers: { "x-goog-api-key": env.GEMINI_API_KEY, "content-type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: geminiPrompt }] }], generationConfig: { responseMimeType: "application/json" } }),
  }).then((r) => r.json());
  const text = gem.candidates?.[0]?.content?.parts?.[0]?.text;
  if (text) { copy = JSON.parse(text); break; }
  console.error(`Gemini attempt ${attempt} failed:`, JSON.stringify(gem).slice(0, 300));
  if (attempt === 3) throw new Error("Gemini gave no usable response after 3 attempts");
  await new Promise((r) => setTimeout(r, 5000));
}
for (const k of Object.keys(copy)) if (typeof copy[k] === "string") copy[k] = copy[k].replace(/—|–/g, ",");
console.log("Concept:", JSON.stringify(copy, null, 2));

// 3. Veo generates the clip
const start = await fetch(`${GEM}/models/veo-3.1-fast-generate-preview:predictLongRunning`, {
  method: "POST",
  headers: { "x-goog-api-key": env.GEMINI_API_KEY, "content-type": "application/json" },
  body: JSON.stringify({ instances: [{ prompt: copy.veoPrompt }], parameters: { aspectRatio: "9:16", durationSeconds: 8 } }),
}).then((r) => r.json());
if (!start.name) throw new Error("Veo start failed: " + JSON.stringify(start).slice(0, 300));
let op;
for (let i = 0; i < 90; i++) {
  await new Promise((r) => setTimeout(r, 10000));
  op = await fetch(`${GEM}/${start.name}`, { headers: { "x-goog-api-key": env.GEMINI_API_KEY } }).then((r) => r.json());
  if (op.done) break;
}
if (!op?.done) throw new Error("Veo timeout");
if (op.error) throw new Error("Veo error: " + JSON.stringify(op.error).slice(0, 300));
const video = op.response?.generateVideoResponse?.generatedSamples?.[0]?.video || op.response?.generatedVideos?.[0]?.video;
const uri = video.uri || `${GEM}/${video.name}:download?alt=media`;
const buf = Buffer.from(await (await fetch(uri, { headers: { "x-goog-api-key": env.GEMINI_API_KEY } })).arrayBuffer());
fs.mkdirSync(ROOT + "public/social/reels", { recursive: true });
const mp4 = ROOT + `public/social/reels/${slug}.mp4`;
fs.writeFileSync(mp4, buf);
console.log("Video saved:", mp4, buf.length, "bytes");

if (DRY) { console.log("Dry run: open", mp4, "to review. Not deployed, not posted."); process.exit(0); }

// 4. Deploy the video
execSync(`git -C "${ROOT}" add "public/social/reels/${slug}.mp4" && git -C "${ROOT}" commit -m "Reel: ${slug}" -m "Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git -C "${ROOT}" push origin main`, { stdio: "pipe" });
const videoUrl = `${SITE}/social/reels/${slug}.mp4`;
process.stdout.write("Waiting for deploy");
for (let i = 0; i < 40; i++) {
  const code = await fetch(videoUrl, { method: "HEAD" }).then((r) => r.status).catch(() => 0);
  if (code === 200) break;
  if (i === 39) throw new Error("Video never went live");
  process.stdout.write(".");
  await new Promise((r) => setTimeout(r, 15000));
}
console.log(" live:", videoUrl);

// 5. Publish
const call = async (path, params) => {
  const d = await fetch(`${G}${path}`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ ...params, access_token: env.FB_PAGE_TOKEN }) }).then((r) => r.json());
  if (d.error) throw new Error(path + ": " + d.error.message);
  return d;
};
const igCaption = copy.caption + "\n\n" + copy.hashtags;

const container = await call(`/${env.IG_USER_ID}/media`, { media_type: "REELS", video_url: videoUrl, caption: igCaption, share_to_feed: "true" });
for (let i = 0; i < 40; i++) {
  const s = await fetch(`${G}/${container.id}?fields=status_code&access_token=${env.FB_PAGE_TOKEN}`).then((r) => r.json());
  if (s.status_code === "FINISHED") break;
  if (s.status_code === "ERROR") throw new Error("IG reel container failed");
  await new Promise((r) => setTimeout(r, 6000));
}
const ig = await call(`/${env.IG_USER_ID}/media_publish`, { creation_id: container.id });
console.log("IG reel:", ig.id);

const fb = await call(`/${env.FB_PAGE_ID}/videos`, { file_url: videoUrl, description: copy.caption });
console.log("FB video:", fb.id);

// 6. Log to admin calendar
try {
  const igInfo = await fetch(`${G}/${ig.id}?fields=permalink&access_token=${env.FB_PAGE_TOKEN}`).then((r) => r.json());
  await fetch(`${SITE}/api/social/log`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-social-secret": env.SOCIAL_LOG_SECRET },
    body: JSON.stringify({ slug, type: "reel", caption: igCaption, mediaUrl: videoUrl, fbPostId: fb.id, igMediaId: ig.id, igPermalink: igInfo.permalink ?? null }),
  });
  console.log("Logged to admin calendar");
} catch (e) { console.error("Calendar log failed:", e.message); }

// 7. Record state
state.posted.push(slug);
fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
execSync(`git -C "${ROOT}" add scripts/social-reels.json && git -C "${ROOT}" commit -m "Mark reel ${slug} as posted" -m "Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git -C "${ROOT}" push origin main`, { stdio: "pipe" });
console.log("Done:", slug);
