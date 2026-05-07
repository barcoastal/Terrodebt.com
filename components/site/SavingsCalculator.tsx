"use client";
import { useMemo, useState } from "react";

export function SavingsCalculator() {
  const [debt, setDebt] = useState(200000);
  const [dailyPayment, setDailyPayment] = useState(800);

  const result = useMemo(() => {
    const monthsRemaining = Math.max(1, Math.ceil(debt / Math.max(1, dailyPayment * 21)));
    const settlementSavingsLow = Math.round(debt * 0.4);
    const settlementSavingsHigh = Math.round(debt * 0.6);
    const newMonthly = Math.round((debt - settlementSavingsLow) / 12);
    return { monthsRemaining, settlementSavingsLow, settlementSavingsHigh, newMonthly };
  }, [debt, dailyPayment]);

  return (
    <div className="surface-card-elevated p-8 max-w-2xl">
      <label className="block text-sm font-medium text-slate">Total MCA debt</label>
      <input type="range" min={25000} max={2000000} step={5000} value={debt} onChange={(e) => setDebt(Number(e.target.value))} className="w-full mt-2 accent-electric" />
      <div className="font-mono text-3xl font-semibold text-electric tracking-tight">${debt.toLocaleString()}</div>

      <label className="block text-sm font-medium text-slate mt-6">Total daily MCA debits (across all lenders)</label>
      <input type="range" min={100} max={5000} step={50} value={dailyPayment} onChange={(e) => setDailyPayment(Number(e.target.value))} className="w-full mt-2 accent-electric" />
      <div className="font-mono text-3xl font-semibold text-electric tracking-tight">${dailyPayment.toLocaleString()}<span className="text-base text-muted">/day</span></div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-offwhite p-4 rounded-lg border border-border">
          <div className="font-mono text-[10px] tracking-wider text-muted uppercase">Estimated savings</div>
          <div className="font-mono text-lg font-semibold mt-1.5 text-slate tracking-tight">${(result.settlementSavingsLow / 1000).toFixed(0)}K to ${(result.settlementSavingsHigh / 1000).toFixed(0)}K</div>
        </div>
        <div className="bg-offwhite p-4 rounded-lg border border-border">
          <div className="font-mono text-[10px] tracking-wider text-muted uppercase">New monthly</div>
          <div className="font-mono text-lg font-semibold mt-1.5 text-slate tracking-tight">~${result.newMonthly.toLocaleString()}/mo</div>
        </div>
        <div className="bg-offwhite p-4 rounded-lg border border-border">
          <div className="font-mono text-[10px] tracking-wider text-muted uppercase">Months at pace</div>
          <div className="font-mono text-lg font-semibold mt-1.5 text-slate tracking-tight">~{result.monthsRemaining} mo</div>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">Estimates only. Real numbers depend on lender mix, contract terms, and your business cash flow. Submit a free assessment for actual figures.</p>
    </div>
  );
}
