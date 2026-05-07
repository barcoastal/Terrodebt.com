"use client";
import { useState, useMemo } from "react";

type Mca = { id: string; lender: string; funded: number; payback: number; daily: number; daysLeft: number };

const seedRow = (i: number): Mca => ({ id: crypto.randomUUID(), lender: `MCA ${i + 1}`, funded: 50000, payback: 72500, daily: 600, daysLeft: 90 });

export function StackCalculator() {
  const [rows, setRows] = useState<Mca[]>([seedRow(0), seedRow(1)]);

  function update(id: string, patch: Partial<Mca>) {
    setRows((rs) => rs.map((r) => r.id === id ? { ...r, ...patch } : r));
  }
  function add() {
    setRows((rs) => [...rs, seedRow(rs.length)]);
  }
  function remove(id: string) {
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  const totals = useMemo(() => {
    const totalBalance = rows.reduce((sum, r) => sum + Math.max(0, r.daily * Math.max(0, r.daysLeft)), 0);
    const totalDaily = rows.reduce((sum, r) => sum + r.daily, 0);
    const totalFunded = rows.reduce((sum, r) => sum + r.funded, 0);
    const totalPayback = rows.reduce((sum, r) => sum + r.payback, 0);
    const totalCost = totalPayback - totalFunded;
    const weightedApr = totalFunded > 0
      ? rows.reduce((sum, r) => {
          if (r.funded <= 0 || r.daysLeft <= 0) return sum;
          const term = r.payback / Math.max(1, r.daily);
          const periods = 365 / Math.max(1, term);
          const apr = ((r.payback / r.funded) - 1) * periods * 100;
          return sum + apr * (r.funded / totalFunded);
        }, 0)
      : 0;
    const longestDaysLeft = rows.reduce((max, r) => Math.max(max, r.daysLeft), 0);
    return { totalBalance, totalDaily, totalCost, totalFunded, totalPayback, weightedApr, longestDaysLeft };
  }, [rows]);

  return (
    <div className="space-y-8">
      <div className="surface-card p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted">
            <tr>
              <th className="pb-3 font-mono text-xs uppercase tracking-wider">Lender</th>
              <th className="pb-3 font-mono text-xs uppercase tracking-wider">Funded</th>
              <th className="pb-3 font-mono text-xs uppercase tracking-wider">Payback</th>
              <th className="pb-3 font-mono text-xs uppercase tracking-wider">Daily</th>
              <th className="pb-3 font-mono text-xs uppercase tracking-wider">Days left</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="py-3 pr-3"><input type="text" value={r.lender} onChange={(e) => update(r.id, { lender: e.target.value })} className="w-32 border-0 border-b border-border focus:border-electric outline-none px-0 py-1 bg-transparent" /></td>
                <td className="py-3 pr-3"><input type="number" min={0} step={1000} value={r.funded} onChange={(e) => update(r.id, { funded: Number(e.target.value) })} className="w-28 border-0 border-b border-border focus:border-electric outline-none px-0 py-1 bg-transparent font-mono" /></td>
                <td className="py-3 pr-3"><input type="number" min={0} step={1000} value={r.payback} onChange={(e) => update(r.id, { payback: Number(e.target.value) })} className="w-28 border-0 border-b border-border focus:border-electric outline-none px-0 py-1 bg-transparent font-mono" /></td>
                <td className="py-3 pr-3"><input type="number" min={0} step={50} value={r.daily} onChange={(e) => update(r.id, { daily: Number(e.target.value) })} className="w-24 border-0 border-b border-border focus:border-electric outline-none px-0 py-1 bg-transparent font-mono" /></td>
                <td className="py-3 pr-3"><input type="number" min={0} max={730} step={1} value={r.daysLeft} onChange={(e) => update(r.id, { daysLeft: Number(e.target.value) })} className="w-20 border-0 border-b border-border focus:border-electric outline-none px-0 py-1 bg-transparent font-mono" /></td>
                <td className="py-3 text-right">
                  {rows.length > 1 && <button onClick={() => remove(r.id)} className="text-muted hover:text-red-600 text-sm">Remove</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={add} className="mt-4 text-electric font-medium text-sm">+ Add another MCA</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Big label="Total daily debit" value={`$${Math.round(totals.totalDaily).toLocaleString()}`} sub="per business day" highlight />
        <Big label="Remaining balance" value={`$${Math.round(totals.totalBalance).toLocaleString()}`} sub="at current pace" />
        <Big label="Weighted APR" value={`${totals.weightedApr.toFixed(1)}%`} sub="across the stack" />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Small label="Total funded" value={`$${totals.totalFunded.toLocaleString()}`} />
        <Small label="Total payback" value={`$${totals.totalPayback.toLocaleString()}`} />
        <Small label="Total cost of capital" value={`$${totals.totalCost.toLocaleString()}`} />
      </div>

      <div className="text-xs text-muted leading-relaxed">
        Estimates only. Real numbers depend on lender reconciliation rules, prepayment penalties, and stacking covenants. The weighted APR is funded-amount weighted across all advances. Use this as a starting point for a conversation with us, not a definitive figure.
      </div>
    </div>
  );
}

function Big({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div className={`surface-card p-6 ${highlight ? "ring-glow" : ""}`}>
      <div className="font-mono text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className={`mt-2 font-mono text-3xl font-bold tracking-tight ${highlight ? "text-electric" : "text-slate"}`}>{value}</div>
      <div className="text-xs text-muted mt-1">{sub}</div>
    </div>
  );
}
function Small({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-offwhite border border-border rounded-md p-3">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-1 font-mono text-base font-semibold text-slate">{value}</div>
    </div>
  );
}
