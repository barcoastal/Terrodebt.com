const STATS = [
  {
    value: "47%",
    label: "Average savings on settled balances",
    source: "Based on TerraDebt MCA and trade-creditor close-outs, 2024 to 2026.",
  },
  {
    value: "11 mo",
    label: "Average program timeline",
    source: "Mixed-product programs, intake to final resolution.",
  },
  {
    value: "50",
    label: "States with coordinated counsel",
    source: "Licensed attorney coordination on COJ, levy, and lawsuit defense.",
  },
  {
    value: "72 hr",
    label: "Emergency legal response window",
    source: "From intake to attorney engagement when enforcement is active.",
  },
];

export function ResearchBand() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Research note</span>
          <h2 className="mt-2 font-serif-tight font-bold text-slate text-3xl md:text-4xl leading-tight">
            The cost of stretched business debt.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted leading-relaxed">
            Our working numbers across the six product categories. Figures are drawn from active program data, rounded to the nearest thousand or percentage point.
          </p>
        </div>

        <div className="mt-12 bg-cream border border-rule">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-rule">
            {STATS.map((s) => (
              <div key={s.label} className="p-7 md:p-8 flex flex-col">
                <div className="font-mono text-4xl md:text-5xl font-bold text-slate tracking-tight leading-none">
                  {s.value}
                </div>
                <div className="mt-4 text-sm font-semibold text-slate leading-snug">{s.label}</div>
                <div className="mt-2 text-xs italic text-muted leading-relaxed">{s.source}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-muted leading-relaxed max-w-3xl">
          Methodology. Stats are drawn from active program data across 2024 to 2026 close-outs. Dollar figures are rounded to the nearest thousand. Past results referenced here do not predict future outcomes.
        </p>
      </div>
    </section>
  );
}
