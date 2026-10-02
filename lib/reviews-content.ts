// Competitor review content for businessdebtinsider.com.
// Business Debt Insider is the publisher and is listed first as its own program;
// this is disclosed on the hub and detail pages. Entries with checkedAt and
// sources have a dated source review; other entries still need verification.

export type ReviewFirm = {
  slug: string;
  name: string;
  shortName: string;
  numeral: string;
  rank: number;
  checkedAt?: string;
  sources?: { label: string; url: string }[];
  sections?: { title: string; body: string }[];
  relatedSlug?: string;
  isBDI?: boolean;
  metaTitle: string;
  metaDescription: string;
  oneLiner: string;
  founded: string;
  hq: string;
  bbb: string;
  publicReviews: string;
  focus: string;
  bestFor: string[];
  watchFor: string[];
  verdict: string;
  feeNote: string;
  faq: { q: string; a: string }[];
};

export const REVIEW_FIRMS: ReviewFirm[] = [
  {
    slug: "business-debt-insider",
    name: "Business Debt Insider",
    shortName: "Business Debt Insider",
    numeral: "01",
    rank: 1,
    isBDI: true,
    metaTitle: "Business Debt Insider Review (2026): Flat-Fee MCA Restructuring",
    metaDescription:
      "How our own program works: we combine stacked business debt into one weekly payment on flat fees, with no new loans and no bankruptcy filing. Not a lender, not a law firm.",
    oneLiner:
      "Our own program. A flat-fee practice that combines stacked business debt into one weekly payment, with no new loans and no bankruptcy filing.",
    founded: "Fort Lauderdale practice (GRL Recovery LLC)",
    hq: "Fort Lauderdale, Florida",
    bbb: "Flat fees, documented agreements, no contingency. See our disclosures and trust pages.",
    publicReviews: "Client outcomes and case studies published on this site.",
    focus: "Relief, restructure, resolution, and out-of-court workout for stacked short-term business debt",
    bestFor: [
      "Owners drowning in daily or weekly MCA debits who want one weekly payment",
      "Businesses that want to keep operating, with no new loan and no bankruptcy filing",
      "Owners who want a flat fee and a written plan before any engagement fee is charged",
    ],
    watchFor: [
      "We are not a law firm; where a matter needs court representation we coordinate with counsel the client retains",
      "We are the publisher of this comparison, so read it alongside the independent sources we cite",
    ],
    verdict:
      "We built this practice around one idea: an owner buried in daily debits should get a single written plan and a single weekly payment, not another loan and not a bankruptcy filing. Every engagement starts with a free written analysis that maps total outflow and exposure, then recommends the path the business can actually support. Fees are flat and disclosed up front. We are transparent that this is our own program listed first on our own site; the rest of this page reviews the firms you will compare us against, using their public records.",
    feeNote:
      "Flat fees disclosed in writing before any engagement fee is charged. No contingency, no percentage of enrolled debt.",
    faq: [
      {
        q: "Is Business Debt Insider a lender?",
        a: "No. We do not lend and we do not offer reverse consolidation loans. We restructure what you already owe into one manageable weekly payment.",
      },
      {
        q: "Is Business Debt Insider a law firm?",
        a: "No. We are a debt restructure consulting practice operating as GRL Recovery LLC. Where a matter requires legal representation, we coordinate with state-licensed counsel the client retains directly.",
      },
      {
        q: "How are fees structured?",
        a: "Flat fees, documented in writing before any engagement fee is charged. There is no contingency and no percentage-of-enrolled-debt model.",
      },
    ],
  },
  {
    slug: "spergel",
    name: "Spergel",
    shortName: "Spergel",
    numeral: "02",
    rank: 2,
    metaTitle: "Spergel Review (2026): Ratings, Focus, and Who It Fits",
    metaDescription:
      "Spergel is a long-established Canadian licensed insolvency trustee firm with strong public reviews. Here is what it does well and where US MCA owners should look elsewhere.",
    oneLiner:
      "A long-established Canadian licensed insolvency trustee firm with strong public reviews, built for Canadian insolvency rather than US MCA settlement.",
    founded: "1989",
    hq: "Toronto, Ontario (Canada)",
    bbb: "Canadian licensed insolvency trustee; US BBB grading does not apply in the same form",
    publicReviews: "Strong public review history over a long operating history",
    focus: "Canadian consumer and business insolvency, licensed insolvency trustee work",
    bestFor: [
      "Canadian businesses and individuals needing a licensed insolvency trustee",
      "Owners who want a firm with decades of operating history",
    ],
    watchFor: [
      "Canada-focused; the licensed insolvency route is different from US MCA settlement",
      "US business owners with stacked MCA debt will usually need a US-based firm",
    ],
    verdict:
      "Spergel is a credible, long-tenured firm with a strong reputation, but it operates as a Canadian licensed insolvency trustee. That is a different legal framework from the US MCA settlement and restructuring most of our readers need. If your business and your advances are in the United States, Spergel is not the natural fit, and you will want a US practice that works daily inside MCA agreements.",
    feeNote:
      "Fees follow the Canadian licensed insolvency trustee framework, which differs from US consulting fees.",
    faq: [
      {
        q: "Is Spergel legit?",
        a: "Yes. Spergel is an established Canadian licensed insolvency trustee firm operating since 1989 with a strong public review history.",
      },
      {
        q: "Does Spergel handle US merchant cash advance debt?",
        a: "Spergel is built around Canadian insolvency. US owners with stacked MCA debt will generally need a US-based restructuring practice.",
      },
    ],
  },
  {
    slug: "second-wind-consultants",
    name: "Second Wind Consultants",
    shortName: "Second Wind",
    numeral: "03",
    rank: 3,
    metaTitle: "Second Wind Consultants Reviews: Fees, Article 9 & Fit",
    metaDescription: "Compare Second Wind Consultants’ published fee approach, Article 9 services, and relationship with Rise Alliance. Sourced facts and questions before signing.",
    oneLiner: "Second Wind Consultants describes an Article 9 restructuring approach and a fixed scope-of-work fee. Compare the proposed transaction, creditor treatment, and total cost before deciding whether it fits your business.",
    founded: "Not independently verified for this review",
    hq: "Confirm the contracting entity and address in your proposal",
    bbb: "Check the current profile for the exact legal entity; no BBB grade is reproduced here.",
    publicReviews: "No combined star score is published here. Match each review profile to the contracting entity and read recent feedback in context.",
    focus: "Article 9 restructuring and business debt resolution, according to its published FAQ",
    bestFor: ["Owners evaluating a broader restructuring rather than only a change to payment amounts", "Businesses comparing a documented Article 9 proposal with negotiated workouts and other alternatives"],
    watchFor: ["Request a written explanation of which assets, entities, debts, and personal guarantees the proposal covers.", "Ask who provides legal and tax advice and whether those costs are included.", "No universal minimum balance or completion deadline is established by the sources cited here."],
    verdict: "Second Wind warrants consideration when an owner needs to evaluate a broader restructuring proposal. Its published fee model is more specific than a vague promise to quote later, but a fixed fee alone does not establish suitability or the total cost. Compare the written scope and exclusions with another qualified adviser’s assessment. We have not engaged the firm, audited its client results, or verified a typical savings rate.",
    feeNote: "Its FAQ says it establishes a flat, fixed scope-of-work fee before engagement, with payments structured over time. Obtain the amount, milestones, exclusions, and cancellation terms in writing.",
    faq: [{"q": "What are Second Wind Consultants’ fees?", "a": "Its published FAQ describes a flat fee for a defined scope rather than hourly billing. It does not provide a universal dollar price. Ask for a case-specific written quote and separately identify legal, tax, filing, and other third-party costs."}, {"q": "How is Second Wind related to Rise Alliance?", "a": "Rise Alliance describes itself as Second Wind Consultants’ business debt resolution arm. Their relationship does not establish that every engagement has the same contract, team, scope, or price."}, {"q": "Does every engagement require Article 9 restructuring?", "a": "Ask the firm to identify the proposed approach in writing. Its public description of Article 9 services does not establish that the same transaction is suitable for every business."}, {"q": "Does BDI verify Second Wind’s customer outcomes?", "a": "No. This review examines the cited public service information. It is not an audit of settlements, customer satisfaction, savings, or legal outcomes."}],
    sections: [{"title": "Article 9: questions about the actual proposal", "body": "Ask for a transaction diagram showing the current business, any proposed buyer or new entity, the assets involved, and each creditor’s proposed treatment. Have your own advisers explain any guarantees, liens, contracts, permits, or tax obligations that remain. A lower payment estimate is not a substitute for understanding the entire transaction."}, {"title": "Compare the same scope across providers", "body": "Prepare a current creditor list, contracts, recent statements, cash-flow forecast, and any notices or lawsuit papers. Give each adviser the same information. Compare the deliverables, who performs them, when fees become payable, what happens if a creditor declines, and how the engagement ends. Ask for written answers rather than relying on a sales conversation."}],
    sources: [{"label": "Second Wind Consultants: service and fee FAQ (company statements)", "url": "https://secondwindconsultants.com/faq/"}, {"label": "Rise Alliance: business debt resolution and relationship to Second Wind", "url": "https://risealliance.com/services/business-debt-resolution/"}],
    relatedSlug: "rise-alliance",
    checkedAt: "2026-10-02",
  },
  {
    slug: "national-credit-partners",
    name: "National Credit Partners",
    shortName: "National Credit Partners",
    numeral: "04",
    rank: 4,
    metaTitle: "National Credit Partners Review (2026): BBB, Fees, Complaints",
    metaDescription:
      "National Credit Partners is an A+ BBB-accredited business debt modification firm. Mostly positive reviews, with a few complaints about fee clarity. Here is the full read.",
    oneLiner:
      "An A+ BBB-accredited firm focused on business debt modification and restructuring, with mostly positive reviews and a few fee-clarity complaints.",
    founded: "2018",
    hq: "Costa Mesa, California",
    bbb: "A+ rating, BBB accredited since 2018",
    publicReviews: "Mostly positive, with occasional complaints about fee transparency",
    focus: "Business debt modification, MCA restructuring, creditor negotiation",
    bestFor: [
      "Owners who want an established, BBB-accredited firm",
      "Broad business debt beyond a single advance",
    ],
    watchFor: [
      "Positioned around modification rather than attorney-led settlement or litigation defense",
      "A minority of reviews cite hidden fees and disputed contract calculations",
    ],
    verdict:
      "National Credit Partners is one of the more established, credibly rated firms in the category, A+ and accredited since 2018, and most feedback is positive. Its model leans toward debt modification and restructuring rather than the harder settlement or litigation defense some MCA cases require, and a few reviews flag fee clarity. Get the full fee math and the scope in writing before you sign.",
    feeNote:
      "Fees are set per case and not published. Because some reviews mention disputed calculations, ask for the full schedule and a worked example.",
    faq: [
      {
        q: "Is National Credit Partners legit?",
        a: "Yes. It holds an A+ BBB rating and has been accredited since 2018, with mostly positive reviews.",
      },
      {
        q: "What does National Credit Partners do?",
        a: "Business debt modification and restructuring with creditor negotiation, more than attorney-led litigation defense.",
      },
    ],
  },
  {
    slug: "eastern-financial-partners",
    name: "Eastern Financial Partners",
    shortName: "Eastern Financial",
    numeral: "05",
    rank: 5,
    metaTitle: "Eastern Financial Partners Review (2026): BBB, Complaints",
    metaDescription:
      "Eastern Financial Partners holds a 4.4 Trustpilot score but is a young firm (started 2023), holds a C+ BBB grade, and draws complaints about aggressive calling and disputed refunds.",
    oneLiner:
      "Attorney-led shop with a 4.4 Trustpilot score across 190+ reviews, but a young firm (started 2023) whose BBB grade has slipped to C+, with documented complaints about aggressive calling and disputed refunds.",
    founded: "2023",
    hq: "Red Bank, New Jersey",
    bbb: "C+ rating, not BBB accredited; two unanswered complaints on record",
    publicReviews: "4.4 across 190+ Trustpilot reviews, offset by calling and refund complaints",
    focus: "MCA negotiation, settlement, attorney-led representation",
    bestFor: [
      "Owners who want a boutique attorney-led shop",
      "Smaller MCA cases",
    ],
    watchFor: [
      "Young firm with a short track record through a full default and litigation cycle",
      "BBB and Trustpilot complaints describe robo-dialer calls continuing after opt-out requests, plus disputed refunds",
    ],
    verdict:
      "Eastern Financial leads with attorneys, which is structurally sound, and its 4.4 Trustpilot rating across 190+ reviews is genuine. Two things temper it: the business only started in 2023, so its track record is short, and the recurring complaint pattern is about conduct, robo-dialer calls that continue after opt-out and refunds denied as already used for attorneys. If you engage, require milestone-based fees, a written refund policy, and confirmation of removal from all calling lists.",
    feeNote:
      "Fees are set per case. Get milestone-based disbursement and refund terms in writing before signing.",
    faq: [
      {
        q: "Is Eastern Financial Partners legit?",
        a: "It is a real, attorney-led firm with a 4.4 Trustpilot score, but it is young (started 2023) and holds a C+ BBB grade, with complaints about calling practices and refunds.",
      },
      {
        q: "What are the main complaints about Eastern Financial Partners?",
        a: "Aggressive robo-dialer calls that continued after do-not-call requests and disputed refunds within the stated cancellation window.",
      },
    ],
  },
  {
    slug: "rise-alliance",
    name: "Rise Alliance",
    shortName: "Rise Alliance",
    numeral: "06",
    rank: 6,
    metaTitle: "Rise Alliance Reviews: Fees, Services & Second Wind Connection",
    metaDescription: "What Rise Alliance publishes about its services, fees, and Second Wind connection. Compare the contract, customer reviews, and unanswered questions before signing.",
    oneLiner: "Rise Alliance describes itself as the business debt resolution arm of Second Wind Consultants. Its published offering includes MCA and broader business debt restructuring; the right comparison is the specific contract and scope offered to your business.",
    founded: "Formerly Polaris Business Advisors, according to its rebranding announcement",
    hq: "Confirm the contracting entity and address in your proposal",
    bbb: "A current entity-matched BBB rating was not verified for this review. This is not a claim that no profile exists.",
    publicReviews: "Customer testimonials appear on its website. We do not combine platform scores or treat selected testimonials as a verified average outcome.",
    focus: "MCA and business debt resolution through its RISE program, according to the company",
    bestFor: ["Owners comparing a proposal addressing several business debt obligations", "Businesses evaluating how creditor negotiations and broader restructuring would fit together"],
    watchFor: ["Confirm the legal entity on the engagement agreement and who is responsible for each service.", "Ask which costs are included and whether personal-guarantee work or outside counsel costs extra.", "A specific completion time or savings result cannot be inferred from selected testimonials."],
    verdict: "Rise’s connection to Second Wind helps explain its service model, but it does not replace reviewing the actual agreement. Compare the proposed creditor work, fee obligations, exclusions, and exit terms. We have not retained Rise, inspected customer files, or established an average settlement result. Our assessment is limited to the public sources below and the questions an owner should resolve before engaging a provider.",
    feeNote: "Its service page says costs vary with project scope. The cited page does not establish a complete standard fee schedule. Obtain the total fee, payment dates, third-party costs, and refund terms in writing.",
    faq: [{"q": "Is Rise Alliance part of Second Wind Consultants?", "a": "Rise’s service page calls it the business debt resolution arm of Second Wind Consultants. Confirm which legal entity signs your agreement and which team delivers the work."}, {"q": "Was Rise Alliance previously Polaris Business Advisors?", "a": "Yes. Its own announcement states that Polaris Business Advisors became Rise Alliance. Use the current legal entity and any former names when checking records."}, {"q": "How much does Rise Alliance charge?", "a": "The cited service page says costs vary by scope. It does not establish a universal price. Request a written quote covering provider fees, third-party costs, payment timing, cancellation, and refunds."}, {"q": "Does Rise Alliance guarantee a two-to-eight-week settlement?", "a": "We could not substantiate a universal two-to-eight-week timeline from the cited sources. Ask for case-specific milestones, dependencies, and what happens if negotiations take longer."}, {"q": "How should I assess Rise Alliance complaints and reviews?", "a": "Match the profile to the correct entity, check review dates and the service used, and read both the complaint and response. Ask about recurring concerns directly. This page does not certify that a provider is complaint-free."}],
    sections: [{"title": "Rise Alliance and Second Wind: what to compare", "body": "The companies describe a relationship, so treating them as unrelated competing quotes can obscure who will actually do the work. Ask whether the proposals use the same team or contract. Compare the scope, costs, responsibilities, and reporting arrangements rather than assuming the brand name determines the service."}, {"title": "Before you accept a proposal", "body": "Request a creditor-by-creditor plan with responsibilities, milestones, and a full cash-flow budget. Separate the provider’s fee from money intended for creditors. Ask what requires creditor agreement, how missed milestones are handled, and who addresses any litigation. Keep copies of the signed engagement, payment authorizations, and written creditor agreements."}],
    sources: [{"label": "Rise Alliance: business debt resolution and scope-dependent costs (company statements)", "url": "https://risealliance.com/services/business-debt-resolution/"}, {"label": "Rise Alliance: Polaris Business Advisors rebranding announcement", "url": "https://risealliance.com/resource/polaris-business-advisors-is-now-rise-alliance/"}],
    relatedSlug: "second-wind-consultants",
    checkedAt: "2026-10-02",
  },
  {
    slug: "regroup-partners",
    name: "Regroup Partners",
    shortName: "Regroup Partners",
    numeral: "07",
    rank: 7,
    metaTitle: "Regroup Partners Review (2026): Fees, Reviews, Fit",
    metaDescription:
      "Regroup Partners is a consolidation and restructuring firm with no upfront fees and several positive outcomes, tempered by a trust-account complaint worth verifying in writing.",
    oneLiner:
      "A consolidation and restructuring firm with no upfront fees and several positive long-term outcomes, with a trust-account complaint that means you should verify fee handling in writing.",
    founded: "2010s",
    hq: "United States",
    bbb: "Limited public BBB profile",
    publicReviews: "Several positive long-term client outcomes, with a trust-account complaint on record",
    focus: "Debt consolidation, restructuring, MCA workouts",
    bestFor: [
      "Owners who want a no-upfront-fee structure",
      "Consolidation and restructuring rather than pure litigation",
    ],
    watchFor: [
      "Limited public BBB footprint to verify independently",
      "A trust-account complaint means you should confirm exactly how fees are held and applied",
    ],
    verdict:
      "Regroup Partners has a reasonable model, no upfront fees and some genuinely positive long-term outcomes. The caution is a trust-account complaint and a thin BBB footprint, so get the fee-handling mechanics in writing: who holds your funds, when fees are drawn, and what happens if the engagement ends early.",
    feeNote:
      "No upfront fees is the stated model. Confirm in writing how funds are held and when fees are applied.",
    faq: [
      {
        q: "Is Regroup Partners legit?",
        a: "It is a real firm with several positive outcomes and a no-upfront-fee model, though its BBB footprint is limited and a trust-account complaint is on record.",
      },
      {
        q: "Does Regroup Partners charge upfront fees?",
        a: "The stated model is no upfront fees. Get the exact fee-handling terms in writing before signing.",
      },
    ],
  },
  {
    slug: "delancey-street",
    name: "Delancey Street",
    shortName: "Delancey Street",
    numeral: "08",
    rank: 8,
    metaTitle: "Delancey Street Review (2026): Fees, BBB, Track Record",
    metaDescription:
      "Delancey Street is a NYC attorney-network firm handling MCA, SBA, and stacked debt on performance-based fees, but with no BBB rating and a thin independent review base.",
    oneLiner:
      "An attorney-network firm handling MCA, SBA, and stacked debt on performance-based fees, but with no BBB rating and a thin independent review base to verify outcomes.",
    founded: "2018",
    hq: "New York, New York",
    bbb: "Not BBB accredited; BBB has insufficient information to issue a rating",
    publicReviews: "Limited, roughly 26 Trustpilot reviews, generally positive",
    focus: "MCA and business debt settlement, attorney network, stacked-debt restructuring",
    bestFor: [
      "Owners who want fees only after a settlement is reached",
      "MCA plus SBA or other stacked business debt",
    ],
    watchFor: [
      "No BBB rating on file (insufficient information)",
      "Fee is a percentage of enrolled debt, not of savings, so model the total cost",
    ],
    verdict:
      "Delancey Street runs an attorney-network model with performance-based fees, which is structurally sound, and it publishes strong volume claims. The caution is verification: no BBB rating and a small independent review base make its results harder to confirm than higher-volume, better-documented firms. Model the fee, a percentage of enrolled debt rather than savings, before you sign.",
    feeNote:
      "Roughly 15 to 20 percent of enrolled debt, with no fee until a settlement is approved. Model the total dollar cost.",
    faq: [
      {
        q: "Is Delancey Street legit?",
        a: "It is a real attorney-network firm operating since 2018, though it has no BBB rating and only a small independent review base.",
      },
      {
        q: "How does Delancey Street charge?",
        a: "Roughly 15 to 20 percent of enrolled debt, with no fee until a settlement is negotiated and approved.",
      },
    ],
  },
  {
    slug: "corporate-turnaround",
    name: "Corporate Turnaround",
    shortName: "Corporate Turnaround",
    numeral: "09",
    rank: 9,
    metaTitle: "Corporate Turnaround Review (2026): BBB, Complaints, Fees",
    metaDescription:
      "Corporate Turnaround has a long pedigree in turnaround consulting, but recurring BBB complaints about billing and undelivered creditor contact pull it down. Verify everything in writing.",
    oneLiner:
      "A long-tenured turnaround firm, but recurring BBB complaints about billing and undelivered creditor contact mean you should document every fee and verify creditor contact independently.",
    founded: "1998",
    hq: "Paramus, New Jersey",
    bbb: "Accredited, with active complaints",
    publicReviews: "Mixed; a 4.1 aggregate on one platform alongside pointed BBB complaints",
    focus: "Turnaround management, creditor negotiation, MCA workouts",
    bestFor: [
      "Multi-creditor workouts beyond just a single advance",
      "Owners who want a senior consultant they can call directly",
    ],
    watchFor: [
      "BBB complaints allege deceptive billing and fees added without clear explanation",
      "Documented complaints about claimed creditor contact that was never made",
    ],
    verdict:
      "Corporate Turnaround has decades of history and can sit at the table on complex, multi-creditor matters. The recurring BBB concerns around fee transparency and unverified creditor contact are real, though. If you proceed, document every fee in writing and independently verify that the firm is actually contacting your creditors at each milestone.",
    feeNote:
      "Often a hybrid retainer plus performance model. Complaints suggest fees are not always explained up front, so get the schedule in writing.",
    faq: [
      {
        q: "Is Corporate Turnaround legit?",
        a: "It is a long-established, accredited firm, but it carries active BBB complaints about billing and creditor contact.",
      },
      {
        q: "What are the main complaints about Corporate Turnaround?",
        a: "Alleged deceptive billing, fees added without clear explanation, and claimed creditor contact that was never made.",
      },
    ],
  },
  {
    slug: "business-debt-law-group",
    name: "Business Debt Law Group",
    shortName: "Business Debt Law Group",
    numeral: "10",
    rank: 10,
    metaTitle: "Business Debt Law Group Review (2026): Fit and Fees",
    metaDescription:
      "Business Debt Law Group is a law-firm route to MCA defense. Strong when litigation is the real need, but confirm scope, jurisdiction, and fees before retaining.",
    oneLiner:
      "A law-firm route to MCA defense, strongest when litigation or a Confession of Judgment is the real issue, with fit and fees that vary by entity and state.",
    founded: "Varies by entity",
    hq: "United States",
    bbb: "Varies by entity",
    publicReviews: "Varies; evaluate the specific attorney and jurisdiction",
    focus: "Legal defense, Confession of Judgment challenges, MCA litigation",
    bestFor: [
      "Owners already facing a lawsuit, judgment, or frozen account",
      "Cases where legal representation is the actual need",
    ],
    watchFor: [
      "A law firm handles litigation, not necessarily the day-to-day restructuring of your cash flow",
      "Scope, jurisdiction, and fees vary; confirm exactly what is covered",
    ],
    verdict:
      "When your problem is a lawsuit, a Confession of Judgment, or a frozen account, a law firm route like this is the right tool. When your problem is that daily debits are outpacing receipts, litigation alone will not fix the cash flow. Confirm the exact scope, the jurisdiction the attorney is licensed in, and the fee before retaining, and pair legal defense with a restructuring plan for the underlying debt.",
    feeNote:
      "Legal fees vary by entity and matter. Confirm scope and jurisdiction in writing.",
    faq: [
      {
        q: "When does a business debt law firm make sense?",
        a: "When you are facing active litigation, a Confession of Judgment, or a frozen account and need legal representation.",
      },
      {
        q: "Does a law firm restructure my cash flow?",
        a: "Not usually. Litigation defense addresses the legal threat; you still need a plan for the underlying debt and daily debits.",
      },
    ],
  },
  {
    slug: "corporate-rescue",
    name: "Corporate Rescue",
    shortName: "Corporate Rescue",
    numeral: "11",
    rank: 11,
    metaTitle: "Corporate Rescue Review (2026): Ratings, Fees, Fit",
    metaDescription:
      "Corporate Rescue is a national, accredited business debt firm with a moderate track record. Solid basics, but verify fee structure and outcomes before you commit.",
    oneLiner:
      "A national, accredited business debt firm with a moderate track record. Solid basics, but confirm the fee structure and outcomes in writing before committing.",
    founded: "2017",
    hq: "United States (national service)",
    bbb: "Accredited",
    publicReviews: "Moderate public review base; verify outcomes for your situation",
    focus: "Business debt relief, creditor negotiation, MCA workouts",
    bestFor: [
      "Owners who want an accredited firm with national coverage",
      "Standard MCA workouts without complex litigation",
    ],
    watchFor: [
      "Moderate track record compared with the longest-tenured firms",
      "Confirm the fee structure and expected outcome in writing",
    ],
    verdict:
      "Corporate Rescue is accredited and covers the basics of business debt relief nationally, but its track record is moderate next to the longest-tenured firms. There is nothing disqualifying here; just do the standard diligence, get the fee schedule and a realistic outcome estimate in writing, and compare it against firms with deeper documentation.",
    feeNote:
      "Fees are set per case. Get the schedule and a realistic outcome estimate in writing.",
    faq: [
      {
        q: "Is Corporate Rescue legit?",
        a: "It is an accredited firm operating nationally since 2017 with a moderate public track record.",
      },
      {
        q: "What does Corporate Rescue handle?",
        a: "Business debt relief, creditor negotiation, and standard MCA workouts.",
      },
    ],
  },
  {
    slug: "national-debt-relief",
    name: "National Debt Relief",
    shortName: "National Debt Relief",
    numeral: "12",
    rank: 12,
    metaTitle: "National Debt Relief Review (2026): Great Firm, Wrong Tool for MCA",
    metaDescription:
      "National Debt Relief is a huge, A+ consumer debt-settlement company, but it does not handle MCA-specific work: no COJ defense, no court motions, no funder litigation.",
    oneLiner:
      "A major, highly-rated consumer debt-settlement company, but it does not handle MCA-specific work, so it is the wrong tool for active merchant cash advance distress.",
    founded: "2009",
    hq: "New York, New York",
    bbb: "A+ rating; one of the largest debt-settlement firms",
    publicReviews: "4.7 average across 44,900+ Trustpilot reviews",
    focus: "Consumer and unsecured debt settlement (not MCA-specific)",
    bestFor: [
      "Owners whose problem is mainly unsecured or consumer debt",
      "Credit card and line-of-credit settlement at scale",
    ],
    watchFor: [
      "Does not challenge Confessions of Judgment, file court motions, or handle funder litigation",
      "Not built for active merchant cash advance distress",
    ],
    verdict:
      "National Debt Relief is a genuinely strong company, but for a different problem. It is built for consumer and unsecured debt settlement at massive scale, and it explicitly does not challenge Confessions of Judgment, file court motions, or handle MCA funder litigation. If your core issue is merchant cash advance debt, especially with lawsuit or COJ risk, you want an MCA specialist instead. We list it because owners search it, not because it competes for MCA cases.",
    feeNote:
      "Typically 15 to 25 percent of enrolled debt on settled consumer accounts. That pricing is for unsecured debt, not MCA work.",
    faq: [
      {
        q: "Does National Debt Relief handle MCA debt?",
        a: "No. It does not challenge Confessions of Judgment, file court motions, or handle funder litigation, so it does not fit active MCA distress.",
      },
      {
        q: "Is National Debt Relief legit?",
        a: "Yes, it is one of the largest and highest-rated consumer debt-settlement firms, with an A+ BBB rating, just not an MCA specialist.",
      },
    ],
  },
  {
    slug: "business-debt-adjusters",
    name: "Business Debt Adjusters",
    shortName: "Business Debt Adjusters",
    numeral: "13",
    rank: 13,
    metaTitle: "Business Debt Adjusters Review (2026): BBB, Complaints",
    metaDescription:
      "Business Debt Adjusters is a long-tenured NJ firm with an A- BBB rating but no accreditation, some real payment-reduction wins, and complaints about aggressive phone contact.",
    oneLiner:
      "A long-tenured New Jersey firm with an A- BBB rating and some documented payment-reduction wins, but not accredited, with complaints about aggressive phone contact.",
    founded: "2016",
    hq: "Englewood Cliffs, New Jersey",
    bbb: "A- rating, not BBB accredited; one unanswered complaint on record",
    publicReviews: "Mixed; some strongly positive payment-reduction reviews",
    focus: "Business debt settlement, MCA and creditor negotiation",
    bestFor: [
      "Owners who value a longer operating history (since 2016)",
      "Multi-creditor business debt beyond a single advance",
    ],
    watchFor: [
      "Not BBB accredited despite the A- rating",
      "Complaints describe high-frequency phone outreach and, in at least one case, a lien after assurances to the contrary",
    ],
    verdict:
      "Business Debt Adjusters has a longer track record than most, an A BBB rating, and some clients report genuine payment reductions. The offsetting concerns are that it is not accredited, complaints describe aggressive daily phone contact, and at least one owner alleged a lien was placed after being told it would not be. If you engage, get a written fee schedule, a written outcome definition, and clear limits on contact frequency.",
    feeNote:
      "Fees vary by case and are not published. Request a written fee schedule and outcome definition.",
    faq: [
      {
        q: "Is Business Debt Adjusters legit?",
        a: "It is a real firm operating since 2016 with an A- BBB rating, though it is not accredited and draws complaints about calling practices.",
      },
      {
        q: "What are the complaints about Business Debt Adjusters?",
        a: "High-frequency phone outreach and, in at least one complaint, a lien placed after assurances it would not happen.",
      },
    ],
  },
  {
    slug: "stop-mca",
    name: "Stop MCA",
    shortName: "Stop MCA",
    numeral: "14",
    rank: 14,
    metaTitle: "Stop MCA Review (2026): Marketing-Led, Verify Everything",
    metaDescription:
      "Stop MCA has an aggressive marketing presence and a thin public review base. Approach with diligence: get fees and creditor-contact verification in writing first.",
    oneLiner:
      "A marketing-led settlement firm with an aggressive paid presence and a thin public review base. Approach with diligence on fees and creditor-contact verification.",
    founded: "Recent entrant",
    hq: "United States",
    bbb: "Limited footprint",
    publicReviews: "Mixed and limited",
    focus: "MCA settlement, payment-reduction marketing",
    bestFor: [
      "Owners who have already done their own diligence and are price-shopping",
      "Single-advance cases",
    ],
    watchFor: [
      "Marketing claims about percentage reductions are not always tied to a written guarantee",
      "Limited public review base to validate outcomes",
    ],
    verdict:
      "Marketing-led firms in any consumer category tend to underdeliver against the pitch, and Stop MCA has a thin public review base to check against. If you go this route, insist on a written fee schedule, a written description of what success looks like, and a named case manager before you sign anything.",
    feeNote:
      "Owners report fee structures that vary case to case. Get the schedule in writing before signing.",
    faq: [
      {
        q: "Is Stop MCA legit?",
        a: "It is a real, marketing-led firm, but it has a limited public review base, so verify fees and outcomes carefully before signing.",
      },
      {
        q: "What should I ask Stop MCA before signing?",
        a: "For a written fee schedule, a written definition of success, and a named case manager.",
      },
    ],
  },
  {
    slug: "mca-debt-advisors",
    name: "MCA Debt Advisors",
    shortName: "MCA Debt Advisors",
    numeral: "15",
    rank: 15,
    metaTitle: "MCA Debt Advisors Review (2026): F BBB Rating, Complaints",
    metaDescription:
      "MCA Debt Advisors carries an F BBB rating with 26 complaints on file (seven unanswered) and reviews alleging large fees for little delivered work. High caution.",
    oneLiner:
      "A Pennsylvania firm with an F BBB rating, 26 complaints on file (seven unanswered), and reviews alleging large fees for little delivered work. High caution.",
    founded: "2020",
    hq: "Erie, Pennsylvania",
    bbb: "F rating, not accredited; 26 complaints on file, seven unanswered",
    publicReviews: "Mixed; recurring fee and delivery complaints",
    focus: "MCA debt settlement, creditor negotiation",
    bestFor: [],
    watchFor: [
      "F rating with 26 complaints, seven left unanswered by the business",
      "Complaints allege large fees for little delivered work and poor communication",
    ],
    verdict:
      "We do not recommend MCA Debt Advisors based on the current record. The BBB profile carries an F rating with 26 complaints, seven unanswered, and the recurring theme is large fees collected for limited or no delivered work. We document the pattern here so owners find it before they sign. Anyone who still proceeds should get a written fee schedule and verify creditor contact independently at every step.",
    feeNote:
      "Fees are not published and complaints describe large sums collected, sometimes as ACH drafts with a short dispute window.",
    faq: [
      {
        q: "Is MCA Debt Advisors legit?",
        a: "It is a real company, but it carries an F BBB rating with 26 complaints, seven unanswered, and a pattern of fee-for-little-delivery complaints.",
      },
      {
        q: "What is MCA Debt Advisors' BBB rating?",
        a: "An F, with 26 complaints on file, seven left unanswered by the business.",
      },
    ],
  },
  {
    slug: "mca-resolve",
    name: "MCA Resolve",
    shortName: "MCA Resolve",
    numeral: "16",
    rank: 16,
    metaTitle: "MCA Resolve Review (2026): BBB Complaints, Warning",
    metaDescription:
      "MCA Resolve shows a significant pattern of BBB complaints alleging undelivered services, fees taken without creditor contact, and instructions that put clients in default.",
    oneLiner:
      "A significant pattern of negative reviews and BBB complaints alleging undelivered services, fees taken without creditor contact, and instructions that put clients in default. We do not recommend.",
    founded: "Recent entrant",
    hq: "Delray Beach, Florida",
    bbb: "23 BBB complaints on record at time of review",
    publicReviews: "Negative pattern across public review platforms",
    focus: "MCA debt settlement, restructuring",
    bestFor: [],
    watchFor: [
      "23 BBB complaints describing fees taken with no creditor contact made",
      "Reports of being instructed to stop paying creditors, leading to default and lost fees",
    ],
    verdict:
      "We do not recommend MCA Resolve at this time. The pattern across 23 BBB complaints and public reviews is consistent: clients report being told their debt would go into default to use the service, paying substantial fees, and then discovering the firm never contacted creditors. We include it here so owners searching for MCA Resolve find the documented complaint pattern in one place rather than after signing.",
    feeNote:
      "Public complaints describe fees taken in full with no creditor contact subsequently made. Verify everything independently.",
    faq: [
      {
        q: "Is MCA Resolve legit?",
        a: "There is a significant pattern of BBB complaints (26 on record) alleging undelivered services and fees taken without creditor contact. We do not recommend it.",
      },
      {
        q: "What do MCA Resolve complaints say?",
        a: "That clients were told to default, paid substantial fees, and then found the firm never contacted their creditors.",
      },
    ],
  },
];

export function getReviewFirmSlugs(): string[] {
  return REVIEW_FIRMS.map((f) => f.slug);
}

export function findReviewFirm(slug: string): ReviewFirm | undefined {
  return REVIEW_FIRMS.find((f) => f.slug === slug);
}

export const BDI_FIRM = REVIEW_FIRMS.find((f) => f.isBDI)!;
export const COMPETITOR_FIRMS = REVIEW_FIRMS.filter((f) => !f.isBDI);
