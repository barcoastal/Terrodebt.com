import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { ROOT, readEnv, writeState } from "./runtime.mjs";
import { finalPreview } from "./prompts.mjs";
import { publishReel } from "./publish.mjs";

const source = path.join(ROOT, "logs/ugc/restaurant-owner-v3");
const review = JSON.parse(fs.readFileSync(path.join(source, "review.json"), "utf8"));
const video = fs.readFileSync(path.join(source, "reel.mp4"));
if (!review.accepted || review.sha256 !== createHash("sha256").update(video).digest("hex")) throw new Error("Preview has not passed QA");
const base = path.join(ROOT, "logs/ugc/automation");
const id = "2026-10-10-10";
const dir = path.join(base, id);
fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
const stateFile = path.join(dir, "job.json");
const state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, "utf8")) : {
  slot: { id, day: "2026-10-10", hour: 10, slot: 0 },
  content: { ...finalPreview, slug: "ugc-2026-10-10-owner-restaurant" },
  jobId: "c5e2a139-3fbc-4dcc-aa49-926d3334ff14",
  quote: { credits: 105 },
  videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3KTTtM25qc0r6b6dXF39I5uuO1A/hf_20261010_075034_c5e2a139-3fbc-4dcc-aa49-926d3334ff14.mp4",
};
fs.copyFileSync(path.join(source, "reel.mp4"), path.join(dir, "reel.mp4"));
fs.copyFileSync(path.join(source, "review.json"), path.join(dir, "review.json"));
writeState(stateFile, state);
// Record all setup generations, including both rejected takes. No additional
// generation is permitted today because these already exceed the steady-state cap.
const ledgerFile = path.join(base, "credits.json");
const ledger = fs.existsSync(ledgerFile) ? JSON.parse(fs.readFileSync(ledgerFile, "utf8")) : {};
ledger["2026-10-10"] = { ...ledger["2026-10-10"], "setup-first-preview": 105, "setup-rejected-v2": 105, [id]: 105 };
writeState(ledgerFile, ledger);
if (!state.completedAt) {
  state.published = await publishReel({ file: path.join(dir, "publish.json"), videoUrl: state.videoUrl, caption: state.content.caption, slug: state.content.slug, env: readEnv() });
  state.completedAt = new Date().toISOString(); writeState(stateFile, state);
}
console.log(JSON.stringify(state.published, null, 2));
