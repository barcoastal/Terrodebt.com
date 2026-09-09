// Config-driven slider landing pages for Google Ads keyword campaigns.
// Each entry becomes /c/<id> with message-matched copy and its own lead source tag.
// The /mca page uses the "mca" entry to stay identical to its original design.
//
// Hero fields drive the top of the page. The body fields (headings, steps, why,
// stats, faq) drive the sections below the fold so each page reads specifically
// about its keyword. Any body field left undefined falls back to the shared
// defaults in components/lp/SliderLp.tsx.

export type LpStep = { n: string; title: string; body: string };
export type LpCard = { n: string; title: string; body: string };
export type LpStat = { n: string; title: string; body: string };
export type LpFaq = { q: string; a: string };

export type LpHeadings = {
  howItWorks?: string;
  why?: string;
  stats?: string;
  testimonials?: string;
  difference?: string;
  faq?: string;
  ctaBand?: string;
};

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
  // Per-page body content (keyword-matched). Optional; falls back to defaults.
  headings?: LpHeadings;
  steps?: LpStep[];
  why?: LpCard[];
  stats?: LpStat[];
  faq?: LpFaq[];
};

const DEFAULT_FORM_QUESTION = "How Much Debt Does Your Business Have?";

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
    headings: {
      howItWorks: "How MCA Restructuring Works With Business Debt Insider",
      why: "Why Merchants Choose Us to Restructure Their MCA Debt",
      stats: "MCA Restructuring by the Numbers",
      testimonials: "Merchants We Have Helped Restructure Their MCA Debt",
      difference: "What Makes Our MCA Restructuring Approach Different",
      faq: "MCA Restructuring Questions Business Owners Ask",
      ctaBand: "Ready to Restructure Your MCA Debt?",
    },
    steps: [
      { n: "1", title: "Free Assessment Call", body: "We review your stacked MCA positions, daily debit totals, and cash flow on a no-cost call to see whether restructuring fits your situation. There is no obligation and no new loan involved." },
      { n: "2", title: "Forensic Contract and Payment Audit", body: "We examine every advance contract and full payment history line by line to find the real balance, fees, and leverage points that shape the restructuring plan. This audit is where most merchants learn what they actually owe." },
      { n: "3", title: "Coordinated Restructuring Program", body: "We open formal reconciliation to pause daily debits first, then restructure, consolidate, or settle each creditor in writing. Every agreement is documented so the terms hold." },
    ],
    why: [
      { n: "01", title: "Daily Debits Paused First", body: "Restructuring starts by stopping the daily ACH pressure, often within two to four weeks, so cash flow returns before we negotiate terms. That breathing room is what makes a workable plan possible." },
      { n: "02", title: "Flat Fees Quoted Up Front", body: "You get a flat engagement fee in writing before you commit, never a percentage of enrolled debt. For stacked files between $100K and $2M this typically runs $10,000 to $13,000." },
      { n: "03", title: "Attorney Coordination in All 50 States", body: "We are a consulting practice, not a law firm, so when a confession of judgment, account freeze, or litigation appears we coordinate licensed attorneys in your state, usually within 72 hours. Your restructuring plan stays protected." },
    ],
    stats: [
      { n: "47%", title: "Average Balance Reduction", body: "Merchants see an average 47% reduction off the combined advance balance across a restructuring program." },
      { n: "11 mo", title: "Average Program Length", body: "A typical MCA restructuring program runs about 11 months, with most falling between 6 and 18 months." },
      { n: "2-4 wk", title: "Daily Debits Paused", body: "Daily MCA debits are often paused within two to four weeks of starting the program." },
    ],
    faq: [
      { q: "What is MCA restructuring?", a: "MCA restructuring is the process of converting aggressive daily or weekly merchant cash advance debits into workable terms your business can actually sustain. It usually means pausing the daily debits, then renegotiating, consolidating, or settling each advance in writing. The goal is to lower the combined balance and stretch payments into terms that match your real cash flow. It is not a new loan and it does not add liens." },
      { q: "How fast do the daily debits stop?", a: "For most stacked files, daily debits are paused within two to four weeks of enrollment through formal reconciliation. The exact timing depends on how many advances you carry and how each funder responds. Pausing the debits is always the first priority so your cash flow recovers before terms are negotiated." },
      { q: "How much does MCA restructuring cost?", a: "We charge a flat engagement fee quoted up front in writing, never a percentage of your enrolled debt. For stacked MCA files between $100K and $2M, that fee typically runs $10,000 to $13,000. You know the full cost before you commit, and we are not a lender, so there are no new loans or interest on top." },
      { q: "Will restructuring my MCA debt hurt my credit?", a: "MCA restructuring is handled between your business and the funders, so it works differently from personal credit repair. Many merchants come to us already under strain from daily debits and stacked positions. Our focus is stabilizing your cash flow and reducing the combined balance so the business can keep operating. We will walk through what to expect for your specific situation on the assessment call." },
      { q: "Are you a law firm?", a: "No. Business Debt Insider, operating as GRL Recovery LLC, is a financial consulting practice, not a law firm. When a matter needs legal defense, such as a confession of judgment, an account freeze, or active litigation, we coordinate licensed attorneys in all 50 states, usually within 72 hours. That keeps your restructuring program protected without you having to find counsel on your own." },
      { q: "Do I qualify for MCA restructuring?", a: "We work with merchants carrying stacked MCAs and related business debt, both before and after default, on files roughly between $100K and $2M. If daily debits are draining your account faster than the business can absorb, restructuring is worth a conversation. The free assessment call is where we confirm fit, and there is no obligation to move forward." },
    ],
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
    headings: {
      howItWorks: "How MCA Debt Relief Works, Step by Step",
      why: "Why Merchants Choose Us for MCA Debt Relief",
      stats: "MCA Debt Relief by the Numbers",
      testimonials: "Business Owners Who Found MCA Debt Relief",
      difference: "What Makes Our MCA Debt Relief Different",
      faq: "MCA Debt Relief Questions, Answered",
      ctaBand: "Get Your Free MCA Debt Relief Assessment",
    },
    steps: [
      { n: "1", title: "Free MCA Debt Relief Assessment", body: "We start with a free call to map your stacked advances, daily debits, and where the pressure is coming from. There is no cost and no obligation to move forward." },
      { n: "2", title: "Forensic Audit of Every Advance", body: "We review each MCA contract and your full payment history line by line, looking for overpayment, misapplied fees, and leverage. This is the foundation of any real MCA debt relief plan." },
      { n: "3", title: "Coordinated Relief Program", body: "We open formal reconciliation to pause daily debits first, then restructure, consolidate, or settle each advance in writing, creditor by creditor. Everything is documented so the relief holds." },
    ],
    why: [
      { n: "01", title: "Daily Debits Paused First", body: "MCA debt relief has to stop the bleeding before anything else, so pausing daily debits is our first priority. Many merchants see debits stop within 2 to 4 weeks." },
      { n: "02", title: "Flat Fees, Never a Percentage", body: "We quote a flat engagement fee up front, so you know the cost before you commit. We never charge a percentage of your enrolled debt." },
      { n: "03", title: "Attorneys Coordinated When Needed", body: "We are a consulting practice, not a law firm, but when a confession of judgment, account freeze, or lawsuit hits we coordinate licensed attorneys in all 50 states, usually within 72 hours." },
    ],
    stats: [
      { n: "47%", title: "Average Balance Reduction", body: "On average our programs cut 47% off the combined advance balance." },
      { n: "11 mo", title: "Average Program Length", body: "Most MCA debt relief programs run about 11 months, within a typical 6 to 18 month range." },
      { n: "2-4 wk", title: "Time to Pause Debits", body: "Daily debits are often paused within 2 to 4 weeks of starting a program." },
    ],
    faq: [
      { q: "What does MCA debt relief actually involve?", a: "MCA debt relief is a coordinated plan to get you out from under stacked merchant cash advances. It starts with a forensic audit of every contract and payment history, then formal reconciliation to pause daily debits, then restructuring, consolidating, or settling each advance in writing. The goal is to lower what you pay and keep your business running." },
      { q: "Is MCA debt relief legit, or is this a scam?", a: "It is legitimate when it is done in writing and up front. Business Debt Insider, operating as GRL Recovery LLC, is a financial consulting practice that quotes a flat fee before you commit and documents every settlement with your creditors. We are not a lender and we do not sell new loans or liens." },
      { q: "How fast can my daily MCA debits stop?", a: "Pausing the daily debits is the first thing we work on, because that pressure is what threatens the business. Most merchants see their debits paused within 2 to 4 weeks of starting a program. The exact timing depends on your funders and your contracts, which we review during the audit." },
      { q: "How much does MCA debt relief cost?", a: "We charge a flat engagement fee quoted up front, never a percentage of your enrolled debt. For stacked files between 100,000 and 2 million dollars, that fee is typically 10,000 to 13,000 dollars. You will know the number before you decide to move forward." },
      { q: "Will MCA debt relief hurt my business credit?", a: "We work both pre-default and post-default files, and the approach depends on where you are when you call. Because we settle in writing creditor by creditor, you have documented resolution rather than open, unresolved balances. We will walk through the specifics of your situation on the free assessment call." },
      { q: "Do I qualify for MCA debt relief?", a: "Most businesses carrying stacked merchant cash advances, whether current or already behind, are a fit for MCA debt relief. We also handle equipment leases, vendor obligations, bank debt, and IRS or tax installments alongside the advances. The free assessment call is where we confirm whether a program makes sense for you." },
    ],
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
    headings: {
      howItWorks: "How Business Debt Relief Works, Step by Step",
      why: "Why Owners Choose Us for Business Debt Relief",
      stats: "Business Debt Relief by the Numbers",
      testimonials: "Owners Who Found Business Debt Relief",
      difference: "What Makes Our Business Debt Relief Different",
      faq: "Business Debt Relief Questions, Answered",
      ctaBand: "Get Your Business Debt Relief Assessment",
    },
    steps: [
      { n: "1", title: "Free assessment call", body: "We start with a no cost call to map every obligation you carry, from stacked merchant cash advances to equipment leases, vendor bills, bank debt, and IRS or tax installments. This tells us what a realistic business debt relief plan looks like for your situation." },
      { n: "2", title: "Forensic audit", body: "We review every contract and payment history line by line to find overcharges, errors, and leverage across all of your business debt. That audit becomes the foundation of your relief plan." },
      { n: "3", title: "Coordinated relief program", body: "We open formal reconciliation to pause daily debits first, then restructure, consolidate, or settle each creditor in writing. Every category of business debt is handled in one coordinated plan so you can keep operating." },
    ],
    why: [
      { n: "01", title: "All your debt in one plan", body: "Most programs only touch merchant cash advances. We coordinate business debt relief across MCA, equipment leases, vendor obligations, bank debt, and IRS or tax installments in a single strategy." },
      { n: "02", title: "Flat fees, quoted up front", body: "You get a flat engagement fee quoted before you commit, never a percentage of your enrolled debt. For stacked files between $100K and $2M that fee is typically $10,000 to $13,000." },
      { n: "03", title: "Attorneys on call in all 50 states", body: "We are a consulting practice, not a law firm, but when legal defense is needed for a confession of judgment, an account freeze, or litigation, we coordinate licensed attorneys in all 50 states, usually within 72 hours." },
    ],
    stats: [
      { n: "47%", title: "Average balance reduction", body: "On average our programs cut 47 percent off the combined balance across all enrolled business debt." },
      { n: "11 mo", title: "Average program length", body: "Most business debt relief programs run about 11 months, within a typical range of 6 to 18 months." },
      { n: "50", title: "States covered", body: "We coordinate licensed attorneys in all 50 states when your relief plan needs legal defense." },
    ],
    faq: [
      { q: "What does business debt relief cover?", a: "Our business debt relief covers five categories in one coordinated plan. That includes stacked merchant cash advances, equipment leases, vendor obligations, bank debt, and IRS or tax installments. Instead of chasing each creditor separately, we build a single strategy across every obligation you carry." },
      { q: "Which business debts qualify for relief?", a: "Both pre-default and post-default accounts qualify, and we work with stacked files roughly between $100K and $2M. If you are behind on daily MCA debits, carrying equipment or vendor balances, or facing bank and tax debt, those all fit inside one business debt relief plan. The free assessment call confirms what applies to your specific accounts." },
      { q: "Is business debt relief a loan?", a: "No. We are not a lender and we do not issue new loans or add liens. Business debt relief here means auditing, restructuring, consolidating, and settling the debt you already have, not borrowing more to cover it." },
      { q: "How fast does relief start?", a: "The first goal is to pause daily debits so cash stops draining, and that often happens within 2 to 4 weeks of engagement. We open formal reconciliation with your creditors early in the program. From there we work creditor by creditor to restructure or settle each balance in writing." },
      { q: "How much does business debt relief cost?", a: "You pay a flat engagement fee quoted up front, never a percentage of your enrolled debt. For stacked files between $100K and $2M, that fee is typically $10,000 to $13,000. You know the full cost before you decide to move forward." },
      { q: "Will business debt relief hurt my credit or close my doors?", a: "The entire program is built to keep you operating, not to shut you down or push you into bankruptcy. We negotiate directly with creditors so you can stay in business while the debt is resolved. Effects vary by account and creditor, and we walk you through what to expect for each category during your assessment." },
    ],
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
  headings: {
    howItWorks: "How Our MCA Services Work, One Audit Picks the Path",
    why: "Why Merchants Choose Our MCA Services",
    stats: "MCA Services by the Numbers",
    testimonials: "What Business Owners Say About Our MCA Services",
    difference: "How Our MCA Services Are Different",
    faq: "MCA Services Questions, Answered",
    ctaBand: "Find the Right MCA Service for Your File",
  },
  steps: [
    { n: "1", title: "Free MCA Assessment Call", body: "We start with a no cost call to map every open advance, the daily debits, and what you owe across your MCA services picture. There is no obligation and no sales pressure." },
    { n: "2", title: "Forensic Audit of Every Contract", body: "We review each MCA agreement and full payment history line by line. That audit is what decides whether restructuring, consolidation, or settlement is the right MCA service for your situation." },
    { n: "3", title: "Coordinated MCA Program", body: "We first pause daily debits through formal reconciliation, then restructure, consolidate, or settle creditor by creditor in writing. Every change is documented so nothing rests on a verbal promise." },
  ],
  why: [
    { n: "01", title: "All Three MCA Services Under One Roof", body: "Restructuring, consolidation, and settlement live in one practice, so you are not sent to a different firm for each path. One audit decides which MCA service fits." },
    { n: "02", title: "Flat Fees, Never a Percentage", body: "You get a flat engagement fee quoted up front before you commit, typically $10,000 to $13,000 for stacked files between $100K and $2M. We never charge a percentage of your enrolled debt." },
    { n: "03", title: "Attorneys Coordinated When Needed", body: "We are a consulting practice, not a law firm, but when a confession of judgment, an account freeze, or litigation hits, we coordinate licensed attorneys in all 50 states, usually within 72 hours." },
  ],
  stats: [
    { n: "47%", title: "Average Balance Reduction", body: "Merchants who complete our MCA services see an average 47% reduction off the combined advance balance." },
    { n: "11 mo", title: "Average Program Length", body: "A typical MCA services program runs about 11 months, with programs ranging from 6 to 18 months." },
    { n: "2-4 wk", title: "Daily Debits Paused", body: "Daily debits are often paused within 2 to 4 weeks once your MCA program begins." },
  ],
  faq: [
    { q: "What is MCA restructuring within your MCA services?", a: "MCA restructuring reworks the terms of your existing advances so the daily or weekly debits become manageable, without taking on any new loan. We negotiate new payment amounts and schedules directly with each funder in writing. It is often the right MCA service when your business is still generating revenue but the debits are choking cash flow. The audit tells us if restructuring alone solves the problem." },
    { q: "What is MCA consolidation, and when is it the right MCA service?", a: "MCA consolidation combines multiple stacked advances into a single coordinated program with one manageable outflow instead of several competing daily debits. We are not a lender, so this is not a new loan or a new lien, it is a consolidation of how and when you pay. It works best when you are juggling several MCAs at once. Our audit confirms whether consolidation is the cleanest path for your file." },
    { q: "What is MCA settlement, and how does it fit your MCA services?", a: "MCA settlement negotiates a reduced payoff on the outstanding balance, so you resolve the advance for less than the full amount owed. Across completed programs this averages a 47% reduction off the combined advance balance. Settlement is common on post-default files or where a business simply cannot support the original terms. It is one of the three MCA services the audit chooses between." },
    { q: "How do I know which of your MCA services is right for me?", a: "You do not have to decide on your own. The forensic audit of every contract and payment history is what determines whether restructuring, consolidation, or settlement fits your situation, and many files use a combination. We handle pre-default and post-default programs. You get a clear recommendation before you commit to anything." },
    { q: "How much do your MCA services cost?", a: "We charge a flat engagement fee quoted up front, never a percentage of your enrolled debt. For stacked files between $100K and $2M, that fee is typically $10,000 to $13,000. You see the number before you sign, so there are no surprises. We are not a lender and there are no new loans or liens involved." },
    { q: "Do I qualify for your MCA services?", a: "We work with businesses carrying stacked merchant cash advances, and we also handle equipment leases, vendor obligations, bank debt, and IRS or tax installments in the same program. Both pre-default and post-default situations qualify, and files generally run from $100K to $2M. The free assessment call is the fastest way to confirm you are a fit. There is no cost and no obligation to find out." },
  ],
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
  headings: {
    howItWorks: "How We Get an MCA Defense Attorney on Your File",
    why: "Why Merchants Under MCA Attack Choose Our MCA Defense Approach",
    stats: "MCA Attorney Coordination by the Numbers",
    testimonials: "Merchants We Connected With MCA Defense Counsel",
    difference: "How Our MCA Defense Attorney Coordination Is Different",
    faq: "MCA Attorney Questions Owners Ask Us",
    ctaBand: "Need an MCA Defense Attorney Now",
  },
  steps: [
    { n: "1", title: "Emergency MCA Contract Audit", body: "We review your stacked MCA agreements, COJ language, and funding history the same day you call. This is where a real MCA defense attorney gets the leverage to fight back." },
    { n: "2", title: "We Build the Defense File", body: "We document contract defects, usury and reconciliation issues, and improper UCC or COJ actions. That evidence becomes the core of what your MCA defense attorney argues." },
    { n: "3", title: "Licensed Counsel Engaged in Your State", body: "We coordinate a licensed MCA defense attorney in your state, usually within 72 hours, and hand over the full file so they can act fast on freezes, judgments, or litigation." },
  ],
  why: [
    { n: "01", title: "Built for MCA Emergencies", body: "When a funder files a COJ, freezes your account, or sues you, speed matters. We move on day one to get an MCA defense attorney positioned before more damage is done." },
    { n: "02", title: "Strategy Plus Licensed Counsel", body: "We are the audit and strategy layer, and we bring in the licensed MCA defense attorney who represents you. You get contract analysis and real legal representation working together." },
    { n: "03", title: "Every Category of Business Debt", body: "Beyond MCAs, we address equipment leases, vendor obligations, bank debt, and IRS or tax installments. Your MCA defense attorney works from a complete picture of your obligations." },
  ],
  stats: [
    { n: "72 hr", title: "To Coordinated Counsel", body: "We typically place a licensed MCA defense attorney on your file within 72 hours of engagement." },
    { n: "50", title: "State Coverage", body: "We coordinate MCA defense attorneys licensed in all 50 states so your counsel is local to your case." },
    { n: "47%", title: "Average Balance Reduction", body: "Merchants see an average 47 percent reduction off the combined advance balance using documented contract defects as leverage." },
  ],
  faq: [
    { q: "Can an MCA attorney stop a confession of judgment that was already filed?", a: "A confession of judgment can often be challenged, especially when the underlying MCA contract has defects or the COJ was filed improperly. We document those issues and coordinate an MCA defense attorney in your state to move to vacate or contest the judgment. The earlier we start, the more options your counsel has." },
    { q: "My business account is frozen by an MCA funder. What can an attorney do now?", a: "An account freeze or garnishment is a legal action, and it usually calls for fast legal response. We build the defense file immediately and coordinate a licensed MCA defense attorney who can challenge the freeze and negotiate with the funder. This is urgent, so contact us the same day it happens." },
    { q: "Are you a law firm, or do you coordinate MCA defense attorneys?", a: "We are a financial consulting practice, not a law firm, and we do not practice law ourselves. We audit your MCA contracts, build the defense file, and coordinate licensed MCA defense attorneys in your state, usually within 72 hours. You get our strategy and analysis plus real legal representation from licensed counsel." },
    { q: "Can I fight a confession of judgment on my MCA myself, or do I need an attorney?", a: "Contesting a confession of judgment is a legal matter that a licensed MCA defense attorney should handle, not something to attempt alone. We find the contract defects and procedural problems that give your counsel leverage, then coordinate an attorney to file the actual challenge. Working the strategy and the legal filing together gives you the strongest position." },
    { q: "The MCA funder sent UCC lien letters to my customers. Can an attorney address that?", a: "UCC notices to your customers can be damaging and are sometimes sent improperly or prematurely. We document how and when the notices were issued, and coordinate an MCA defense attorney to respond and pursue the funder where the action was wrongful. Acting quickly helps limit the harm to your customer relationships." },
    { q: "How fast can an MCA defense attorney start, and what does it cost?", a: "We typically coordinate a licensed MCA defense attorney on your file within 72 hours of engagement, and we help both pre-default and post-default. Fees are flat and quoted up front, so you know the cost before you commit. Reach out the same day if a COJ, freeze, or lawsuit is already in motion." },
  ],
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
  headings: {
    howItWorks: "How Our Business Debt Services Work, Step by Step",
    why: "Why Owners Choose Our Business Debt Services",
    stats: "Business Debt Services by the Numbers",
    testimonials: "Owners Who Used Our Business Debt Services",
    difference: "What Makes Our Business Debt Services Different",
    faq: "Business Debt Services: Common Questions",
    ctaBand: "Get a Free Business Debt Services Assessment",
  },
  steps: [
    { n: "1", title: "Free Assessment Call", body: "We start with a no-cost call to map your debts, your creditors, and your daily debit load so we can scope the right business debt services for your situation." },
    { n: "2", title: "Forensic Audit", body: "We review every contract and payment history line by line to find overcharges, errors, and leverage across your MCAs, equipment leases, vendor bills, bank debt, and IRS balances." },
    { n: "3", title: "Coordinated Program", body: "We open formal reconciliation to pause daily debits first, then restructure, consolidate, or settle each creditor in writing, and coordinate licensed attorneys if legal defense is needed." },
  ],
  why: [
    { n: "01", title: "The Full Service Menu Under One Roof", body: "Forensic audit, restructuring, settlement, creditor negotiation, and legal coordination are all handled by one team, so you are not stitching together separate vendors." },
    { n: "02", title: "Every Type of Business Debt", body: "We work stacked merchant cash advances, equipment leases, vendor obligations, bank debt, and IRS or tax installments in a single coordinated program." },
    { n: "03", title: "Flat Fees, Not a Cut of Your Debt", body: "You get a flat engagement fee quoted up front, typically $10,000 to $13,000 for stacked files between $100K and $2M, never a percentage of enrolled debt." },
  ],
  stats: [
    { n: "47%", title: "Average Balance Reduction", body: "Owners save an average of 47% off their combined balance across the debts we take on." },
    { n: "11 mo", title: "Average Program Length", body: "A typical program runs about 11 months, with most falling between 6 and 18 months." },
    { n: "50", title: "States Covered", body: "When legal defense is needed we coordinate licensed attorneys in all 50 states, usually within 72 hours." },
  ],
  faq: [
    { q: "What business debt services do you offer?", a: "We deliver a complete set of business debt services under one roof: forensic audit, restructuring, settlement, creditor negotiation, and legal coordination. You do not have to hire separate firms for each piece. We scope the right combination for your file after a free assessment call and a forensic audit of your contracts and payment history." },
    { q: "Which business debts do your services cover?", a: "Our business debt services handle five categories: stacked merchant cash advances, equipment leases, vendor obligations, bank debt, and IRS or tax installments. Most owners come to us with several of these at once. We address them together in one coordinated program rather than one at a time." },
    { q: "Are any of these business debt services a loan?", a: "No. We are a financial consulting practice, not a lender. Our business debt services do not involve any new loans, refinancing, or liens on your business. We restructure, settle, and negotiate the debt you already have." },
    { q: "How do the different services fit together?", a: "They run as one program in sequence. We open formal reconciliation to pause daily debits first, often within 2 to 4 weeks, then use the forensic audit as leverage to restructure, consolidate, or settle each creditor in writing. If a creditor files a confession of judgment, freezes an account, or sues, we coordinate licensed attorneys to defend, usually within 72 hours." },
    { q: "What do your business debt services cost?", a: "We charge a flat engagement fee quoted up front before you commit, never a percentage of your enrolled debt. For stacked files between $100K and $2M the fee is typically $10,000 to $13,000. You know the full cost before any work begins." },
    { q: "Do I qualify for your business debt services?", a: "If your business carries stacked MCAs, equipment leases, vendor debt, bank debt, or IRS installments, you likely qualify. We work both pre-default and post-default situations. The free assessment call tells you exactly where you stand and what a program would look like, with no obligation." },
  ],
};

export function getSliderLpIds(): string[] {
  return Object.keys(SLIDER_LP_CONFIGS).filter((id) => id !== "mca");
}
