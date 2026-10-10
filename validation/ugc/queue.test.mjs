import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { dueSlots, reserveCredits, buildContent } from "../../scripts/ugc/queue.mjs";
const config = { timeZone: "America/New_York", hours: [10, 16] };
test("schedule follows New York DST and does not backfill stale slots", () => {
  assert.equal(dueSlots(new Date("2026-10-10T14:05:00Z"), config)[0].hour, 10);
  assert.equal(dueSlots(new Date("2026-12-10T15:05:00Z"), config)[0].hour, 10);
  assert.deepEqual(dueSlots(new Date("2026-10-10T18:00:00Z"), config), []);
  assert.equal(dueSlots(new Date("2026-10-10T20:00:00Z"), config)[0].slot, 1);
});
test("reserves failed attempts and never exceeds 210 credits even with inflated config", t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bdi-credits-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const opts = { file: path.join(dir, "credits.json"), now: new Date("2026-10-10T12:00:00Z") };
  assert.equal(reserveCredits({ ...opts, id: "a", credits: 105 }), 105);
  assert.equal(reserveCredits({ ...opts, id: "a", credits: 105 }), 105);
  assert.equal(reserveCredits({ ...opts, id: "b", credits: 105 }), 210);
  assert.throws(() => reserveCredits({ ...opts, id: "c", credits: 1, limit: 999 }), /limit reached/);
});
test("two daily formats rotate through seven industries with short MCA scripts", () => {
  const slugs = new Set();
  for (let d = 10; d < 17; d++) for (let slot = 0; slot < 2; slot++) {
    const c = buildContent(`2026-10-${d}`, slot);
    assert.match(c.spoken, /MCA/);
    assert.ok(c.spoken.split(/\s+/).length <= 32);
    assert.match(c.caption, /AI-generated/);
    slugs.add(c.slug);
  }
  assert.equal(slugs.size, 14);
});
