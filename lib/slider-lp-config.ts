// Config-driven slider landing pages for Google Ads keyword campaigns.
// Each entry becomes /c/<id> with message-matched copy and its own lead source tag.
// The /mca page uses the "mca" entry to stay identical to its original design.

export type SliderLpConfig = {
  id: string;
  source: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTail: string;
  subline: string;
  bullets: string[];
  formQuestion?: string;
  ctaHeadline: string;
  ctaSub?: string;
};

const DEFAULT_FORM_QUESTION = "How much in MCA advances are currently active on your account?";

export const SLIDER_LP_CONFIGS: Record<string, SliderLpConfig> = {
  mca: {
    id: "mca",
    source: "mca-lp",
    metaTitle: "Business MCA Restructuring - Free Assessment",
    metaDescription:
      "Coordinated MCA program restructuring for stacked advances, equipment leases, vendor obligations, and IRS installments. Free assessment, real counsel, no commitment.",
    badge: "Free assessment for businesses with stacked MCA programs",
    headlineLead: "Restructure your",
    headlineAccent: "MCA stack",
    headlineTail: "and restore your business cash flow.",
    subline:
      "Stacked merchant cash advances, equipment leases, vendor obligations, and IRS installments. Most programs resolve in 6 to 18 months across five product categories.",
    bullets: [
      "Pause daily MCA withdrawals through formal reconciliation",
      "Equipment lease restructuring, term extensions and acceleration defense",
      "Vendor and banking program coordination",
      "IRS installment program structuring and offer in compromise",
      "Legal coordination in all 50 states when escalation is required",
    ],
    ctaHeadline: "Get out from under stacked MCA advances.",
  },
  "mca-debt-relief": {
    id: "mca-debt-relief",
    source: "mca-debt-relief-lp",
    metaTitle: "MCA Debt Relief - Free Assessment",
    metaDescription:
      "Real relief from merchant cash advance debt: paused daily debits, restructured payments, and negotiated balances. Free assessment, no commitment.",
    badge: "Free assessment for MCA debt relief",
    headlineLead: "Real",
    headlineAccent: "MCA debt relief",
    headlineTail: "without losing your business.",
    subline:
      "Daily debits paused through formal reconciliation, balances renegotiated, and one coordinated plan instead of five funders pulling from your account.",
    bullets: [
      "Daily withdrawals paused, often within 2 to 4 weeks",
      "Balances renegotiated with every funder in one coordinated plan",
      "Contract defects found and used as leverage on your side",
      "Pre-default and post-default programs",
      "Licensed counsel coordinated in all 50 states when needed",
    ],
    ctaHeadline: "Get relief from MCA debt, starting this week.",
  },
  "mca-settlement": {
    id: "mca-settlement",
    source: "mca-settlement-lp",
    metaTitle: "MCA Debt Settlement - Free Assessment",
    metaDescription:
      "Settle merchant cash advance debt at a documented discount. Average reduction of 47% off combined balances. Free assessment, no commitment.",
    badge: "Free settlement assessment for MCA debt",
    headlineLead: "Settle your MCA debt for",
    headlineAccent: "less than you owe",
    headlineTail: ".",
    subline:
      "Across recent programs, total payback lands at roughly half of the original combined balance. Structured settlements, documented releases, closed files.",
    bullets: [
      "Average reduction of 47% off combined advance balances",
      "Every settlement documented with releases and UCC terminations",
      "Escrowed funds so agreements close the day terms are reached",
      "Enforcement defense coordinated while negotiations run",
      "Most programs close inside a year",
    ],
    ctaHeadline: "Find out what your MCA debt would settle for.",
  },
  "business-debt-relief": {
    id: "business-debt-relief",
    source: "business-debt-relief-lp",
    metaTitle: "Business Debt Relief - Free Assessment",
    metaDescription:
      "Coordinated business debt relief across MCA, equipment, vendor, bank, and tax debt. Keep operating while the debt gets fixed. Free assessment.",
    badge: "Free assessment for stretched business debt",
    headlineLead: "Business debt relief that keeps you",
    headlineAccent: "operating",
    headlineTail: ".",
    subline:
      "MCA, equipment, vendor, bank, and tax debt handled in one coordinated program. Relief starts with the cash flow, not with a new loan.",
    bullets: [
      "All five debt categories coordinated in one plan",
      "Cash flow relief first, usually inside the first month",
      "Restructure or settle, based on your numbers, not our product",
      "No new loans required to start",
      "Licensed counsel in all 50 states when legal defense is needed",
    ],
    ctaHeadline: "Get out from under the debt without closing the doors.",
  },
  "business-debt-settlement": {
    id: "business-debt-settlement",
    source: "business-debt-settlement-lp",
    metaTitle: "Business Debt Settlement - Free Assessment",
    metaDescription:
      "Settle business debt at a documented discount with structured programs across MCA, vendor, and unsecured obligations. Free assessment, no commitment.",
    badge: "Free settlement assessment for business debt",
    headlineLead: "Settle business debt at a",
    headlineAccent: "documented discount",
    headlineTail: ".",
    subline:
      "Structured settlement programs for businesses whose obligations have outgrown any repayment schedule. Real discounts, written releases, protected operations.",
    bullets: [
      "Average reduction of 47% off enrolled balances",
      "Written releases and lien terminations on every closed position",
      "Secured and unsecured positions sequenced correctly",
      "Enforcement defense coordinated during the program",
      "Flat engagement pricing, never a percentage of your debt",
    ],
    ctaHeadline: "See what your business debt would settle for.",
  },
  "business-debt-consolidation": {
    id: "business-debt-consolidation",
    source: "business-debt-consolidation-lp",
    metaTitle: "Consolidate Business Debt Payments - Free Assessment",
    metaDescription:
      "One coordinated monthly obligation instead of five daily debits, without taking on another loan. Free assessment, no commitment.",
    badge: "Free assessment: one payment instead of daily debits",
    headlineLead: "One payment instead of",
    headlineAccent: "five daily debits",
    headlineTail: ", without another loan.",
    subline:
      "Most consolidation offers are just another advance. We consolidate the obligations themselves: renegotiated terms, one coordinated monthly structure, no new debt.",
    bullets: [
      "Every position renegotiated into one coordinated structure",
      "No new loan, no new lien, no factor rate",
      "Daily and weekly debits converted to monthly obligations",
      "Real refinancing arranged only when you actually qualify",
      "Watch out warnings on consolidation offers that are MCAs in disguise",
    ],
    ctaHeadline: "Consolidate the payments, not the problem.",
  },
  "stop-mca-debits": {
    id: "stop-mca-debits",
    source: "stop-mca-debits-lp",
    metaTitle: "Stop Daily MCA Withdrawals - Free Assessment",
    metaDescription:
      "Daily ACH debits draining the account? Formal reconciliation can pause or reduce them, often within weeks. Free assessment, no commitment.",
    badge: "Free assessment: stop the daily withdrawals",
    headlineLead: "Stop the daily MCA withdrawals",
    headlineAccent: "draining your account",
    headlineTail: ".",
    subline:
      "Your MCA contracts contain reconciliation rights the funders count on you never using. We enforce them, formally and fast.",
    bullets: [
      "Reconciliation requests filed on every eligible position",
      "Debits paused or reduced, often within 2 to 4 weeks",
      "Bank-level protections set up so payroll clears first",
      "Excess pulls documented and clawed into negotiation leverage",
      "Full restructuring program if the numbers call for it",
    ],
    ctaHeadline: "Make the withdrawals stop the right way.",
  },
};

