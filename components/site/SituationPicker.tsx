import Link from "next/link";

const SITUATIONS = [
  { trigger: "I'm stacked on multiple MCAs.", topic: "MCA Debt Relief", slug: "mca-debt-relief" },
  { trigger: "I'm behind on an SBA loan.", topic: "SBA Loan Modification", slug: "sba-loan-modification" },
  { trigger: "Equipment lessor is threatening repossession.", topic: "Equipment Finance Restructure", slug: "equipment-finance-restructure" },
  { trigger: "Vendors are putting me on COD.", topic: "Vendor & Supplier Debt", slug: "vendor-supplier-debt" },
  { trigger: "My bank loan is in default or covenant violation.", topic: "Bank Loan Workouts", slug: "bank-loan-workout" },
  { trigger: "I have IRS or state tax debt.", topic: "Business Tax Debt", slug: "business-tax-debt" },
];

export function SituationPicker() {
  return (
    <section className="bg-offwhite border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
          Pick by situation
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter text-slate leading-tight max-w-2xl">
          What does your situation look like?
        </h2>
        <p className="mt-4 text-muted max-w-2xl">
          The fastest way to the relevant content. Each path opens a topic guide with the contract patterns, lender behavior, and program options for that situation.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
          {SITUATIONS.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group grid grid-cols-[1fr_auto] gap-4 items-baseline border-t border-rule pt-4 pb-1 no-underline text-slate hover:text-electric transition"
            >
              <span className="text-base leading-snug">
                {s.trigger}
                <span className="block font-mono text-[11px] uppercase tracking-wider text-muted group-hover:text-electric transition mt-1">
                  {s.topic}
                </span>
              </span>
              <span className="text-muted group-hover:text-electric transition self-center" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
