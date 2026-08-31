import Image from "next/image";
import { SliderLeadForm } from "@/components/lead/SliderLeadForm";
import { Reveal } from "@/components/site/Reveal";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import type { SliderLpConfig } from "@/lib/slider-lp-config";

const TRUST_STRIP = [
  "Flat engagement fees, never a percentage of your debt",
  "Not a lender: no new loans, no new liens",
  "Licensed counsel coordinated in all 50 states",
  "Pre-default and post-default programs",
];

const STEPS = [
  {
    n: "1",
    title: "Free assessment call",
    body: "One call with an advisor who has seen your situation before. Your positions, your real numbers, and a straight answer about which path fits, including the paths that cost nothing.",
  },
  {
    n: "2",
    title: "Forensic audit",
    body: "Every contract, funding statement, and bank debit pulled apart. The audit finds what you actually owe, what it truly costs, and the contract defects that become your leverage.",
  },
  {
    n: "3",
    title: "Coordinated program",
    body: "Reconciliation first to slow the bleeding, then restructuring or settlement executed creditor by creditor, documented in writing, with counsel coordinated when funders escalate.",
  },
];

const TESTIMONIALS = [
  {
    name: "Joel R.",
    role: "Owner, regional trucking",
    body: "Four MCAs, $3,200 a day in debits, and a reverse consolidation firm trying to charge me $25K upfront. Business Debt Insider told me my real APR before they pitched me anything. That alone was the difference.",
  },
  {
    name: "Marc L.",
    role: "Ecommerce, supplements",
    body: "Ad spend cycle was getting eaten by daily debits. Settled three MCAs in 8 months at 44 cents. We are scaling again without stacking new advances.",
  },
  {
    name: "Maya K.",
    role: "Owner, Italian restaurant",
    body: "I had stopped opening the lender emails. They explained the math, paused the debits, and built a single payment plan I could actually run my kitchen against.",
  },
];

const DIFFERENCE = [
  { them: "Enroll first, ask questions later", us: "Forensic audit before any recommendation" },
  { them: "Fees at 15 to 25% of your enrolled debt", us: "Flat engagement fee, quoted up front" },
  { them: "One product pitched to every caller", us: "Restructure, settle, or defend, based on your numbers" },
  { them: "Disappear when a funder files a COJ", us: "Licensed counsel coordinated within 72 hours" },
];