SLIDER_LP_CONFIGS["mca-services"] = {
  id: "mca-services",
  source: "mca-services-lp",
  metaTitle: "MCA Services: Restructuring, Consolidation, Settlement - Free Assessment",
  metaDescription:
    "Full-stack MCA services: restructuring, payment consolidation, and settlement in one coordinated program. Free assessment, no commitment.",
  badge: "Free assessment across all MCA services",
  headlineLead: "MCA restructuring, consolidation, and settlement in",
  headlineAccent: "one coordinated program",
  headlineTail: ".",
  subline:
    "One audit decides the path. Restructuring converts daily debits to terms you can carry, consolidation merges positions into one obligation without a new loan, and settlement retires balances at a documented discount.",
  bullets: [
    "Forensic audit of every advance contract and payment history",
    "MCA restructuring: daily debits converted to monthly terms",
    "MCA consolidation: one coordinated obligation, no new loan",
    "MCA settlement: balances retired at an average 47% reduction",
    "Legal coordination in all 50 states when escalation is required",
  ],
  ctaHeadline: "One program, every MCA service your file needs.",
};

SLIDER_LP_CONFIGS["mca-attorney"] = {
  id: "mca-attorney",
  source: "mca-attorney-lp",
  metaTitle: "MCA Defense Attorneys Coordinated in Your State - Free Assessment",
  metaDescription:
    "COJ filed, account frozen, or funder in litigation? We coordinate licensed MCA defense attorneys in your state within 72 hours, backed by a full contract audit.",
  badge: "MCA defense: counsel coordinated within 72 hours",
  headlineLead: "MCA defense attorneys in your state,",
  headlineAccent: "coordinated within 72 hours",
  headlineTail: ".",
  subline:
    "Confessions of judgment, frozen accounts, UCC letters to your customers. We audit the contracts, build the defense file, and coordinate licensed MCA defense attorneys in all 50 states.",
  bullets: [
    "COJ response and vacatur strategy coordinated in days, not weeks",
    "Account freeze and garnishment response in your state",
    "UCC letters to your customers answered by counsel fast",
    "Contract defects documented and turned into leverage",
    "Strategy, negotiation, and litigation working the same file",
  ],
  formQuestion: "How much MCA debt is currently in dispute or default?",
  ctaHeadline: "Get real legal firepower on your side of the table.",
};

