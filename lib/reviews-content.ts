// Competitor review content for businessdebtinsider.com.
// Business Debt Insider is the publisher and is listed first as its own program;
// this is disclosed on the hub and detail pages. Entries with checkedAt and
// sources have a dated source review; other entries still need verification.

export type ReviewFirm = {
  slug: string;
  name: string;
  shortName: string;
  numeral: string;
  checkedAt?: string;
  sources?: { label: string; url: string }[];
  sections?: { title: string; body: string }[];
  relatedSlug?: string;
  reviewMethod?: string;
  searchTitle?: string;
  reviewChecklist?: string[];
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
    "slug": "business-debt-insider",
    "name": "Business Debt Insider",
    "shortName": "Business Debt Insider",
    "numeral": "01",
    "isBDI": true,
    "metaTitle": "Business Debt Insider: Our Services, Fees & Disclosures",
    "metaDescription": "BDI explains its own business debt consulting services, written fee approach, limitations, and commercial interest in publishing company comparisons.",
    "oneLiner": "This is our description of BDI’s business debt consulting program, not an independent review. Compare our written proposal with other providers using the same scope, cost, and risk questions.",
    "founded": "",
    "hq": "Fort Lauderdale, Florida, as stated on our About page",
    "bbb": "",
    "publicReviews": "We do not publish a verified average savings rate, completion time, or customer star score here.",
    "focus": "Business debt planning, restructuring, creditor communication, and coordination with separately retained counsel",
    "bestFor": [
      "Business owners evaluating a written cash-flow and creditor-workout plan",
      "Owners comparing consulting support with direct negotiation and professional legal advice"
    ],
    "watchFor": [
      "BDI is not a lender or law firm. Legal representation requires a separate qualified attorney.",
      "A proposal does not bind creditors; obtain their written agreements before relying on changed payment terms."
    ],
    "verdict": "Evaluate us using the same standard as every company in this directory: a specific engagement agreement, clear deliverables, a full cost explanation, and a plan for unresolved debts. Our ownership of this website creates a commercial interest. No ranking, review score, or displayed example establishes that our program is the best option for a particular business.",
    "feeNote": "BDI describes a flat fee disclosed in writing before an engagement fee is charged. Ask for the actual amount, payment schedule, exclusions, and termination terms for your proposal.",
    "faq": [
      {
        "q": "Is this an independent review of BDI?",
        "a": "No. We are describing our own services. The organization byline and disclosure identify that conflict clearly."
      },
      {
        "q": "Does BDI lend money or represent clients in court?",
        "a": "No. BDI describes its role as business debt consulting. Ask separately about financing options and retain appropriately licensed counsel for legal representation."
      },
      {
        "q": "Are BDI’s outcomes guaranteed?",
        "a": "No. Creditor participation, payment affordability, costs, and timing depend on the individual situation. We have not published a verified average outcome on this page."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "This page describes our own published services and limitations. It is not an independent evaluation or an audit of client outcomes.",
    "sections": [
      {
        "title": "What a useful proposal should contain",
        "body": "Request a list of the obligations included, the work BDI will perform, who contacts each creditor, and how you receive progress reports. Separate the consulting fee from creditor payments and third-party costs. Compare the proposed cash budget with the amount your business can support after essential operating expenses."
      }
    ],
    "sources": [
      {
        "label": "BDI: About the organization",
        "url": "https://businessdebtinsider.com/about"
      },
      {
        "label": "BDI: Program process and limitations",
        "url": "https://businessdebtinsider.com/programs/restructure"
      },
      {
        "label": "BDI: Editorial policy and commercial disclosure",
        "url": "https://businessdebtinsider.com/editorial-policy"
      }
    ],
    "relatedSlug": "rise-alliance"
  },
  {
    "slug": "spergel",
    "name": "Spergel",
    "shortName": "Spergel",
    "numeral": "02",
    "metaTitle": "Spergel Review: Services, Fees & Questions",
    "metaDescription": "Review Spergel’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "Spergel’s public materials describe Canadian insolvency services. Its corporate practice is a different comparison from a US MCA negotiation provider: the jurisdiction and professional role need to fit your business first.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "Canadian business insolvency and restructuring through its corporate practice",
    "bestFor": [
      "Businesses evaluating Canadian insolvency or restructuring options",
      "Owners who need to identify the appropriate Canadian trustee or corporate adviser"
    ],
    "watchFor": [
      "Ask whether the corporate or consumer practice is appropriate for your entity and obligations.",
      "A Canadian service description does not establish eligibility for a US business or a US court matter."
    ],
    "verdict": "Start with jurisdiction and engagement scope. A Canadian business should ask which professional will assess its circumstances and which alternatives will be explained. A US-only MCA borrower should first confirm whether Spergel can accept the matter and which jurisdiction it would address. We have not verified an average recovery or savings result.",
    "feeNote": "Request a written explanation of fees for the specific Canadian process and entity. Do not assume a consumer-service fee description also covers a corporate engagement.",
    "faq": [
      {
        "q": "Does Spergel handle business insolvency?",
        "a": "Its corporate website describes business insolvency support from licensed insolvency trustees. Confirm the practice and professional responsible for your matter."
      },
      {
        "q": "Is Spergel a direct substitute for a US MCA settlement company?",
        "a": "Not automatically. Its published offering is Canadian. Confirm jurisdiction, debt eligibility, and the actual professional service before comparing prices."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "Compare the professional role first",
        "body": "Ask whether the proposal is advice, a formal insolvency appointment, or another service, and who the professional acts for in that role. Bring the business structure, debt schedule, security documents, and any personal guarantees so the assessment addresses the relevant entities. Ask what remains outside the proposed engagement."
      }
    ],
    "sources": [
      {
        "label": "Spergel: About the Canadian practice",
        "url": "https://www.spergel.ca/about-us/"
      },
      {
        "label": "Spergel Corporate: Business insolvency services",
        "url": "https://www.spergelcorporate.ca/"
      }
    ],
    "relatedSlug": "national-debt-relief"
  },
  {
    "slug": "second-wind-consultants",
    "searchTitle": "Second Wind Consultants Reviews: Fees & Article 9 | BDI",
    "reviewChecklist": [
      "Match the review to the business name and service in your proposal. A financing review may not describe an Article 9 engagement.",
      "Look for details about the written fee, communication, milestones, and what was delivered. A star score alone cannot answer those questions.",
      "Read recent critical feedback alongside the company’s response. Distinguish an unresolved allegation from a documented outcome.",
      "Ask the provider to explain concerns in writing, including what happens if the proposed work cannot be completed."
    ],
    "name": "Second Wind Consultants",
    "shortName": "Second Wind",
    "numeral": "03",
    "metaTitle": "Second Wind Consultants Reviews: Fees, Article 9 & Fit",
    "metaDescription": "Considering Second Wind Consultants? Review its published fees, Article 9 approach, Rise Alliance relationship, and how to assess customer feedback.",
    "oneLiner": "Second Wind Consultants describes an Article 9 restructuring approach and a fixed scope-of-work fee. Compare the proposed transaction, creditor treatment, and total cost before deciding whether it fits your business.",
    "founded": "Not independently verified for this review",
    "hq": "Confirm the contracting entity and address in your proposal",
    "bbb": "Check the current profile for the exact legal entity; no BBB grade is reproduced here.",
    "publicReviews": "No combined star score is published here. Match each review profile to the contracting entity and read recent feedback in context.",
    "focus": "Article 9 restructuring and business debt resolution, according to its published FAQ",
    "bestFor": [
      "Owners evaluating a broader restructuring rather than only a change to payment amounts",
      "Businesses comparing a documented Article 9 proposal with negotiated workouts and other alternatives"
    ],
    "watchFor": [
      "Request a written explanation of which assets, entities, debts, and personal guarantees the proposal covers.",
      "Ask who provides legal and tax advice and whether those costs are included.",
      "No universal minimum balance or completion deadline is established by the sources cited here."
    ],
    "verdict": "Second Wind warrants consideration when an owner needs to evaluate a broader restructuring proposal. Its published fee model is more specific than a vague promise to quote later, but a fixed fee alone does not establish suitability or the total cost. Compare the written scope and exclusions with another qualified adviser’s assessment. We have not engaged the firm, audited its client results, or verified a typical savings rate.",
    "feeNote": "Its FAQ says it establishes a flat, fixed scope-of-work fee before engagement, with payments structured over time. Obtain the amount, milestones, exclusions, and cancellation terms in writing.",
    "faq": [
      {
        "q": "What are Second Wind Consultants’ fees?",
        "a": "Its published FAQ describes a flat fee for a defined scope rather than hourly billing. It does not provide a universal dollar price. Ask for a case-specific written quote and separately identify legal, tax, filing, and other third-party costs."
      },
      {
        "q": "How is Second Wind related to Rise Alliance?",
        "a": "Rise Alliance describes itself as Second Wind Consultants’ business debt resolution arm. Their relationship does not establish that every engagement has the same contract, team, scope, or price."
      },
      {
        "q": "Does every engagement require Article 9 restructuring?",
        "a": "Ask the firm to identify the proposed approach in writing. Its public description of Article 9 services does not establish that the same transaction is suitable for every business."
      },
      {
        "q": "Does BDI verify Second Wind’s customer outcomes?",
        "a": "No. This review examines the cited public service information. It is not an audit of settlements, customer satisfaction, savings, or legal outcomes."
      }
    ],
    "sections": [
      {
        "title": "Article 9: questions about the actual proposal",
        "body": "Ask for a transaction diagram showing the current business, any proposed buyer or new entity, the assets involved, and each creditor’s proposed treatment. Have your own advisers explain any guarantees, liens, contracts, permits, or tax obligations that remain. A lower payment estimate is not a substitute for understanding the entire transaction."
      },
      {
        "title": "Compare the same scope across providers",
        "body": "Prepare a current creditor list, contracts, recent statements, cash-flow forecast, and any notices or lawsuit papers. Give each adviser the same information. Compare the deliverables, who performs them, when fees become payable, what happens if a creditor declines, and how the engagement ends. Ask for written answers rather than relying on a sales conversation."
      }
    ],
    "sources": [
      {
        "label": "Second Wind Consultants: service and fee FAQ (company statements)",
        "url": "https://secondwindconsultants.com/faq/"
      },
      {
        "label": "Rise Alliance: business debt resolution and relationship to Second Wind",
        "url": "https://risealliance.com/services/business-debt-resolution/"
      }
    ],
    "relatedSlug": "rise-alliance",
    "checkedAt": "2026-10-08"
  },
  {
    "slug": "national-credit-partners",
    "name": "National Credit Partners",
    "shortName": "National Credit Partners",
    "numeral": "04",
    "metaTitle": "National Credit Partners Review: Services, Fees & Questions",
    "metaDescription": "Review National Credit Partners’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "National Credit Partners describes its service as structured reconciliation of business debt. Its current small-business page states a $50,000 debt threshold and distinguishes its approach from debt settlement.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "Business debt modification and structured reconciliation, according to the company",
    "bestFor": [
      "US business owners evaluating the company’s published $50,000-or-more debt threshold",
      "Owners comparing modifications to creditor terms with a settlement proposal"
    ],
    "watchFor": [
      "Ask which obligations and creditors qualify under the proposed agreement.",
      "Do not assume that a marketing description of paid-in-full reporting guarantees how a particular creditor will report an account."
    ],
    "verdict": "The useful distinction is what creditors would agree to change. Ask NCP to show the proposed balance, payment schedule, total cost, and account treatment for each obligation. Compare those documents with a settlement proposal using the same cash budget. The company’s terminology alone does not establish the outcome or eliminate default risk.",
    "feeNote": "Obtain the total provider fee and its calculation basis. The cited small-business overview does not establish a complete universal price schedule.",
    "faq": [
      {
        "q": "What does National Credit Partners call its service?",
        "a": "Its small-business page describes structured reconciliation through direct creditor negotiation and distinguishes that service from debt settlement."
      },
      {
        "q": "Does NCP publish a minimum debt amount?",
        "a": "The page checked for this review describes US businesses with $50,000 or more in business debt. Ask the company to confirm current eligibility for your obligations."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "What to ask about the proposed account treatment",
        "body": "Ask whether the offer changes principal, interest, fees, payment frequency, or only the time to pay. Request the creditor’s written terms and an explanation of what happens if an offer is rejected. Separate the adviser’s description of a program from an agreement signed by the actual creditor."
      }
    ],
    "sources": [
      {
        "label": "National Credit Partners: Small business help and eligibility",
        "url": "https://nationalcreditpartners.com/small-business-help/"
      }
    ],
    "relatedSlug": "corporate-turnaround"
  },
  {
    "slug": "eastern-financial-partners",
    "name": "Eastern Financial Partners",
    "shortName": "Eastern Financial",
    "numeral": "05",
    "metaTitle": "Eastern Financial Partners Review: Services, Fees & Questions",
    "metaDescription": "Review Eastern Financial Partners’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "Eastern Financial Partners’ current website presents growth and operational advisory services. That public description does not, by itself, establish the MCA settlement or attorney-led service described in older comparisons.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "Growth strategy, resource planning, equipment guidance, credit-profile guidance, and operational consulting, as described on the current website",
    "bestFor": [
      "Owners evaluating the growth-advisory services currently described by the company"
    ],
    "watchFor": [
      "Confirm the legal entity and the specific service being offered; do not rely on an older MCA-focused review.",
      "If your inquiry concerns debt negotiation or litigation, ask expressly whether those services are provided and by whom."
    ],
    "verdict": "The first question is whether the current offering matches the help you need. We cannot treat a general business advisory page as evidence of legal representation, a debt-settlement track record, or a particular refund policy. Obtain a written scope before sharing an extensive financial file or comparing the proposal with a debt-resolution engagement.",
    "feeNote": "The current website offers an initial no-obligation conversation but does not establish a universal engagement price in the material reviewed. Request the cost and deliverables for the actual service.",
    "faq": [
      {
        "q": "Does Eastern Financial Partners’ website currently describe MCA settlement?",
        "a": "The homepage reviewed emphasizes growth and operational advisory. Ask the company directly to document any debt-negotiation service offered to you."
      },
      {
        "q": "Who operates the published site?",
        "a": "Its footer identifies Eastern Financial Partners as a trade name of EFPTR LLC. Confirm that the same entity appears on your proposed agreement."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "Resolve the service mismatch before comparing firms",
        "body": "Write down the result you need: a budget assessment, creditor negotiations, new financing, or court representation. Ask the company to identify which of those tasks it will actually perform. A useful answer names the deliverables, responsible provider, costs, and tasks excluded from the engagement."
      }
    ],
    "sources": [
      {
        "label": "Eastern Financial Partners: Current services and entity disclosure",
        "url": "https://easternfinancialptr.com/"
      }
    ],
    "relatedSlug": "regroup-partners"
  },
  {
    "slug": "rise-alliance",
    "searchTitle": "Rise Alliance Reviews: Fees & Second Wind Connection | BDI",
    "reviewChecklist": [
      "Check the legal entity and service named in the feedback. The company’s Polaris rebranding means older reviews may use a different name.",
      "Separate testimonials selected for the company’s website from reviews on other platforms; neither establishes a typical result for your business.",
      "Read the concern, response, and any follow-up together. Check whether the reviewer describes fees, creditor payments, or a different service.",
      "Ask for a written explanation of how the proposed agreement handles communication, missed milestones, cancellation, and refunds."
    ],
    "name": "Rise Alliance",
    "shortName": "Rise Alliance",
    "numeral": "06",
    "metaTitle": "Rise Alliance Reviews: Fees, Services & Second Wind Connection",
    "metaDescription": "Considering Rise Alliance? Review its published services, fee questions, Second Wind connection, former Polaris name, and how to assess customer feedback.",
    "oneLiner": "Rise Alliance describes itself as the business debt resolution arm of Second Wind Consultants. Its published offering includes MCA and broader business debt restructuring; the right comparison is the specific contract and scope offered to your business.",
    "founded": "Formerly Polaris Business Advisors, according to its rebranding announcement",
    "hq": "Confirm the contracting entity and address in your proposal",
    "bbb": "A current entity-matched BBB rating was not verified for this review. This is not a claim that no profile exists.",
    "publicReviews": "Customer testimonials appear on its website. We do not combine platform scores or treat selected testimonials as a verified average outcome.",
    "focus": "MCA and business debt resolution through its RISE program, according to the company",
    "bestFor": [
      "Owners comparing a proposal addressing several business debt obligations",
      "Businesses evaluating how creditor negotiations and broader restructuring would fit together"
    ],
    "watchFor": [
      "Confirm the legal entity on the engagement agreement and who is responsible for each service.",
      "Ask which costs are included and whether personal-guarantee work or outside counsel costs extra.",
      "A specific completion time or savings result cannot be inferred from selected testimonials."
    ],
    "verdict": "Rise’s connection to Second Wind helps explain its service model, but it does not replace reviewing the actual agreement. Compare the proposed creditor work, fee obligations, exclusions, and exit terms. We have not retained Rise, inspected customer files, or established an average settlement result. Our assessment is limited to the public sources below and the questions an owner should resolve before engaging a provider.",
    "feeNote": "Its service page says costs vary with project scope. The cited page does not establish a complete standard fee schedule. Obtain the total fee, payment dates, third-party costs, and refund terms in writing.",
    "faq": [
      {
        "q": "Is Rise Alliance part of Second Wind Consultants?",
        "a": "Rise’s service page calls it the business debt resolution arm of Second Wind Consultants. Confirm which legal entity signs your agreement and which team delivers the work."
      },
      {
        "q": "Was Rise Alliance previously Polaris Business Advisors?",
        "a": "Yes. Its own announcement states that Polaris Business Advisors became Rise Alliance. Use the current legal entity and any former names when checking records."
      },
      {
        "q": "How much does Rise Alliance charge?",
        "a": "The cited service page says costs vary by scope. It does not establish a universal price. Request a written quote covering provider fees, third-party costs, payment timing, cancellation, and refunds."
      },
      {
        "q": "Does Rise Alliance guarantee a two-to-eight-week settlement?",
        "a": "We could not substantiate a universal two-to-eight-week timeline from the cited sources. Ask for case-specific milestones, dependencies, and what happens if negotiations take longer."
      },
      {
        "q": "How should I assess Rise Alliance complaints and reviews?",
        "a": "Match the profile to the correct entity, check review dates and the service used, and read both the complaint and response. Ask about recurring concerns directly. This page does not certify that a provider is complaint-free."
      }
    ],
    "sections": [
      {
        "title": "Rise Alliance and Second Wind: what to compare",
        "body": "The companies describe a relationship, so treating them as unrelated competing quotes can obscure who will actually do the work. Ask whether the proposals use the same team or contract. Compare the scope, costs, responsibilities, and reporting arrangements rather than assuming the brand name determines the service."
      },
      {
        "title": "Before you accept a proposal",
        "body": "Request a creditor-by-creditor plan with responsibilities, milestones, and a full cash-flow budget. Separate the provider’s fee from money intended for creditors. Ask what requires creditor agreement, how missed milestones are handled, and who addresses any litigation. Keep copies of the signed engagement, payment authorizations, and written creditor agreements."
      }
    ],
    "sources": [
      {
        "label": "Rise Alliance: business debt resolution and scope-dependent costs (company statements)",
        "url": "https://risealliance.com/services/business-debt-resolution/"
      },
      {
        "label": "Rise Alliance: Polaris Business Advisors rebranding announcement",
        "url": "https://risealliance.com/resource/polaris-business-advisors-is-now-rise-alliance/"
      }
    ],
    "relatedSlug": "second-wind-consultants",
    "checkedAt": "2026-10-08"
  },
  {
    "slug": "regroup-partners",
    "name": "Regroup Partners",
    "shortName": "Regroup Partners",
    "numeral": "07",
    "metaTitle": "Regroup Partners Review: Services, Fees & Questions",
    "metaDescription": "Review Regroup Partners’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "Regroup Partners’ current service directory separates business restructuring, creditor coordination, cash-flow improvement, and MCA advisory. Compare the specific engagement rather than assuming every service is included.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "Business restructuring, creditor coordination, cash-flow advisory, and MCA-related services, according to its service directory",
    "bestFor": [
      "Owners who need to organize several business obligations and assess cash-flow pressure",
      "Businesses comparing a broader advisory engagement with a creditor-negotiation-only proposal"
    ],
    "watchFor": [
      "Ask whether the engagement includes advice only, direct creditor communication, or completed negotiations.",
      "Confirm who holds any program funds and what reporting accompanies withdrawals."
    ],
    "verdict": "Regroup’s service categories provide a useful starting point for a scope discussion. The practical comparison is which work appears in your agreement, who performs it, and how success is documented. We have not audited its client accounts or verified a typical settlement result. Older allegations are not presented here as established findings.",
    "feeNote": "Request a written fee calculation and payment schedule for the selected services. The service directory does not establish a universal price for every engagement.",
    "faq": [
      {
        "q": "What services does Regroup Partners publish?",
        "a": "Its directory lists restructuring, creditor coordination, cash-flow improvement, MCA advisory, and MCA debt relief."
      },
      {
        "q": "Does an advisory engagement necessarily include settlement?",
        "a": "Do not assume that it does. Ask for the exact creditor work, deliverables, and exclusions in your written agreement."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "Separate advice, negotiation, and fund administration",
        "body": "Ask for an example of the reporting you would receive and a schedule of expected deliverables. If payments go through a program account, request the account owner, custodian, authorization process, and cancellation procedure. If the work is advisory only, clarify who implements the recommendations and what assistance remains available afterward."
      }
    ],
    "sources": [
      {
        "label": "Regroup Partners: Current service directory",
        "url": "https://www.regrouppartners.com/services"
      }
    ],
    "relatedSlug": "national-credit-partners"
  },
  {
    "slug": "delancey-street",
    "name": "Delancey Street",
    "shortName": "Delancey Street",
    "numeral": "08",
    "metaTitle": "Delancey Street Review: Services, Fees & Questions",
    "metaDescription": "Review Delancey Street’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "Delancey Street’s published terms describe creditor negotiation and settlement support. They explicitly identify the company as a debt-relief provider rather than a law firm, with fees based on enrolled debt.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "Business debt negotiation, settlement-program structure, and administrative support, as described in its terms",
    "bestFor": [
      "Business owners comparing a settlement proposal with a clearly described fee basis",
      "Owners who can review consulting and any separate attorney engagement together"
    ],
    "watchFor": [
      "Request the actual percentage, enrolled balance used for the calculation, and fee-payment triggers.",
      "Ask whether legal representation requires a separate agreement and which costs it adds.",
      "Its published terms state that outcomes, creditor participation, and completion times are not guaranteed."
    ],
    "verdict": "The terms provide concrete points to compare: provider identity, fee basis, and the separation between debt-relief services and legal representation. Review the individual agreement alongside those terms and resolve any differences in writing. We have not independently audited the company’s advertised settlement volume, customer examples, or savings figures.",
    "feeNote": "Its terms describe a fee calculated as a percentage of total enrolled debt, with specific fees and payment schedules in the individual client agreement. Ask for a worked dollar example.",
    "faq": [
      {
        "q": "Is Delancey Street a law firm?",
        "a": "Its published terms say it is not a law firm and that any referred attorney-client relationship is with the attorney directly."
      },
      {
        "q": "How does Delancey Street describe its fee?",
        "a": "The terms identify enrolled debt as the calculation basis. Obtain the actual rate, dollar cost, and payment triggers in your agreement."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "Compare costs using the same starting balance",
        "body": "Ask each provider to calculate its fee against the same list of obligations. Include money reserved for creditors and any separate professional costs in the budget. If a balance changes or a creditor is removed, ask whether the fee changes too. A smaller scheduled payment should be compared with the total amount and time required, not viewed in isolation."
      }
    ],
    "sources": [
      {
        "label": "Delancey Street: Terms, fees, service scope, and outcome limitations",
        "url": "https://www.delanceystreet.com/terms-of-service/"
      }
    ],
    "relatedSlug": "business-debt-law-group"
  },
  {
    "slug": "corporate-turnaround",
    "name": "Corporate Turnaround",
    "shortName": "Corporate Turnaround",
    "numeral": "09",
    "metaTitle": "Corporate Turnaround Review: Services, Fees & Questions",
    "metaDescription": "Review Corporate Turnaround’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "Corporate Turnaround describes negotiating business debts around an affordable monthly budget. Its published FAQ discusses creditor-payment timing, conditional guarantees, and possible credit effects that should be addressed in a proposal.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "Budget-based negotiation of business obligations, including suppliers, business credit cards, and some leases and loans",
    "bestFor": [
      "Owners comparing help with several types of business debt",
      "Businesses seeking a written creditor-by-creditor plan tied to a monthly budget"
    ],
    "watchFor": [
      "Ask when each creditor would first receive payment and what happens before an agreement is reached.",
      "Obtain the terms and eligibility conditions of any cost-cap guarantee.",
      "The company’s FAQ acknowledges potential credit-rating decline; do not interpret a monthly budget as protection from every consequence."
    ],
    "verdict": "The published FAQ gives owners specific questions to ask, particularly about the period before creditors are paid. Request a current agreement because a longstanding webpage does not establish today’s offered terms. Compare the fee allocation, creditor-payment sequence, and reporting arrangements. We have not verified the company’s aggregate client results.",
    "feeNote": "Its FAQ says the monthly budget includes program costs and describes several ways it earns fees. Request a separate, itemized dollar calculation and any guarantee conditions.",
    "faq": [
      {
        "q": "What debts does Corporate Turnaround describe handling?",
        "a": "Its public material lists various business debts, with some leases and loans assessed case by case. Ask whether each of your accounts qualifies."
      },
      {
        "q": "Are creditors paid immediately?",
        "a": "Its FAQ says creditors are paid after settlement and acknowledges that some may not settle quickly. Ask for a written account-specific plan and discuss the risks of the proposed timing."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "Understand the monthly budget allocation",
        "body": "Request a sample statement showing provider fees, funds held, creditor disbursements, and remaining balances. Ask how those allocations change if a creditor rejects an offer or your available budget falls. The useful comparison is not merely the size of the monthly draft, but what the draft accomplishes and which obligations remain outstanding."
      }
    ],
    "sources": [
      {
        "label": "Corporate Turnaround: Service overview",
        "url": "https://corporateturnaround.com/"
      },
      {
        "label": "Corporate Turnaround: Published FAQ",
        "url": "https://www.corporateturnaround.com/whatwedo/faq.html"
      }
    ],
    "relatedSlug": "national-credit-partners"
  },
  {
    "slug": "business-debt-law-group",
    "name": "Business Debt Law Group",
    "shortName": "Business Debt Law Group",
    "numeral": "10",
    "metaTitle": "Business Debt Law Group Review: Services, Fees & Questions",
    "metaDescription": "Review Business Debt Law Group’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "Business Debt Law Group’s website describes attorney representation for MCA disputes and related enforcement matters. Its listed firm entity is Rumore Jocelyn Serra PLLC; confirm the retained attorney, jurisdiction, and scope.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "MCA agreements, disputes, negotiation, litigation, and related legal options, according to the firm",
    "bestFor": [
      "Businesses comparing attorney representation for an MCA dispute",
      "Owners with court papers or enforcement issues who need a defined legal engagement"
    ],
    "watchFor": [
      "Verify the assigned lawyer’s license and ability to handle the relevant jurisdiction.",
      "Ask whether negotiation, court appearances, appeals, and post-judgment work are included or billed separately."
    ],
    "verdict": "The relevant distinction is a legal engagement rather than a general consulting arrangement. Ask which attorney represents which business or individual, what deadlines apply, and what work the retainer covers. A firm website describing legal services does not establish that it has accepted your case or agreed to handle every related matter.",
    "feeNote": "Obtain a written retainer specifying the fee basis, deposit, billing increments if applicable, costs, replenishment requirements, and scope changes. The cited overview does not establish a universal fee.",
    "faq": [
      {
        "q": "What firm entity does Business Debt Law Group identify?",
        "a": "The website identifies Rumore Jocelyn Serra PLLC. Match the entity and responsible attorney to your engagement agreement."
      },
      {
        "q": "Does requesting a consultation create representation?",
        "a": "The website says its inquiry form does not create an attorney-client relationship. Obtain confirmation of acceptance and scope before assuming a deadline is being handled."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "Define who and what the representation covers",
        "body": "A business and an owner with a personal guarantee may have different interests and responsibilities. Ask the lawyer to identify the client, the included proceedings, and any conflicts requiring separate advice. Provide the actual notices and court documents rather than relying on a summary of the dispute. Keep written confirmation of responsibility for urgent deadlines."
      }
    ],
    "sources": [
      {
        "label": "Business Debt Law Group: Firm description and engagement limitations",
        "url": "https://businessdebtlawgroup.com/about-us/"
      }
    ],
    "relatedSlug": "delancey-street"
  },
  {
    "slug": "corporate-rescue",
    "name": "Corporate Rescue",
    "shortName": "Corporate Rescue",
    "numeral": "11",
    "metaTitle": "Corporate Rescue Review: Services, Fees & Questions",
    "metaDescription": "Review Corporate Rescue’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "Corporate Rescue Advisors describes an MCA-focused restructuring offering. Its current FAQ says businesses with $20,000 or more in MCA obligations may qualify and distinguishes that service from traditional-loan work.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "MCA provider negotiations and payment-term restructuring, according to the company",
    "bestFor": [
      "Businesses evaluating the published MCA eligibility threshold",
      "Owners comparing MCA-specific support with providers handling broader business obligations"
    ],
    "watchFor": [
      "Confirm whether every obligation in your stack is accepted; traditional loans are excluded by the cited FAQ.",
      "Ask whether references to attorney support mean an included legal engagement, a referral, or a separate service."
    ],
    "verdict": "Corporate Rescue’s published eligibility description is useful for initial screening. The next step is a written scope showing which MCA obligations are covered and how any legal work is arranged. We have not verified the advertised client totals or savings examples. Eligibility language is not an approval or a promise that a particular funder will agree.",
    "feeNote": "Request the fee basis, full dollar amount, payment timing, cancellation terms, and any attorney costs. The cited overview does not provide a complete standard price schedule.",
    "faq": [
      {
        "q": "Does Corporate Rescue Advisors handle traditional loans?",
        "a": "Its current about-page FAQ says its offering focuses on MCA obligations and does not handle traditional loans or other types of debt."
      },
      {
        "q": "What minimum does its website describe?",
        "a": "The FAQ says businesses struggling with $20,000 or more in MCA debt may qualify. Confirm the current terms and account eligibility directly."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "Match the proposal to the debts you actually have",
        "body": "Separate advances, bank loans, tax balances, leases, and supplier accounts before comparing proposals. Ask which accounts remain outside the program and budget for those alongside the proposed MCA payments. If attorney support is offered, ask for the attorney’s name, license, engagement terms, and responsibility for any existing deadline."
      }
    ],
    "sources": [
      {
        "label": "Corporate Rescue Advisors: Service scope and eligibility FAQ",
        "url": "https://www.corporaterescue.com/about-us"
      }
    ],
    "relatedSlug": "rise-alliance"
  },
  {
    "slug": "national-debt-relief",
    "name": "National Debt Relief",
    "shortName": "National Debt Relief",
    "numeral": "12",
    "metaTitle": "National Debt Relief Review: Services, Fees & Questions",
    "metaDescription": "Review National Debt Relief’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "National Debt Relief’s published eligibility information includes certain unsecured business debts. It states a preference for closed businesses and excludes secured business accounts, so an active MCA borrower should check account eligibility carefully.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "Unsecured debt settlement, including certain business obligations under its published eligibility criteria",
    "bestFor": [
      "Owners evaluating qualifying unsecured obligations",
      "Former business owners checking whether remaining unsecured business debts are eligible"
    ],
    "watchFor": [
      "Do not assume an operating business’s MCA or secured obligation is eligible.",
      "Identify the borrower, guarantor, collateral, and business status for each proposed account."
    ],
    "verdict": "The earlier blanket description of National Debt Relief as the wrong tool for all business debt was too broad. Its own criteria include some business obligations. The useful question is whether your exact accounts qualify and what the proposed settlement arrangement requires. Ask for written eligibility and cost information before comparing it with a commercial restructuring provider.",
    "feeNote": "Ask for the applicable fee percentage or other calculation, when it is earned, and the total cost for the debts accepted. The eligibility page cited here is not a complete fee agreement.",
    "faq": [
      {
        "q": "Does National Debt Relief accept any business debt?",
        "a": "Yes, its published eligibility page includes business debts, while stating a preference for closed businesses and excluding secured business accounts."
      },
      {
        "q": "Can I assume my MCA qualifies?",
        "a": "No. Submit the actual agreement and account details for an eligibility decision. A general business-debt category does not confirm acceptance of a particular advance."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "Build an account-level eligibility list",
        "body": "List the legal borrower and any guarantor for each balance, whether collateral is pledged, and whether the business still operates. Ask the provider to mark each account accepted or excluded. Compare the proposed plan with the payments and risks for excluded accounts rather than considering only the enrolled portion of your debt."
      }
    ],
    "sources": [
      {
        "label": "National Debt Relief: Published debt eligibility criteria",
        "url": "https://www.nationaldebtrelief.com/resources/debt-relief-settlement/debt-relief-settlement-qualifications/"
      }
    ],
    "relatedSlug": "spergel"
  },
  {
    "slug": "business-debt-adjusters",
    "name": "Business Debt Adjusters",
    "shortName": "Business Debt Adjusters",
    "numeral": "13",
    "metaTitle": "Business Debt Adjusters Review: Services, Fees & Questions",
    "metaDescription": "Review Business Debt Adjusters’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "Business Debt Adjusters describes a creditor-negotiation and settlement service for business debt. Its published overview acknowledges credit effects and distinguishes reducing an outstanding balance from merely lowering scheduled payments.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "Business debt settlement and creditor negotiation, according to its service page",
    "bestFor": [
      "Owners evaluating a negotiated settlement proposal for business obligations",
      "Businesses comparing the total cost of settlement with a payment-term modification"
    ],
    "watchFor": [
      "Ask for the specific fee basis rather than relying on a projected payment reduction.",
      "Confirm which creditor agreements, legal matters, and third-party costs are included."
    ],
    "verdict": "Evaluate BDA using the account-level proposal and agreement. A smaller payment and a reduction in total cost are separate questions; ask for both calculations. We have not verified the company’s savings averages or audited its customer results. A provider’s own self-review should be read as promotional material with a commercial interest.",
    "feeNote": "Obtain a written fee schedule, worked calculation, payment triggers, and cancellation terms. The service overview alone does not establish the total price for your engagement.",
    "faq": [
      {
        "q": "What service does Business Debt Adjusters describe?",
        "a": "Its business-debt settlement page describes reviewing obligations and negotiating resolutions for less than the outstanding balance, with credit effects and negotiation risk."
      },
      {
        "q": "Is its self-review independent evidence?",
        "a": "No. A company reviewing itself has a commercial interest. Compare the agreement, source records, and independent feedback rather than treating a self-review as an independent endorsement."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "Separate payment relief from overall savings",
        "body": "Ask for the original balance, proposed creditor payments, provider fees, outside professional costs, and projected completion schedule in one written calculation. Clarify what changes if a creditor refuses an offer. A proposal is easier to compare when every provider uses the same accounts and starting balances."
      }
    ],
    "sources": [
      {
        "label": "Business Debt Adjusters: Settlement service description",
        "url": "https://businessdebtadjusters.com/business-debt-settlement/"
      },
      {
        "label": "Business Debt Adjusters: Its own self-review",
        "url": "https://businessdebtadjusters.com/mca-settlement-review-business-debt-adjusters/"
      }
    ],
    "relatedSlug": "stop-mca"
  },
  {
    "slug": "stop-mca",
    "name": "Stop MCA",
    "shortName": "Stop MCA",
    "numeral": "14",
    "metaTitle": "Stop MCA Review: Services, Fees & Questions",
    "metaDescription": "Review Stop MCA’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "Stop MCA’s published FAQ describes MCA negotiation, an enrollment fee, and a service fee tied to savings. It also states that the company is not a law firm and works with an attorney network when needed.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "MCA settlement or payment-plan negotiation, according to the company",
    "bestFor": [
      "Owners comparing the company’s published fee structure with a flat-fee proposal",
      "Businesses seeking an account-specific explanation of an MCA negotiation program"
    ],
    "watchFor": [
      "Request the enrollment fee amount and the precise definition of savings used for service fees.",
      "Ask for written refund conditions rather than relying on a short marketing promise.",
      "Clarify how any attorney is retained and paid."
    ],
    "verdict": "Stop MCA provides more fee-structure information than a page that simply asks for a consultation, but the published description is not a complete contract. The key questions concern the calculation, timing, refund rules, and legal-service arrangement. We have not audited its outcomes or verified that its advertised results are typical.",
    "feeNote": "The FAQ describes an enrollment fee and a service fee based on a portion of savings. It does not establish a universal dollar cost; request the rate, calculation base, and refund conditions.",
    "faq": [
      {
        "q": "Is Stop MCA a law firm?",
        "a": "Its FAQ says no and refers to an affiliated attorney network. Ask who would represent you and whether that requires another agreement."
      },
      {
        "q": "How are Stop MCA’s fees described?",
        "a": "The FAQ identifies an enrollment fee and a savings-linked service fee. Ask for the complete calculation and conditions in writing."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "Define the savings calculation",
        "body": "Ask whether savings are measured against principal, a payoff figure, future scheduled payments, or another amount. Request an example using your actual balances. Confirm whether interest, late charges, provider fees, and professional costs are included when the firm discusses the benefit to your business."
      }
    ],
    "sources": [
      {
        "label": "Stop MCA: Program description and fee FAQ",
        "url": "https://stopmca.com/"
      }
    ],
    "relatedSlug": "business-debt-adjusters"
  },
  {
    "slug": "mca-debt-advisors",
    "name": "MCA Debt Advisors",
    "shortName": "MCA Debt Advisors",
    "numeral": "15",
    "metaTitle": "MCA Debt Advisors Review: Services, Fees & Questions",
    "metaDescription": "Review MCA Debt Advisors’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "MCA Debt Advisors describes helping business owners restructure merchant cash advances and says it works with partners for legal assistance and financing. Confirm the entity, engagement scope, and separate partner costs.",
    "founded": "",
    "hq": "",
    "bbb": "A current entity-matched BBB grade was not verified for this service-focused review.",
    "publicReviews": "No independently verified customer average or combined platform score is published here.",
    "focus": "MCA creditor negotiations and restructuring, according to its company overview",
    "bestFor": [
      "Owners evaluating an MCA-focused creditor-workout proposal"
    ],
    "watchFor": [
      "Ask whether legal support or financing is a referral or an included part of the agreement.",
      "Confirm the exact legal entity: a generic reference to an MCA debt advisor may describe a service rather than this company."
    ],
    "verdict": "The company overview establishes what MCA Debt Advisors says it offers, not a verified customer outcome. Ask for a creditor plan, complete fee calculation, reporting schedule, and terms for outside partners. We are not repeating older BBB grades or broad accusations without a current, clearly matched source on this page.",
    "feeNote": "The cited company overview does not establish a complete standard fee schedule. Request an itemized quote and distinguish provider fees from creditor payments and partner charges.",
    "faq": [
      {
        "q": "What does MCA Debt Advisors describe doing?",
        "a": "Its company page describes helping businesses restructure advances and negotiate creditor payment terms."
      },
      {
        "q": "Does the website establish that legal work is included?",
        "a": "It says the company works with partners to provide an attorney and financing. Ask which services are included, which provider contracts with you, and what separate costs apply."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the cited public material for service descriptions and fee information. Company statements are attributed, not treated as independently verified outcomes. This review does not audit client files, verify average savings, or certify a provider’s suitability.",
    "sections": [
      {
        "title": "Identify the actual provider behind an offer",
        "body": "Match the contract name, website, contact details, and payment recipient. If several providers participate, request a written explanation of each role and the information shared with each party. Ask who handles negotiations, who holds funds, and who takes responsibility for time-sensitive legal work."
      }
    ],
    "sources": [
      {
        "label": "MCA Debt Advisors: Company overview and partner services",
        "url": "https://www.mcadebtadvisors.com/who-we-are.php"
      }
    ],
    "relatedSlug": "corporate-rescue"
  },
  {
    "slug": "mca-resolve",
    "name": "MCA Resolve",
    "shortName": "MCA Resolve",
    "numeral": "16",
    "metaTitle": "MCA Resolve Review: Services, Fees & Questions",
    "metaDescription": "Review MCA Resolve’s published services, fee information, limitations, and questions to resolve before engagement. Includes dated source links.",
    "oneLiner": "MCA Resolve has a BBB profile and published complaint responses. This review distinguishes that record from unverified allegations; current services and contractual fees still need direct confirmation.",
    "founded": "BBB lists a business start date of May 22, 2019",
    "hq": "Delray Beach, Florida, as listed by BBB",
    "bbb": "B rating and not accredited on the BBB profile checked October 3, 2026. Ratings and accreditation are different measures and can change.",
    "publicReviews": "BBB’s complaint page lists 22 complaints over three years and four closed in the preceding 12 months. Read the allegations, responses, and status together; these counts are not a customer failure rate.",
    "focus": "BBB categorizes the business under debt relief services; confirm the current service agreement directly",
    "bestFor": [],
    "watchFor": [
      "Request a written breakdown of how funds are split between fees and creditor payments.",
      "Ask for creditor-contact milestones, progress reporting, cancellation terms, and responsibility for any court deadline."
    ],
    "verdict": "The complaint record raises concrete diligence questions, but it does not justify treating every allegation as a proven finding. Obtain the proposed fee and payment allocation in writing and ask the company to address concerns relevant to your circumstances. We could not retrieve its linked website during this check, so we cannot verify current service or fee claims from that site. This access issue alone does not establish that the business is closed.",
    "feeNote": "Current contractual pricing was not verified. Ask for the total fee, when it is earned, refund provisions, and a worked example of the allocation of every program payment.",
    "faq": [
      {
        "q": "What did MCA Resolve’s BBB profile show?",
        "a": "On October 3, 2026, the profile showed a B rating and no accreditation. Check the linked profile for changes; neither a grade nor accreditation determines your likely outcome."
      },
      {
        "q": "Are complaint allegations established facts?",
        "a": "No. For example, a September 2025 complainant disputed fees and creditor handling; the company responded with a different account of prior default, document delays, and legal work. BBB marked the matter answered, which does not mean the complainant accepted the response."
      }
    ],
    "checkedAt": "2026-10-03",
    "reviewMethod": "We checked the linked BBB record and complaint responses. We did not audit customer files or verify current contractual pricing. Complaint allegations are distinguished from the business’s response and are not presented as adjudicated findings.",
    "sections": [
      {
        "title": "Use complaint records to ask specific questions",
        "body": "Ask when the first creditor contact occurs, what proof you receive, and how fees are calculated if the engagement ends early. Have the provider explain how it handles a lawsuit arriving before negotiations conclude. Compare those answers with the contract and resolve inconsistencies before paying."
      }
    ],
    "sources": [
      {
        "label": "BBB: MCA Resolve business profile",
        "url": "https://www.bbb.org/us/fl/delray-beach/profile/debt-relief-services/mca-resolve-llc-0633-92028391"
      },
      {
        "label": "BBB: Complaint allegations, business responses, and statuses",
        "url": "https://www.bbb.org/us/fl/delray-beach/profile/debt-relief-services/mca-resolve-llc-0633-92028391/complaints"
      }
    ],
    "relatedSlug": "mca-debt-advisors"
  }
];

export function getReviewFirmSlugs(): string[] { return REVIEW_FIRMS.map((f) => f.slug); }
export function findReviewFirm(slug: string): ReviewFirm | undefined { return REVIEW_FIRMS.find((f) => f.slug === slug); }
