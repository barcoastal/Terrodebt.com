import Link from "next/link";
import type { Metadata } from "next";
import { AprCalculator } from "@/components/tools/AprCalculator";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/apr-calculator" },
  title: { absolute: "MCA APR Calculator: Payment Schedule & Fees | BDI" },
  description: "Estimate MCA financing cost using net proceeds, upfront fees, and equal daily or weekly payments. Compare estimated APR with simple annualized cost. No signup.",
};
const faq = [
  { q: "Is a factor rate the same as APR?", a: "No. A factor rate describes total payback relative to the advance. APR also depends on when payments occur and which fees reduce the amount received. The same factor rate can produce different annualized costs." },
  { q: "Does this calculator handle weekdays-only MCA withdrawals?", a: "No. Daily means every calendar day, and weekly means every seven calendar days. Use an actual dated cash-flow calculation for business-day withdrawals, holidays, irregular amounts, or reconciliation changes." },
  { q: "Is this the APR required on a financing disclosure?", a: "No. This is an educational estimate for a specified equal-payment model. A required disclosure can use jurisdiction-specific definitions, fee treatment, and timing assumptions. Compare it with the provider’s disclosure and the signed agreement." },
];
export default function AprCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <FaqJsonLd items={faq} />
      <header className="max-w-3xl">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">Free tool · Updated October 10, 2026</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">MCA APR calculator</h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">Estimate annualized financing cost from the cash you receive and the schedule you pay. Include upfront fees and compare the result with the factor rate. No email or signup required.</p>
      </header>
      <div className="mt-12"><AprCalculator /></div>
      <section className="mt-12 max-w-3xl space-y-5 leading-relaxed" aria-labelledby="methodology">
        <h2 id="methodology" className="text-3xl font-bold">How the calculation works</h2>
        <p>The model receives the net advance on day zero and makes equal payments at the end of each period. It solves for the rate that makes the present value of those payments equal the net proceeds.</p>
        <p className="border border-hairline bg-paper-mute p-4 font-mono text-sm break-words">Net proceeds = Σ payment ÷ (1 + period rate)^k, for k = 1 through number of payments.</p>
        <p>Estimated APR = period rate × (365 ÷ days per period). Effective annual rate = (1 + period rate)^(365 ÷ days per period) − 1. Multiply either result by 100 to express a percentage.</p>
        <h3 className="text-xl font-bold">A simple check you can reproduce</h3>
        <p>Receive $1,000 and pay $1,100 once, seven days later, with no upfront fee. The weekly rate is 10%; the model’s annualized APR is 10% × 365 ÷ 7 = 521.4%. This annualization does not mean you actually pay $5,214 in fees: the financing cost in this one-week example is $100.</p>
        <h3 className="text-xl font-bold">Assumptions and limits</h3>
        <p>This tool assumes a single advance, equal payments, and a full period before the first payment. It excludes business-day adjustments, holidays, additional advances, missed-payment fees, variable receipts, and reconciliation changes. It does not support a refinance in which part of the advance pays an old balance. Actual dated cash flows and contract-specific charges require a separate calculation.</p>
        <p>The <a className="underline text-pine" href="https://www.consumerfinance.gov/rules-policy/regulations/1026/interp-22/">CFPB’s APR commentary</a> explains the actuarial approach and points to Appendix J for equations. That consumer-credit reference is mathematical background, not a claim that its rules apply to every commercial MCA. For commercial disclosure context, see the <a className="underline text-pine" href="https://dfpi.ca.gov/regulated-industries/california-financing-law/about-california-financing-law/california-financing-law-commercial-financing-disclosures/">California DFPI commercial financing disclosure resource</a>.</p>
        <p>Pair this estimate with our <Link href="/lenders" className="underline text-pine">lender research</Link> and <Link href="/tools/stack-calculator" className="underline text-pine">stack calculator</Link> to review both financing cost and overlapping cash demands.</p>
      </section>
      <section className="mt-12 max-w-3xl"><h2 className="text-3xl font-bold">Frequently asked questions</h2><dl className="mt-5 divide-y divide-hairline">{faq.map(({ q, a }) => <div key={q} className="py-5"><dt className="text-lg font-semibold">{q}</dt><dd className="mt-3 leading-relaxed">{a}</dd></div>)}</dl></section>
    </article>
  );
}
