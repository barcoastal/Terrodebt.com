import Link from "next/link";
import type { Metadata } from "next";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Get up to 60% off your stacked MCA debt",
  description: "Free assessment for stacked merchant cash advance debt. Settlement and restructure programs for $25K to $5M+ in MCA debt.",
  robots: { index: false, follow: false },
};

const TESTIMONIALS = [
  { name: "Joel R.", role: "Owner, regional trucking", body: "Four MCAs, $3,200 a day in debits, and a reverse consolidation firm trying to charge me $25K upfront. TerraDebt told me my real APR before they pitched me anything. That alone was the difference." },
  { name: "Maya K.", role: "Owner, Italian restaurant", body: "I had stopped opening the lender emails. They explained the math, paused the debits, and built a single payment plan I could actually run my kitchen against." },
  { name: "Tony D.", role: "GC, residential remodels", body: "They knew what a progress payment cycle looks like and built a program around it. Other firms wanted me on a settlement track that would have killed my bonding capacity." },
  { name: "Marc L.", role: "Ecommerce, supplements", body: "Ad spend cycle was getting eaten by daily debits. Settled three MCAs in 8 months at 44 cents. We are scaling again without stacking new advances." },
  { name: "Renata V.", role: "Independent salon owner", body: "They walked me through every contract before any pitch. The free calculators were a game changer for getting clarity. I felt informed the whole way through." },
  { name: "Carlos H.", role: "Auto repair, 4 bays", body: "Got hit with a COJ in New York while I'm operating in Florida. They had counsel in both states on the call within 36 hours." },
];

const TRUST_TILES = [
  { metric: "47%", label: "Average savings off face balance", body: "Across recent settlement programs, total payback lands roughly half of the original combined balance." },
  { metric: "11 mo", label: "Average program timeline", body: "Most settlement and restructure programs close inside a year, with a few longer cases on heavier stacks." },
  { metric: "50", label: "States with coordinated counsel", body: "When COJs, account freezes, or active litigation are in play, we coordinate licensed attorneys in your state within 72 hours." },
];

