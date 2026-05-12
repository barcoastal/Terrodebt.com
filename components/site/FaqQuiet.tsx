const FAQ = [
  {
    q: "What kinds of business debt do you work with?",
    a: "Six product categories: merchant cash advances (MCA), SBA loans (7(a), 504, EIDL), equipment finance and leases, vendor and supplier trade debt, bank term loans and lines of credit, and IRS or state business tax debt. Most cases involve more than one product.",
  },
  {
    q: "How long does a typical program take?",
    a: "Most programs run 6 to 18 months. Equipment workouts can close in 30 to 120 days. MCA programs typically take 8 to 16 months. SBA modifications run 60 to 180 days. Offer in compromise on tax debt takes 6 to 12 months. We give you a target timeline at intake and update it as the work progresses.",
  },
  {
    q: "Will this hurt my personal credit?",
    a: "It depends on the product. MCAs are commercial contracts and most do not report to consumer credit. SBA loans and bank loans usually have personal guarantees that can affect personal credit if charged off. Equipment leases vary. Tax debt can attach personally through federal tax liens or Trust Fund Recovery Penalty. We map the personal exposure at intake.",
  },
  {
    q: "Are you a law firm?",
    a: "No. TerraDebt is a debt restructure firm. We coordinate licensed attorneys in your state when legal defense is required. We are not authorized to give legal advice on our own and we do not pretend to be a law firm.",
  },
  {
    q: "How is TerraDebt different from a consumer debt relief company?",
    a: "Consumer debt relief works on credit cards, medical bills, and personal loans under consumer credit law. TerraDebt works on commercial debt: MCAs, SBA, equipment, vendor, bank, and tax debt against the business entity. The legal frameworks, the lenders, and the workout playbooks are entirely different.",
  },
  {
    q: "What states do you serve?",
    a: "Workout coordination is not jurisdiction-bound. We work with merchants across all 50 states. For legal defense, we coordinate licensed counsel in the relevant filing state, typically within 72 hours of an emergency intake.",
  },
  {
    q: "Do you charge upfront fees?",
    a: "Engagement terms and fees are discussed in your consultation, after we have reviewed the documents and the lender or creditor mix. We tell you the full fee structure before you sign anything. We do not publish a fee schedule before we understand your situation.",
  },
  {
    q: "Can I keep operating during the program?",
    a: "Yes. The whole point of the program is to keep the business operating while the debt is restructured. Reconciliation pauses MCA daily debits. Forbearance protects bank covenants. Installment agreements pause tax levies. The program is designed so you can keep running the operation while we work the lender side.",
  },
];

export function FaqQuiet() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <div className="border-b border-rule pb-5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Answers</span>
          <h2 className="mt-2 font-serif-tight font-bold text-slate text-3xl md:text-4xl leading-tight">
            Common questions, briefly.
          </h2>
        </div>

        <div className="divide-y divide-rule">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-6 text-base md:text-lg font-medium text-slate">
                <span className="font-serif text-lg md:text-xl leading-snug">{item.q}</span>
                <span className="text-muted text-xl group-open:rotate-45 transition-transform duration-200 leading-none flex-shrink-0 mt-1">+</span>
              </summary>
              <p className="mt-3 text-sm md:text-base text-muted leading-relaxed pr-10">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
