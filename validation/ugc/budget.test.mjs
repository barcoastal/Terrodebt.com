import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { reserveBudget } from "../../scripts/ugc/budget.mjs";

test("caps total daily reservations and does not charge a retry twice", (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "bdi-budget-test-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const options = { file: path.join(directory, "ledger.json"), limitUsd: 20, date: new Date("2026-10-10T12:00:00Z") };
  reserveBudget({ ...options, jobId: "first", usd: 7 });
  assert.equal(reserveBudget({ ...options, jobId: "first", usd: 7 }).reservedUsd, 7);
  assert.equal(reserveBudget({ ...options, jobId: "second", usd: 7 }).reservedUsd, 14);
  assert.throws(() => reserveBudget({ ...options, jobId: "third", usd: 7 }), /budget reached/);
  assert.throws(() => reserveBudget({ ...options, jobId: "third", usd: 7, limitUsd: 200 }), /budget reached/);
  assert.equal(reserveBudget({ ...options, jobId: "first", usd: 3 }).reservedUsd, 14);
  assert.equal(reserveBudget({ ...options, jobId: "next-day", usd: 7, date: new Date("2026-10-11T12:00:00Z") }).reservedUsd, 7);
});
