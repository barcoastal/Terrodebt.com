import { Reveal } from "./Reveal";

const STATS = [
  { value: "47%", label: "Avg savings on settlements", sub: "MCA and trade creditor close-outs" },
  { value: "11 mo", label: "Avg program timeline", sub: "Settlement, restructure, and workouts" },
  { value: "50", label: "States with coordinated counsel", sub: "COJ, levy, and lawsuit defense" },
  { value: "72 hr", label: "Emergency legal response", sub: "When an enforcement action lands" },
];

export function StatsBand() {
  return (
    <section className="relative bg-slate text-white overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate pointer-events-none" />
      <div className="relative mx-auto max-w-content px-6 py-16 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="relative">
              <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-electric tracking-tighter leading-none">{s.value}</div>
              <div className="mt-3 text-sm font-semibold text-white leading-snug">{s.label}</div>
              <div className="mt-1 text-xs text-white/60 leading-relaxed">{s.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
