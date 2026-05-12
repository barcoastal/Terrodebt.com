import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/product-content";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Business Debt Restructure Services | TerraDebt",
  description:
    "Six product categories for resolving business debt: MCA, SBA, equipment finance, vendor, bank, and tax debt. Tailored programs and real attorney coordination.",
};

export default function ServicesIndex() {
  const groups = groupByCategory(PRODUCTS);

  return (
    <article>
      {/* Hero */}
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 py-20 md:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-white border border-border text-slate text-xs font-medium px-3 py-1.5 rounded-full shadow-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
              Business debt restructure services
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] max-w-4xl">
              Six product categories. <span className="text-electric">One coordinated team.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              We restructure, settle, and defend business debt across MCAs, SBA loans, equipment finance, vendor debt, bank loans, and IRS or state tax debt. Free assessment scoped to your specific situation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-started"
                className="bg-slate text-white px-5 py-3 rounded-xl text-sm font-medium no-underline hover:bg-slate-soft transition inline-flex items-center gap-2"
              >
                Free assessment <span aria-hidden>→</span>
              </Link>
              <Link
                href="/tools"
                className="bg-white text-slate border border-border px-5 py-3 rounded-xl text-sm font-medium no-underline hover:border-electric transition"
              >
                Run the free calculators
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* All products as cards grouped by category */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20 space-y-16">
          {groups.map((g, gi) => (
            <div key={g.category}>
              <Reveal>
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="font-mono text-xs uppercase tracking-wider text-electric">
                    Category {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{g.category}</h2>
                  <span className="text-sm text-muted">
                    {g.items.length} product{g.items.length > 1 ? "s" : ""}
                  </span>
                </div>
              </Reveal>
              <div className="mt-8 grid md:grid-cols-2 gap-5 auto-rows-fr">
                {g.items.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.05} className="h-full">
                    <Link
                      href={`/services/${p.slug}`}
                      className="surface-card p-7 h-full no-underline block transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] flex flex-col"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                          {p.shortName}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-electric">
                          View →
                        </span>
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate leading-snug">
                        {p.name}
                      </h3>
                      <p className="mt-3 text-muted leading-relaxed flex-1">
                        {p.metaDescription}
                      </p>
                      <div className="mt-6 pt-5 border-t border-border grid grid-cols-3 gap-3">
                        {p.stats.map((s) => (
                          <div key={s.label}>
                            <div className="font-mono text-base font-semibold text-electric tracking-tight">
                              {s.value}
                            </div>
                            <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted leading-snug">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Method note */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">How we work</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Most cases use more than one product.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="md:col-span-2 space-y-4 text-slate leading-relaxed">
              <p>
                Business debt rarely shows up in one neat category. A trucking operator might have stacked MCAs, an SBA loan that funded the fleet, and equipment leases on two trailers. A restaurant group might have vendor debt, equipment leases on the kitchen, and a bank LOC with a covenant violation.
              </p>
              <p>
                We work across all six product categories because most cases need more than one. The intake assessment maps every obligation, identifies cross-default and lien exposure, and sequences the workouts in the order that protects operations and maximizes negotiation leverage.
              </p>
              <p>
                The free calculators are MCA-specific because effective APR is the single hardest number to compute on a merchant cash advance. Other product categories have simpler math, but the assessment is the place to evaluate the full picture.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate text-white">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20 text-center">
          <span className="font-mono text-xs uppercase tracking-wider text-white/60">Ready when you are</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05]">
            Stop the daily pressure. <span className="text-electric">Restructure the debt.</span>
          </h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto leading-relaxed">
            MCA, SBA, equipment, vendor, bank, or tax debt. Free assessment, scoped to your situation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/get-started"
              className="bg-electric text-white px-6 py-3 rounded-xl text-sm font-semibold no-underline hover:opacity-90 transition shadow-[var(--shadow-glow)]"
            >
              Start my free assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="bg-offwhite border-t border-border">
        <div className="mx-auto max-w-content px-6 py-10 text-xs text-muted leading-relaxed">
          <p>
            <span className="font-mono uppercase tracking-wider text-slate">Disclosure.</span>{" "}
            TerraDebt is a trade name of GRL Recovery LLC. We are not a law firm and do not provide legal advice. When legal defense is required, we coordinate licensed attorneys in your state. Outcomes vary based on lender mix, contract terms, default status, and other factors. Programs typically resolve in 6 to 18 months.
          </p>
        </div>
      </section>
    </article>
  );
}

function groupByCategory(products: typeof PRODUCTS) {
  const order = ["Lender debt", "Trade debt", "Tax debt"];
  const map = new Map<string, typeof PRODUCTS>();
  for (const p of products) {
    if (!map.has(p.category)) map.set(p.category, []);
    map.get(p.category)!.push(p);
  }
  return order
    .filter((c) => map.has(c))
    .map((c) => ({ category: c, items: map.get(c)! }));
}
