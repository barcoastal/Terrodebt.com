import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { publishReel } from "../../scripts/ugc/publish.mjs";

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bdi-publish-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return { file: path.join(dir, "publish.json"), videoUrl: "https://cdn.example/reel.mp4", caption: "MCA education", slug: "test", env: { FB_PAGE_TOKEN: "secret", FB_PAGE_ID: "page", IG_USER_ID: "ig", SOCIAL_LOG_SECRET: "calendar-secret" }, sleep: async () => {} };
}
function mockPublisher() {
  const calls = [];
  const fetchImpl = async (url, opts = {}) => {
    const u = new URL(url); calls.push([u.hostname, u.pathname, opts.method || "GET"]);
    const p = u.pathname;
    let result;
    if (p === "/v25.0/ig/media") result = { id: "container" };
    else if (p === "/v25.0/container") result = { status_code: "FINISHED" };
    else if (p === "/v25.0/ig/media_publish") result = { id: "ig-post" };
    else if (p === "/v25.0/ig-post") result = { permalink: "https://www.instagram.com/reel/test/" };
    else if (p === "/v25.0/page/video_reels") result = opts.body.get("upload_phase") === "start" ? { video_id: "fb-video", upload_url: "https://rupload.facebook.com/video-upload/v25.0/fb-video" } : { success: true };
    else if (u.hostname === "rupload.facebook.com") result = { success: true };
    else if (p === "/v25.0/fb-video") result = { status: { publishing_phase: { status: "complete" } } };
    else if (p === "/api/social/log") result = { ok: true, id: "calendar-id" };
    else throw new Error(`Unexpected request ${u}`);
    return Response.json(result);
  };
  return { calls, fetchImpl };
}
test("resumes successful publishing without duplicating either network post or calendar row", async t => {
  const opts = fixture(t), mock = mockPublisher();
  const result = await publishReel({ ...opts, fetchImpl: mock.fetchImpl });
  assert.equal(result.calendarId, "calendar-id");
  const count = mock.calls.length;
  await publishReel({ ...opts, fetchImpl: mock.fetchImpl });
  assert.equal(mock.calls.length, count);
});
test("lost Instagram publish response never causes another publish mutation", async t => {
  const opts = fixture(t), mock = mockPublisher();
  let publishes = 0;
  const fetchImpl = async (url, options) => {
    if (new URL(url).pathname.endsWith("/media_publish")) { publishes++; throw new Error("response lost after remote acceptance"); }
    return mock.fetchImpl(url, options);
  };
  await assert.rejects(publishReel({ ...opts, fetchImpl }), /response lost/);
  await assert.rejects(publishReel({ ...opts, fetchImpl }), /ambiguous outcome/);
  assert.equal(publishes, 1);
});
test("refuses token forwarding to an untrusted upload host", async t => {
  const opts = fixture(t), mock = mockPublisher();
  const fetchImpl = async (url, options) => {
    if (new URL(url).pathname.endsWith("/page/video_reels")) return Response.json({ video_id: "x", upload_url: "https://evil.example/upload" });
    return mock.fetchImpl(url, options);
  };
  await assert.rejects(publishReel({ ...opts, fetchImpl }), /Untrusted/);
  assert.ok(!mock.calls.some(([host]) => host === "evil.example"));
});
