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
  homeSummary: string;
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
    slug: "creditor-communication",
    name: "Creditor Communication Management",
    shortName: "Creditor Communication",
    numeral: "01",
    metaTitle: "Creditor Communication Management for Small Business",
    metaDescription:
      "We become the point of contact for your creditors. Daily calls and emails stop. You get back to running the business while we manage every conversation.",
    homeSummary:
      "When MCA lenders, banks, vendors, or the IRS keep calling, we step in as the contact. The daily calls and threatening letters stop. We give each creditor straight answers and a clear timeline. You get back to running the business.",
    kicker: "Service 01",
    overview: [
      "When your MCA lender, bank, or vendor calls, we pick up. You do not have to. We become the point of contact for every creditor on your account, so the daily calls, emails, and threatening letters stop hitting your phone.",
      "We do not lie to your creditors and we do not stall them. We give each one a clear picture of where the business is, what is possible, and what timeline we need to work things out. Most lenders prefer talking to a structured contact over chasing a stressed business owner.",
      "This is usually the first thing we do when a client comes in. It buys breathing room while we build the bigger plan.",
    ],
    engagement: [
      { step: "Free intake call", duration: "30 min", fee: "No fee" },
      { step: "Account setup", duration: "1-3 days", fee: "Flat fee" },
      { step: "Active communication", duration: "60-180 days", fee: "Monthly fee" },
      { step: "Closeout + hand-off", duration: "As reached", fee: "Included" },
    ],
    whatItAddresses: [
      "Daily phone calls and emails from creditors",
      "Threatening letters or legal demands you have not answered",
      "Multiple lenders all asking for an update at the same time",
      "Owners who cannot run the business because of constant calls",
      "Recent missed payments or defaults that need an explanation now",
    ],
    methodology: [
      {
        title: "Intake",
        body: "We collect every loan, every cash advance, and every unpaid bill into one list. Names, balances, contact information, and what each creditor has been told so far.",
      },
      {
        title: "First contact",
        body: "We send written notice to each creditor letting them know we are now the point of contact. From that day forward, calls and emails come to us.",
      },
      {
        title: "Cadence",
        body: "We answer creditor questions. We send updates on a schedule they can rely on. We do not ghost lenders, and we do not let them go silent on us either.",
      },
      {
        title: "Logging",
        body: "Every call, email, and letter is recorded in one place. You can see exactly what was said to whom, at any time.",
      },
    ],
    deliverables: [
      "One central list of every creditor with open balance and contact info",
      "Written notice sent to each creditor about our communication role",
      "Weekly summary of what was said and to whom",
      "Hand-off file if you decide to bring in a lawyer or change advisors",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "We talk to the MCA company directly. We ask about reconciliation, settlement, or restructure based on what makes sense for your situation." },
      { name: "Equipment finance and leases", note: "We open a conversation with the lender about extending terms, lowering payments, or returning equipment if it is no longer earning." },
      { name: "Vendors and suppliers", note: "We manage written payment plans with the suppliers you want to keep, and discount payoffs with the ones you do not." },
      { name: "Bank loans and lines of credit", note: "We work with the bank's special assets group when there is a problem. We do not let the relationship go silent." },
      { name: "IRS and state tax", note: "Tax matters require a qualified tax professional. We coordinate with one and keep the IRS up to date on the plan." },
    ],
    commonEngagements: [
      {
        title: "Trucking carrier with 4 MCAs",
        body: "The owner was getting 30 plus calls a week. After we took over, he spoke to no lender for 6 weeks while we set the plan. By week 8, every MCA had a documented agreement in writing.",
      },
      {
        title: "Restaurant group with vendor and bank issues",
        body: "Three suppliers and the bank were all asking for updates the same week. We sent one written update to all four on the same day, and set a weekly cadence so nobody was left guessing.",
      },
      {
        title: "Specialty contractor in default",
        body: "A demand letter had landed and the owner had not responded for two weeks. We picked up the conversation, set a deadline for the plan delivery, and bought enough time to negotiate before the lender escalated.",
      },
    ],
    faq: [
      {
        q: "Can creditors still call me directly?",
        a: "They can, but most stop once they have a documented contact for the matter. If a creditor refuses to route through us, we still log every call and respond on your behalf.",
      },
      {
        q: "Will my creditors think the business is in trouble?",
        a: "They already do, or they would not be calling daily. What they want is a clear, documented plan. Bringing in a professional contact is read as a sign the owner is taking the matter seriously, not running from it.",
      },
      {
        q: "Do you provide legal advice?",
        a: "No. We are not a law firm. When a creditor matter turns into a lawsuit or a confession of judgment, we coordinate with a state-licensed attorney you retain directly.",
      },
      {
        q: "How quickly can communication start?",
        a: "Same day in most cases. We collect the creditor list during the intake call and send the first round of written notices within 24 to 48 hours.",
      },
      {
        q: "What does this cost?",
        a: "There is a flat setup fee and a monthly fee for the active period. Specific numbers are quoted in writing during intake, based on how many creditors are involved and how active they are.",
      },
      {
        q: "What happens when the engagement ends?",
        a: "You receive a complete file with every communication, every agreement, and the current status of every creditor. If you want to keep the service going as a permanent arrangement, we can do that too.",
      },
    ],
  },
  {
    slug: "debt-relief-planning",
    name: "Strategic Debt Relief Planning",
    shortName: "Relief Planning",
    numeral: "02",
    metaTitle: "Strategic Debt Relief Planning for Small Business",
    metaDescription:
      "Before any creditor talks, you need a plan. We build a written plan showing which debts get paid, which get discounted, and on what timeline.",
    homeSummary:
      "Before we talk to any creditor, we build the plan. We look at every loan and what your business can really pay each week. Then we show you exactly who gets paid in full, who gets a discount, and who gets more time. The plan is yours in writing before any creditor work begins.",
    kicker: "Service 02",
    overview: [
      "Before anyone signs a deal with a creditor, you need a plan. We build it.",
      "We look at every loan and every cost in your business. We figure out what the business can really afford each week. Then we lay out the best path forward: who gets paid in full, who gets a discount, who gets more time, and in what order.",
      "The plan is yours in writing before any creditor work begins. You see the trade-offs and you decide what to do. If you do not move forward with us, you keep the plan.",
    ],
    engagement: [
      { step: "Free review", duration: "30 min + 5 day analysis", fee: "No fee" },
      { step: "Written plan delivery", duration: "2-3 weeks", fee: "Flat fee" },
      { step: "Decision call", duration: "60 min walkthrough", fee: "Included" },
      { step: "Hand-off", duration: "Plan is yours", fee: "Included" },
    ],
    whatItAddresses: [
      "Owners who know they are in trouble but do not have a clear plan to fix it",
      "Businesses with 3 or more lenders pulling money out of the same account",
      "Cases where the owner is paying creditors but missing payroll, taxes, or rent",
      "Situations where one or two creditors have been paid in full while others have not been paid at all",
      "Operators who want to see the math before signing any agreement",
    ],
    methodology: [
      {
        title: "Money in and out",
        body: "We collect 90 days of bank statements and reconstruct exactly how much money is coming in each week and where every dollar is going. Most owners are surprised by what this shows.",
      },
      {
        title: "Affordable weekly payment",
        body: "We figure out the most the business can actually pay creditors each week without missing payroll, rent, fuel, or tax deposits. This is the number every plan is built around.",
      },
      {
        title: "Creditor priority",
        body: "Some lenders can hurt the business fast (a confession of judgment can freeze the bank account in a day). Others move slowly. We rank every creditor by how much damage they can do, and sequence the plan around that.",
      },
      {
        title: "Trade-off menu",
        body: "We present the options. Pay this lender in full and settle two others. Restructure all four into a single payment. Surrender the equipment lease and settle the deficiency. You see the trade-offs and pick the path.",
      },
    ],
    deliverables: [
      "Verified weekly cash picture for the business",
      "Maximum affordable weekly payment to creditors",
      "Creditor ranking by how fast each can take action",
      "Written plan showing exactly which lender gets what, and when",
      "Estimated total savings if the plan is executed in full",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "MCAs that overcharged or never reconciled may be eligible for refunds or settlement at a discount. We model both into the plan." },
      { name: "Equipment finance and leases", note: "We compare keeping the equipment, returning it, or buying it out at a discount, and put the best option in the plan." },
      { name: "Vendors and suppliers", note: "We separate suppliers you must keep from suppliers you do not, and plan a different approach for each group." },
      { name: "Bank loans and lines of credit", note: "We model whether a forbearance, modification, or refinance is realistic, and what the bank is likely to accept." },
      { name: "IRS and state tax", note: "Tax balances go into the plan with a recommended installment agreement or offer in compromise, coordinated with a tax professional." },
    ],
    commonEngagements: [
      {
        title: "Construction contractor, 6 creditors",
        body: "The plan showed that paying two MCAs in full would not solve anything. The recommended path settled three at a discount, restructured the bank loan, and kept the supplier relationship intact. The owner saw the math before any creditor was called.",
      },
      {
        title: "Independent pharmacy with stacked working capital",
        body: "Three short-term advances and a wholesaler balance. The plan ranked the wholesaler first (essential for inventory) and the advances last (slow recourse). The owner approved the plan in one meeting.",
      },
      {
        title: "Trucking owner with mixed lien position",
        body: "Two MCAs, an equipment lease, and a factor relationship. The plan kept the factor (cash flow source), surrendered one truck, and settled both MCAs from the equipment sale proceeds.",
      },
    ],
    faq: [
      {
        q: "What if I do not like the plan you build?",
        a: "You keep it. There is no obligation to move forward with us after the plan is delivered. Many clients use the plan as a second opinion before working with another advisor or an attorney.",
      },
      {
        q: "How long does the planning take?",
        a: "Most plans are delivered 2 to 3 weeks after intake. Complex cases with multi-entity structures, unfiled taxes, or pending lawsuits may take longer. We tell you the timeline at intake.",
      },
      {
        q: "Do you need access to my bank account?",
        a: "We need 90 days of bank statements (PDF download or screenshot). We do not need login credentials and we do not touch the operating account.",
      },
      {
        q: "Is this the same as bankruptcy planning?",
        a: "No. Bankruptcy planning is done by an attorney and ends in a court filing. This is out-of-court planning that aims to avoid bankruptcy. If filing is the right answer for you, we will say so and recommend an attorney.",
      },
      {
        q: "What does the plan look like?",
        a: "A 6 to 12 page written document. Plain language, no jargon. Front page: the recommended path. Middle: the math behind it. Back: the timeline and what we do next if you decide to move forward.",
      },
      {
        q: "How much does it cost?",
        a: "Flat fee, quoted in writing after intake. The fee depends on how many creditors are involved and how complex the case is. There are no contingency or success fees.",
      },
    ],
  },
  {
    slug: "business-debt-restructuring",
    name: "Business Debt Restructuring",
    shortName: "Restructuring",
    numeral: "03",
    metaTitle: "Business Debt Restructuring — One Weekly Payment",
    metaDescription:
      "Combine stacked business loans and advances into a single manageable weekly payment. No new loans. We renegotiate the existing agreements with the existing lenders.",
    homeSummary:
      "If too many loans are pulling money out of your account every day, we combine them into one weekly payment. No new loans. We renegotiate the existing agreements with the existing lenders. Most engagements close in 45 to 90 days, with the business operating throughout.",
    kicker: "Service 03",
    overview: [
      "If your business has too many loans pulling money out every day, we can combine them into one weekly payment. The lenders agree to it. You stop trying to keep track of six different payment schedules.",
      "This is not a new loan and it is not debt consolidation through refinancing. We do not lend, and we do not put the business deeper into debt. We work with your existing lenders to change the terms on what you already owe.",
      "Most engagements close in 45 to 90 days. The business keeps operating throughout.",
    ],
    engagement: [
      { step: "Free review", duration: "30 min + 5 day analysis", fee: "No fee" },
      { step: "Restructuring plan", duration: "Written, with target weekly amount", fee: "No fee" },
      { step: "Lender negotiations", duration: "45-90 days", fee: "Engagement fee" },
      { step: "New schedule activation", duration: "As agreements close", fee: "Included" },
    ],
    whatItAddresses: [
      "Three or more loans or advances all pulling from the same account",
      "Daily debits and weekly payments adding up to more than the business can really afford",
      "Stacked MCAs where nobody has done the math on the true cost",
      "Equipment leases and bank facilities sized for a different time in the business",
      "Owners who want one weekly payment they can plan around",
    ],
    methodology: [
      {
        title: "Full debt list",
        body: "Every loan, advance, lease, and unpaid bill goes into one list. Lender names, balances, payment amounts, and what kind of leverage each one has.",
      },
      {
        title: "Target weekly payment",
        body: "We figure out the most you can pay creditors each week and still cover payroll, rent, and taxes. That target is what every lender negotiation works toward.",
      },
      {
        title: "Lender by lender",
        body: "Each creditor is approached in the right order. Lenders with the most leverage first, slower-moving creditors later. We ask for term extensions, payment cuts, or settlements based on what each one is likely to accept.",
      },
      {
        title: "One schedule activates",
        body: "As agreements close, your daily debits and multiple payments are replaced with one weekly schedule. We watch the first 90 days to make sure everything is running as agreed.",
      },
    ],
    deliverables: [
      "One complete debt list with every active loan and advance",
      "Target weekly payment supported by your real cash flow",
      "Written agreements with every lender that participates",
      "One consolidated payment schedule across all restructured debts",
      "Monitoring for the first 90 days after activation",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "Daily debits get replaced with weekly payments. If you have been overcharged, we ask for a refund. Some advances settle outright." },
      { name: "Equipment finance and leases", note: "Payments get lowered or terms get extended. If equipment is no longer earning, we can return it and settle the rest." },
      { name: "Vendors and suppliers", note: "Old unpaid balances go into the new weekly schedule. New orders move to cash on delivery where it makes sense." },
      { name: "Bank loans and lines of credit", note: "Term loans get rewritten. Lines of credit get extended or right-sized. Rule violations get waived when the bank sees a real plan." },
      { name: "IRS and state tax", note: "Past-due balances fit into the new schedule through a formal installment agreement, set up with a tax professional." },
    ],
    commonEngagements: [
      {
        title: "Construction contractor with 5 creditors",
        body: "Three MCAs, an equipment portfolio, and a bank line. Weekly outflow was $11,200 spread across six payment cycles. After 72 days, the schedule consolidated to a single weekly payment of $6,400, with two MCAs settled along the way.",
      },
      {
        title: "HVAC company after a slow year",
        body: "Stacked working capital taken during a year that did not produce the expected revenue. Four lenders restructured into one weekly schedule that matched actual margin. The bank extended the line, and one MCA settled.",
      },
      {
        title: "Independent pharmacy with vendor and MCA mix",
        body: "Wholesaler arrears plus two MCAs. The wholesaler moved to cash plus weekly arrears, and both MCAs restructured to weekly schedules. Total weekly outflow dropped by 38 percent.",
      },
    ],
    faq: [
      {
        q: "Is restructuring the same as a consolidation loan?",
        a: "No. A consolidation loan is a new loan that pays off old loans. Restructuring renegotiates the terms of what you already owe. We do not lend and we do not refinance.",
      },
      {
        q: "Will all my creditors agree to this?",
        a: "Each lender is negotiated separately. Most participate when the documentation is solid. If a lender refuses, we work the rest of the plan around that one, and the business keeps its existing schedule with the holdout.",
      },
      {
        q: "How long does it take?",
        a: "Most restructurings close in 45 to 90 days. Complex cases with 5 or more lenders, multi-entity structures, or pending lawsuits can take longer. We tell you the realistic timeline at intake.",
      },
      {
        q: "Do I keep paying creditors while you negotiate?",
        a: "Yes. The business continues to meet its obligations as it has been while we negotiate the new terms. We do not advise stopping payments to force lenders to the table.",
      },
      {
        q: "Will this hurt my personal credit?",
        a: "Most business debts (MCAs, equipment leases, vendor balances) do not report to personal credit bureaus. Bank loans and lines that do report are handled with that exposure in mind.",
      },
      {
        q: "What happens to my personal guaranty?",
        a: "When a lender restructures rather than settles, the personal guaranty usually stays in place under the new terms. When a lender settles, we negotiate release language for the guaranty as part of the agreement.",
      },
    ],
  },
  {
    slug: "bankruptcy-alternative",
    name: "Alternative to Bankruptcy",
    shortName: "Bankruptcy Alternative",
    numeral: "04",
    metaTitle: "Alternative to Bankruptcy for Small Business",
    metaDescription:
      "Restructure stacked business debt without filing. Keep operating, keep your equipment, keep the entity. We give an honest assessment before any engagement.",
    homeSummary:
      "When a lawyer tells you to file Chapter 11, but the business is still working and still serving customers, you may have another option. We do an honest check first: can the business actually keep operating, or is bankruptcy really the answer. If a workout makes sense, we combine restructuring with selective settlements so the entity, the equipment, and the customer relationships stay intact.",
    kicker: "Service 04",
    overview: [
      "When a lawyer tells you to file Chapter 11 or Chapter 7, but the business is still running and still serving customers, you might have another option. We do an honest check first: can the business actually keep operating, or is bankruptcy really the answer?",
      "If a workout makes sense, we combine aggressive restructuring with selective settlement to bring what you owe down to something the business can handle. Equipment stays in service. Customer relationships stay intact. The entity keeps its tax ID, its licenses, and its contracts.",
      "If filing is genuinely the right answer, we say so. This service is not for businesses that should be filing. It is for the ones that have been told to file but do not actually need to.",
    ],
    engagement: [
      { step: "Free assessment", duration: "30 min + 5 day analysis", fee: "No fee" },
      { step: "Workout plan", duration: "Written restructure and settlement sequence", fee: "No fee" },
      { step: "Active engagement", duration: "60-180 days", fee: "Engagement fee" },
      { step: "Stabilization monitoring", duration: "First 6 months post-workout", fee: "Optional retainer" },
    ],
    whatItAddresses: [
      "Owners being told to file but not sure if bankruptcy is the right answer",
      "Businesses with stacked debt where the underlying operation is still profitable",
      "Equipment-heavy businesses where losing the equipment in a filing would end the business",
      "Multi-entity structures where filing one entity would damage the others",
      "Operators worried about losing customers or contracts because of a public filing",
    ],
    methodology: [
      {
        title: "Honest filing check",
        body: "Before any workout work starts, we look at whether the business is genuinely a candidate for a workout, or whether filing is the better path. We do not push workouts on businesses that should file.",
      },
      {
        title: "Combined plan",
        body: "If a workout makes sense, the plan mixes hard restructuring on creditors who will negotiate with settlement on creditors with weaker positions. One clear sequence from where you are now to where you can sustain.",
      },
      {
        title: "Active execution",
        body: "We run restructure and settlement work in parallel. We manage every creditor conversation. If any lender escalates to a lawsuit, we coordinate with your attorney and keep the rest of the workout moving.",
      },
      {
        title: "Stabilization",
        body: "After the workout closes, we help the business stay out of the same trap. New cash discipline, a clear weekly schedule, and 6 months of monitoring against the plan.",
      },
    ],
    deliverables: [
      "Honest assessment of workout versus filing with the reasoning in writing",
      "Combined workout plan with restructure and settlement sequence",
      "Written agreements with every creditor that participates",
      "Personal guaranty release language reviewed on every settled balance",
      "Six months of monitoring after the workout closes",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "Restructured or settled depending on lender posture. Confession of judgment matters get coordinated with your attorney." },
      { name: "Equipment finance and leases", note: "Equipment essential to revenue stays in service. Non-essential equipment can be returned with the leftover balance settled at a discount." },
      { name: "Vendors and suppliers", note: "Suppliers you need stay supplied. Suppliers you do not need get settled at a discount." },
      { name: "Bank loans and lines of credit", note: "Rule violations get waived. Loans get rewritten with payment changes the bank can accept." },
      { name: "IRS and state tax", note: "Past-due taxes get into a formal installment agreement. Trust fund and personal exposure get addressed first." },
    ],
    commonEngagements: [
      {
        title: "Manufacturing operation told to file Chapter 11",
        body: "The lawyer had recommended Chapter 11 with $1.8M in stacked obligations. Our check found the underlying margin was still good. After 138 days, three MCAs settled at an average of 49 percent, the bank line was restructured, and the business avoided the filing.",
      },
      {
        title: "Specialty contractor with equipment exposure",
        body: "Five financed pieces of equipment essential to revenue, plus stacked MCAs that were threatening repossession. The plan kept the equipment, settled or restructured the MCAs, and the business stayed on its active job sites through the workout.",
      },
      {
        title: "Holding company with one bad subsidiary",
        body: "Three operating subsidiaries, two carrying stacked debt that threatened the third. The plan isolated the debt to the two affected entities and resolved each separately, protecting the healthy subsidiary from cross-default damage.",
      },
    ],
    faq: [
      {
        q: "How do I know if I should actually file?",
        a: "If the business has no real margin left, if a senior lender is foreclosing on essential collateral, if tax exposure has gotten so big that personal liability is unavoidable, or if a workout would cost more than the improvement it produces, filing is probably the answer. We give an honest read before the engagement starts.",
      },
      {
        q: "Will I lose my equipment in a workout?",
        a: "Equipment that produces revenue stays in service. Non-essential equipment may get returned if doing so produces a better overall outcome. Every equipment decision is in the plan before we execute.",
      },
      {
        q: "Do customers find out?",
        a: "No. A workout is private. Bankruptcy filings are public record and often show up in credit reports and customer due diligence. An out-of-court workout does not trigger any of that.",
      },
      {
        q: "What happens to my personal guaranty?",
        a: "When a lender settles, we negotiate guaranty release as part of the agreement. When a lender restructures, the guaranty usually stays in place under the new terms. Every guaranty decision is documented at closeout.",
      },
      {
        q: "How is this different from Chapter 11?",
        a: "Chapter 11 is a court-supervised reorganization with public disclosure, court fees, attorney fees, and creditor committees. A workout is a private negotiation with the same goal — a payment schedule the business can sustain — without the cost or disclosure. It is not always available, and we say so when it is not.",
      },
      {
        q: "How long does a workout take?",
        a: "Most workouts close in 60 to 180 days. Cases with 5 or more lenders, pending lawsuits, or multi-entity structures may run longer.",
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
