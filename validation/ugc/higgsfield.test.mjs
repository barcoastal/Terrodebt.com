import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { buildReelInput, generateReel } from "../../scripts/ugc/higgsfield.mjs";

const input = buildReelInput({ prompt: "A fictional presenter explains MCA paperwork.", referenceUrl: "https://example.com/alex.png" });
const accepted = { request_id: "test-request", status_url: "https://api.higgsfield.ai/requests/test-request/status" };
const completed = { status: "completed", video: { url: "https://example.com/reel.mp4" } };
const response = (value) => ({ ok: true, json: async () => value });
function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "bdi-ugc-test-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return { stateFile: path.join(directory, "job.json"), credentials: "test:not-a-real-secret", sleep: async () => {} };
}

test("reference payload retains identity, vertical video and native audio", () => {
  assert.deepEqual(input.image_urls, ["https://example.com/alex.png"]);
  assert.equal(input.aspect_ratio, "9:16");
  assert.equal(input.generate_audio, true);
  assert.throws(() => buildReelInput({ prompt: "hi", referenceUrl: "http://example.com/a.png" }), /HTTPS/);
});

test("resume polls accepted request instead of spending on another generation", async (t) => {
  const options = fixture(t);
  let posts = 0;
  options.fetchImpl = async (_url, opts) => {
    if (opts.method === "POST") { posts++; return response(accepted); }
    return response(completed);
  };
  await generateReel(input, options);
  await generateReel(input, options);
  assert.equal(posts, 1);
  assert.equal(fs.readFileSync(options.stateFile, "utf8").includes(options.credentials), false);
});

test("ambiguous submission preserves its exact idempotency key for retry", async (t) => {
  const options = fixture(t);
  const keys = [];
  options.fetchImpl = async (_url, opts) => {
    if (opts.method === "POST") {
      keys.push(opts.headers["Idempotency-Key"]);
      if (keys.length === 1) throw new Error("connection reset");
      return response(accepted);
    }
    return response(completed);
  };
  await assert.rejects(generateReel(input, options), /connection reset/);
  await generateReel(input, options);
  assert.equal(keys[0], keys[1]);
});

test("rejects sending credentials to a foreign status host", async (t) => {
  const options = fixture(t);
  let calls = 0;
  options.fetchImpl = async () => { calls++; return response({ ...accepted, status_url: "https://example.com/steal" }); };
  await assert.rejects(generateReel(input, options), /Unexpected Higgsfield/);
  assert.equal(calls, 1);
});

test("failed and timed-out jobs do not automatically regenerate", async (t) => {
  const options = fixture(t);
  let posts = 0;
  options.fetchImpl = async (_url, opts) => {
    if (opts.method === "POST") { posts++; return response(accepted); }
    return response({ status: "in_progress" });
  };
  options.maxPolls = 1;
  await assert.rejects(generateReel(input, options), /timed out/);
  options.fetchImpl = async () => response({ status: "failed" });
  await assert.rejects(generateReel(input, options), /generation failed/);
  assert.equal(posts, 1);
});

test("changed inputs and concurrent runs fail closed", async (t) => {
  const options = fixture(t);
  options.fetchImpl = async (_url, opts) => response(opts.method === "POST" ? accepted : completed);
  await generateReel(input, options);
  await assert.rejects(generateReel({ ...input, prompt: "different" }, options), /different input/);
  fs.writeFileSync(`${options.stateFile}.lock`, "other process");
  await assert.rejects(generateReel(input, options), /locked/);
});

test("content plan has 21 varied reels and a consistent approved presenter", () => {
  const plan = JSON.parse(fs.readFileSync(new URL("../../scripts/ugc/content-plan.json", import.meta.url)));
  assert.equal(plan.presenter.name, "Alex");
  assert.equal(plan.days.flatMap((day) => day.reels).length, 21);
  assert.equal(new Set(plan.days.map((day) => day.industry)).size, 7);
  for (const day of plan.days) assert.deepEqual(day.reels.map((reel) => reel.format), plan.formats);
});
