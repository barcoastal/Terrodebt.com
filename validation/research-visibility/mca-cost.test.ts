import assert from "node:assert/strict";
import test from "node:test";
import { estimateMcaCost } from "../../lib/mca-cost";

const base = { funded: 1000, upfrontFees: 0, payback: 1100, payments: 1, intervalDays: 7 as const };
const near = (actual: number, expected: number, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);

test("one weekly payment reproduces a known 10% periodic rate", () => {
  const result = estimateMcaCost(base)!;
  near(result.periodicRate, 0.1);
  near(result.estimatedApr, 0.1 * 365 / 7 * 100);
  assert.equal(result.totalCost, 100);
});
test("recovers a known rate across a declining balance", () => {
  const rate = 0.02;
  const payments = 26;
  const payment = 1000 * rate / (1 - (1 + rate) ** -payments);
  const result = estimateMcaCost({ ...base, payments, payback: payment * payments })!;
  near(result.periodicRate, rate);
  assert.ok(result.estimatedApr > result.simpleAnnualizedCost);
});
test("withheld fees increase the rate and reduce proceeds", () => {
  const original = estimateMcaCost(base)!;
  const withFees = estimateMcaCost({ ...base, upfrontFees: 100 })!;
  assert.equal(withFees.netProceeds, 900);
  assert.equal(withFees.totalCost, 200);
  assert.ok(withFees.estimatedApr > original.estimatedApr);
});
test("zero finance charge and daily annualization", () => {
  const zero = estimateMcaCost({ ...base, payback: 1000, payments: 180, intervalDays: 1 })!;
  assert.equal(zero.estimatedApr, 0);
  assert.equal(zero.effectiveAnnualRate, 0);
  const daily = estimateMcaCost({ ...base, intervalDays: 1 })!;
  near(daily.estimatedApr, 3650);
});
test("invalid and non-finite inputs do not produce misleading estimates", () => {
  for (const patch of [{ funded: 0 }, { upfrontFees: 1000 }, { upfrontFees: -1 }, { payback: 900 }, { payments: 0 }, { payments: 2.5 }, { payments: 3651 }, { payback: Infinity }, { funded: NaN }]) {
    assert.equal(estimateMcaCost({ ...base, ...patch }), null);
  }
});
