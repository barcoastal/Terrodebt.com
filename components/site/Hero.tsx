import { LeadForm } from "@/components/lead/LeadForm";
import { AggregateCounter } from "./AggregateCounter";

export function Hero() {
  return (
    <section className="relative bg-offwhite overflow-hidden">
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-6 pt-16 md:pt-20 pb-24 text-center">
        <span className="inline-flex items-center gap-2 bg-white border border-border text-slate text-xs font-medium px-3 py-1.5 rounded-full shadow-soft">
          <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
          Modern MCA debt relief
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-slate leading-[1.05] tracking-tighter">
          Resolve stacked MCAs with a <span className="text-electric">tailored program</span>.
        </h1>
        <p className="mt-5 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Free 60-second assessment to find your fit. Settlement, restructure, or legal defense, coordinated end to end.
        </p>

        <div className="mt-10 mx-auto max-w-2xl text-left">
          <LeadForm source="homepage" />
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          <Bullet>Free 60-second assessment</Bullet>
          <Bullet>Free MCA calculators</Bullet>
          <Bullet>Pre-default + post-default</Bullet>
          <Bullet>Counsel in all 50 states</Bullet>
        </ul>

        <div className="mt-8">
          <AggregateCounter />
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
