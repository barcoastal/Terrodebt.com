import Link from "next/link";
import { Reveal } from "./Reveal";

const ROWS = [
  { label: "SBA term loan", value: 9, color: "bg-emerald-200" },
  { label: "Bank line of credit", value: 18, color: "bg-emerald-300" },
  { label: "Business credit card", value: 28, color: "bg-amber-300" },
  { label: "Standard MCA (factor 1.30, 12 mo)", value: 50, color: "bg-orange-400" },
  { label: "Aggressive MCA (factor 1.45, 6 mo)", value: 132, color: "bg-red-500" },
];

export function AprComparison() {
  const max = 150;
  return (
    <section className="bg-white border-y border-border">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">MCA cost benchmark</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">MCA cost, in honest numbers.</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Factor rates obscure the real cost. Annualized, a typical aggressive MCA crosses 130 percent. APR is the right lens for MCA debt specifically. Other product categories use different math.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 surface-card p-6 md:p-10">
            <div className="space-y-5">
              {ROWS.map((r) => (
                <div key={r.label}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-slate font-medium">{r.label}</span>
                    <span className="font-mono font-semibold text-slate tabular-nums">{r.value}%</span>
                  </div>
                  <div className="mt-2 h-3 bg-border rounded-full overflow-hidden">
                    <div className={`h-full ${r.color} rounded-full`} style={{ width: `${(r.value / max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-muted">Run your own numbers on your specific contracts.</span>
              <Link href="/tools/apr-calculator" className="font-mono text-xs uppercase tracking-wider text-electric no-underline hover:underline">
                Open APR calculator →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
