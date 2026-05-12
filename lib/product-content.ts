export type ProductContent = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  headline: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTail: string;
  subline: string;
  bullets: string[];
  whatItIs: string;
  whoItFits: string[];
  whoItDoesntFit: string[];
  methods: { title: string; body: string }[];
  scenario: string;
  pitfalls: string;
  stats: { label: string; value: string }[];
  faq: { q: string; a: string }[];
};

export const PRODUCTS: ProductContent[] = [
  {
    slug: "mca-debt-relief",
    name: "MCA Debt Relief",
    shortName: "MCA Debt",
    category: "Lender debt",
    metaTitle: "MCA Debt Relief Services | TerraDebt",
    metaDescription:
      "Restructure, settle, or defend stacked merchant cash advances. Reconciliation, legal coordination, and counsel in all 50 states. Free assessment.",
    heroEyebrow: "MCA debt relief",
    headline: "Don't let stacked MCAs run your cash flow.",
    headlineLead: "Don't let stacked MCAs run your",
    headlineAccent: "cash flow",
    headlineTail: ".",
    subline:
      "We restructure, settle, or defend merchant cash advance debt with programs scoped to your specific situation. Free assessment and licensed counsel in all 50 states.",
    bullets: [
      "Pause daily debits via formal reconciliation",
      "Settle balances down 40 to 60 percent on qualifying contracts",
      "Restructure terms when settlement is not the right path",
      "72-hour legal response for COJ filings and frozen accounts",
    ],
    whatItIs: `MCA debt relief is the structured process of restoring cash flow to a business that has stacked one or more merchant cash advances. It is not a single product. It is a set of tools, applied in the right order, to a specific lender mix and contract pattern.

Our work has three primary outcomes. We pause damaging daily debits via formal reconciliation language in the existing contracts. We reduce or restructure the underlying debt through negotiated settlements or amended terms. And when legal pressure is already in play, we coordinate licensed counsel within 72 hours so the defense and the workout run in parallel.

The exact mix depends on three things. Where you are in the lender's escalation cycle, whether legal action has been filed, and what your lender stack looks like. A merchant who is still current with two advances and a 1.35 factor is in a different position than a merchant with five advances, a COJ filing, and a frozen operating account. The program is scoped to the situation, not pulled from a template.

Most MCA programs run 6 to 18 months from intake to closeout. Settlement programs trend faster, restructure programs run longer because terms are renegotiated rather than discounted. We tell you a target timeline at intake and update it as the program moves.`,
    whoItFits: [
      "Daily MCA debits are eating into payroll, fuel, inventory, or other essential operating expenses",
      "You have stacked two or more advances and the pattern is getting worse, not better",
      "You have considered a reverse consolidation and want a real opinion before signing",
      "You are receiving aggressive collection contact, COJ threats, or account freezes",
      "You feel locked into a borrowing cycle and cannot see the exit",
      "A confession of judgment has already been filed or your account has been frozen",
      "You have a personal guarantee on one or more advances and want a clean release",
    ],
    whoItDoesntFit: [
      "You have a single MCA that is current and affordable, with no stacking pattern",
      "You are trying to walk away from the business entirely with no resolution",
      "Total MCA exposure is under $25,000 (consider handling the lender directly)",
      "You are already in active bankruptcy proceedings (consult counsel separately)",
    ],
    methods: [
      {
        title: "Settlement",
        body: "Negotiated lump sum payoff per lender, typically 40 to 60 percent of the face balance. Daily debits pause through formal reconciliation. The cash that was leaving your accounts accrues into a TerraDebt-managed escrow. We engage every lender in parallel, audit each contract for stacking violations and procedural defects, and disburse from escrow as settlements close.",
      },
      {
        title: "Restructure",
        body: "Renegotiate terms and daily debits with each lender without settling. We collect every active contract, map your total daily debit and effective APR per advance, and secure extended terms, lower daily debits, or modified payment structures per lender. The result is a single manageable monthly schedule that fits real cash flow.",
      },
      {
        title: "Reverse consolidation defense",
        body: "If you are already in a reverse consolidation that increased your total stack, we audit the consolidation contract for breach and unwind opportunities, engage the underlying MCA holders directly, and rebuild a real settlement or restructure plan around your actual debt rather than the consolidated number.",
      },
      {
        title: "Legal defense",
        body: "When a confession of judgment is filed, an account is frozen, or a UCC enforcement action lands, hours matter. We coordinate licensed counsel in the filing state within 72 hours, file motions to vacate where applicable, and negotiate settlement in parallel with litigation. Emergency intake is available 24/7 for active enforcement.",
      },
    ],
    scenario: `A 14-truck regional dry van carrier in the Southeast had stacked 7 MCAs over 14 months. Combined face balance was $612,000 across the active advances. The trigger event was a transmission failure on the carrier's most reliable lane truck, which started a $45,000 advance. Fuel volatility and a broker who slow-paid by 70 days on a $200,000 receivable drove the remaining six advances onto the stack.

By the time the carrier reached us, the combined daily debit total was $4,800. A factor relationship was active with $180,000 outstanding on receivable advances. Two of the MCA lenders had threatened COJ filings.

We coordinated with the factor first to protect the senior lien on receivables. Reconciliation requests went to all 7 MCA lenders in parallel. We negotiated settlement on 5 advances and a restructure on 2. The first settlement closed in month 3 at 38 cents on the dollar. The largest advance settled in month 9 at 44 cents. Total payback came in at $355,000 against $612,000 face. The single restructure became a $14,000 monthly payment instead of $4,800 daily debits. The program closed in 11 months with the factor relationship intact and two new tractors added in month 13.`,
    pitfalls: `MCA cases come with a set of recurring risks that the operator should understand before starting a program.

**Confession of judgment filings.** Most large MCA funders are domiciled in New York and Florida and many file confessions of judgment as a routine collection step. A COJ can freeze a bank account in any state within hours. The program has to monitor active filings and respond within 72 hours when one lands.

**Account freezes and UCC enforcement.** UCC-1 filings give the lender enforcement rights on receivables. A lender that records a UCC lien and then triggers an enforcement action can freeze the operating account. Coordination with counsel before the freeze is preferable, but emergency intake handles it when the timing has run.

**Reverse consolidation traps.** A reverse consolidation usually stacks a new advance on top of the existing ones without resolving the underlying balances. Total payback grows, the daily debit moves to a longer term, and the merchant ends up with N+1 lenders rather than the consolidation they were sold. If you have been pitched a reverse consolidation, run the numbers before signing.

**Personal guarantee exposure.** Most MCA contracts include a personal guarantee from the operator. A settlement releases the guarantee, but only if the closeout documentation is complete and the lender's release language is clean. We review every closeout document before signing.

**Cross-default with equipment and bank debt.** MCA defaults can trigger cross-default clauses on equipment leases or bank loans. The program has to identify these clauses at intake and sequence the work around them.`,
    stats: [
      { label: "Avg savings on settlements", value: "47%" },
      { label: "Avg program timeline", value: "11 mo" },
      { label: "Programs across", value: "$25K-$5M+" },
    ],
    faq: [
      {
        q: "How long does an MCA program take?",
        a: "Most MCA programs run 8 to 16 months. Settlement programs typically resolve faster, restructure programs trail longer because terms are renegotiated rather than discounted. We give you a target timeline at intake and update it as the program moves.",
      },
      {
        q: "Will this hurt my business or personal credit?",
        a: "MCAs are commercial contracts and most do not report to consumer credit. Business credit can take a temporary hit during settlement, then rebuilds quickly once balances are resolved and cash flow is restored. Personal guarantees release with clean closeout language on each settled contract.",
      },
      {
        q: "What if a COJ has already been filed against me?",
        a: "COJ filings are common in our intake. We coordinate licensed counsel in the filing state within 72 hours and run the legal defense in parallel with the broader workout. Motions to vacate are available in some jurisdictions and we evaluate that path at intake.",
      },
      {
        q: "Can I keep operating during the program?",
        a: "Operating is the entire point of the program. Reconciliation pauses the daily debits so the cash stays with the business. Vendor payments, payroll, and equipment payments stay current throughout. The program is built so you can keep running the operation while we work the lender side.",
      },
      {
        q: "What if I have a reverse consolidation already?",
        a: "Reverse consolidations are a recurring problem in MCA work. The consolidation usually layered a new advance on top of existing balances without resolving them. We audit the consolidation contract for breach opportunities, unwind where possible, and rebuild a real plan around the underlying advances.",
      },
      {
        q: "Can I add a new MCA during the program?",
        a: "We strongly discourage taking new MCAs while in a program. Stacking new advances on top of an active resolution undoes the work and signals bad faith to the lenders we are negotiating with.",
      },
      {
        q: "Do you publish your program fees?",
        a: "Engagement terms and program fees are discussed during your consultation, after we have reviewed the contracts and the lender mix. We tell you the full fee structure before you sign anything, but we do not publish a fee schedule before we understand your situation.",
      },
      {
        q: "What states do you serve?",
        a: "We coordinate licensed counsel in all 50 states for legal defense. The workout side of the program is not jurisdiction-bound, so MCA cases anywhere in the US are workable.",
      },
    ],
  },
  {
    slug: "sba-loan-modification",
    name: "SBA Loan Modification",
    shortName: "SBA",
    category: "Lender debt",
    metaTitle: "SBA Loan Modification & Workout Services | TerraDebt",
    metaDescription:
      "Workouts and modifications for SBA 7(a), 504, and EIDL loans in default or stretched. Hardship modifications, offer in compromise, and lender coordination.",
    heroEyebrow: "SBA workouts",
    headline: "Work with your SBA lender before acceleration.",
    headlineLead: "Work with your SBA lender",
    headlineAccent: "before acceleration",
    headlineTail: ".",
    subline:
      "Hardship modifications, offer in compromise, and structured workouts on SBA 7(a), 504, and EIDL loans. We package the documentation and coordinate the submission with the lender and the SBA.",
    bullets: [
      "Hardship modifications on 7(a), 504, and EIDL loans",
      "Offer in compromise packaging for distressed cases",
      "Coordination with the SBA lender and the SBA itself",
      "Personal guarantee protection where the math allows",
    ],
    whatItIs: `SBA loans (7(a), 504, EIDL) can be restructured when the business has genuine hardship. The SBA program is not a default-and-walk-away product. It is a workout-friendly framework, but the lender and the SBA require structured documentation to consider any modification.

Available modifications include rate reductions, term extensions, payment deferments, interest-only periods, and (in distressed cases) offer in compromise. Each path has specific qualification criteria and a specific documentation package. We coordinate the merchant's submission with the SBA lender, with the SBA itself when applicable, and with a CPA when the financials need to be reformatted for the workout package.

A typical SBA workout starts with hardship documentation. The lender wants to see a real hardship event (revenue drop, illness, partner exit, key customer loss) supported by tax returns, profit and loss, and a forward-looking pro forma showing how the modification will allow the business to stabilize and resume payments. With the right package, modifications are routinely accepted by SBA lenders, but the package has to be complete and the math has to work.

Offer in compromise (OIC) is the deepest workout option, available when the business cannot reasonably resume full payments and a partial settlement is in the SBA's interest. OIC is hardest to qualify for and takes the longest, but it can resolve a significant SBA balance for a fraction of face value when the math supports it.`,
    whoItFits: [
      "Two or more months delinquent on an SBA 7(a), 504, or EIDL loan",
      "A genuine hardship event has occurred (revenue drop, illness, partner exit, key customer loss)",
      "The business is still operational and you want to keep it going",
      "Collateral exposure or personal guarantee pursuit is a real concern",
      "You have received a 30, 60, or 90-day acceleration notice from the lender",
      "You want to restructure rather than liquidate or walk away",
    ],
    whoItDoesntFit: [
      "The SBA loan is current and the payments are affordable as written",
      "The business is already shutting down and an orderly wind-down is appropriate",
      "The guarantor has no income or assets at all (OIC math typically does not work)",
      "You are looking for a forgiveness program with no workout requirements",
    ],
    methods: [
      {
        title: "Hardship modification",
        body: "Rate reductions, term extensions, deferments, or interest-only periods. We package the hardship documentation (cause, duration, recovery plan) and submit to the SBA lender for consideration. Most lenders work with merchants who present a complete and credible package.",
      },
      {
        title: "Offer in compromise",
        body: "A partial settlement of the SBA debt when the business cannot reasonably resume full payments. OIC requires a financial disclosure package, asset documentation, and a pro forma showing why the partial settlement is in the SBA's interest. OIC takes 6 to 12 months and is reviewed by both the lender and the SBA.",
      },
      {
        title: "Structured workout",
        body: "A negotiated modification that goes beyond standard hardship terms, often used when the business has a credible recovery path that requires a multi-step plan. Structured workouts can include collateral substitution, partner contributions, or staged payment increases over 24 to 36 months.",
      },
      {
        title: "Lender renegotiation",
        body: "Direct renegotiation with the SBA lender on covenant terms, collateral release, or guaranty modifications. Some lenders are more flexible than others, and the merchant's history with the lender matters. We engage the special assets or workout group rather than the originating relationship manager.",
      },
    ],
    scenario: `A trucking operator in the Midwest had a $480,000 SBA 7(a) loan that funded fleet expansion in 2022. By early 2024 the operator was four months delinquent. A combination of fuel volatility, a key broker that paid 90 days late on a $250,000 receivable, and a transmission failure on the lead truck had drained the operating account. The lender had issued a 90-day acceleration notice and threatened to call the loan.

The operator had a real recovery path. The slow broker had finally paid. Two new dedicated lanes were starting in 60 days at better rates than the spot market. The math worked for a modified payment schedule, but the lender needed a documented hardship package to engage.

We packaged the hardship documentation, including the slow-paying broker letter, the maintenance invoice, two years of tax returns, a 24-month pro forma, and the new dedicated lane contracts. The submission went to the SBA lender's special assets group. After 60 days of review and back-and-forth, the lender approved a 12-month interest-only modification, followed by a permanent payment reduction of 22 percent for the remaining term. The personal guarantee stayed in place but acceleration was lifted.

The operator resumed payments under the modification, the dedicated lanes ran on schedule, and the loan is now performing under the modified terms.`,
    pitfalls: `SBA cases come with risks that are different from MCA work and require their own diligence.

**Personal guaranty pursuit by the SBA.** When an SBA loan defaults and is charged off, the SBA itself can pursue the personal guarantor for the unpaid balance through Treasury offset, federal lien filings, and other federal collection tools. This is more aggressive than what most commercial lenders can do on their own. The earlier the workout starts, the better the chance of preserving the guaranty.

**Lien priority issues.** SBA loans are usually secured by a blanket lien on business assets and often by a mortgage or junior lien on personal real estate. The lien priority becomes critical when other creditors (MCAs, equipment lenders, banks) are also in the picture. Workout sequence has to respect lien priority.

**EIDL specifics.** EIDL loans have unique features including the $200,000 personal guarantee threshold, collateral requirements above $25,000, and SBA-direct servicing rather than bank servicing. EIDL workouts go through the SBA itself, not through a bank lender, and the timing and process are different.

**Collateral seizure risk.** SBA lenders can pursue collateral, including real estate, equipment, and accounts receivable. The earlier the workout starts, the more likely the collateral stays in place. Once seizure proceedings begin, the workout becomes much harder.

**Cross-default triggers.** SBA defaults can trigger cross-default clauses in other loan documents, including bank LOCs, equipment leases, and (in some cases) MCA contracts. The program has to identify these clauses at intake.`,
    stats: [
      { label: "Avg modification accepted", value: "30-40%" },
      { label: "Avg deferment length", value: "6-12 mo" },
      { label: "Loan size range", value: "$150K-$5M" },
    ],
    faq: [
      {
        q: "Will an SBA workout hurt my personal credit?",
        a: "SBA loans usually have a personal guarantee that can report to consumer credit if charged off. A workout that keeps the loan performing protects the credit better than a default. Modifications are reported as modifications, which is a less severe credit event than default or charge-off.",
      },
      {
        q: "What if I have a 504 loan rather than a 7(a)?",
        a: "504 loans have a different structure (first lien with a bank, second lien with a CDC carrying the SBA guarantee). Workouts on 504 loans require coordination with both the bank lender and the CDC. The mechanics differ from 7(a) but the same workout tools (modification, OIC, structured plan) apply.",
      },
      {
        q: "How is EIDL different from a 7(a) loan?",
        a: "EIDL loans are serviced directly by the SBA, not by a bank lender. The collateral structure is different (collateral above $25,000, personal guarantee above $200,000), and the workout process goes through the SBA directly. EIDL hardship deferments and modifications are available but the timing and documentation requirements are SBA-specific.",
      },
      {
        q: "Can I keep operating during the workout?",
        a: "Yes. The workout is designed to keep the business operating while the modification is being arranged. The lender's interest is in resumed performance, not liquidation. As long as the merchant is engaging in good faith with documented hardship, acceleration is usually paused.",
      },
      {
        q: "What about my SBA guaranty if the loan is modified?",
        a: "The personal guaranty stays in place through most modifications. Offer in compromise can release the guaranty in some cases, but the guaranty release is itself part of the OIC negotiation. We confirm guaranty status in any settlement or closeout language before signing.",
      },
      {
        q: "How long does an OIC take?",
        a: "Offer in compromise on an SBA loan typically takes 6 to 12 months from package submission to final decision. The process involves the lender, the SBA, and sometimes the Treasury Department. The financial disclosure package has to be complete and the math has to support the offered amount.",
      },
      {
        q: "Will the SBA itself review my workout?",
        a: "On 7(a) loans, modifications below certain thresholds can be approved by the lender alone. Larger modifications and any OIC require SBA review and approval. On EIDL loans, the SBA itself is the lender, so the SBA reviews directly. The timeline and documentation requirements vary by loan type and modification scope.",
      },
      {
        q: "Can you help if my loan is already accelerated?",
        a: "Yes. Accelerated SBA loans are still workable, especially if the acceleration is recent. We move quickly to engage the lender's special assets group and present a hardship package that can support a reversal of acceleration or a structured workout that gets the loan back to performing status.",
      },
    ],
  },
  {
    slug: "equipment-finance-restructure",
    name: "Equipment Finance Restructure",
    shortName: "Equipment",
    category: "Lender debt",
    metaTitle: "Equipment Finance Restructure & Repossession Defense | TerraDebt",
    metaDescription:
      "Restructure equipment leases and loans to prevent acceleration and repossession. Term extensions, buyout negotiation, and lease modifications.",
    heroEyebrow: "Equipment workouts",
    headline: "Restructure the lease before the repo truck shows up.",
    headlineLead: "Restructure the lease",
    headlineAccent: "before the repo truck",
    headlineTail: "shows up.",
    subline:
      "Equipment leases and loans that have become unmanageable. We negotiate with lessors and equipment lenders to extend, modify, or settle before acceleration or repossession.",
    bullets: [
      "Term extensions and payment modifications on stretched equipment loans",
      "Buyout negotiation on lease balloons and end-of-term obligations",
      "Voluntary surrender plus deficiency settlement on inoperable equipment",
      "Coordination with floor plan and cross-collateralized lenders",
    ],
    whatItIs: `Equipment financing covers a wide range of contracts: capital leases, operating leases, equipment loans, conditional sales contracts, and floor plan agreements. When the underlying business cash flow tightens, equipment payments are usually one of the first obligations to fall behind, because the equipment lender's leverage (repossession) takes longer to materialize than a daily MCA debit.

By the time the business reaches the 30 or 60 day mark on equipment payments, the lender's options include acceleration, repossession, and deficiency claims. The merchant's options include term extension, payment modification, buyout negotiation, lease conversion, and (in extreme cases) voluntary surrender with a negotiated deficiency.

A typical equipment workout starts with a status review. Which contracts are current, which are late, what is the equipment worth on the secondary market, and how essential is each piece to the operation. From there, we negotiate with each lender on a path that fits the business and the equipment. Term extensions are most common when the business is still operating and just needs payment relief. Buyout negotiations are common at lease maturity when the balloon is too large. Voluntary surrender with a deficiency settlement is used when the equipment is no longer needed and the deficiency claim has to be resolved cleanly.

The program protects the equipment that is essential to operations and resolves the equipment that is not. Each contract is handled on its own terms, but the program coordinates across all of them.`,
    whoItFits: [
      "30 or more days late on one or more equipment payments",
      "Repossession threat or acceleration notice has been received",
      "The equipment is essential to operations and you cannot afford to lose it",
      "You are willing to keep paying but at a different rate or term",
      "A lease balloon is coming due and the buyout number is too large to clear",
      "GPS-enabled remote disable has been threatened on heavy equipment",
    ],
    whoItDoesntFit: [
      "The equipment is fully paid off (nothing to restructure)",
      "The business no longer needs the equipment and a voluntary return is acceptable",
      "Default is older than 12 months and the lender has already taken final action",
      "Total equipment debt is under $25,000 (handle directly with the lender)",
    ],
    methods: [
      {
        title: "Term extension",
        body: "Renegotiate the remaining term of the lease or loan to reduce monthly payments. Most equipment lenders will extend by 12 to 36 months when the merchant is still operational and demonstrates the cash flow to support the new term. Extension requires updated documentation and sometimes an additional security interest.",
      },
      {
        title: "Buyout negotiation",
        body: "On lease balloons or end-of-term buyouts, we negotiate the buyout amount down or restructure the buyout into a new payment plan. Lease balloons are often inflated relative to actual market value, and a negotiated buyout can reduce the obligation significantly when the lessor's alternative is repossession and remarketing.",
      },
      {
        title: "Lease restructure",
        body: "Convert an operating lease to a capital lease (or vice versa), extend the term, or modify payment timing. Lease restructures require the lessor's agreement and often involve a fee or additional collateral, but they preserve the merchant's use of the equipment without acceleration or repossession.",
      },
      {
        title: "Voluntary surrender plus deficiency settlement",
        body: "When the equipment is no longer needed, voluntary surrender is cleaner than repossession. The equipment goes back to the lender, the lender remarkets, and any deficiency between the remarket value and the loan balance is negotiated to a settlement. This protects the merchant from a deficiency lawsuit and keeps the resolution clean.",
      },
    ],
    scenario: `An HVAC company in the Mid-Atlantic had $250,000 in equipment leases across two service trucks and shop tools (compressor recovery units, leak detection, recovery cylinders). The trucks were essential to operations. The shop tools were essential to compliance with EPA recovery requirements. Neither was optional.

After a slow Q1 and a key tech departure, the operator missed two payments on the equipment leases. The lessor accelerated under the cross-default clause, threatening to repossess the trucks and the shop tools, and assessed a $40,000 acceleration fee on top of the remaining balance.

We engaged the lessor's special assets group immediately. The lessor's actual interest was performing payments, not repossession, but the cross-default clause had been triggered automatically. We negotiated a 90-day cure period during which the operator made interest-only payments and rebuilt the operating cash position. After the cure period, the lessor agreed to a permanent restructure: the original 36-month term was extended to 54 months, the acceleration fee was waived, and the monthly payment dropped from $7,200 to $4,950.

The trucks stayed on the road. The shop tools stayed in operation. The cross-default clause was unwound. The lessor preserved a performing account and the operator kept the equipment that the business depended on.`,
    pitfalls: `Equipment finance cases come with specific risks that the operator should understand.

**UCC liens on the equipment.** Equipment lenders typically file UCC-1 financing statements on the equipment itself. When a default occurs, the UCC lien gives the lender repossession rights without court action in most states. The lender can act quickly, sometimes within 7 to 14 days of formal default notice.

**Cross-collateralization with other equipment.** Many equipment lenders cross-collateralize their loans, meaning the lien on one piece of equipment also secures other equipment financed by the same lender. A default on one contract can trigger acceleration across all contracts with the same lender. Identifying cross-collateralization at intake is critical.

**GAP coverage gaps.** Many equipment leases include GAP insurance that covers the difference between the equipment's fair market value and the loan balance in case of total loss or theft. When the GAP coverage lapses (often automatically after a payment miss), the merchant is exposed to the full deficiency on a total loss event. We confirm GAP status at intake.

**GPS-enabled remote disable.** Heavy equipment, especially trucks and trailers, increasingly include GPS-enabled remote disable that the lender can use to immobilize the equipment. This is most common in over-the-road trucking but is spreading to construction and other verticals. The threat of remote disable accelerates the negotiation timeline.

**Cross-default with bank loans and MCAs.** Equipment defaults can trigger cross-default clauses in other loan documents. The program has to identify these clauses and sequence the work around them. The reverse is also true: MCA or bank defaults can trigger equipment lease acceleration.`,
    stats: [
      { label: "Avg cure rate", value: "82%" },
      { label: "Avg term extension", value: "12-36 mo" },
      { label: "Contract range", value: "$25K-$2M" },
    ],
    faq: [
      {
        q: "Will the lender actually repossess my equipment?",
        a: "Repossession is the lender's last resort, not the first. Most equipment lenders prefer a performing modification to a remarketing event. That said, lenders do repossess when the merchant goes silent, so engaging early and credibly is the most reliable way to keep the equipment.",
      },
      {
        q: "How quickly can you pause an active repossession?",
        a: "Most repossession actions can be paused within 5 to 10 business days of initial contact with the lender, provided the merchant engages credibly and starts documenting a workout package. Repossession trucks dispatched within hours of formal notice (less common but possible) require an emergency hold call to the lender.",
      },
      {
        q: "What about leased equipment vs financed equipment?",
        a: "Leased and financed equipment have different recovery dynamics. Leases give the lessor cleaner repossession rights and typically a cleaner deficiency calculation. Financed equipment goes through a UCC repossession process that allows more negotiation room. Both are workable but the negotiation approach is different.",
      },
      {
        q: "What if my equipment has GPS remote disable installed?",
        a: "GPS-enabled remote disable is increasingly common, especially on heavy trucks. The threat of remote disable shortens the negotiation timeline. We engage the lender immediately, get a written hold on disable activation, and move to a workout package within 7 to 14 days.",
      },
      {
        q: "Will this affect my other equipment loans with the same lender?",
        a: "If the equipment is cross-collateralized (common with the same lender across multiple contracts), a default on one contract can trigger cross-default on others. Identifying cross-collateralization at intake lets us scope the workout across all affected contracts at once.",
      },
      {
        q: "Can I voluntarily surrender equipment I no longer need?",
        a: "Yes. Voluntary surrender is cleaner than repossession. The equipment goes back, the lender remarkets, and we negotiate any deficiency to a clean settlement. This avoids a deficiency lawsuit and resolves the obligation finally.",
      },
      {
        q: "What about my bank LOC or MCA cross-default risk?",
        a: "Equipment defaults can trigger cross-default clauses in bank LOCs, term loans, and even some MCA contracts. Identifying cross-default at intake is critical, and the program sequence respects all cross-default exposure.",
      },
      {
        q: "How long does an equipment workout take?",
        a: "Most equipment workouts run 30 to 120 days from intake to executed modification. Faster than MCA programs because the parties are usually smaller and the negotiation is more direct. Voluntary surrender plus deficiency settlement can take longer, 90 to 180 days.",
      },
    ],
  },
  {
    slug: "vendor-supplier-debt",
    name: "Vendor & Supplier Debt",
    shortName: "Vendor",
    category: "Trade debt",
    metaTitle: "Vendor & Supplier Debt Negotiation | TerraDebt",
    metaDescription:
      "Negotiated paydowns and settlements with trade creditors and suppliers. Restore COD or credit terms while resolving past-due balances. Free assessment.",
    heroEyebrow: "Trade creditor workouts",
    headline: "Resolve vendor debt without losing the supply chain.",
    headlineLead: "Resolve vendor debt",
    headlineAccent: "without losing",
    headlineTail: "the supply chain.",
    subline:
      "Trade creditor debt that has gone past terms: suppliers, materials vendors, parts vendors. We negotiate paydown schedules, settlements, and COD-with-arrears-plan arrangements while keeping the supply chain running.",
    bullets: [
      "Coordinated paydown plans across multiple trade creditors",
      "Settlement negotiation when vendors are willing to take a discount",
      "COD-plus-arrears arrangements to restore ordering capability",
      "Lien release negotiation in construction and manufacturing",
    ],
    whatItIs: `Trade creditor debt is one of the quietest forms of business debt. Suppliers, materials vendors, and parts vendors extend 30 to 60 day credit terms based on relationship and order history. When the business hits a cash flow issue, those credit terms are usually the first to slip. The vendor still ships for the first 30 days past due, sometimes 60. After that, the vendor starts moving to COD or stops shipping entirely.

A trade creditor workout has two goals. The first is resolving the past-due balance through a paydown plan, a settlement, or a combination. The second is restoring the working relationship so the vendor continues shipping on terms. The second goal is often more valuable than the first, because losing a key supplier can be more damaging than the debt itself.

Trade creditor cases are highly relational. The vendor's posture depends on the relationship history, the customer concentration (if you are 30 percent of the vendor's revenue, they will work with you), the alternative supplier options for both sides, and the underlying business case for continued partnership. A coordinated approach across multiple vendors is more effective than handling each one individually, because the merchant can present a single restructuring story rather than multiple ad hoc conversations.

Trade debt settlements typically settle at 60 to 85 cents on the dollar, less aggressive than MCA settlements because the vendor has continuing-relationship value to protect. The settlement plus a credible paydown of any remainder usually restores credit terms within 30 to 90 days.`,
    whoItFits: [
      "60 or more days past on multiple vendor invoices",
      "Vendors are threatening to cut to COD or stop shipping",
      "The business relationships are worth preserving (key supply chain partners)",
      "You need the supply chain to keep operating while you resolve the debt",
      "Total trade debt is $25,000 or more across multiple vendors",
      "Mechanic's lien filings have been threatened or filed (construction, equipment)",
    ],
    whoItDoesntFit: [
      "A single one-off vendor dispute (handle directly)",
      "The vendor is willing to extend on their own without intervention",
      "Total trade debt is under $10,000 and a single check resolves it",
      "The business is closing and you are not preserving the supply chain",
    ],
    methods: [
      {
        title: "Single-vendor paydown plan",
        body: "A structured paydown over 6 to 24 months with the largest or most strategic vendor. The plan typically includes a down payment, monthly installments, and (optionally) interest. The vendor agrees to keep shipping on COD or partial credit terms during the paydown. This is the simplest path when a single vendor dominates the trade debt.",
      },
      {
        title: "Multi-vendor coordinated settlement",
        body: "A coordinated negotiation across multiple vendors, presenting the same restructuring story to all of them. The merchant proposes a paydown percentage and timeline that fits real cash flow, and individual vendors negotiate within that framework. Coordinated negotiation produces faster resolutions because vendors see consistent treatment.",
      },
      {
        title: "COD-plus-arrears arrangement",
        body: "The vendor moves to COD on new orders while a separate arrears payment runs in parallel. This restores ordering capability immediately while resolving the past-due balance over time. Common in construction (materials), food service (food and alcohol), and parts-heavy operations (auto repair, HVAC).",
      },
      {
        title: "Lien release negotiation",
        body: "When a vendor has filed or threatened a mechanic's lien (construction) or a UCC lien (manufacturing, equipment), we negotiate the lien release as part of the settlement. Lien releases require precise closeout language and recorded releases to be enforceable, and we verify both before any payment moves.",
      },
    ],
    scenario: `A 3-unit restaurant group in the Northeast had $145,000 in past-due vendor balances across 11 vendors. The largest balance was $32,000 to a primary food distributor. Smaller balances ranged from $4,000 to $18,000 across produce vendors, an alcohol distributor, a kitchen equipment service company, a uniform service, a printer for menus and marketing, two beverage suppliers, and a paper goods vendor.

Four of the vendors had moved the operator to COD. The food distributor had threatened to cut shipping entirely within 14 days. The alcohol distributor required cash on delivery for each new order. The operator was scrambling to find alternative suppliers but the food distributor's terms were better than any alternative and the relationship was 8 years old.

We presented a coordinated restructuring story to all 11 vendors at once. The operator could not pay the full balance immediately, but the business was operational, three units were performing, and a refinanced bank facility was 90 days out from closing. The proposal: a 20 percent down payment within 30 days, monthly installments of $3,800 across all vendors for 24 months, and COD on new orders during the paydown.

Nine of the 11 vendors accepted within 30 days. Two negotiated minor variations (one wanted a higher down payment in exchange for a shorter term, one wanted to settle at 75 cents in a lump sum). Within 90 days, ordering terms were restored with 9 of the 11 vendors. The food distributor returned to net 30 in month 4. The alcohol distributor returned to net 7 in month 6.

By month 24, all 11 vendor balances were resolved. The operator had preserved the supply chain through a stressed period without losing any of the key relationships.`,
    pitfalls: `Trade creditor cases come with risks that are different from lender debt and require specific diligence.

**Mechanic's lien filings.** In construction, equipment, and some manufacturing contexts, unpaid vendors can file mechanic's liens against the merchant or against the underlying project. A mechanic's lien clouds title, can stop a project, and survives bankruptcy in many cases. Identifying lien rights and filing deadlines at intake is critical.

**D&B and trade reporting.** Larger vendors report to Dun & Bradstreet and similar trade credit agencies. Past-due trade reporting affects future credit decisions across the entire supplier network, not just the vendor with the past-due balance. The reporting can compound the original problem.

**Supply chain disruption.** A single supplier cutting shipping can stop the business operationally, even if the financial damage is modest. The supply chain protection has to be sequenced ahead of the debt resolution in most cases. We identify the most operationally critical vendors at intake.

**Retainage holdbacks (construction).** Construction trade debt often involves retainage held by the GC against the sub. If the GC is delaying retainage payments, the sub's trade debt to its own suppliers gets worse. The retainage cycle has to be mapped into any construction trade workout.

**Cross-default and personal guarantees on supplier credit lines.** Larger supplier credit lines (industrial supplies, automotive parts distribution, heavy equipment parts) sometimes carry personal guarantees and cross-default clauses. The workout has to identify these clauses and sequence around them.`,
    stats: [
      { label: "Avg paydown achieved", value: "65-80%" },
      { label: "Avg timeline to terms restored", value: "60-90 days" },
      { label: "Avg supplier count per case", value: "5-15" },
    ],
    faq: [
      {
        q: "Will my suppliers cut me off if I admit I cannot pay in full?",
        a: "Most suppliers prefer a credible plan to silence. Vendors that have been with the merchant for years will work with a documented paydown proposal. The risk is silence, not transparency. We coordinate the messaging across all vendors so each one sees consistent treatment.",
      },
      {
        q: "What if a vendor sues me for the past-due balance?",
        a: "Lawsuits for unpaid invoices are workable. We engage counsel, evaluate the underlying contract, and negotiate a settlement in parallel with the litigation. Most trade creditor lawsuits settle before judgment because the cost of litigation exceeds the recovery for most vendors.",
      },
      {
        q: "Will the vendor report this to D&B or other trade credit agencies?",
        a: "Many vendors do report past-due balances to trade credit agencies. A resolved balance reports differently than an unresolved balance, so the paydown itself improves the reporting over time. The earlier the workout starts, the less damage the reporting causes.",
      },
      {
        q: "What if the vendor has filed a mechanic's lien?",
        a: "Mechanic's liens require specific release procedures, including recorded releases with the county clerk or equivalent jurisdiction. We negotiate the lien release as part of the settlement and verify the release is recorded before final payment moves. Lien release language is critical.",
      },
      {
        q: "Can I keep ordering from the vendor during the paydown?",
        a: "Yes. Most paydown agreements include COD on new orders so the merchant continues sourcing through the original vendor while the past-due balance is resolved. Returning to credit terms typically happens 30 to 90 days into the paydown.",
      },
      {
        q: "What if I owe vendors across multiple states?",
        a: "Multi-state vendor situations are common, especially in distribution-heavy verticals. We coordinate the negotiation across jurisdictions and (where applicable) work with local counsel on lien rights or state-specific creditor protections.",
      },
      {
        q: "Will this affect my future credit applications?",
        a: "Resolved trade debt with positive paydown history is less damaging than unresolved trade debt or charge-offs. Future credit applications will see the trade history. The workout that resolves the balances cleanly is the best path to repairing the future credit picture.",
      },
      {
        q: "What about vendors who require personal guarantees on their supplier credit?",
        a: "Some larger supplier credit lines (industrial distribution, automotive parts, food service) carry personal guarantees. The workout has to address the guaranty exposure as part of the settlement. We verify guaranty status at intake and negotiate the release as part of the closeout.",
      },
    ],
  },
  {
    slug: "bank-loan-workout",
    name: "Bank Loan & Line of Credit Workouts",
    shortName: "Bank loans",
    category: "Lender debt",
    metaTitle: "Bank Loan & LOC Workout Services | TerraDebt",
    metaDescription:
      "Term loan modifications, line of credit workouts, and covenant relief with banks and credit unions. Forbearance, covenant waivers, and loan modifications.",
    heroEyebrow: "Bank workouts",
    headline: "Workouts with the bank's special assets group.",
    headlineLead: "Workouts with the bank's",
    headlineAccent: "special assets group",
    headlineTail: ".",
    subline:
      "Traditional commercial debt that has hit covenant violations, default, or unmanageable payments. We coordinate workouts with the bank's special assets group to preserve the relationship.",
    bullets: [
      "Covenant waivers and forbearance agreements on term loans",
      "Line of credit workouts when the bank wants to reduce exposure",
      "Loan modifications with extended amortization and rate relief",
      "Cross-default coordination across the full bank credit relationship",
    ],
    whatItIs: `Bank debt is a different category from MCA or merchant cash advances. Term loans, lines of credit (LOCs), commercial real estate loans, and asset-based lending are all relationship-driven products with their own workout playbook. When a bank loan hits a covenant violation, a payment default, or just unmanageable payments, the workout happens with the bank's special assets group rather than with the originating relationship manager.

Special assets is the workout group inside the bank. Their job is to maximize recovery on troubled loans, which usually means working out the loan rather than charging it off. The bank's preference is a performing loan under modified terms, because charged-off loans hit the bank's regulatory capital and the FDIC examination cycle. The bank will work with a credible workout proposal, but they will not work with silence.

A typical bank workout starts with a covenant or default analysis. Which covenants have been violated, what is the cure period, what is the bank's recourse under the loan documents, and what is the bank's actual posture (recover or remediate). From there, we negotiate the workout: forbearance, covenant waiver, loan modification, extended amortization, rate relief, or some combination.

Bank workouts typically run 60 to 180 days from engagement to executed agreement. The bank's process is slower than equipment finance and faster than SBA, with multiple internal approval steps. The merchant has to present a credible pro forma turnaround story supported by financials, management changes, or operational fixes.`,
    whoItFits: [
      "30 or more days delinquent on a bank term loan or LOC",
      "Covenant violation has occurred (financial covenants, reporting covenants, or affirmative covenants)",
      "Forbearance agreement is in place and running out",
      "You want to preserve the banking relationship for future credit needs",
      "You can show a pro forma turnaround story (operational, financial, or both)",
      "Cross-default exposure exists with equipment or other lenders",
    ],
    whoItDoesntFit: [
      "The bank has already completed foreclosure or charge-off",
      "You have no relationship history or forbearance dialogue with the bank",
      "You are trying to walk away from the obligation entirely",
      "Total exposure is under $100,000 (banks rarely engage special assets at that size)",
    ],
    methods: [
      {
        title: "Covenant waiver",
        body: "When a financial covenant has been violated (debt service coverage ratio, leverage ratio, working capital, etc.), the bank can waive the covenant for a defined period in exchange for a fee and ongoing reporting. Waivers are usually 6 to 12 months and provide breathing room for the merchant to rebuild the covenant compliance.",
      },
      {
        title: "Forbearance agreement",
        body: "A formal agreement where the bank agrees not to accelerate the loan or pursue remedies for a defined period (typically 3 to 12 months) in exchange for the merchant meeting specific milestones. Forbearance preserves the merchant's operations while a longer-term workout is being arranged.",
      },
      {
        title: "Loan modification",
        body: "A permanent change to the loan terms: extended amortization, reduced rate, restructured payment schedule, or modified collateral. Modifications require formal bank approval and amended loan documents. The merchant typically pays a modification fee and accepts ongoing reporting requirements.",
      },
      {
        title: "Note sale and restructure",
        body: "In some cases, the bank sells the note to a third party (specialty finance, distressed debt fund, or another bank) who then restructures with the merchant. This is more common with very distressed loans or with banks under regulatory pressure to reduce exposure. The merchant typically negotiates better terms with the note buyer than with the original bank.",
      },
    ],
    scenario: `A construction company in the Mountain West had a $1.2M term loan and a $400K line of credit with a regional bank. The term loan financed a shop building and equipment. The LOC funded working capital for projects. After a slow Q2 (delayed permits on two major projects), the operator violated the working capital covenant on the LOC by $180,000.

The covenant violation triggered a 60-day cure period under the loan documents. The bank issued a covenant default notice and scheduled a special assets group review. The operator engaged us at day 14 of the cure period.

We packaged a workout proposal that included a 6-month forbearance on the covenant violation, a modified covenant calculation that would be achievable by Q4, a $50,000 paydown on the LOC to demonstrate good faith, and a 90-day operational plan that addressed the underlying permitting delays.

The bank's special assets group accepted the proposal after two rounds of negotiation. The forbearance ran 6 months. By month 5, the working capital covenant was back in compliance under the modified calculation. The bank then formalized a permanent covenant amendment with extended amortization on the term loan (24 months added to the original 60-month schedule), a permanent reduction in the LOC commitment from $400K to $300K, and a modification fee of $12,000.

The relationship was preserved. The operator kept the LOC at a reduced commitment, which was enough to support normal working capital. The term loan continued to perform under the extended amortization. The bank avoided a charge-off and the merchant avoided losing the building or the equipment.`,
    pitfalls: `Bank workout cases come with risks that are specific to commercial bank lending and the regulatory framework around it.

**Cross-default clauses.** Bank loans almost always include cross-default clauses with other loans at the same bank and sometimes with loans at other lenders. A default on the LOC can trigger acceleration on the term loan and on any other facility at the bank. The workout has to address all cross-default exposure at once.

**Personal guaranty pursuit.** Commercial bank loans typically include personal guarantees from the principal owners. When a loan defaults, the bank can pursue the guarantor through state-court collection, lien filings, and (in some cases) garnishment. The earlier the workout starts, the more likely the guaranty stays intact.

**FDIC and OCC examination pressure.** When a bank is in a regulatory examination cycle, special assets is under pressure to resolve troubled loans quickly. This can cut both ways: it makes the bank more willing to work out (because resolution is preferable to charge-off) but it also accelerates the timeline, sometimes forcing decisions before the workout package is fully prepared.

**Deposit account offset rights.** Most commercial loan documents give the bank the right to offset against deposit accounts at the same bank. When a default occurs, the bank can sweep operating deposits to apply against the loan balance. This is one of the fastest moves a bank can make and it can drain operating cash overnight. The workout has to address deposit relocation if offset is a real risk.

**Cross-collateralization across the bank relationship.** Banks often cross-collateralize their loans, meaning the collateral pledged on one loan also secures other loans at the same bank. Real estate pledged for the term loan can secure the LOC. Equipment pledged for the equipment loan can secure the term loan. The cross-collateralization expands the bank's leverage and has to be mapped at intake.`,
    stats: [
      { label: "Avg workout success rate", value: "78%" },
      { label: "Avg engagement length", value: "60-180 days" },
      { label: "Loan size range", value: "$250K-$25M" },
    ],
    faq: [
      {
        q: "What is the bank's special assets group?",
        a: "Special assets is the workout group inside the bank that handles troubled loans. Their job is to maximize recovery, which usually means working out the loan rather than charging it off. Special assets has different posture than the originating relationship manager, more focused on documentation and metrics than relationship continuity.",
      },
      {
        q: "Will I lose my line of credit during the workout?",
        a: "The LOC commitment can be reduced or frozen during a workout, but rarely terminated entirely if the workout is credible. The bank's interest is in continued performance under reduced exposure. A reduced LOC plus a structured term loan modification is the most common outcome.",
      },
      {
        q: "What happens to my personal guarantee?",
        a: "Personal guarantees stay in place through most workouts. They are released only at full payoff or through specific negotiated settlements. The workout protects the guarantor by keeping the loan performing under modified terms, which is the best protection short of full payoff.",
      },
      {
        q: "What is the difference between forbearance and modification?",
        a: "Forbearance is a temporary agreement (3 to 12 months) where the bank agrees not to pursue remedies in exchange for specific milestones. Modification is a permanent change to the loan terms. Forbearance buys time. Modification fixes the terms. Most workouts combine the two: forbearance during the negotiation, modification at the end.",
      },
      {
        q: "Can the bank really offset my deposit accounts?",
        a: "Yes. Most commercial loan documents include offset rights against deposit accounts at the same bank. When a default occurs, the bank can sweep deposits to apply against the loan balance. The workout has to address this exposure, sometimes by relocating operating deposits to a different bank before the default is formally declared.",
      },
      {
        q: "How long does a bank workout take?",
        a: "Most workouts run 60 to 180 days from initial engagement to executed agreement. Bank approval processes are slower than equipment finance and faster than SBA. The merchant has to present a credible pro forma and supporting financials, and the bank has internal approval steps that cannot be rushed.",
      },
      {
        q: "What if the bank sells my loan to a third party?",
        a: "Note sales are increasingly common, especially with regional banks reducing exposure. The new note holder can be more flexible than the original bank (specialty finance funds, distressed debt buyers) because they bought the note at a discount and have room to negotiate. Note sales are not the end of the workout, just a different counterparty.",
      },
      {
        q: "Can I keep operating during the workout?",
        a: "Yes. The workout is designed to keep the business operating while the modification is being arranged. Special assets prefers performing loans to charge-offs, so the bank's interest is aligned with continued operations as long as the merchant is engaging credibly.",
      },
    ],
  },
  {
    slug: "business-tax-debt",
    name: "Business Tax Debt",
    shortName: "Tax debt",
    category: "Tax debt",
    metaTitle: "IRS & State Business Tax Debt Resolution | TerraDebt",
    metaDescription:
      "IRS and state tax debt resolution: installment agreements, offer in compromise, and payroll tax workouts. Trust Fund Recovery Penalty defense.",
    heroEyebrow: "Tax debt resolution",
    headline: "Resolve IRS and state tax debt before the levy lands.",
    headlineLead: "Resolve IRS and state tax debt",
    headlineAccent: "before the levy",
    headlineTail: "lands.",
    subline:
      "Installment agreements, offer in compromise, and payroll tax workouts. We coordinate licensed CPAs and tax attorneys to resolve federal and state tax obligations.",
    bullets: [
      "Installment agreements scoped to your real cash flow",
      "Offer in compromise packaging for distressed cases",
      "Currently not collectible status during turnaround periods",
      "Trust Fund Recovery Penalty defense on payroll tax cases",
    ],
    whatItIs: `Business tax debt is one of the most aggressive forms of business debt, because the IRS (and most state revenue departments) have collection tools that exceed what private creditors can deploy. Federal tax liens can be filed in public records, levies can attach to bank accounts and accounts receivable, and the Trust Fund Recovery Penalty can pierce the corporate veil on payroll tax debt to attach personal liability to owners and officers.

The good news is that the IRS has a structured workout framework. Installment agreements, offer in compromise (OIC), currently not collectible status, and penalty abatement are all standard programs with documented qualification criteria. The state revenue departments have similar programs, though the specifics vary by state.

A typical tax workout starts with compliance. Before any workout option can be negotiated, the merchant has to be current on all filings. Missing returns have to be filed (we coordinate with a CPA), and current quarter payments have to be made. From there, the workout option is chosen based on the merchant's actual financial picture.

Installment agreements are the most common path. The merchant proposes a monthly payment that fits real cash flow, supports the proposal with financial disclosure, and the IRS accepts a payment plan over 24 to 84 months depending on the size of the debt and the merchant's ability to pay. Offer in compromise is the deepest workout option, available when the merchant cannot reasonably pay the full balance and a partial settlement is in the IRS's interest. OIC takes 6 to 12 months and is reviewed against strict reasonable collection potential criteria.

Trust Fund Recovery Penalty (TFRP) is a separate workstream that applies to payroll tax debt. When employee withholding taxes are not paid over to the IRS, the IRS can assess personal liability against responsible parties (owners, officers, even certain employees with check-signing authority). TFRP defense requires its own documentation and often its own counsel.`,
    whoItFits: [
      "$25,000 or more in IRS or state business tax debt",
      "Payroll tax issues, especially Form 941 trust fund exposure",
      "Levy or lien notices have been received from the IRS or state",
      "You have unfiled returns that need to be brought current",
      "Personal Trust Fund Recovery Penalty assessment is pending or has been issued",
      "You want to resolve the tax debt and keep the business operating",
    ],
    whoItDoesntFit: [
      "All filings are current and you just need a 90-day extension (handle directly with IRS)",
      "Total tax debt is under $25,000 (simpler IRS programs handle this directly)",
      "You are already in bankruptcy proceedings (tax debt is handled through the bankruptcy court)",
      "You are looking for a way to avoid future tax obligations (workouts only address past debt)",
    ],
    methods: [
      {
        title: "Installment agreement",
        body: "A monthly payment plan with the IRS over 24 to 84 months. The plan is sized to fit the merchant's actual ability to pay, supported by financial disclosure on Form 433-B (business) and sometimes Form 433-A (individual, for personal liability). Installment agreements are the most common path for business tax debt between $25,000 and $250,000.",
      },
      {
        title: "Offer in compromise",
        body: "A partial settlement of the tax debt when the merchant cannot reasonably pay the full balance. OIC is reviewed against the IRS's reasonable collection potential standard, which calculates the merchant's ability to pay over the statutory collection period. OIC takes 6 to 12 months and requires complete financial disclosure.",
      },
      {
        title: "Currently not collectible status",
        body: "When the merchant cannot pay any meaningful amount currently due to documented financial hardship, CNC status pauses active collection. The IRS does not write off the debt, but levies and aggressive collection actions stop. CNC is reviewed annually and is most useful as a bridge while the merchant builds toward an installment agreement or OIC.",
      },
      {
        title: "Trust Fund Recovery Penalty defense",
        body: "When the IRS assesses TFRP personal liability against owners or officers for unpaid payroll tax, the assessment can be challenged through the appeals process. TFRP defense requires documentation of responsibility, willfulness, and (in some cases) reasonable cause. We coordinate with tax counsel for TFRP cases.",
      },
    ],
    scenario: `An auto repair shop in the Southwest had $185,000 in IRS payroll tax debt accumulated over 14 months. The operator had filed Form 941 quarterly reports but had not paid the trust fund portion (employee withholding) for the last four quarters. A levy notice was issued against the operating account and the IRS had begun the Trust Fund Recovery Penalty assessment process against the owner personally.

The operator had also fallen behind on three quarterly returns, which had to be filed before any workout could be negotiated.

We coordinated with a CPA to file the three missing returns within 30 days. While the returns were being prepared, we secured Currently Not Collectible status with the IRS, which paused the levy on the operating account. The CNC status held for 9 months while the operator stabilized cash flow, hired a new service writer, and rebuilt the trust fund deposit discipline.

In month 10, we submitted the Offer in Compromise package. The financial disclosure supported an offer of $48,000 against the $185,000 balance, paid over 24 months. The IRS accepted the offer in month 16 after one round of negotiation. The Trust Fund Recovery Penalty assessment was reduced from the full balance to the OIC amount, releasing the operator from personal liability above the settled amount.

The shop continued operating throughout. Current quarter payroll tax deposits were maintained. The operator paid the OIC amount over 24 months and was clear of the IRS exposure by the end of the program.`,
    pitfalls: `Tax debt cases come with risks that are unique to federal and state tax law and require specialized handling.

**Trust Fund Recovery Penalty.** Payroll tax debt creates personal exposure for owners and officers through the Trust Fund Recovery Penalty. The IRS can assess TFRP against any responsible party who willfully failed to remit the trust fund taxes. TFRP attaches to the individual personally and survives the dissolution of the business entity. Identifying TFRP exposure at intake is critical.

**Federal tax lien public filing.** The IRS files Notices of Federal Tax Lien in public records once the tax debt exceeds certain thresholds. The lien affects business credit, real estate transactions, and (in some cases) bonding capacity. Lien withdrawal or release is part of any complete tax workout but requires specific procedures.

**Levy on bank accounts and AR.** The IRS can levy bank accounts and accounts receivable with relatively short notice (30 days after the final notice). Once a levy lands on the operating account, the cash is gone within hours. AR levies attach to customer payments directly. The workout has to address levy exposure before the final notice expires.

**Statute of limitations on collection.** The IRS has 10 years to collect assessed tax debt from the date of assessment. Various events can suspend the running of the statute (bankruptcy, OIC processing, installment agreement requests, military service). The statute analysis matters for OIC strategy and for evaluating whether the IRS still has time to collect.

**State tax authority differences.** State revenue departments have their own collection tools, statutes of limitations, and workout programs. California, New York, Texas, and Florida have particularly aggressive state tax collection. The federal workout does not automatically resolve state tax debt, which has to be addressed separately.

**Cross-default and personal credit exposure.** Federal tax liens can appear on personal credit reports and trigger cross-default clauses in some commercial loan documents. The lien is a senior creditor on business assets, which affects any other workout being negotiated. The tax workout has to be sequenced with any other debt workouts.`,
    stats: [
      { label: "Avg OIC reduction", value: "60-75%" },
      { label: "Avg installment term", value: "36-72 mo" },
      { label: "Cases with TFRP exposure", value: "~30%" },
    ],
    faq: [
      {
        q: "What is the difference between OIC and an installment agreement?",
        a: "Installment agreements pay the full balance over time (24 to 84 months). Offer in compromise settles the balance for less than the full amount. OIC requires that the merchant cannot reasonably pay the full balance, supported by complete financial disclosure. Most cases start with an installment agreement evaluation, and OIC is considered when the merchant's reasonable collection potential is below the full balance.",
      },
      {
        q: "Will the federal tax lien come off when I resolve the debt?",
        a: "Yes. When the tax debt is paid in full or settled through OIC, the IRS releases the lien within 30 days. Lien withdrawal (which removes the lien from public records entirely) is sometimes available earlier in the process under specific qualification criteria, including Direct Debit Installment Agreement enrollment.",
      },
      {
        q: "What about my personal exposure on payroll tax debt?",
        a: "Payroll tax debt creates personal exposure through the Trust Fund Recovery Penalty (TFRP). The IRS can assess responsible parties (owners, officers, sometimes employees with check-signing authority) for the trust fund portion of the debt. TFRP defense involves challenging responsibility, willfulness, and (where applicable) reasonable cause. Settlement of the business tax debt can reduce or eliminate the TFRP assessment depending on the structure.",
      },
      {
        q: "How long does an Offer in Compromise take?",
        a: "OIC typically takes 6 to 12 months from package submission to final decision. The IRS reviews the financial disclosure against the reasonable collection potential standard, often requests additional documentation, and (in some cases) negotiates the offered amount. During OIC processing, active collection activity is generally paused.",
      },
      {
        q: "Can the IRS levy my bank account?",
        a: "Yes. After the final notice expires (typically 30 days after the Letter 1058 / LT-11), the IRS can levy bank accounts. The levy attaches to the balance on the day of levy and the bank holds the funds for 21 days before remitting to the IRS. The workout has to address levy exposure before the final notice expires.",
      },
      {
        q: "What about state tax debt?",
        a: "State tax debt is handled separately from federal. Each state has its own collection tools, statutes of limitations, and workout programs. We coordinate state tax workouts with federal where applicable, but the two are not automatically resolved together. California, New York, Texas, and Florida have particularly aggressive state collection.",
      },
      {
        q: "Can the IRS abate penalties?",
        a: "Yes. Penalty abatement is available for first-time penalty cases (under the First-Time Abatement program) and for cases with documented reasonable cause. Abatement does not reduce the underlying tax but can reduce the total balance significantly through penalty and (in some cases) interest reduction.",
      },
      {
        q: "Can I keep operating during the tax workout?",
        a: "Yes. The workout is designed to keep the business operating while the resolution is being negotiated. CNC status pauses active collection. Installment agreements and OIC processing also pause aggressive collection. The merchant has to maintain current quarter tax deposits throughout, but past-due balances are addressed under the workout structure.",
      },
    ],
  },
];

export function getProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}

export function findProduct(slug: string): ProductContent | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
