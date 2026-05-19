"use client";
import { useState, useMemo } from "react";

export function AprCalculator() {
  const [funded, setFunded] = useState<number>(100000);
  const [payback, setPayback] = useState<number>(145000);
  const [termDays, setTermDays] = useState<number>(180);

  const result = useMemo(() => {
    const safeF = Math.max(1, funded);
    const safeT = Math.max(1, termDays);
    const factorRate = payback / safeF;
    const totalCost = payback - safeF;
    const dailyDebit = payback / safeT;
    const periods = 365 / safeT;
    const effectiveApr = (factorRate - 1) * periods * 100;
    return { factorRate, totalCost, dailyDebit, effectiveApr };
  }, [funded, payback, termDays]);

  const benchmark = (apr: number) => {
    if (apr < 12) return { label: "Bank-grade", tone: "good" as const };
    if (apr < 30) return { label: "Bank line of credit range", tone: "good" as const };
    if (apr < 60) return { label: "Business credit card range", tone: "fair" as const };
    if (apr < 100) return { label: "Aggressive MCA range", tone: "warn" as const };
    return { label: "Extremely high MCA range", tone: "danger" as const };
  };
  const b = benchmark(result.effectiveApr);

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="surface-card p-8 space-y-6">
        <Field label="Funded amount" suffix="$">
          <input type="number" min={1000} step={1000} value={funded} onChange={(e) => setFunded(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-border focus:border-electric outline-none px-0 py-3 text-2xl font-semibold text-slate" />
        </Field>
        <Field label="Total payback" suffix="$">
          <input type="number" min={1000} step={1000} value={payback} onChange={(e) => setPayback(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-border focus:border-electric outline-none px-0 py-3 text-2xl font-semibold text-slate" />
          <p className="mt-2 text-xs text-muted">Or enter factor rate × funded amount. A 1.45 factor on $100K = $145K payback.</p>
        </Field>
        <Field label="Term length" suffix="days">
          <input type="number" min={30} max={730} step={15} value={termDays} onChange={(e) => setTermDays(Number(e.target.value))} className="w-full bg-transparent border-0 border-b-2 border-border focus:border-electric outline-none px-0 py-3 text-2xl font-semibold text-slate" />
          <input type="range" min={30} max={540} step={15} value={termDays} onChange={(e) => setTermDays(Number(e.target.value))} className="w-full mt-3" />
        </Field>
      </div>

      <div className="space-y-4">
        <div className="surface-card-elevated p-8">
          <div className="font-mono text-xs uppercase tracking-wider text-muted">Effective APR</div>
          <div className="mt-2 font-mono text-6xl font-bold text-electric tracking-tighter">{result.effectiveApr.toFixed(1)}%</div>
          <div className={`mt-3 text-sm ${b.tone === "danger" ? "text-red-600" : b.tone === "warn" ? "text-amber-700" : b.tone === "fair" ? "text-slate" : "text-emerald-700"}`}>{b.label}</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Stat label="Factor rate" value={result.factorRate.toFixed(2)} />
          <Stat label="Total cost" value={`$${Math.round(result.totalCost).toLocaleString()}`} />
          <Stat label="Daily debit" value={`$${Math.round(result.dailyDebit).toLocaleString()}`} />
        </div>

        <ApiBenchmark apr={result.effectiveApr} />

        <div className="text-xs text-muted leading-relaxed">
          Effective APR is a simple-interest annualization based on (factor rate minus 1) times (365 / term). Real-world MCA cost is typically higher than this number once stacking, prepayment penalties, and reconciliation rules are included. For a closer look, run the stacked MCA calculator next.
        </div>
      </div>
    </div>
  );
}

function Field({ label, suffix, children }: { label: string; suffix?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="font-mono text-xs uppercase tracking-wider text-muted">{label}</label>
        {suffix && <span className="font-mono text-xs text-muted">{suffix}</span>}
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-3">
      <div className="text-xs text-muted uppercase tracking-wide">{label}</div>
      <div className="mt-1 font-mono text-base font-semibold text-slate">{value}</div>
    </div>
  );
}

function ApiBenchmark({ apr }: { apr: number }) {
  const points = [
    { label: "Bank term", apr: 10 },
    { label: "Bank LOC", apr: 25 },
    { label: "Biz CC", apr: 45 },
    { label: "Standard MCA", apr: 80 },
    { label: "High-rate MCA", apr: 130 },
  ];
  const max = Math.max(150, apr + 10);
  return (
    <div className="surface-card p-6">
      <div className="font-mono text-xs uppercase tracking-wider text-muted">How this compares</div>
      <div className="mt-4 space-y-2">
        {points.map((p) => (
          <div key={p.label} className="flex items-center gap-3">
            <span className="text-xs text-muted w-24">{p.label}</span>
            <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-slate" style={{ width: `${(p.apr / max) * 100}%` }} />
            </div>
            <span className="font-mono text-xs text-slate w-10 text-right">{p.apr}%</span>
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <span className="text-xs text-electric font-semibold w-24">Your MCA</span>
          <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-electric" style={{ width: `${Math.min(100, (apr / max) * 100)}%` }} />
          </div>
          <span className="font-mono text-xs text-electric font-semibold w-10 text-right">{apr.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}
