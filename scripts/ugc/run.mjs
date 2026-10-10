import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { ROOT, readEnv, writeState } from "./runtime.mjs";
import { dueSlots, buildContent, reserveCredits } from "./queue.mjs";
import { reviewVideo } from "./review.mjs";
import { publishReel } from "./publish.mjs";

const exec = promisify(execFile);
const config = JSON.parse(fs.readFileSync(new URL("automation.json", import.meta.url), "utf8"));
const base = path.join(ROOT, "logs/ugc/automation");
const binary = process.env.HIGGSFIELD_CLI || path.join(process.env.HOME, ".local/bin/higgsfield");
const referenceFile = path.join(ROOT, "brand-social/ugc/alex-reference.png");
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function cli(args) {
  const { stdout } = await exec(binary, [...args, "--json"], { timeout: 120000, maxBuffer: 8 * 1024 * 1024 });
  return JSON.parse(stdout);
}
async function runSlot(slot) {
  const dir = path.join(base, slot.id);
  const stateFile = path.join(dir, "job.json");
  const state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, "utf8")) : { slot, content: buildContent(slot.day, slot.slot) };
  const save = () => writeState(stateFile, state);
  if (state.completedAt) return;
  if (state.rejected) throw new Error(`${slot.id}: rejected video; no automatic paid retry`);
  if (!state.jobId) {
    if (state.submitting) throw new Error(`${slot.id}: ambiguous generation; reconcile history before retrying`);
    await exec(binary, ["workspace", "set", config.workspaceId], { timeout: 30000 });
    const args = ["seedance_2_5", "--mode", "omni_reference", "--duration", "15", "--resolution", "720p", "--aspect_ratio", "9:16", "--generate_audio", "true", "--image-references", referenceFile, "--prompt", state.content.prompt];
    const quote = await cli(["generate", "cost", ...args]);
    if (!Number.isFinite(quote.credits) || quote.credits <= 0 || quote.credits > Math.min(config.perReelCreditLimit, 105)) throw new Error("Reel quote exceeds the 105-credit cap");
    reserveCredits({ file: path.join(base, "credits.json"), id: slot.id, credits: quote.credits, limit: config.dailyCreditLimit });
    state.submitting = new Date().toISOString(); state.quote = quote; save();
    const jobs = await cli(["generate", "create", ...args]);
    if (!Array.isArray(jobs) || jobs.length !== 1 || typeof jobs[0] !== "string") throw new Error("Ambiguous Higgsfield submission response");
    state.jobId = jobs[0]; save();
  }
  if (!state.videoUrl) {
    for (let i = 0; i < 50; i++) {
      const job = await cli(["generate", "get", state.jobId]);
      if (job.status === "completed" && job.result_url) {
        const url = new URL(job.result_url);
        if (url.protocol !== "https:") throw new Error("Non-HTTPS generation result");
        state.videoUrl = job.result_url; save(); break;
      }
      if (["failed", "error", "cancelled", "canceled"].includes(job.status)) { state.rejected = `Generation ${job.status}`; save(); throw new Error(state.rejected); }
      await sleep(15000);
    }
    if (!state.videoUrl) throw new Error("Generation pending; resume same job next run");
  }
  const videoFile = path.join(dir, "reel.mp4");
  if (!fs.existsSync(videoFile)) {
    const r = await fetch(state.videoUrl, { signal: AbortSignal.timeout(120000) });
    if (!r.ok) throw new Error(`Video download failed (${r.status})`);
    const bytes = Buffer.from(await r.arrayBuffer());
    if (bytes.length < 10000 || bytes.subarray(4, 8).toString() !== "ftyp") throw new Error("Invalid MP4 download");
    fs.writeFileSync(videoFile + ".tmp", bytes); fs.renameSync(videoFile + ".tmp", videoFile);
  }
  const review = await reviewVideo({ videoFile, referenceFile, spoken: state.content.spoken, outputFile: path.join(dir, "review.json") });
  if (!review.accepted) { state.rejected = review.review.issues; save(); throw new Error(`Video QA rejected ${slot.id}`); }
  if (review.sha256 !== createHash("sha256").update(fs.readFileSync(videoFile)).digest("hex")) throw new Error("Video changed after review");
  state.published = await publishReel({ file: path.join(dir, "publish.json"), videoUrl: state.videoUrl, caption: state.content.caption, slug: state.content.slug, env: readEnv() });
  state.completedAt = new Date().toISOString(); save();
  console.log(JSON.stringify({ slot: slot.id, ...state.published }));
}

if (!config.enabled) { console.log("BDI Higgsfield automation is disabled"); process.exit(0); }
fs.mkdirSync(base, { recursive: true, mode: 0o700 });
const lock = path.join(base, "worker.lock");
if (fs.existsSync(lock)) {
  const pid = Number(fs.readFileSync(lock, "utf8"));
  if (!Number.isInteger(pid) || pid <= 0) throw new Error("Invalid worker lock; inspect before continuing");
  try { process.kill(pid, 0); process.exit(0); } catch (e) { if (e.code !== "ESRCH") throw e; }
  fs.unlinkSync(lock);
}
fs.writeFileSync(lock, String(process.pid), { flag: "wx", mode: 0o600 });
try {
  const due = dueSlots(new Date(), config);
  // Resume already submitted work even after its time slot. Never create missed posts in a burst.
  const pending = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory()).flatMap(d => {
    const f = path.join(base, d.name, "job.json");
    if (!fs.existsSync(f)) return [];
    const s = JSON.parse(fs.readFileSync(f, "utf8"));
    return s.jobId && !s.completedAt && !s.rejected ? [s.slot] : [];
  });
  const slots = [...new Map([...pending, ...due].map(s => [s.id, s])).values()];
  for (const slot of slots) {
    try { await runSlot(slot); }
    catch (e) { console.error(new Date().toISOString(), slot.id, e.message); process.exitCode = 1; }
  }
} finally { fs.unlinkSync(lock); }
