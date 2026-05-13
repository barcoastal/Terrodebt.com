const STATS = [
  { value: "47%", label: "Avg savings on settled balances" },
  { value: "11 mo", label: "Avg program timeline" },
  { value: "50", label: "States with coordinated counsel" },
  { value: "6", label: "Coverage areas" },
];

export function StatBand() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-end">
          <div className="md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Working numbers
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-slate leading-[1.05]">
              Where TerraDebt programs land.
            </h2>
            <p className="mt-4 text-base text-muted max-w-md leading-relaxed">
              Averages across active programs. Real outcomes vary with lender mix, debt size, and how soon you engage.
            </p>
          </div>

          <div className="md:col-span-7">
            <dl className="grid grid-cols-2 gap-x-10 gap-y-10">
              {STATS.map((s) => (
                <div key={s.label} className="border-t border-rule pt-5">
                  <dt className="text-xs text-muted">{s.label}</dt>
                  <dd className="mt-3 font-mono text-4xl md:text-5xl font-bold tracking-tighter text-slate">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
