export type GlossaryEntry = {
  term: string;
  slug: string;
  definition: string;
  related?: { label: string; href: string };
};

function toSlug(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const TERMS: Omit<GlossaryEntry, "slug">[] = [
  {
    term: "ACH debit",
    definition:
      "An electronic withdrawal pulled from a business bank account through the Automated Clearing House network. Most merchant cash advance lenders collect through daily ACH debits, which is the mechanism that makes stacked MCAs so cash-destructive.",
    related: { label: "MCA Debt Relief", href: "/services/creditor-liaison" },
  },
  {
    term: "Acceleration",
    definition:
      "When a lender declares the entire loan balance due immediately because of a default or covenant breach. Acceleration ends the original payment schedule and usually triggers collection or litigation if the merchant cannot satisfy the full balance.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Asset-based lending",
    definition:
      "A commercial loan secured by business assets such as accounts receivable, inventory, or equipment. Borrowing base calculations and reporting covenants are typical, and workouts often involve covenant restructure rather than principal reduction.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Bonding capacity",
    definition:
      "The total surety bond limit a contractor can carry, set by the surety based on financials, working capital, and credit. Tax liens, judgments, and unresolved trade debt all reduce bonding capacity, which is why construction workouts protect it carefully.",
    related: { label: "Construction industry", href: "/industries/construction" },
  },
  {
    term: "Cash advance",
    definition:
      "A purchase of future business receipts in exchange for an upfront lump sum. Merchant cash advances are not loans, which is why they are not bound by usury laws in most states and why daily debits can be enforced contractually.",
    related: { label: "MCA Debt Relief", href: "/services/creditor-liaison" },
  },
  {
    term: "Confession of Judgment (COJ)",
    definition:
      "A signed agreement allowing the lender to enter judgment against the merchant without filing a lawsuit. Once entered, a COJ can freeze accounts within hours. Most MCA contracts originated in New York or Florida include a COJ clause.",
    related: { label: "MCA Debt Relief", href: "/services/creditor-liaison" },
  },
  {
    term: "Covenant violation",
    definition:
      "A breach of a financial or reporting requirement inside a loan agreement. Common covenants cover debt service coverage ratio, working capital, leverage, and timely financial reporting. Violations trigger cure periods and special assets review.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Cross-collateralization",
    definition:
      "When collateral pledged for one loan also secures another loan at the same lender. A default on one contract can trigger acceleration across every cross-collateralized facility, which expands the lender's leverage during a workout.",
    related: { label: "Equipment Finance Restructure", href: "/services/creditor-liaison" },
  },
  {
    term: "Cross-default",
    definition:
      "A clause that treats a default on one obligation as an automatic default on others, even across separate lenders. Identifying every cross-default at intake is essential before any workout move is made.",
    related: { label: "Equipment Finance Restructure", href: "/services/creditor-liaison" },
  },
  {
    term: "Daily debit",
    definition:
      "A fixed dollar amount withdrawn from the merchant's account every business day, typical of MCAs. Stacked daily debits often exceed daily revenue, which is the immediate cause of most MCA workouts.",
    related: { label: "MCA Debt Relief", href: "/services/creditor-liaison" },
  },
  {
    term: "Deficiency claim",
    definition:
      "The remaining balance a lender pursues after collateral is repossessed and remarketed. Deficiency claims survive the repossession and are usually negotiable, especially on equipment that has lost value.",
    related: { label: "Equipment Finance Restructure", href: "/services/creditor-liaison" },
  },
  {
    term: "Factor rate",
    definition:
      "A multiplier applied to the advance amount that determines total payback on an MCA. A $100,000 advance at a 1.40 factor rate has a $140,000 payback. Factor rates do not reflect time, which is why effective APR matters more.",
    related: { label: "Effective APR", href: "/tools/apr-calculator" },
  },
  {
    term: "Factoring",
    definition:
      "Selling accounts receivable to a factor at a discount in exchange for immediate cash. Factor companies hold a senior lien on receivables, which has to be coordinated before any MCA reconciliation begins.",
    related: { label: "Trucking industry", href: "/industries/trucking" },
  },
  {
    term: "Forbearance",
    definition:
      "A formal agreement where the lender pauses remedies (acceleration, repossession, foreclosure) for a defined period while the merchant meets specific milestones. Forbearance buys time while a permanent modification is being structured.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Floor plan",
    definition:
      "Inventory financing used by dealers (auto, equipment, marine, RV) to finance units held for sale. Floor plan defaults can trigger audits and immediate inventory recall, which is more aggressive than standard equipment finance.",
    related: { label: "Equipment Finance Restructure", href: "/services/creditor-liaison" },
  },
  {
    term: "Hardship modification",
    definition:
      "A change to loan terms (rate, term, payment) granted because of documented financial hardship. Common on bank term debt, hardship modifications require a documented cause and a credible recovery pro forma.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Installment agreement",
    definition:
      "A monthly payment plan with the IRS or a state revenue department over 24 to 84 months. Installment agreements are the most common workout path for business tax debt between 25,000 and 250,000 dollars.",
    related: { label: "Business Tax Debt", href: "/services/creditor-liaison" },
  },
  {
    term: "Lien",
    definition:
      "A legal claim against property securing repayment of a debt. UCC liens cover business assets, mechanic's liens cover construction work, tax liens cover all assets of the debtor, and mortgage liens cover real estate.",
    related: { label: "UCC liens and account freezes", href: "/insights/ucc-liens-and-account-freezes" },
  },
  {
    term: "Mechanic's lien",
    definition:
      "A statutory lien filed by unpaid contractors, subs, or suppliers against the underlying project or property. Mechanic's liens cloud title and survive bankruptcy in many cases, which is why they are negotiated as part of any construction trade workout.",
    related: { label: "Vendor and Supplier Debt", href: "/services/creditor-liaison" },
  },
  {
    term: "Modification",
    definition:
      "A permanent change to loan terms documented through an amendment. Modifications can extend amortization, reduce rate, restructure payments, or release collateral. Different from forbearance, which is temporary.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Offer in Compromise (OIC)",
    definition:
      "A partial settlement of a tax debt when the merchant cannot reasonably pay the full balance. The IRS evaluates OIC against the reasonable collection potential standard.",
    related: { label: "Business Tax Debt", href: "/services/creditor-liaison" },
  },
  {
    term: "Personal guaranty",
    definition:
      "A signed promise by an individual to repay a business debt if the business defaults. Personal guarantees on MCAs, bank loans, equipment finance, and trade credit are common and a primary risk in any workout.",
    related: { label: "MCA Debt Relief", href: "/services/creditor-liaison" },
  },
  {
    term: "Reconciliation",
    definition:
      "A contractual right in most MCA agreements that recalculates the daily debit based on actual revenue. Formal reconciliation requests pause damaging daily debits while the broader workout is negotiated.",
    related: { label: "When to pause MCA debits", href: "/insights/when-to-pause-mca-debits" },
  },
  {
    term: "Reverse consolidation",
    definition:
      "An advance stacked on top of existing MCAs that pays the daily debits on the underlying advances rather than retiring them. Total payback usually grows. Most reverse consolidations make the case worse, not better.",
    related: { label: "What is reverse consolidation", href: "/insights/what-is-reverse-consolidation" },
  },
  {
    term: "Settlement",
    definition:
      "A negotiated lump sum payoff for less than the full face balance. MCA settlements typically close at 40 to 60 cents on the dollar. Trade debt settlements typically close at 60 to 85 cents because the supplier relationship matters.",
    related: { label: "MCA settlement vs restructure", href: "/insights/mca-settlement-vs-restructure" },
  },
  {
    term: "Special assets",
    definition:
      "The internal workout group at a commercial bank that handles troubled loans. Special assets is different from the originating relationship manager and is more focused on documentation and metrics than relationship continuity.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Stacking",
    definition:
      "Taking a new MCA while older MCAs are still active. Stacking is the pattern that turns a manageable advance into an unmanageable debt load. Most cases on our desk have three to six stacked advances.",
    related: { label: "How to handle stacked MCAs", href: "/insights/how-to-handle-stacked-mcas" },
  },
  {
    term: "Trust Fund Recovery Penalty (TFRP)",
    definition:
      "Personal liability assessed by the IRS against responsible parties (owners, officers, sometimes employees) for unpaid employee withholding taxes. TFRP pierces the corporate veil and survives the dissolution of the business.",
    related: { label: "Business Tax Debt", href: "/services/creditor-liaison" },
  },
  {
    term: "UCC filing",
    definition:
      "A Uniform Commercial Code financing statement filed with the secretary of state to perfect a lender's security interest in business assets. UCC-1 filings give the lender repossession and enforcement rights without court action in most states.",
    related: { label: "UCC liens and account freezes", href: "/insights/ucc-liens-and-account-freezes" },
  },
  {
    term: "Workout",
    definition:
      "A broad term for any negotiated change to debt terms intended to keep the business operating and the lender paid. Workouts cover modifications, forbearance, settlement, restructure, and combinations of all of them.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Currently Not Collectible (CNC)",
    definition:
      "An IRS status that pauses active collection because the taxpayer cannot pay any meaningful amount. CNC does not write off the debt. It is most useful as a bridge while the merchant builds toward an installment agreement or OIC.",
    related: { label: "Business Tax Debt", href: "/services/creditor-liaison" },
  },
  {
    term: "Acceleration notice",
    definition:
      "A written notice from the lender declaring the loan accelerated and the full balance due. Once acceleration is declared, the lender can pursue collection, repossession, or foreclosure subject to the cure period in the loan documents.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Effective APR",
    definition:
      "The true annualized cost of borrowing including all fees and the actual repayment timing. MCAs disclosed as a 1.40 factor rate often translate to 60 to 120 percent effective APR depending on the term length.",
    related: { label: "Effective APR Calculator", href: "/tools/apr-calculator" },
  },
  {
    term: "Levy",
    definition:
      "A seizure of property to satisfy a tax debt. The IRS can levy bank accounts and accounts receivable 30 days after the final notice. State revenue departments have similar tools, though procedures vary.",
    related: { label: "Business Tax Debt", href: "/services/creditor-liaison" },
  },
  {
    term: "Charge-off",
    definition:
      "When a lender removes a defaulted loan from active receivables and books a loss. Charge-off does not extinguish the debt. The balance is usually sold to a debt buyer or assigned to collections.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Covenant waiver",
    definition:
      "A formal agreement where the lender waives a covenant violation for a defined period, usually in exchange for a fee and ongoing reporting. Waivers typically run 6 to 12 months and provide breathing room for the merchant.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Net 30",
    definition:
      "Standard trade credit terms requiring payment within 30 days of invoice. When trade debt slips past 30 days, vendors often move the merchant to COD and start reporting to trade credit agencies.",
    related: { label: "Vendor and Supplier Debt", href: "/services/creditor-liaison" },
  },
  {
    term: "COD (Cash on Delivery)",
    definition:
      "Terms requiring payment at the time of delivery rather than on credit. Vendors move stressed accounts to COD when invoices age past terms. Restoring credit terms is often a workout goal alongside debt resolution.",
    related: { label: "Vendor and Supplier Debt", href: "/services/creditor-liaison" },
  },
  {
    term: "Retainage",
    definition:
      "A percentage of a construction contract held back by the general contractor or owner until project completion. Delayed retainage payments are a common cause of trade debt at subcontractors.",
    related: { label: "Construction industry", href: "/industries/construction" },
  },
  {
    term: "Frozen account",
    definition:
      "A bank account locked by a lender or court order, usually following a COJ or levy. Once frozen, the merchant cannot pay payroll, vendors, or operating expenses from that account until the freeze is lifted.",
    related: { label: "UCC liens and account freezes", href: "/insights/ucc-liens-and-account-freezes" },
  },
  {
    term: "Note sale",
    definition:
      "When a bank or lender sells a defaulted loan to a third party (specialty finance, distressed debt fund, or another bank). The new note holder often has more flexibility to negotiate than the original lender.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
  {
    term: "Deposit account offset",
    definition:
      "The bank's contractual right to apply funds in deposit accounts at the same bank against a defaulted loan. Offset can drain operating cash overnight, which is why deposit relocation is sometimes part of the workout.",
    related: { label: "Bank Loan Workouts", href: "/services/creditor-liaison" },
  },
];

export const GLOSSARY: GlossaryEntry[] = TERMS.map((t) => ({
  ...t,
  slug: toSlug(t.term),
})).sort((a, b) => a.term.localeCompare(b.term));

export function getGlossaryByLetter(): Record<string, GlossaryEntry[]> {
  const grouped: Record<string, GlossaryEntry[]> = {};
  for (const entry of GLOSSARY) {
    const letter = entry.term.charAt(0).toUpperCase();
    const key = /[A-Z]/.test(letter) ? letter : "#";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(entry);
  }
  return grouped;
}

export function getLetters(): string[] {
  return Array.from(new Set(GLOSSARY.map((e) => {
    const l = e.term.charAt(0).toUpperCase();
    return /[A-Z]/.test(l) ? l : "#";
  }))).sort();
}
