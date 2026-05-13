import Link from "next/link";
import { PRODUCTS } from "@/lib/product-content";

// Short, plain deks. Brand voice: direct, specific. No em dashes. No exclamations. No "firm".
const DEKS: Record<string, string> = {
  "mca-debt-relief":
    "Pause daily debits, settle stacked advances, defend COJs.",
  "sba-loan-modification":
    "Modify SBA terms before acceleration. Coordinate with your lender's special assets group.",
  "equipment-finance-restructure":
    "Renegotiate leases and equipment loans before repo or default.",
  "vendor-supplier-debt":
    "Resolve aged vendor balances without losing the supply chain.",
  "bank-loan-workout":
    "Workouts on business term loans and lines of credit.",
  "business-tax-debt":
    "Resolve IRS and state tax debt before liens or levies hit.",
};

export function CoverageBlock() {
  return (
    <section className="bg-offwhite border-t border-rule">
      <div className="mx-auto max-w-content px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6 items-stretch">
          {/* Left: oversized green anchor block */}
          <div className="md:col-span-3 bg-electric text-white p-6 md:p-8 flex flex-col justify-between min-h-[280px] md:min-h-0">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/80">
              Coverage
            </div>
            <div>
              <div className="font-mono text-4xl md:text-5xl font-bold tracking-tighter text-white">
                01 / 06
              </div>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-white/80 max-w-[12rem]">
                Six debt categories. One coordinated team.
              </div>
            </div>
          </div>

          {/* Right: 2x3 grid of product cards */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 -mt-px md:mt-0 md:-ml-px">
            {PRODUCTS.map((p, idx) => (
              <Link
                key={p.slug}
                href={`/services/${p.slug}`}
                className="group bg-offwhite hover:bg-slate transition-colors border border-rule -ml-px -mt-px md:ml-0 md:mt-0 md:border-l md:border-t p-6 md:p-7 flex flex-col justify-between min-h-[200px] no-underline"
                style={{
                  // Overlap borders so we get one shared hairline grid look
                  marginLeft: "-1px",
                  marginTop: "-1px",
                }}
              >
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted group-hover:text-white/60 transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted group-hover:text-white/60 transition-colors">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate group-hover:text-white transition-colors">
                    {p.shortName}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted group-hover:text-white/80 transition-colors">
                    {DEKS[p.slug] ?? p.subline.split(". ")[0] + "."}
                  </p>
                </div>
                <div className="mt-6 font-mono text-[11px] uppercase tracking-wider text-slate group-hover:text-electric-soft transition-colors inline-flex items-center gap-1.5">
                  Read coverage
                  <span aria-hidden>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
