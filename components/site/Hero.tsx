import { LeadForm } from "@/components/lead/LeadForm";
import { AggregateCounter } from "./AggregateCounter";

export function Hero() {
  return (
    <section className="relative bg-offwhite overflow-hidden">
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      <div className="relative mx-auto max-w-content px-6 pt-20 pb-24 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="inline-flex items-center gap-2 bg-white border border-border text-slate text-xs font-medium px-3 py-1.5 rounded-full shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
            Transparent flat fee. Published.
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold text-slate leading-[1.05] tracking-tighter">
            MCA debt relief, with a <span className="text-electric">published flat fee</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-xl leading-relaxed">
            No upfront cost. No monthly retainers. We tell you the number before you sign anything, and we work with stacked MCAs even before default.
          </p>
          <AggregateCounter />
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <Bullet>Flat fee, published</Bullet>
            <Bullet>No upfront cost</Bullet>
            <Bullet>Pre-default programs</Bullet>
            <Bullet>Free AI contract review</Bullet>
          </ul>
        </div>
        <div className="md:sticky md:top-8">
          <LeadForm source="homepage" />
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <svg className="w-4 h-4 mt-0.5 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      <span className="text-slate">{children}</span>
    </li>
  );
}
