import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";

const API = "https://api.higgsfield.ai";
export const MODEL = "bytedance/seedance-2.5/reference-to-video";

export function buildReelInput({ prompt, referenceUrl, duration = 15 }) {
  const reference = new URL(referenceUrl);
  if (reference.protocol !== "https:") throw new Error("Influencer reference must use HTTPS");
  if (typeof prompt !== "string" || !prompt.trim()) throw new Error("A reel prompt is required");
  if (!Number.isInteger(duration) || duration < 4 || duration > 30) throw new Error("Duration must be 4–30 seconds");
  return { prompt, image_urls: [reference.href], duration, resolution: "720p", aspect_ratio: "9:16", output_format: "mp4", generate_audio: true };
}

function save(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(value, null, 2), { mode: 0o600 });
  fs.renameSync(temporary, file);
}

function statusUrl(value) {
  const url = new URL(value);
  if (url.origin !== API || !/^\/requests\/[^/]+\/status$/.test(url.pathname)) {
    throw new Error("Unexpected Higgsfield status URL; credentials were not sent");
  }
  return url.href;
}

// Persist the exact request before spending credits. Restarts poll the same job.
// This helper deliberately does not publish, top up credits, or retry terminal failures.
export async function generateReel(input, {
  credentials, stateFile, fetchImpl = fetch,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  maxPolls = 120,
  beforeSubmit,
}) {
  if (!credentials || !credentials.includes(":")) throw new Error("Set HF_CREDENTIALS to the Higgsfield KEY_ID:KEY_SECRET value");
  if (!stateFile) throw new Error("A persistent generation state file is required");
  const fingerprint = createHash("sha256").update(JSON.stringify({ model: MODEL, input })).digest("hex");
  fs.mkdirSync(path.dirname(stateFile), { recursive: true, mode: 0o700 });
  const lock = `${stateFile}.lock`;
  let lockFd;
  try { lockFd = fs.openSync(lock, "wx", 0o600); }
  catch (error) { if (error.code === "EEXIST") throw new Error("This generation is locked by another run; inspect it before retrying"); throw error; }
  try {
    const state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, "utf8")) : {
      fingerprint, idempotencyKey: randomUUID(), model: MODEL, input,
    };
    if (state.fingerprint !== fingerprint) throw new Error("This job already has different input; do not reuse its state file");
    save(stateFile, state);
    const request = async (url, options = {}) => {
      const response = await fetchImpl(url, {
        ...options, redirect: "error", signal: AbortSignal.timeout(60000),
        headers: { Authorization: `Key ${credentials}`, "Content-Type": "application/json", ...options.headers },
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const detail = typeof error.detail === "string" ? error.detail.replaceAll(credentials, "[redacted]").slice(0, 240) : "Request rejected";
        throw new Error(`Higgsfield HTTP ${response.status}: ${detail}; job preserved for inspection`);
      }
      return response.json();
    };
    if (!state.requestId) {
      if (beforeSubmit) {
        const quote = await request(`${API}/estimate/${MODEL}`, { method: "POST", body: JSON.stringify(state.input) });
        const usd = Number(quote.usd);
        if (!Number.isFinite(usd) || usd <= 0) throw new Error("Higgsfield returned no valid price estimate; generation was not submitted");
        await beforeSubmit({ jobId: state.idempotencyKey, usd });
      }
      const accepted = await request(`${API}/${MODEL}`, {
        method: "POST", headers: { "Idempotency-Key": state.idempotencyKey }, body: JSON.stringify(state.input),
      });
      if (!accepted.request_id || !accepted.status_url) throw new Error("Higgsfield returned no request ID/status URL");
      state.requestId = accepted.request_id;
      state.statusUrl = statusUrl(accepted.status_url);
      save(stateFile, state);
    }
    for (let attempt = 0; attempt < maxPolls; attempt++) {
      const result = await request(statusUrl(state.statusUrl));
      state.status = result.status;
      state.checkedAt = new Date().toISOString();
      if (result.status === "completed") {
        if (!result.video?.url || new URL(result.video.url).protocol !== "https:") throw new Error("Higgsfield completed without a valid video URL");
        state.videoUrl = result.video.url;
        save(stateFile, state);
        return { requestId: state.requestId, videoUrl: state.videoUrl };
      }
      save(stateFile, state);
      if (["failed", "nsfw", "canceled"].includes(result.status)) throw new Error(`Higgsfield generation ${result.status}; no automatic regeneration`);
      if (!["queued", "in_progress"].includes(result.status)) throw new Error("Unknown Higgsfield status");
      await sleep(15000);
    }
    throw new Error("Higgsfield polling timed out; retry this job to resume without a new generation");
  } finally {
    fs.closeSync(lockFd);
    fs.unlinkSync(lock);
  }
}
