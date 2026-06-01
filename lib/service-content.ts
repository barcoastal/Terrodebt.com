export type Engagement = {
  step: string;
  duration: string;
  fee: string;
};

export type DebtInstrument = {
  name: string;
  note: string;
};

export type ServiceContent = {
  slug: string;
  name: string;
  shortName: string;
  numeral: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  overview: string[];
  engagement: Engagement[];
  whatItAddresses: string[];
  methodology: { title: string; body: string }[];
  deliverables: string[];
  debtInstruments: DebtInstrument[];
  commonEngagements: { title: string; body: string }[];
  faq: { q: string; a: string }[];
};

export const SERVICES: ServiceContent[] = [
  {
    slug: "business-debt-relief",
    name: "Business Debt Relief",
    shortName: "Debt Relief",
    numeral: "01",
    metaTitle: "Business Debt Relief for MCA & Stacked Debt",
    metaDescription:
      "Cut daily MCA debits and lower payments fast. Free analysis for businesses with 2+ merchant cash advances or $50K+ in stacked short-term debt.",
    kicker: "Service 01",
    overview: [
      "Business Debt Relief is the first step for owners stuck with stacked merchant cash advances, daily debits draining the operating account, and creditors calling. The objective is fast, structural relief: lower the dollars leaving the business each week so payroll, vendors, and tax deposits stop slipping behind. Most clients see daily debits replaced by a single weekly payment within 30 to 60 days of engaging.",
      "The work starts with a free analysis of every active credit instrument the business is carrying. We map total daily outflow, identify which lenders have the strongest recourse, and produce a written plan showing exactly what relief is available and on what timeline. The plan is yours whether or not you choose to engage further.",
      "Relief is not the same as filing for bankruptcy and it is not debt consolidation. It is a structured negotiation that lowers what you are paying right now, supported by documentation lenders take seriously. Best fit for operating businesses that intend to keep operating.",
    ],
    engagement: [
      { step: "Free debt analysis", duration: "30 min call + 5 day review", fee: "No fee" },
      { step: "Relief plan delivery", duration: "Written plan + walkthrough", fee: "No fee" },
      { step: "Active negotiation period", duration: "30 to 60 days typical", fee: "Engagement fee" },
      { step: "Documented agreements", duration: "As reached", fee: "Included" },
    ],
    whatItAddresses: [
      "Two or more active merchant cash advances with daily or weekly debits",
      "Combined business debt of $50,000 or more across MCAs, equipment, vendor, bank, or tax obligations",
      "Daily debits that are missing payroll, fuel, insurance, or tax deposits",
      "Reconciliation requests on MCAs that have been ignored or improperly handled",
      "Operators currently in good standing or recently defaulted who want to keep the business open",
    ],
    methodology: [
      {
        title: "Free debt analysis",
        body: "We review every active credit agreement, the operating bank statements covering the trailing 90 days, and the daily debit pattern hitting your account. The output is a single-page composite of total outflow, lender recourse, and the specific relief options available to you.",
      },
      {
        title: "Written relief plan",
        body: "Before any engagement fee is charged, you receive a written plan showing the proposed weekly payment, the timeline to reach it, and the specific creditor concessions we will request. You decide whether to move forward.",
      },
      {
        title: "Structured negotiation",
        body: "We approach each lender with a documented hardship narrative, supporting financials, and a defined ask. Most MCAs accept reconciliation, deferral, or restructure when the package is credible. Stronger settlement positions are pursued where the lender's recourse is weak.",
      },
      {
        title: "Closed agreements",
        body: "Every accepted concession is documented in writing. The agreements stay in the engagement file and you receive copies for your records. Where personal guaranties are released, the release language is reviewed line by line.",
      },
    ],
    deliverables: [
      "Free written debt analysis with composite daily outflow and total exposure",
      "Relief plan with target weekly payment and timeline to reach it",
      "Documented agreements with each lender that accepts a concession",
      "Cadence log tracking every lender communication during the engagement",
      "Personal guaranty release language reviewed where applicable",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "Reconciliation, deferral, and restructure proposals presented with documented hardship narrative. Settlement pursued where appropriate." },
      { name: "Equipment finance and capital leases", note: "Payment modifications, term extensions, and voluntary surrender plus deficiency settlements where the asset is no longer revenue-essential." },
      { name: "Vendor and trade debt", note: "Single-vendor paydown plans and COD-plus-arrears arrangements presented in writing to preserve supply chain continuity." },
      { name: "Bank lines of credit", note: "Forbearance and modification proposals coordinated with the bank's special assets group." },
      { name: "Payroll and sales tax", note: "Installment agreements coordinated with a qualified tax professional. Trust fund exposure addressed first." },
    ],
    commonEngagements: [
      {
        title: "Trucking carrier with 4 stacked MCAs",
        body: "Daily combined debits of $4,100. After 45 days of structured negotiation, daily debits were replaced by a single weekly payment of $3,800 across three remaining advances, one was settled at 52% of balance, and the owner kept the fleet running through the engagement.",
      },
      {
        title: "Restaurant group, 3 MCAs plus vendor arrears",
        body: "Combined MCA exposure of $217,000 plus $48,000 in aged supplier debt. Two MCAs accepted 60-day reconciliation, one was settled at 41% of balance, and a coordinated supplier paydown preserved the primary food distributor relationship.",
      },
      {
        title: "Medical practice, reimbursement gap",
        body: "Stacked working capital advances taken to bridge a Medicare reimbursement delay. Daily debits restructured to a 90-day deferral while reimbursement timing normalized, with the deferral period documented in writing by both lenders.",
      },
    ],
    faq: [
      {
        q: "What does the free debt analysis include?",
        a: "Composite daily outflow across every active credit instrument, lender recourse assessment, and a written plan showing the specific relief options available to the business. You receive the plan whether or not you choose to engage further.",
      },
      {
        q: "Will my MCA lenders agree to lower payments?",
        a: "Outcomes depend on the lender, the contract, and the financial documentation supporting the request. Most lenders prefer a credible documented proposal to silence or default. We do not guarantee specific terms, but the engagement is built around presenting the strongest possible package each time.",
      },
      {
        q: "Will this affect my personal credit?",
        a: "MCAs and most business debts are not reported to personal credit bureaus, so renegotiation typically does not affect your personal credit score. Bank loans and lines of credit reported on personal credit are handled with that exposure in mind.",
      },
      {
        q: "Is this debt consolidation or a new loan?",
        a: "Neither. We do not lend, do not refinance, and do not consolidate by issuing new debt. The relief comes from renegotiating existing obligations with their original lenders.",
      },
      {
        q: "What happens if a lender sues during the engagement?",
        a: "If a creditor matter matures into litigation, we coordinate with state-licensed counsel retained directly by the business. The practice is not a law firm and does not represent clients in legal proceedings, but we continue to support the engagement with documentation and operating data.",
      },
      {
        q: "How much does the engagement cost?",
        a: "The debt analysis is free. The active engagement fee is scoped to the size and complexity of the obligated debt and presented to you in writing before you commit. We do not charge contingency fees or take a percentage of savings.",
      },
    ],
  },
  {
    slug: "business-debt-restructuring",
    name: "Business Debt Restructuring",
    shortName: "Restructuring",
    numeral: "02",
    metaTitle: "Business Debt Restructuring for Stacked MCAs",
    metaDescription:
      "Consolidate stacked MCAs and short-term business debt into one weekly payment. No new loans. Free analysis. Restructure existing obligations.",
    kicker: "Service 02",
    overview: [
      "Business Debt Restructuring takes a business carrying multiple credit instruments and rebuilds the obligation schedule into something the operation can actually support. Multiple daily MCA debits, equipment lease payments, vendor arrears, and a bank line all pulling against the same operating account are consolidated, sequenced, and reduced to a manageable weekly payment.",
      "This is not a new loan and it is not debt consolidation through refinancing. We do not lend and we do not put the business deeper into debt. The restructure works by renegotiating the existing agreements with their existing lenders, extending terms where appropriate, settling where settlement is the right answer, and producing a single weekly schedule that fits the verified margin of the business.",
      "Most engagements move from intake to a fully restructured payment schedule within 45 to 90 days, with the business continuing to operate normally throughout. The objective is operational continuity, not crisis management.",
    ],
    engagement: [
      { step: "Free debt analysis", duration: "30 min call + 5 day review", fee: "No fee" },
      { step: "Restructuring plan", duration: "Written plan with weekly payment", fee: "No fee" },
      { step: "Lender negotiations", duration: "45 to 90 days typical", fee: "Engagement fee" },
      { step: "Schedule activation", duration: "As agreements close", fee: "Included" },
    ],
    whatItAddresses: [
      "Three or more active credit instruments with overlapping payment cycles",
      "Combined daily debits and weekly payments exceeding the verified margin of the business",
      "Stacked MCAs where the composite cost of capital has never been computed",
      "Equipment leases and bank facilities that originated under a different revenue profile",
      "Operators who want a single weekly payment they can plan around instead of six different debits",
    ],
    methodology: [
      {
        title: "Composite debt schedule",
        body: "Every active instrument is collected, indexed, and reduced to one schedule showing lender, balance, periodic payment, lien position, and recourse. The schedule is the working document for everything that follows.",
      },
      {
        title: "Target weekly payment",
        body: "We model the weekly payment the business can support against verified trailing margin, payroll cycles, tax obligations, and operating reserves. The target weekly figure is the input to every lender negotiation.",
      },
      {
        title: "Sequenced lender negotiations",
        body: "Each lender is approached in sequence based on lien position and recourse. Senior secured creditors and lenders with the shortest recourse timelines are engaged first. Term extensions, deferrals, settlements, and modified payment schedules are presented as documented proposals.",
      },
      {
        title: "Single schedule activation",
        body: "As agreements close, the new payment schedule activates. The business operates on one weekly payment cadence across all restructured obligations, with the practice monitoring compliance and resolving any variance.",
      },
    ],
    deliverables: [
      "Composite debt schedule with every active instrument",
      "Target weekly payment supported by verified trailing margin",
      "Documented modification or settlement agreements for each lender that participates",
      "Single consolidated payment schedule across all restructured obligations",
      "Variance monitoring for the first 90 days post-activation",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "Daily debits replaced with weekly payments, reconciliation requests filed where overpayment has occurred, and settlements pursued on lenders with weakest recourse." },
      { name: "Equipment finance and capital leases", note: "Term extensions and payment modifications negotiated. Voluntary surrender plus deficiency settlement where the asset is no longer producing revenue." },
      { name: "Vendor and trade debt", note: "Aged payables sequenced into the new weekly schedule with COD-plus-arrears arrangements where supply continuity matters." },
      { name: "Bank term loans and lines of credit", note: "Covenant waivers, term extensions, and consolidated refinancing within the existing relationship pursued where the bank's special assets group is responsive." },
      { name: "IRS and state tax obligations", note: "Installment agreements integrated into the new weekly schedule, with current quarter deposit compliance protected throughout." },
    ],
    commonEngagements: [
      {
        title: "Construction contractor, 5 instruments",
        body: "Three MCAs, an equipment lease portfolio, and a bank line, with $11,200 of weekly outflow across six payment cycles. After 72 days, the schedule consolidated to a single weekly payment of $6,400, with two MCAs settled at 47% and 54% of balance.",
      },
      {
        title: "HVAC service company, post-growth distress",
        body: "Stacked working capital advances taken to fund a rapid expansion that did not produce projected revenue. Four active credit instruments restructured into one weekly schedule that matched actual margin, with the bank line extended and an MCA settled.",
      },
      {
        title: "Independent pharmacy, vendor and MCA mix",
        body: "Combined pharmaceutical wholesaler arrears and two MCAs. Vendor arrangements moved to COD-plus-weekly-arrears, and both MCAs restructured to weekly schedules sized against trailing revenue. Total weekly outflow reduced by 38%.",
      },
    ],
    faq: [
      {
        q: "Is restructuring the same as debt consolidation?",
        a: "No. Debt consolidation typically means taking out a new loan to pay off old loans. Restructuring renegotiates the existing obligations with their existing lenders. We do not lend, refinance, or add new debt to the business.",
      },
      {
        q: "Will my creditors agree to a single weekly schedule?",
        a: "Each lender agreement is negotiated individually, and the result is a coordinated schedule across all agreements that close. Outcomes depend on the lender, the contract, and the documented hardship. We present the strongest possible package each time, but specific terms are not guaranteed.",
      },
      {
        q: "How long does a restructuring engagement take?",
        a: "Most engagements close within 45 to 90 days. Complex cases involving five or more lenders, multi-entity structures, or pending litigation can run longer. We scope the timeline at engagement based on the specific debt mix.",
      },
      {
        q: "Will I have to stop paying my creditors during the engagement?",
        a: "No. The business continues to operate and meet obligations as it has been, while the practice negotiates the restructured terms. Stop-payment strategies are not part of the engagement.",
      },
      {
        q: "What if some lenders refuse to participate?",
        a: "The engagement is structured around the lenders that do participate. A lender that refuses to renegotiate remains on its original schedule, and we work to ensure the rest of the restructured terms accommodate that obligation.",
      },
      {
        q: "How is restructuring different from settlement?",
        a: "Restructuring extends or modifies the terms of existing debt without necessarily reducing the principal. Settlement pursues a discounted lump-sum payoff. Our engagements often combine both: some lenders are restructured, others are settled, depending on the recourse position and the lender's willingness.",
      },
    ],
  },
  {
    slug: "business-debt-settlement",
    name: "Business Debt Settlement",
    shortName: "Settlement",
    numeral: "03",
    metaTitle: "Business Debt Settlement & MCA Settlement",
    metaDescription:
      "Negotiate stacked business debt down. Historical settlements range from 40 to 80 percent of original balance. Free analysis. No new loans.",
    kicker: "Service 03",
    overview: [
      "Business Debt Settlement is the right service when the realistic outcome is a discounted lump-sum payoff rather than a restructured payment schedule. Lenders with weak recourse, obligations the business cannot service even after restructuring, and credit instruments where the lender prefers a settled balance to a litigated one are the typical candidates.",
      "Historical settlements across the practice have ranged from 40 to 80 percent of the original balance, depending on the lender, the contract, and the documented financial position of the business. Stronger settlements are reached on MCAs and short-term unsecured advances where lender recourse is procedural and slow. Senior secured creditors typically restructure rather than settle.",
      "Settlement requires capital to fund the payoff. The engagement scopes both the negotiation and the funding sequence, including whether the settlement is paid from operating cash, reserves, a single asset sale, or an investor injection. We do not lend or finance settlements ourselves.",
    ],
    engagement: [
      { step: "Free debt analysis", duration: "30 min call + 5 day review", fee: "No fee" },
      { step: "Settlement plan", duration: "Target balances + funding sequence", fee: "No fee" },
      { step: "Active negotiation", duration: "30 to 120 days typical", fee: "Engagement fee" },
      { step: "Funded settlements", duration: "As agreements close", fee: "Included" },
    ],
    whatItAddresses: [
      "MCAs and unsecured short-term debt where lender recourse is weak or procedural",
      "Obligations the business cannot service at original terms and cannot reasonably restructure",
      "Lenders that have signaled willingness to accept a discounted lump-sum payoff",
      "Personal guaranties that need to be released as part of the settled agreement",
      "Businesses with access to settlement capital from operations, asset sales, or investor sources",
    ],
    methodology: [
      {
        title: "Target balance modeling",
        body: "For each candidate obligation, we model the realistic settlement range based on lender posture, contract terms, the documented hardship narrative, and comparable outcomes across the practice. The target is a range, not a single number, and the negotiation operates within that range.",
      },
      {
        title: "Funding sequence",
        body: "Settlement requires capital. We sequence the funding plan against the settlement timeline, identify which obligations are settled first, and ensure the operating envelope is protected throughout. We do not provide settlement capital and do not coordinate with funders or lenders who do.",
      },
      {
        title: "Lender negotiations",
        body: "Each lender is approached with a documented hardship narrative, supporting financials, and a target lump-sum offer. We manage every communication, every counter, and every revision in writing. The lender file documents the full negotiation history.",
      },
      {
        title: "Closed agreements with release language",
        body: "Every settled balance closes with a written agreement that includes release language on any personal guaranty, lien release on any secured collateral, and confirmation that the obligation is paid in full. Every settlement agreement is reviewed line by line before execution.",
      },
    ],
    deliverables: [
      "Target settlement range for each candidate obligation",
      "Funding sequence aligned to settlement timeline",
      "Documented lender file with the full negotiation history for each obligation",
      "Settled agreements with release language reviewed line by line",
      "Closeout documentation showing paid-in-full status for each settled balance",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "Most common settlement target. Historical settlements range from 40 to 75 percent of balance depending on lender, contract, and timing." },
      { name: "Unsecured short-term loans", note: "Online lender unsecured advances and revenue-based financing instruments. Settlement range varies widely based on the lender's collection posture." },
      { name: "Vendor and trade debt", note: "Aged trade payables where the vendor relationship will not continue, settled as discounted lump-sum payoffs with release language." },
      { name: "Bank charge-offs and acceleration", note: "Bank obligations that have charged off or accelerated. Settlement is negotiated with the bank's recovery department or with the secondary purchaser if the debt has been sold." },
      { name: "Equipment lease deficiency balances", note: "Deficiency balances after voluntary surrender, settled at a discount where the lessor's recovery posture is weak." },
    ],
    commonEngagements: [
      {
        title: "Trucking carrier, 3 MCAs",
        body: "Combined MCA balance of $312,000 across three lenders. Negotiation closed with one settlement at 44%, one at 58%, and one at 67% of balance. Total settled payoff funded from a combination of operating cash and a single tractor sale, with all three personal guaranties released.",
      },
      {
        title: "Specialty retailer, post-pandemic stack",
        body: "Four stacked MCAs and an unsecured online lender advance taken during a revenue trough. Total balance of $194,000 settled across all five lenders at a blended 51% of balance. Settlement capital sourced from an investor injection tied to the closeout.",
      },
      {
        title: "Construction contractor, bank charge-off",
        body: "A bank term loan that had charged off and been sold to a recovery firm. Settled at 38% of charged-off balance with full release of the personal guaranty, funded from a single equipment sale that had been planned independently of the settlement.",
      },
    ],
    faq: [
      {
        q: "What range of settlements should I realistically expect?",
        a: "Historical settlements across the practice range from 40 to 80 percent of the original balance. Stronger settlements occur on MCAs and unsecured advances with weak lender recourse. Senior secured lenders typically restructure rather than settle. Each engagement is scoped to the realistic range for the specific debt mix.",
      },
      {
        q: "Do I need cash on hand to settle?",
        a: "Yes. Settlement is paid as a discounted lump sum to each lender, and the engagement requires identified settlement capital. The funding sequence is part of the engagement scope, and we will not start lender negotiations on an obligation that has no realistic funding path.",
      },
      {
        q: "Will settled debt show up on my credit report?",
        a: "MCAs and most business debts are not reported to personal credit bureaus. Bank charge-offs and certain unsecured advances may be reported, and any reporting is addressed in the closeout documentation. Settled accounts are typically updated to reflect paid-in-full status where reporting exists.",
      },
      {
        q: "What about confessions of judgment?",
        a: "Where a confession of judgment has been filed or is threatened, we coordinate with state-licensed counsel retained directly by the business. The practice is not a law firm. We continue to support the engagement with documentation, but COJ defense is the responsibility of qualified counsel.",
      },
      {
        q: "How do you charge for settlement work?",
        a: "Flat engagement fee scoped to the obligation count and complexity, presented in writing before you commit. We do not charge contingency fees, success fees, or percentage-of-savings fees.",
      },
      {
        q: "Are there tax consequences to settling business debt?",
        a: "Settled debt can generate cancellation-of-debt income for tax purposes, with specific exclusions available depending on the entity structure and the financial condition of the business. We coordinate with the client's tax professional during the engagement so the tax treatment is understood before settlements close.",
      },
    ],
  },
  {
    slug: "bankruptcy-alternative",
    name: "Bankruptcy Alternative",
    shortName: "Bankruptcy Alternative",
    numeral: "04",
    metaTitle: "Business Bankruptcy Alternative — Restructure Without Filing",
    metaDescription:
      "Restructure stacked business debt without filing for bankruptcy. Keep operating, keep equipment, keep the entity. Free analysis for SMEs.",
    kicker: "Service 04",
    overview: [
      "Bankruptcy Alternative is the right service when an operator is being told to file Chapter 11 or Chapter 7 but has a viable underlying business that can keep running. Filing carries legal cost, equipment risk, customer disclosure, and a long shadow on the entity. For most SMEs with stacked short-term debt, a structured out-of-court workout is faster, cheaper, and less disruptive than a formal filing.",
      "The engagement combines aggressive restructuring with selective settlement to bring the obligation schedule inside what the business can support. Equipment stays in service. Customer relationships stay intact. The entity continues to operate under its existing tax ID, its existing licensing, and its existing payer or contract relationships.",
      "This is not a substitute for legal advice. Where filing is genuinely the right answer, we say so, and we coordinate with state-licensed bankruptcy counsel for clients who choose that path. The work begins with an honest assessment of whether the business is genuinely a workout candidate.",
    ],
    engagement: [
      { step: "Free workout assessment", duration: "30 min call + 5 day review", fee: "No fee" },
      { step: "Workout plan", duration: "Restructure + settlement sequence", fee: "No fee" },
      { step: "Active engagement", duration: "60 to 180 days typical", fee: "Engagement fee" },
      { step: "Operational stabilization", duration: "Post-workout monitoring", fee: "Optional retainer" },
    ],
    whatItAddresses: [
      "Operators being advised to file but unsure whether the business is genuinely a filing candidate",
      "Businesses with stacked short-term debt and underlying margin that can support a restructured schedule",
      "Equipment-dependent operations where retaining the equipment is essential to revenue generation",
      "Multi-entity structures where filing one entity would trigger cross-defaults and harm the others",
      "Businesses where customer or payer relationships would be materially damaged by a public filing",
    ],
    methodology: [
      {
        title: "Honest filing assessment",
        body: "Before any workout work begins, we assess whether the business is a viable workout candidate or whether filing is genuinely the better path. The assessment includes margin viability, secured lender posture, equipment risk, and tax exposure. We do not push workouts on businesses that should file.",
      },
      {
        title: "Combined restructure and settlement plan",
        body: "Where a workout is viable, the plan combines aggressive restructuring on creditors that will negotiate with settlement on creditors with weakest recourse. The output is a single sequenced path from current state to a sustainable obligation schedule.",
      },
      {
        title: "Active workout execution",
        body: "We execute the restructure and settlement sequence in parallel, manage every lender communication, and protect the operating envelope throughout. Where any creditor escalates to litigation, we coordinate with client counsel and continue the workout in parallel with the legal matter.",
      },
      {
        title: "Operational stabilization",
        body: "After the workout closes, the engagement transitions to operational stabilization. The verified margin, the post-workout payment schedule, and the cash control discipline are monitored against actual performance to ensure the business does not return to the same distress.",
      },
    ],
    deliverables: [
      "Honest filing assessment with documented rationale for workout versus filing",
      "Combined workout plan with restructure and settlement sequence",
      "Documented agreements with every lender that participates in the workout",
      "Personal guaranty release language reviewed on every settled balance",
      "Post-workout operational monitoring for the first 6 months",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "Restructured or settled depending on lender posture. Confession of judgment matters coordinated with client counsel." },
      { name: "Equipment finance and capital leases", note: "Restructured to preserve revenue-essential equipment. Voluntary surrender used selectively for non-essential assets." },
      { name: "Vendor and trade debt", note: "Sequenced into the workout schedule with supplier relationships preserved where they are operationally critical." },
      { name: "Bank term loans and lines of credit", note: "Forbearance, covenant waiver, and restructure proposals coordinated with the bank's special assets group." },
      { name: "IRS and state tax obligations", note: "Installment agreements coordinated with a qualified tax professional. Trust fund and personal exposure addressed first." },
    ],
    commonEngagements: [
      {
        title: "Manufacturing operation, advised to file Chapter 11",
        body: "An operator advised by counsel to file Chapter 11 with $1.8M in stacked obligations. Workout assessment found the underlying margin was viable. After 138 days, three MCAs were settled at a blended 49% of balance, the bank line was restructured with covenant waivers, and the business avoided filing while preserving customer contracts.",
      },
      {
        title: "Specialty contractor, equipment-dependent",
        body: "A contractor with five financed pieces of equipment essential to revenue and stacked MCA debt threatening repossession. Equipment leases restructured to preserve operations, MCAs settled or restructured depending on recourse, and the business continued operating without disrupting active job sites.",
      },
      {
        title: "Multi-entity holding structure",
        body: "A holding company with three operating subsidiaries, two of which were carrying stacked debt that threatened the other. Workout isolated the distressed obligations to the affected subsidiaries, restructured or settled each, and preserved the unaffected subsidiaries from cross-default exposure.",
      },
    ],
    faq: [
      {
        q: "When should I actually file for bankruptcy?",
        a: "Filing is the right answer when the business has no viable underlying margin, when secured lenders are aggressively foreclosing on essential collateral, when tax exposure has reached a point where personal liability is unavoidable, or when the cost of the workout exceeds the realistic improvement. We give an honest assessment before the engagement starts.",
      },
      {
        q: "Will I lose my equipment in a workout?",
        a: "Equipment essential to revenue generation is protected throughout the workout. Non-essential equipment may be surrendered selectively when surrender plus deficiency settlement produces a better outcome than continued payments. The plan documents every equipment decision before execution.",
      },
      {
        q: "Do I have to disclose the workout to customers or contracts?",
        a: "No. The workout is private. Bankruptcy filings are public record and often appear in commercial credit reports, customer due diligence, and public disclosure schedules. Out-of-court workouts do not trigger those disclosures.",
      },
      {
        q: "What happens to my personal guaranty?",
        a: "Where lenders settle, we negotiate release of the personal guaranty as part of the settled agreement. Where lenders restructure rather than settle, the personal guaranty typically remains in place subject to the modified terms. Every guaranty position is documented in the closeout package.",
      },
      {
        q: "How is the workout different from Chapter 11?",
        a: "Chapter 11 is a court-supervised reorganization with mandatory disclosure, court fees, attorney fees, and creditor committee oversight. A workout is a private negotiation with the same end goal — a sustainable obligation schedule — without the cost, disclosure, or operational disruption of court proceedings. Workouts are not always available or appropriate, and we say so when that is the case.",
      },
      {
        q: "How long does a workout take?",
        a: "Most workouts close in 60 to 180 days. Cases with five or more lenders, pending litigation, or multi-entity structures may run longer. We scope the timeline at engagement against the specific debt mix and creditor posture.",
      },
    ],
  },
];

export function getServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}

export function findService(slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