const FAQ = [
  {
    q: "Is this a loan or consolidation product?",
    a: "No. We are not a lender and we do not place new debt. We renegotiate, restructure, or settle the obligations you already have, and we arrange real refinancing only when you genuinely qualify for it.",
  },
  {
    q: "How fast do the daily withdrawals stop?",
    a: "Formal reconciliation requests are usually the first move, and debit reductions or pauses commonly land within 2 to 4 weeks of starting. Full restructures and settlements take longer, but the cash flow relief is front-loaded.",
  },
  {
    q: "What does it cost?",
    a: "Flat engagement fees quoted up front after the free assessment, typically $10,000 to $13,000 for stacked files between $100K and $2M. Never a percentage of your enrolled debt, and the first call costs nothing.",
  },
  {
    q: "Will this hurt my business credit?",
    a: "Restructuring generally protects it; settlement involves a default window and does more damage before the rebuild. We tell you the credit impact of each path before you choose, and the program includes the rebuild plan.",
  },
  {
    q: "Are you a law firm?",
    a: "No, and we say so plainly. We are a financial consulting practice. When legal defense is needed, COJs, freezes, or litigation, we coordinate licensed attorneys in your state, usually within 72 hours.",
  },
  {
    q: "Do I qualify?",
    a: "Programs fit businesses with roughly $25K to $5M+ in short-term debt. If your file is better served by a bank workout, a bankruptcy attorney, or nothing at all, we tell you that on the first call.",
  },
];

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
        <Image
          src="/images/lp-handshake.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="pointer-events-none object-cover object-[55%_30%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-offwhite from-26% via-offwhite/20 via-44% to-transparent" />
        <div className="relative mx-auto grid max-w-content items-start gap-10 px-6 pb-16 pt-12 lg:max-w-none lg:grid-cols-[minmax(420px,540px)_1fr_420px] lg:gap-8 lg:px-14 lg:pb-24 lg:pt-16">
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

          {/* middle column stays empty so the background photo shows through */}
          <div className="hidden lg:block" aria-hidden />

          <SliderLeadForm source={lp.source} question={lp.formQuestion} />
        </div>
      </section>

      {/* Trust badge strip */}
      <section className="relative z-10 -mt-8 px-6">
        <div className="shadow-soft mx-auto grid max-w-content grid-cols-2 gap-4 rounded-2xl border border-border bg-white px-6 py-5 md:grid-cols-4">
          {TRUST_STRIP.map((t) => (
            <span key={t} className="flex items-center gap-2.5 text-[13px] font-medium leading-snug text-slate">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-electric/10">
                <svg className="h-4.5 w-4.5 text-electric" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-offwhite px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-content">
          <Reveal>
            <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-electric">
              How it works
            </div>
            <h2 className="mb-10 max-w-xl text-[clamp(24px,3.5vw,36px)] font-bold leading-tight tracking-tighter text-slate">
              Three steps from drowning to a plan that holds.
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n}>
                <div className="relative h-full">
                  <div className="surface-card-elevated h-full p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-electric text-lg font-bold text-white">
                      {s.n}
                    </span>
                    <h3 className="mb-2 mt-4 text-lg font-bold text-slate">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{s.body}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-2xl text-electric md:block" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
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
          <div className="grid gap-6 md:grid-cols-3">
            {STATS.map((s, i) => (
              <Reveal key={s.n}>
                <div
                  className={`h-full rounded-2xl p-7 shadow-soft ${
                    i === 0 ? "bg-electric text-white" : "border border-border bg-white"
                  }`}
                >
                  <div className={`mb-2 text-[clamp(36px,5vw,56px)] font-bold leading-none tracking-tight ${i === 0 ? "text-white" : "text-electric"}`}>
                    {s.n}
                  </div>
                  <div className={`mb-1.5 font-semibold ${i === 0 ? "text-white" : "text-slate"}`}>{s.title}</div>
                  <div className={`text-[13.5px] leading-relaxed ${i === 0 ? "text-white/80" : "text-muted"}`}>{s.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-white px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-content">
          <Reveal>
            <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-electric">
              From the files
            </div>
            <h2 className="mb-10 max-w-xl text-[clamp(24px,3.5vw,36px)] font-bold leading-tight tracking-tighter text-slate">
              Owners who were where you are.
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Reveal key={t.name}>
                <figure className="surface-card flex h-full flex-col p-6">
                  <div className="mb-3 flex gap-0.5 text-electric" aria-label="5 out of 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-slate">&ldquo;{t.body}&rdquo;</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-electric text-sm font-bold text-white">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate">{t.name}</span>
                      <span className="text-xs text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ink CTA band */}
      <section className="bg-offwhite px-6 pt-16">
        <Reveal>
          <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-5 rounded-3xl bg-ink px-8 py-10 md:flex-row md:px-12">
            <h2 className="text-center text-[clamp(22px,3vw,32px)] font-bold tracking-tighter text-white md:text-left">
              See what we can do for your business.
            </h2>
            <a
              href="#assessment"
              className="shrink-0 rounded-full bg-white px-7 py-3 text-[15px] font-bold text-ink no-underline transition hover:bg-electric hover:text-white"
            >
              Free consultation →
            </a>
          </div>
        </Reveal>
      </section>

      {/* How we're different */}
      <section className="bg-offwhite px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-content">
          <Reveal>
            <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-electric">
              The difference
            </div>
            <h2 className="mb-10 max-w-xl text-[clamp(24px,3.5vw,36px)] font-bold leading-tight tracking-tighter text-slate">
              Not another enrollment mill.
            </h2>
          </Reveal>
          <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_320px]">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-border bg-white">
                <div className="grid grid-cols-2 border-b border-border bg-offwhite text-sm font-bold">
                  <div className="px-5 py-3 text-muted">The typical debt relief pitch</div>
                  <div className="px-5 py-3 text-electric">How we work</div>
                </div>
                {DIFFERENCE.map((row) => (
                  <div key={row.us} className="grid grid-cols-2 border-b border-border text-sm last:border-b-0">
                    <div className="flex items-start gap-2 px-5 py-4 text-muted">
                      <span className="mt-0.5 text-border" aria-hidden>✕</span>
                      {row.them}
                    </div>
                    <div className="flex items-start gap-2 px-5 py-4 font-medium text-slate">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-electric" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {row.us}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <div className="relative hidden h-full min-h-[280px] overflow-hidden rounded-2xl border border-border shadow-soft lg:block">
                <Image
                  src="/images/process-call.png"
                  alt="Advisor reviewing a business debt file"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-white px-6 py-16 lg:py-20">
        <FaqJsonLd items={FAQ} />
        <div className="mx-auto max-w-content">
          <Reveal>
            <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-electric">
              Questions owners actually ask
            </div>
            <h2 className="mb-10 max-w-xl text-[clamp(24px,3.5vw,36px)] font-bold leading-tight tracking-tighter text-slate">
              Straight answers, before you ever call.
            </h2>
          </Reveal>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {FAQ.map((f) => (
              <Reveal key={f.q}>
                <div>
                  <h3 className="mb-2 text-[16px] font-bold text-slate">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-muted">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur md:hidden">
        <a
          href="#assessment"
          className="flex w-full items-center justify-center rounded-lg bg-electric py-3 text-[15px] font-bold text-white no-underline"
        >
          Start my free assessment →
        </a>
      </div>

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