SLIDER_LP_CONFIGS["business-debt-services"] = {
  id: "business-debt-services",
  source: "business-debt-services-lp",
  metaTitle: "Business Debt Services - Free Assessment",
  metaDescription:
    "Complete business debt services: audit, restructuring, settlement, creditor negotiation, and legal coordination for real business debt relief. Free assessment.",
  badge: "Free assessment across all business debt services",
  headlineLead: "Every business debt service you need for",
  headlineAccent: "real relief",
  headlineTail: ".",
  subline:
    "Audit, restructuring, settlement, creditor negotiation, and legal coordination in one practice. MCA, equipment, vendor, bank, and tax debt handled end to end.",
  bullets: [
    "Forensic audit of every obligation before any recommendation",
    "Restructuring that converts crushing payments into workable terms",
    "Settlement programs at a documented average 47% reduction",
    "Creditor negotiation across funders, banks, vendors, and the IRS",
    "Licensed counsel coordinated in all 50 states when needed",
  ],
  ctaHeadline: "Business debt relief, delivered as a complete service.",
};

// Campaign (03.00) MCA_Debt: one LP per keyword theme
SLIDER_LP_CONFIGS["mca-restructuring"] = {
  id: "mca-restructuring",
  source: "mca-restructuring-lp",
  metaTitle: "MCA Restructuring - Free Assessment",
  metaDescription:
    "Restructure merchant cash advances: daily debits converted to monthly terms your cash flow can carry. Free assessment, no commitment.",
  badge: "Free assessment for MCA restructuring",
  headlineLead: "MCA restructuring that converts daily debits into",
  headlineAccent: "terms you can carry",
  headlineTail: ".",
  subline:
    "Balances stay whole; the velocity changes. Formal reconciliation pauses the bleeding, then every position is renegotiated into one workable structure.",
  bullets: [
    "Daily and weekly debits converted to monthly obligations",
    "Reconciliation enforced first, often cutting debits 30 to 50%",
    "Every funder inside the plan, documented in writing",
    "No default required, no new loan taken",
    "Most restructures show relief inside the first 30 to 60 days",
  ],
  ctaHeadline: "Restructure the stack before it restructures you.",
};

