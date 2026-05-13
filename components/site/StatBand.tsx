const STATS = [
  { idx: "01", value: "47%", label: "Avg savings on settled balances" },
  { idx: "02", value: "11 mo", label: "Avg program timeline" },
  { idx: "03", value: "50", label: "States with counsel" },
  { idx: "04", value: "6", label: "Coverage areas" },
];

export function StatBand() {
  return (
    <section className="bg-electric text-white">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {STATS.map((s, i) => (
            <div
              key={s.idx}
              className={`relative p-6 md:p-8 ${i < 2 ? "border-b border-white/20 md:border-b-0" : ""}`}
            >
              <span className="absolute top-3 right-4 font-mono text-[11px] uppercase tracking-wider text-white/40">
                {s.idx}
              </span>
              <div className="font-mono text-5xl md:text-6xl font-bold tracking-tighter text-white">
                {s.value}
              </div>
              <div className="mt-3 text-sm text-white/80 max-w-[12rem] leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-white/20 max-w-3xl">
          <p className="text-sm text-white/70 leading-relaxed">
            Working numbers across TerraDebt coverage. Outcomes vary per program.
          </p>
        </div>
      </div>
    </section>
  );
}
