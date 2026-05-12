import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/product-content";

export const metadata: Metadata = {
  title: "Coverage | TerraDebt",
  description:
    "Six coverage areas for resolving business debt: MCA, SBA, equipment finance, vendor, bank, and tax debt. Coordinated workouts across the full stack.",
};

export default function ServicesIndex() {
  const groups = groupByCategory(PRODUCTS);

  return (
    <article>
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-14 md:py-20">
          <span className="font-mono text-[11px] uppercase tracking-wider text-electric">Coverage</span>
          <h1 className="mt-4 font-bold tracking-tighter text-slate text-5xl md:text-6xl lg:text-7xl leading-[1.04] max-w-4xl">
            Six coverage areas. One coordinated team.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            We restructure, settle, and defend business debt across MCAs, SBA loans, equipment finance, vendor debt, bank loans, and IRS or state tax debt. Each area gets its own guide.
          </p>
        </div>
      </section>

      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-16 space-y-16">
          {groups.map((g) => (
            <div key={g.category}>
              <div className="flex items-baseline gap-4 flex-wrap border-b border-rule pb-4">
                <h2 className="font-bold tracking-tighter text-slate text-2xl md:text-3xl leading-tight">{g.category}</h2>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {g.items.length} area{g.items.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="mt-8 grid md:grid-cols-2 gap-px bg-rule border border-rule">
                {g.items.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/services/${p.slug}`}
                    className="bg-offwhite hover:bg-cream p-7 md:p-8 no-underline block transition-colors"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        {p.shortName}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-electric">
                        Read more →
                      </span>
                    </div>
                    <h3 className="mt-3 font-semibold tracking-tight text-slate text-xl md:text-2xl leading-snug">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-muted leading-relaxed text-sm">
                      {p.metaDescription}
                    </p>
                    <div className="mt-6 pt-5 border-t border-rule grid grid-cols-3 gap-3">
                      {p.stats.map((s) => (
                        <div key={s.label}>
                          <div className="font-mono text-base font-bold text-slate tracking-tight">
                            {s.value}
                          </div>
                          <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted leading-snug">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-rule">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">How we work</span>
            <h2 className="mt-3 font-bold tracking-tighter text-slate text-3xl md:text-4xl leading-tight">
              Most cases use more than one product.
            </h2>
          </div>
          <div className="md:col-span-2 space-y-4 text-slate leading-relaxed">
            <p>
              Business debt rarely shows up in one neat category. A trucking operator might have stacked MCAs, an SBA loan that funded the fleet, and equipment leases on two trailers. A restaurant group might have vendor debt, equipment leases on the kitchen, and a bank LOC with a covenant violation.
            </p>
            <p>
              We work across all six coverage areas because most cases need more than one. The intake assessment maps every obligation, identifies cross-default and lien exposure, and sequences the workouts in the order that protects operations and maximizes negotiation leverage.
            </p>
            <p>
              The free calculators are MCA-specific because effective APR is the single hardest number to compute on a merchant cash advance. Other product categories have simpler math, but the assessment is the place to evaluate the full picture.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite border-t border-rule">
        <div className="mx-auto max-w-content px-6 py-12 text-xs text-muted leading-relaxed">
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