SLIDER_LP_CONFIGS["mca-consolidation"] = {
  id: "mca-consolidation",
  source: "mca-consolidation-lp",
  metaTitle: "MCA Consolidation Without Another Advance - Free Assessment",
  metaDescription:
    "Consolidate MCA payments into one coordinated obligation without taking a new advance. Free assessment, no commitment.",
  badge: "MCA consolidation without a new advance",
  headlineLead: "Consolidate your MCA payments,",
  headlineAccent: "not your problems",
  headlineTail: ".",
  subline:
    "Most consolidation offers are just another MCA with a bigger balance. We consolidate the obligations themselves: renegotiated positions, one coordinated payment, no new debt.",
  bullets: [
    "One coordinated payment replacing every daily debit",
    "No new advance, no factor rate, no new UCC lien",
    "Existing balances renegotiated down, not rolled up",
    "Reverse consolidation rescues if you already signed one",
    "Real refinancing arranged only when you truly qualify",
  ],
  ctaHeadline: "One payment. No new debt. That is real consolidation.",
};

SLIDER_LP_CONFIGS["mca-debt-help"] = {
  id: "mca-debt-help",
  source: "mca-debt-help-lp",
  metaTitle: "MCA Debt Help - Free Assessment",
  metaDescription:
    "Straight answers and real help for MCA debt: paused debits, renegotiated balances, coordinated defense. Free assessment, no commitment.",
  badge: "Free, straight-answer MCA debt assessment",
  headlineLead: "Drowning in MCA debt?",
  headlineAccent: "Real help",
  headlineTail: "starts with real numbers.",
  subline:
    "One call: what you actually owe, what it truly costs, and which path fits, restructuring, settlement, or defense. Including the paths that cost you nothing.",
  bullets: [
    "Free assessment of every position and its true cost",
    "The free moves first: reconciliation rights your contracts already contain",
    "Restructure, settle, or defend, based on your numbers",
    "No enrollment pressure, no percentage-of-debt fees",
    "Licensed counsel coordinated when enforcement starts",
  ],
  ctaHeadline: "Get help that starts with the truth about your file.",
};

SLIDER_LP_CONFIGS["get-out-of-mca-debt"] = {
  id: "get-out-of-mca-debt",
  source: "get-out-mca-lp",
  metaTitle: "Get Out of MCA Debt - Free Assessment",
  metaDescription:
    "There are five real ways out of MCA debt. Find out which one fits your file in one free assessment call. No commitment.",
  badge: "Free assessment: your way out, mapped",
  headlineLead: "There are five ways out of MCA debt.",
  headlineAccent: "One fits your file",
  headlineTail: ".",
  subline:
    "Reconciliation, restructuring, settlement, refinancing, or defense. The right one depends on your numbers, and the wrong one costs months you do not have.",
  bullets: [
    "All five exit paths evaluated against your actual cash flow",
    "The fastest relief moves executed first",
    "Average settlement reduction of 47% when settlement is the path",
    "Exit plans that protect payroll and operations throughout",
    "A clear timeline: most files close inside a year",
  ],
  ctaHeadline: "Map your way out. It starts with one call.",
};

SLIDER_LP_CONFIGS["merchant-cash-advance-relief"] = {
  id: "merchant-cash-advance-relief",
  source: "mca-relief-lp",
  metaTitle: "Merchant Cash Advance Relief - Free Assessment",
  metaDescription:
    "Relief from merchant cash advance debt: paused withdrawals, renegotiated balances, one coordinated program. Free assessment, no commitment.",
  badge: "Free merchant cash advance relief assessment",
  headlineLead: "Merchant cash advance relief that shows up in your",
  headlineAccent: "bank account",
  headlineTail: ", fast.",
  subline:
    "Relief means the withdrawals slow down this month, not a brochure. Reconciliation first, then restructuring or settlement, whichever your numbers support.",
  bullets: [
    "Withdrawals paused or reduced, often within 2 to 4 weeks",
    "Every advance contract audited for defects worth leverage",
    "Balances renegotiated across all funders at once",
    "Pre-default and post-default programs",
    "50-state legal coordination when funders escalate",
  ],
  ctaHeadline: "Feel the relief where it counts: your daily balance.",
};

