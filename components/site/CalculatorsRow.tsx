import Link from "next/link";

const TOOLS = [
  {
    href: "/tools/apr-calculator",
    title: "Effective APR Calculator",
    desc: "Translate an MCA factor rate into the true annualized cost. Inputs in seconds, output in minutes.",
    mark: "apr" as const,
  },
  {
    href: "/tools/stack-calculator",
    title: "MCA Stack Calculator",
    desc: "Add up daily debits, factor rates, and remaining balances across every active advance.",
    mark: "stack" as const,
  },
  {
    href: "/tools/health-check",
    title: "Debt Health Check",
    desc: "10 questions across MCA, equipment, vendor, bank, and tax debt. Plain-English diagnosis.",
    mark: "health" as const,
  },
];

function Mark({ kind }: { kind: "apr" | "stack" | "health" }) {
  if (kind === "apr") {
    return (
      <div className="flex items-end gap-2 h-24">
        <span className="block w-5 h-8 bg-electric/30" />
        <span className="block w-5 h-14 bg-electric/60" />
        <span className="block w-5 h-20 bg-electric" />
        <span className="block w-5 h-24 bg-electric" />
      </div>
    );
  }
  if (kind === "stack") {
    return (
      <div className="flex flex-col gap-2 h-24 justify-end">
        <span className="block w-28 h-2.5 bg-electric/40" />
        <span className="block w-24 h-2.5 bg-electric/60" />
        <span className="block w-20 h-2.5 bg-electric/80" />
        <span className="block w-16 h-2.5 bg-electric" />
        <span className="block w-12 h-2.5 bg-electric" />
      </div>
    );
  }
  return (
    <div className="relative h-24 w-24">
      <span className="absolute inset-0 border-2 border-electric/30 rounded-full" />
      <span className="absolute inset-3 border-2 border-electric/60 rounded-full" />
      <span className="absolute inset-6 border-2 border-electric rounded-full" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-electric rounded-full" />
    </div>
  );
}

export function CalculatorsRow() {
  return (
    <section className="bg-paper border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-12 md:py-14">
        <div className="flex items-end justify-between gap-6 border-b border-ink pb-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Calculators and tools
            </span>
            <h2 className="mt-1 font-bold tracking-tight text-ink text-2xl md:text-3xl leading-tight">
              Run the numbers before the call
            </h2>
          </div>
          <Link
            href="/tools"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric no-underline hover:underline shrink-0"
          >
            All tools →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-px bg-ink border border-ink">
          {TOOLS.map((t, i) => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-ink no-underline transition hover:bg-ink-soft block"
            >
              <div className="relative h-44 bg-ink-soft flex items-center justify-center border-b border-ink overflow-hidden">
                <span
                  aria-hidden
                  className="absolute top-3 left-4 font-mono text-[11px] uppercase tracking-[0.2em] text-electric font-bold"
                >
                  {String(i + 1).padStart(2, "0")} / Tool
                </span>
                <Mark kind={t.mark} />
              </div>
              <div className="p-6 md:p-7">
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-white leading-snug">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{t.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-electric border-b border-electric pb-0.5 group-hover:border-electric-soft group-hover:text-electric-soft transition">
                  Use the calculator
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
