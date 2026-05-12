const STATS = [
  {
    value: "47%",
    label: "Average savings on settled balances",
  },
  {
    value: "11 mo",
    label: "Average program timeline",
  },
  {
    value: "50",
    label: "States with coordinated counsel",
  },
  {
    value: "72 hr",
    label: "Emergency legal response window",
  },
];

export function ResearchBand() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">By the numbers</span>
          <h2 className="mt-2 font-semibold tracking-tight text-slate text-3xl md:text-4xl leading-tight">
            Where TerraDebt programs land.
          </h2>
        </div>

        <div className="mt-12 bg-cream border border-rule">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-rule">
            {STATS.map((s) => (
              <div key={s.label} className="p-7 md:p-8 flex flex-col">
                <div className="font-mono text-4xl md:text-5xl font-bold text-slate tracking-tight leading-none">
                  {s.value}
                </div>
                <div className="mt-4 text-sm font-semibold text-slate leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-muted leading-relaxed max-w-3xl">
          Working figures across coverage areas. Exact outcomes vary per program.
        </p>
      </div>
    </section>
  );
}