SLIDER_LP_CONFIGS["mca-payment-reduction"] = {
  id: "mca-payment-reduction",
  source: "mca-payment-reduction-lp",
  metaTitle: "Lower Your MCA Payments - Free Assessment",
  metaDescription:
    "Your MCA contracts contain payment reduction rights funders hope you never use. We enforce them. Free assessment, no commitment.",
  badge: "Free assessment: lower the daily payments",
  headlineLead: "Your MCA contracts already contain the right to",
  headlineAccent: "lower payments",
  headlineTail: ". We enforce it.",
  subline:
    "Reconciliation clauses require funders to reduce debits when revenue declines. Documented, formal requests, backed by your bank statements, make it happen.",
  bullets: [
    "Reconciliation requests filed on every eligible position",
    "Payment reductions of 30 to 50% are common outcomes",
    "Excess pulls identified and turned into leverage",
    "Refusals documented and escalated as contract breaches",
    "Full restructuring when reduction alone is not enough",
  ],
  ctaHeadline: "Pay what the contract actually requires. Not more.",
};

SLIDER_LP_CONFIGS["reverse-consolidation-rescue"] = {
  id: "reverse-consolidation-rescue",
  source: "reverse-consolidation-lp",
  metaTitle: "Reverse Consolidation Problems? - Free Assessment",
  metaDescription:
    "Signed a reverse consolidation you regret? Structured unwinds release you through contract defects and sequenced negotiation. Free assessment.",
  badge: "Free assessment for reverse consolidation unwinds",
  headlineLead: "That reverse consolidation can usually be",
  headlineAccent: "unwound",
  headlineTail: ".",
  subline:
    "Most owners see the mistake within 60 days. The contracts are thin, the breaches are common, and a structured unwind gets you out without a default spiral.",
  bullets: [
    "Full audit of the consolidation contract and funding trail",
    "Promised payoffs that never happened become leverage",
    "Discounted payoffs at 30 to 50% of remaining balance are common",
    "ACH protections in place before any confrontation",
    "Most unwinds close inside 90 to 180 days",
  ],
  formQuestion: "How much is left on your reverse consolidation?",
  ctaHeadline: "Unwind the deal you should never have been sold.",
};

SLIDER_LP_CONFIGS["mca-coj-help"] = {
  id: "mca-coj-help",
  source: "mca-coj-lp",
  metaTitle: "COJ Filed or Account Frozen? - Immediate Assessment",
  metaDescription:
    "Confession of judgment filed or bank account frozen by an MCA funder? The first 72 hours decide the outcome. Immediate free assessment.",
  badge: "Emergency response: COJs and frozen accounts",
  headlineLead: "COJ filed? Account frozen?",
  headlineAccent: "The next 72 hours",
  headlineTail: "decide the outcome.",
  subline:
    "Confessions of judgment and account freezes move fast, but they have procedural clocks and defenses. We coordinate licensed counsel in your state within 72 hours.",
  bullets: [
    "Counsel coordinated in your state and the filing state within 72 hours",
    "Freeze response and exemption claims filed inside the deadlines",
    "Domestication of foreign judgments challenged where defective",
    "Payroll protection moves executed immediately",
    "Negotiated resolutions while defenses hold the line",
  ],
  formQuestion: "How much MCA debt is behind the enforcement action?",
  ctaHeadline: "Move now. The clocks are already running.",
};

export function getSliderLpIds(): string[] {
  return Object.keys(SLIDER_LP_CONFIGS).filter((id) => id !== "mca");
}
