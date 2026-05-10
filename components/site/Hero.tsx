import { LeadForm } from "@/components/lead/LeadForm";
import { AggregateCounter } from "./AggregateCounter";

const PILLS = ["Free assessment", "Pre-default", "50-state counsel", "Free MCA tools"];
const TRUST_VERTICALS = ["Trucking", "Restaurants", "Construction", "Healthcare", "Retail", "E-commerce", "Auto"];

export function Hero() {
  return (
    <section className="relative bg-offwhite overflow-hidden">
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      <div className="relative mx-auto max-w-content px-6 pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 grid md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
        {/* Left column: pitch */}
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 bg-white border border-border text-slate text-[11px] font-medium px-2.5 py-1 rounded-full shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
            Modern MCA debt relief
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-7xl font-bold text-slate leading-[1.02] tracking-tighter">
            Resolve stacked MCAs with a <span className="text-electric">tailored program</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-xl leading-relaxed">
            Settlement, restructure, or legal defense. Coordinated end to end.
          </p>

          <div className="mt-7 flex flex-wrap gap-2 max-w-xl">
            {PILLS.map((p) => (
              <span key={p} className="inline-flex items-center gap-1.5 bg-white border border-border rounded-full px-3 py-1 text-xs text-slate">
                <span className="w-1 h-1 rounded-full bg-electric" />
                {p}
              </span>
            ))}
          </div>

          <div className="mt-7 max-w-xl">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Trusted across</div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
              {TRUST_VERTICALS.map((v, i) => (
                <span key={v} className="flex items-center gap-3">
                  <span>{v}</span>
                  {i < TRUST_VERTICALS.length - 1 && <span className="text-border">·</span>}
                </span>
              ))}
            </div>
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
