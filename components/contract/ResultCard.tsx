import type { ContractAnalysis } from "@/lib/contract-analyze";

export function ResultCard({ a }: { a: ContractAnalysis }) {
  return (
    <div className="bg-white border border-border rounded-xl p-8">
      <h2 className="text-2xl font-semibold">Analysis</h2>
      <p className="mt-2 text-muted">{a.summary}</p>

      <dl className="grid grid-cols-2 gap-4 mt-6">
        <Stat label="Funded amount" value={a.fundedAmount ? `$${a.fundedAmount.toLocaleString()}` : "-"} />
        <Stat label="Total payback" value={a.totalPayback ? `$${a.totalPayback.toLocaleString()}` : "-"} />
        <Stat label="Factor rate" value={a.factorRate ? a.factorRate.toFixed(2) : "-"} />
        <Stat label="Effective APR" value={a.effectiveApr ? `${a.effectiveApr.toFixed(1)}%` : "-"} highlight />
        <Stat label="Term" value={a.termDays ? `${a.termDays} days` : "-"} />
        <Stat label="Daily debit" value={a.dailyPayment ? `$${a.dailyPayment.toLocaleString()}` : "-"} />
      </dl>

      <h3 className="text-lg font-semibold mt-8">Red flags</h3>
      {(a.redFlags ?? []).length === 0 ? <p className="mt-2 text-muted">No major red flags identified.</p> : <ul className="mt-2 space-y-1 text-slate">{a.redFlags.map((f, i) => <li key={i}>⚠ {f}</li>)}</ul>}

      <h3 className="text-lg font-semibold mt-6">Options</h3>
      <ul className="mt-2 space-y-1 text-slate">{(a.options ?? []).map((o, i) => <li key={i}>→ {o}</li>)}</ul>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-md ${highlight ? "bg-electric/10" : "bg-offwhite"}`}>
      <div className="text-xs text-muted uppercase">{label}</div>
      <div className={`text-lg font-semibold ${highlight ? "text-electric" : "text-slate"}`}>{value}</div>
    </div>
  );
}
