export type McaCostInput = { funded: number; upfrontFees: number; payback: number; payments: number; intervalDays: 1 | 7 };

/** Equal end-of-period payments; no holiday, business-day, or variable-revenue adjustment. */
export function estimateMcaCost(input: McaCostInput) {
  const { funded, upfrontFees, payback, payments, intervalDays } = input;
  if (![funded, upfrontFees, payback, payments, intervalDays].every(Number.isFinite)
    || funded <= 0 || funded > 1e12 || upfrontFees < 0 || upfrontFees >= funded
    || payback < funded - upfrontFees || payback > 1e12
    || !Number.isInteger(payments) || payments < 1 || payments > 3650
    || (intervalDays !== 1 && intervalDays !== 7)) return null;
  const netProceeds = funded - upfrontFees;
  const payment = payback / payments;
  const presentValue = (rate: number) => rate === 0 ? payback
    : payment * -Math.expm1(-payments * Math.log1p(rate)) / rate;
  let low = 0;
  let high = Math.max(1, payment / netProceeds);
  for (let i = 0; i < 100; i++) {
    const rate = (low + high) / 2;
    if (presentValue(rate) > netProceeds) low = rate;
    else high = rate;
  }
  const periodicRate = payback === netProceeds ? 0 : (low + high) / 2;
  const periodsPerYear = 365 / intervalDays;
  return {
    netProceeds, payment, periodicRate,
    factorRate: payback / funded,
    totalCost: payback - netProceeds,
    termDays: payments * intervalDays,
    estimatedApr: periodicRate * periodsPerYear * 100,
    effectiveAnnualRate: Math.expm1(Math.log1p(periodicRate) * periodsPerYear) * 100,
    simpleAnnualizedCost: (payback / netProceeds - 1) * 365 / (payments * intervalDays) * 100,
  };
}