export default async function GetStartedPage() {
  return (
    <article>
      {/* Hero + form */}
      <section className="relative bg-offwhite overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 pt-12 md:pt-16 pb-20 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 bg-white border border-border text-slate text-xs font-medium px-3 py-1.5 rounded-full shadow-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
              Free assessment for $25K+ MCA debt
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-slate leading-[1.05] tracking-tighter">
              Get up to <span className="text-electric">60% off</span> your stacked MCA debt.
            </h1>
            <p className="mt-5 text-lg text-muted max-w-xl leading-relaxed">
              Settlement and restructure programs for businesses stacked on merchant cash advances. Most programs resolve in 6 to 18 months.
            </p>
            <ul className="mt-6 space-y-2.5 text-base">
              {[
                "Pause damaging daily debits",
                "Negotiate balances down 40-60% on settlements",
                "Restructure terms when settlement is not the right path",
                "Coordinated counsel in all 50 states for legal defense",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-slate">
                  <svg className="w-5 h-5 mt-0.5 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted">
              <span className="font-mono text-xs uppercase tracking-wider">Talk now</span>
              <a href="tel:18008372300" className="font-semibold text-slate hover:text-electric transition no-underline">1-800-TERRA-00</a>
            </div>
          </div>
          <div className="lg:col-span-6 lg:sticky lg:top-6">
            <LeadForm source="get-started" />
            <p className="mt-3 text-xs text-muted text-center">
              By submitting, you consent to TerraDebt contacting you about your inquiry. See our <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-16">
          <Reveal>
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Why merchants choose us</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Keep your business open while you resolve the debt.</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Cash flow first.", body: "Daily MCA debits pause via formal reconciliation, often within 2 to 4 weeks of starting. The cash that was leaving your account stays with the business." },
              { n: "02", title: "Resolve in 6 to 18 months.", body: "Most settlement programs close inside a year. Restructure programs run 12 to 18 months with a single monthly payment instead of daily debits." },
              { n: "03", title: "Real attorney coordination.", body: "When COJ filings, account freezes, or active litigation are in play, we coordinate licensed counsel in your state within 72 hours." },
            ].map((p) => (
              <Reveal key={p.n}>
                <div className="surface-card p-6 h-full">
                  <span className="font-mono text-sm text-electric">{p.n}</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-slate leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why TerraDebt */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <Reveal>
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Why TerraDebt</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Specific numbers, not theatrics.</h2>
              <p className="mt-3 text-muted">Here is what the average TerraDebt program looks like across our active book. Outcomes vary by lender mix, contract terms, and default status.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {TRUST_TILES.map((t, i) => (
              <Reveal key={t.metric} delay={i * 0.04}>
                <div className="surface-card p-7 h-full">
                  <div className="font-mono text-4xl md:text-5xl font-bold text-electric tracking-tight">{t.metric}</div>
                  <div className="mt-3 text-sm font-semibold text-slate">{t.label}</div>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#top" className="bg-slate text-white px-5 py-3 rounded-xl text-sm font-medium no-underline hover:bg-slate-soft transition inline-flex items-center gap-2">
              Get my free assessment <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-16">
          <Reveal>
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Process</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">From first call to resolution.</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { n: "1", title: "Free, confidential consultation", body: "We review your contracts, your daily debit total, and your cash flow. We tell you your effective APR and what is realistic for your situation." },
              { n: "2", title: "Program design", body: "We propose a program tailored to your debt size, lender mix, and timeline. Settlement, restructure, defense, or a combination. Engagement terms are reviewed and confirmed in your consultation." },
              { n: "3", title: "Execution and resolution", body: "We pause debits, negotiate with each lender in parallel, file legal defense where needed, and structure your payments. You get clear weekly status until the last lender closes." },
            ].map((s) => (
              <Reveal key={s.n}>
                <div className="surface-card p-6 h-full">
                  <span className="font-mono text-sm text-electric">Step {s.n}</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-slate leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <Reveal>
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">What clients say</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Real merchants. Specific situations.</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <Reveal key={t.name}>
                <figure className="surface-card p-6 h-full">
                  <blockquote className="text-slate leading-relaxed">&ldquo;{t.body}&rdquo;</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate text-white font-mono text-xs flex items-center justify-center">
                      {t.name[0]}{t.name.split(" ")[1]?.[0] ?? ""}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate">{t.name}</div>
                      <div className="text-xs text-muted">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate text-white">
        <div className="mx-auto max-w-content px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Get out from under stacked MCAs.</h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">Free assessment. No commitment. Tell us your debt amount, get a tailored read on your options, and decide from there.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#top" className="bg-electric text-white px-6 py-3 rounded-xl text-sm font-medium no-underline hover:opacity-90 transition">
              Start my free assessment
            </a>
            <a href="tel:18008372300" className="border border-white/20 text-white px-6 py-3 rounded-xl text-sm font-medium no-underline hover:bg-white/10 transition">
              Call 1-800-TERRA-00
            </a>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="bg-offwhite border-t border-border">
        <div className="mx-auto max-w-content px-6 py-10 text-xs text-muted leading-relaxed">
          <p>
            <span className="font-mono uppercase tracking-wider text-slate">Disclosure.</span>{" "}
            TerraDebt is a trade name of GRL Recovery LLC. We are not a law firm and do not provide legal advice. When legal defense is required, we coordinate licensed attorneys in your state. Outcomes vary based on lender mix, contract terms, default status, and other factors. The savings ranges shown reflect a representative band of prior results and are not a guarantee of future outcomes. Programs typically resolve in 6 to 18 months. Settlement may impact your business credit profile.
          </p>
        </div>
      </section>
    </article>
  );
}
