import { LeadForm } from "@/components/lead/LeadForm";
import { AggregateCounter } from "./AggregateCounter";

export function Hero() {
  return (
    <section className="relative bg-offwhite overflow-hidden">
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      <div className="relative mx-auto max-w-content px-6 pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 grid md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
        {/* Left column: pitch */}
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 bg-white border border-border text-slate text-xs font-medium px-3 py-1.5 rounded-full shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
            Modern MCA debt relief
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-7xl font-bold text-slate leading-[1.02] tracking-tighter">
            Resolve stacked MCAs with a <span className="text-electric">tailored program</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-xl leading-relaxed">
            Free 60-second assessment to find your fit. Settlement, restructure, or legal defense, coordinated end to end.
          </p>

          <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3 max-w-xl text-base">
            <Bullet>Free 60-second assessment</Bullet>
            <Bullet>Free MCA calculators</Bullet>
            <Bullet>Pre-default and post-default</Bullet>
            <Bullet>Counsel in all 50 states</Bullet>
          </ul>

          <div className="mt-8 flex items-center gap-4 text-sm">
            <a href="tel:18008372300" className="font-semibold text-slate hover:text-electric transition no-underline">
              Or call 1-800-TERRA-00
            </a>
            <span className="text-muted">Mon-Fri 8 AM to 8 PM ET</span>
          </div>

          <div className="mt-8">
            <AggregateCounter />
          </div>
        </div>

        {/* Right column: form */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <LeadForm source="homepage" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <svg className="w-5 h-5 mt-0.5 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      <span className="text-slate">{children}</span>
    </li>
  );
}
