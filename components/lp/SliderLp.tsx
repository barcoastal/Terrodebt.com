import { SliderLeadForm } from "@/components/lead/SliderLeadForm";
import { Reveal } from "@/components/site/Reveal";
import type { SliderLpConfig } from "@/lib/slider-lp-config";

const WHY = [
  {
    n: "01",
    title: "Cash flow first.",
    body: "Daily MCA withdrawals pause via formal reconciliation, often within 2 to 4 weeks of starting. The cash that was leaving your account stays with the business.",
  },
  {
    n: "02",
    title: "Resolve in 6 to 18 months.",
    body: "Most restructuring programs close inside a year. Longer programs run 12 to 18 months with a single coordinated monthly obligation instead of daily withdrawals.",
  },
  {
    n: "03",
    title: "Real legal coordination.",
    body: "When COJ filings, account freezes, or active escalation are in play, we coordinate licensed counsel in your state within 72 hours.",
  },
];

const STATS = [
  {
    n: "47%",
    title: "Average reduction off combined advance balance",
    body: "Across recent restructuring programs, total payback lands roughly half of the original combined balance.",
  },
  {
    n: "11 mo",
    title: "Average program timeline",
    body: "Most restructuring and consolidation programs close inside a year, with longer cases on heavier advance stacks.",
  },
  {
    n: "50",
    title: "States with coordinated counsel",
    body: "When COJs, account freezes, or active escalation are in play, we coordinate licensed attorneys in your state.",
  },
];

export function SliderLp({ lp }: { lp: SliderLpConfig }) {
  return (
    <article>
      {/* Hero + form */}
      <section className="relative overflow-hidden bg-offwhite">
        <div className="bg-mesh pointer-events-none absolute inset-0" />
        <div className="grid-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-content items-start gap-10 px-6 pb-16 pt-12 lg:grid-cols-[1fr_420px] lg:gap-16 lg:pt-16">
          <div>
            <span className="shadow-soft inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-slate">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
              {lp.badge}
            </span>
            <h1 className="mt-5 text-[clamp(30px,4vw,46px)] font-bold leading-[1.12] tracking-tighter text-slate">
              {lp.headlineLead} <span className="text-electric">{lp.headlineAccent}</span>{" "}
              {lp.headlineTail}
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-muted">{lp.subline}</p>
            <ul className="mt-7 flex flex-col gap-2.5">
              {lp.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-electric">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <SliderLeadForm source={lp.source} question={lp.formQuestion} />
        </div>
      </section>

      {/* Why */}
      <section className="border-y border-border bg-white px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-content">
          <Reveal>
            <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-electric">
              Why merchants choose us
            </div>
            <h2 className="mb-10 max-w-xl text-[clamp(24px,3.5vw,36px)] font-bold leading-tight tracking-tighter text-slate">
              Keep your business operating while the debt gets fixed.
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {WHY.map((c) => (
              <Reveal key={c.n}>
                <div className="surface-card h-full p-6">
                  <div className="mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-electric">{c.n}</div>
                  <h3 className="mb-2 text-[17px] font-bold leading-snug text-slate">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-offwhite px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-content">
          <Reveal>
            <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-electric">
              By the numbers
            </div>
            <h2 className="mb-10 text-[clamp(24px,3.5vw,36px)] font-bold tracking-tighter text-slate">
              Specific outcomes, not theatrics.
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {STATS.map((s) => (
              <Reveal key={s.n}>
                <div className="border-t-2 border-electric pt-5">
                  <div className="mb-2 text-[clamp(36px,5vw,56px)] font-bold leading-none tracking-tight text-electric">
                    {s.n}
                  </div>
                  <div className="mb-1.5 font-semibold text-slate">{s.title}</div>
                  <div className="text-[13.5px] leading-relaxed text-muted">{s.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-offwhite px-6 pb-20">
        <Reveal>
          <div className="shadow-soft mx-auto max-w-content rounded-3xl border border-electric/20 bg-gradient-to-br from-electric/10 to-electric/[0.03] px-6 py-14 text-center">
            <h2 className="mb-2 text-[clamp(24px,3.5vw,38px)] font-bold leading-tight tracking-tighter text-slate">
              {lp.ctaHeadline}
            </h2>
            <p className="mb-7 text-muted">{lp.ctaSub ?? "Free assessment. No commitment."}</p>
            <a
              href="#assessment"
              className="inline-flex items-center gap-2 rounded-lg bg-electric px-8 py-3 text-[15px] font-bold text-white no-underline transition hover:bg-electric-soft"
            >
              Start my free assessment →
            </a>
            <div className="mt-4 text-[12.5px] text-muted">
              Pre-default and post-default <span className="mx-1.5">·</span> 50-state counsel
              <span className="mx-1.5">·</span> Five product categories
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
