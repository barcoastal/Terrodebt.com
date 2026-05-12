import Link from "next/link";
import { PRODUCTS } from "@/lib/product-content";

const TOPIC_DESCRIPTIONS: Record<string, string> = {
  "mca-debt-relief":
    "Settlement, restructure, reverse consolidation defense, and emergency legal coordination on stacked merchant cash advances.",
  "sba-loan-modification":
    "Hardship modifications, offer in compromise, and structured workouts on 7(a), 504, and EIDL loans.",
  "equipment-finance-restructure":
    "Term extensions, buyout negotiation, lease modifications, and acceleration defense before the repo truck arrives.",
  "vendor-supplier-debt":
    "Coordinated paydowns and settlements with trade creditors. Resolve the debt without breaking the supply chain.",
  "bank-loan-workout":
    "Forbearance, covenant waivers, and modifications with the bank's special assets group.",
  "business-tax-debt":
    "Installment agreements, offer in compromise, and Trust Fund Recovery Penalty defense with the IRS and state.",
};

export function TopicAreas() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <div className="flex items-end justify-between gap-6 border-b border-rule pb-5">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Coverage</span>
            <h2 className="mt-2 font-bold tracking-tighter text-slate text-3xl md:text-4xl leading-tight">
              What we work on
            </h2>
          </div>
          <Link href="/services" className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline whitespace-nowrap">
            View all →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule auto-rows-fr">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/services/${p.slug}`}
              className="group bg-offwhite hover:bg-cream p-7 md:p-8 flex flex-col h-full no-underline transition-colors"
            >
              <h3 className="font-semibold tracking-tight text-slate text-xl md:text-2xl leading-snug">
                {p.shortName}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {TOPIC_DESCRIPTIONS[p.slug] ?? p.subline}
              </p>
              <span className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-wider text-electric">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
