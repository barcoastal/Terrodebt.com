import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/site/Reveal";
import { LP_CONFIGS, getLpIds } from "@/lib/lp-config";

export async function generateStaticParams() {
  return getLpIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lp = LP_CONFIGS[id];
  if (!lp) return {};
  return {
    title: lp.metaTitle,
    description: lp.metaDescription,
    robots: { index: false, follow: false },
  };
}

const TRUST_TILES = [
  { metric: "47%", label: "Avg savings off face balance", body: "Across recent settlement programs, total payback lands roughly half of the original combined balance." },
  { metric: "11 mo", label: "Avg program timeline", body: "Most settlement and restructure programs close inside a year, with longer cases on heavier stacks." },
  { metric: "50", label: "States with coordinated counsel", body: "When COJs, account freezes, or active litigation are in play, we coordinate licensed attorneys in your state." },
];

const VALUE_PROPS = [
  { n: "01", title: "Cash flow first.", body: "Daily MCA debits pause via formal reconciliation, often within 2 to 4 weeks of starting. The cash that was leaving your account stays with the business." },
  { n: "02", title: "Resolve in 6 to 18 months.", body: "Most settlement programs close inside a year. Restructure programs run 12 to 18 months with a single monthly payment instead of daily debits." },
  { n: "03", title: "Real attorney coordination.", body: "When COJ filings, account freezes, or active litigation are in play, we coordinate licensed counsel in your state within 72 hours." },
];

export default async function LandingByIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lp = LP_CONFIGS[id];
  if (!lp) notFound();

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
              {lp.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-slate leading-[1.05] tracking-tighter">
              {lp.headlineLead} <span className="text-electric">{lp.headlineAccent}</span> {lp.headlineTail}
            </h1>
            <p className="mt-5 text-lg text-muted max-w-xl leading-relaxed">{lp.subline}</p>
            <ul className="mt-6 space-y-2.5 text-base">
              {lp.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-slate">
                  <svg className="w-5 h-5 mt-0.5 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:sticky lg:top-6">
            <LeadForm source={lp.source} />
            <p className="mt-3 text-xs text-muted text-center">
              By submitting, you consent to TerraDebt contacting you. See our <Link href="/privacy" className="underline">Privacy Policy</Link>.
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
            {VALUE_PROPS.map((p) => (
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

      {/* Trust tiles */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <Reveal>
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">By the numbers</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Specific outcomes, not theatrics.</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {TRUST_TILES.map((t, i) => (
              <Reveal key={t.metric} delay={i * 0.04}>
                <div className="surface-card p-7 h-full">
                  <div className="font-mono text-4xl md:text-5xl font-bold text-electric tracking-tight">{t.metric}</div>
                  <div className="mt-3 text-sm font-semibold text-slate">{t.label}</div>
                  <div className="mt-2 text-xs text-muted leading-relaxed">{t.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate text-white">
        <div className="mx-auto max-w-content px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Get out from under stacked MCAs.</h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">Free assessment. No commitment.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#top" className="bg-electric text-white px-6 py-3 rounded-xl text-sm font-medium no-underline hover:opacity-90 transition">
              {lp.ctaPrimary}
            </a>
          </div>
          <p className="mt-6 text-xs text-white/50 font-mono uppercase tracking-wider">{lp.trustLine}</p>
        </div>
      </section>

      {/* Disclosure */}
      <section className="bg-offwhite border-t border-border">
        <div className="mx-auto max-w-content px-6 py-10 text-xs text-muted leading-relaxed">
          <p>
            <span className="font-mono uppercase tracking-wider text-slate">Disclosure.</span>{" "}
            TerraDebt is a trade name of GRL Recovery LLC. We are not a law firm and do not provide legal advice. When legal defense is required, we coordinate licensed attorneys in your state. Outcomes vary based on lender mix, contract terms, default status, and other factors. Programs typically resolve in 6 to 18 months. Settlement may impact your business credit profile.
          </p>
        </div>
      </section>
    </article>
  );
}
