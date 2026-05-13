import Link from "next/link";

const TOOLS = [
  {
    href: "/tools/apr-calculator",
    title: "Effective APR Calculator",
    desc: "Translate an MCA factor rate into the true annualized cost. Inputs in seconds, output in minutes.",
    mark: "apr",
  },
  {
    href: "/tools/stack-calculator",
    title: "MCA Stack Calculator",
    desc: "Add up daily debits, factor rates, and remaining balances across every active advance.",
    mark: "stack",
  },
  {
    href: "/tools/health-check",
    title: "Debt Health Check",
    desc: "10 questions across MCA, SBA, equipment, vendor, bank, and tax debt. Plain-English diagnosis.",
    mark: "health",
  },
];

function Mark({ kind }: { kind: string }) {
  if (kind === "apr") {
    return (
      <div className="flex items-end gap-1 h-10">
        <span className="block w-2.5 h-3 bg-slate" />
        <span className="block w-2.5 h-6 bg-slate" />
        <span className="block w-2.5 h-9 bg-electric" />
      </div>
    );
  }
  if (kind === "stack") {
    return (
      <div className="flex flex-col gap-1 h-10 justify-end">
        <span className="block w-10 h-1.5 bg-electric" />
        <span className="block w-10 h-1.5 bg-slate" />
        <span className="block w-10 h-1.5 bg-slate" />
        <span className="block w-10 h-1.5 bg-slate" />
      </div>
    );
  }
  return (
    <div className="relative h-10 w-10">
      <span className="absolute inset-0 border-2 border-slate" />
      <span className="absolute inset-2 border-2 border-electric" />
      <span className="absolute left-3.5 top-3.5 w-3 h-3 bg-slate" />
    </div>
  );
}

export function CalculatorsRow() {
  return (
    <section className="bg-white border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-12 md:py-14">
        <div className="flex items-end justify-between gap-6 border-b border-rule pb-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Calculators and tools
            </span>
            <h2 className="mt-1 font-bold tracking-tighter text-slate text-2xl md:text-3xl leading-tight">
              Run the numbers before the call
            </h2>
          </div>
          <Link
            href="/tools"
            className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline shrink-0"
          >
            All tools →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white p-6 md:p-7 no-underline transition hover:bg-offwhite"
            >
              <Mark kind={t.mark} />
              <h3 className="mt-5 text-lg md:text-xl font-semibold tracking-tight text-slate leading-snug">
                {t.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{t.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate border-b border-slate pb-0.5 group-hover:border-electric group-hover:text-electric transition">
                Use the calculator
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
