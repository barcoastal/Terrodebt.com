export type LenderProfile = {
  slug: string;
  name: string;
  product: string;
  summary: string;
  distinction: string;
  facts: { label: string; text: string; source: string }[];
  questions: string[];
  paymentReview: string;
  faq: { q: string; a: string }[];
  sources: { id: string; label: string; url: string }[];
  related: string[];
};

// Dates represent an actual source review, not the request or build date.
export const LENDER_REVIEW_DATE = "2026-10-10";
export const LENDERS: LenderProfile[] = [
  {
    slug: "fundo", name: "Fundo", product: "Merchant cash advance",
    summary: "Fundo markets merchant cash advances to gig workers and self-employed businesses. Review the purchased amount, payment authorization, and treatment of changing income before comparing its offer with a loan.",
    distinction: "An advance aimed at a freelancer can affect a very different cash budget from financing for a larger company. Separate business receipts from transfers between your own accounts, and reserve cash for operating costs and taxes before evaluating the proposed withdrawal.",
    facts: [
      { label: "Published product", text: "Fundo describes its MCA as an advance against future business revenue, with funding advertised up to $10,000.", source: "product" },
      { label: "Published eligibility", text: "Its homepage lists at least three months in business and $1,500 in average monthly revenue. These are application criteria, not an approval guarantee.", source: "product" },
      { label: "Account verification", text: "The site identifies Plaid or Decision Logic for connecting an eligible bank account.", source: "product" },
    ],
    questions: [
      "Which receipts count as business revenue, and how are platform fees, refunds, and transfers treated?",
      "How much cash will reach my account after every deduction, and what is the total purchased amount?",
      "What happens to withdrawals during a week when I cannot work or a platform payout is delayed?",
      "Where does the signed agreement explain payment adjustments, notices, and any personal obligations?",
    ],
    paymentReview: "Build a week-by-week record of actual platform payouts and bank withdrawals. Ask the contact named in your agreement to explain any adjustment process using those records. Keep the response with your contract. A marketing description of flexible income does not tell you whether an individual withdrawal changes automatically.",
    faq: [
      { q: "Is Fundo a personal loan?", a: "Fundo markets a merchant cash advance for business revenue. Review the actual agreement and permitted use of funds; do not treat it as a consumer personal loan simply because a self-employed person applies." },
      { q: "How should I evaluate Fundo reviews and complaints?", a: "Match the reviewer’s product and date to the offer you are considering. A report about approval speed does not establish total cost or how a payment dispute was resolved. Ask for the underlying contract terms and written responses." },
    ],
    sources: [{ id: "product", label: "Fundo: product, eligibility, and application information", url: "https://fundo.com/" }],
    related: ["bitty-advance", "credibly"],
  },
  {
    slug: "kapitus", name: "Kapitus", product: "Revenue-based financing and other products",
    summary: "Kapitus offers revenue-based financing alongside other financing products. Confirm the product and actual financing company in your agreement before applying MCA payment or settlement assumptions to it.",
    distinction: "The Kapitus brand is a starting point for identifying an offer, not a complete description of the transaction. Compare the company that signed the agreement, the company servicing it, and the broker that introduced it. Send account requests to the party authorized to act on that agreement.",
    facts: [
      { label: "Published structure", text: "Kapitus describes revenue-based financing as purchasing future sales for a fixed financing cost, rather than a traditional interest-bearing loan.", source: "rbf" },
      { label: "Payment frequency", text: "The product page lists daily, weekly, or monthly payments and describes payments linked to revenue.", source: "rbf" },
      { label: "Financing provider", text: "Kapitus states that revenue-based financing can be offered by Kapitus or its financing network.", source: "products" },
    ],
    questions: [
      "Is this a receivables purchase, a term loan, equipment financing, or another product?",
      "Who is the contracting funder, and who can approve a payment change?",
      "How is the revenue percentage translated into the scheduled debit, and how is it reconciled?",
      "Does an early payoff reduce the financing cost, and what written payoff quote will I receive?",
    ],
    paymentReview: "Start with the legal name on the agreement and the current account statement. If your contract contains a revenue-adjustment provision, ask the servicer for the required statements, calculation period, submission method, and response timeline. Keep a separate record for each Kapitus or network agreement instead of combining them under one brand balance.",
    faq: [
      { q: "Is every Kapitus product an MCA?", a: "No. Its product directory includes several kinds of financing. The revenue-based financing page does not describe every loan or equipment-financing agreement offered through the network." },
      { q: "Does a lower Kapitus payment mean a lower total balance?", a: "Not necessarily. Compare the revised payment schedule and total remaining obligation separately. Ask whether the proposal changes timing, total cost, or both." },
    ],
    sources: [
      { id: "rbf", label: "Kapitus: revenue-based financing", url: "https://kapitus.com/products-services/revenue-based-financing/" },
      { id: "products", label: "Kapitus: products and financing providers", url: "https://kapitus.com/products-services/" },
    ],
    related: ["forward-financing", "libertas-funding"],
  },
  {
    slug: "forward-financing", name: "Forward Financing", product: "Revenue-based financing and business loans",
    summary: "Forward Financing publishes separate revenue-based financing and loan products. Its revenue-based contract guide explains payment adjustment and reconciliation requests; those provisions should not be assumed to apply to a Forward loan.",
    distinction: "Forward’s published distinction between a payment adjustment and a reconciliation refund is useful when preparing a request. One concerns the size of upcoming withdrawals; the other compares amounts already paid with the agreed revenue percentage. Ask which calculation and period apply to your account.",
    facts: [
      { label: "Two product types", text: "Forward’s product overview separates revenue-based financing from business loans.", source: "products" },
      { label: "Payment adjustment", text: "Its revenue-based contract guide describes requesting a temporary reduction in daily or weekly payments after a revenue decline.", source: "contract" },
      { label: "Reconciliation", text: "The guide describes refunds of qualifying overpayments against the monthly revenue percentage. A refund does not reduce the total amount sold, and contract compliance matters.", source: "contract" },
    ],
    questions: [
      "Does my agreement identify revenue-based financing or a business loan?",
      "What is my monthly revenue percentage, and which receipts are included?",
      "Am I requesting a future payment adjustment, a past-period reconciliation, or both?",
      "Which statements are required, and where will the approved adjustment or refund appear?",
    ],
    paymentReview: "For a revenue-based agreement, assemble the month’s bank statements, a list of Forward withdrawals, and the monthly percentage from the contract. Ask Forward to confirm the calculation in writing. For a loan, request the available servicing options under the loan agreement instead of using the revenue-based guide as evidence of a contractual right.",
    faq: [
      { q: "Does Forward Financing offer payment relief when revenue falls?", a: "Its revenue-based contract guide describes adjustment and reconciliation requests subject to the agreement and supporting financial information. That is not a promise of approval for every account or a published loan hardship policy." },
      { q: "Is a Forward reconciliation refund a settlement?", a: "No. The cited guide says the refunded amount remains part of the amount sold. A reduced-balance settlement would require a separate written agreement." },
    ],
    sources: [
      { id: "products", label: "Forward Financing: product overview", url: "https://www.forwardfinancing.com/our-products/" },
      { id: "contract", label: "Forward Financing: revenue-based contract highlights", url: "https://www.forwardfinancing.com/resources/forward-revenue-based-financing-contract-highlights/" },
    ],
    related: ["credibly", "kapitus"],
  },
  {
    slug: "fora-financial", name: "Fora Financial", product: "Business financing; verify your agreement",
    summary: "Fora Financial’s published FAQ includes loan servicing, early-payment, and UCC information. Its payment-difficulty guidance directs customers to a Solutions Consultant to discuss a possible temporary solution.",
    distinction: "A quote for new financing and an existing account’s payoff figure answer different questions. For an active Fora account, request the current payoff amount and the rules that apply to your signed agreement. Do not estimate the remaining obligation by multiplying the original payment by the months left.",
    facts: [
      { label: "Payment difficulty", text: "The FAQ says a Solutions Consultant may be able to arrange a temporary solution when a customer has difficulty repaying a loan.", source: "faq" },
      { label: "Early payment", text: "Fora states that it does not charge a prepayment penalty and that discounts depend on the approved offer.", source: "faq" },
      { label: "UCC termination", text: "Its FAQ ties termination to a zero balance, satisfaction in full, and cleared pending debits.", source: "faq" },
    ],
    questions: [
      "What is the current payoff amount, its expiry date, and the treatment of pending withdrawals?",
      "Does my specific agreement provide an early-payment discount, and how is it calculated?",
      "Would a temporary payment change alter the final payoff date or total amount due?",
      "If a UCC filing exists, who will file the termination and provide confirmation after completion?",
    ],
    paymentReview: "Contact the account representative identified in your servicing records with a current cash-flow forecast. Ask for the duration and cost of any temporary arrangement, its effect on account status, and what happens when the arrangement ends. Reconcile pending debits before sending a final payoff so that the written balance and bank activity agree.",
    faq: [
      { q: "Does Fora Financial guarantee a hardship plan?", a: "No guarantee is established by the cited FAQ. It describes discussing a possible temporary solution with a Solutions Consultant. Obtain account-specific terms in writing." },
      { q: "Does no prepayment penalty mean all future financing cost disappears?", a: "No. Fora distinguishes its no-penalty statement from offer-specific early-payment discounts. A written payoff quote is the useful comparison." },
    ],
    sources: [{ id: "faq", label: "Fora Financial: financing and account-servicing FAQ", url: "https://www.forafinancial.com/faq/" }],
    related: ["ondeck", "forward-financing"],
  },
  {
    slug: "credibly", name: "Credibly", product: "Merchant cash advance and separate loan products",
    summary: "Credibly describes its MCA as a purchase of future receivables with daily or weekly ACH remittances. Its published reconciliation process matters: a sales decline does not necessarily change the scheduled debit automatically.",
    distinction: "The difference between a scheduled withdrawal and a revenue-based entitlement is central to reviewing a Credibly MCA. Compare both the bank activity and the applicable revenue period. A payment can stay at its scheduled amount while a separate reconciliation request is needed.",
    facts: [
      { label: "Product structure", text: "Credibly’s MCA page describes exchanging upfront capital for an agreed amount of future sales, distinct from its working capital loan.", source: "mca" },
      { label: "Remittances", text: "The page states that automatic ACH remittances are daily or weekly and the scheduled amount is set at approval.", source: "mca" },
      { label: "Reconciliation", text: "Credibly describes requesting a credit for overpayments when actual monthly sales are below projections, subject to the agreement.", source: "mca" },
    ],
    questions: [
      "Which product is on my agreement: an MCA, a working capital loan, or partner financing?",
      "Which month’s receipts should a reconciliation request use?",
      "What is the deadline and required evidence for an overpayment credit?",
      "Will a credit change future withdrawals, or is it processed separately?",
    ],
    paymentReview: "Download the account ledger and compare it with the relevant bank statements. Separate gross business receipts, returns, transfers, and Credibly withdrawals before requesting the account’s reconciliation instructions. If the document is a working capital loan, use its own servicing terms; an MCA explanation cannot establish the rights attached to a different product.",
    faq: [
      { q: "Do Credibly MCA payments automatically fall with sales?", a: "The current product page describes a scheduled daily or weekly amount and a process to request an overpayment credit. Review the contract and request instructions rather than assuming automatic adjustment." },
      { q: "Can I use a Credibly review to estimate my settlement discount?", a: "No. A customer story or product description does not establish a settlement rate. Any proposal should identify the account, agreed amount, deadlines, fees, and release terms." },
    ],
    sources: [{ id: "mca", label: "Credibly: MCA structure, remittances, and reconciliation", url: "https://credibly.com/merchant-cash-advance/" }],
    related: ["forward-financing", "bitty-advance"],
  },
  {
    slug: "bitty-advance", name: "Bitty Advance", product: "Revenue-based financing; separate business-loan offering",
    summary: "Bitty Advance’s website now redirects to Bitty, which publishes revenue-based financing and business-loan categories. Its revenue-based page describes funding in exchange for future sales; identify the exact product and entity in your paperwork.",
    distinction: "Older paperwork, bank descriptors, and online reviews may use Bitty Advance while current pages use Bitty. Keep those names together in your records, but verify the full contracting name and account number before sending documents or discussing payment changes.",
    facts: [
      { label: "Current website", text: "The bittyadvance.com homepage redirects to bitty.com, where revenue-based financing and business loans appear as separate categories.", source: "home" },
      { label: "Published structure", text: "Bitty’s revenue-based page describes upfront funding for a percentage of future sales and payments that vary with sales.", source: "rbf" },
      { label: "Entity reference", text: "The privacy policy identifies Bitty Advance 2, LLC. Confirm the entity in your individual agreement rather than relying on a website policy alone.", source: "privacy" },
    ],
    questions: [
      "Which Bitty entity signed my agreement, and which product did I receive?",
      "What process turns lower sales into a changed withdrawal or reconciliation?",
      "How are the percentage, revenue measurement period, and required records defined?",
      "Are renewal funds additional cash or partly used to pay an earlier agreement?",
    ],
    paymentReview: "Locate the agreement, funding deposit, and all subsequent withdrawals using the account number as well as the brand name. Ask servicing to explain the adjustment procedure in the agreement. Before accepting a renewal, separate the old payoff, new fees, new total obligation, and cash actually available for operations.",
    faq: [
      { q: "Why does Bitty Advance take me to Bitty.com?", a: "That redirect was observed during this source review. Use your contract and account records to verify the correct entity and account; the website redirect does not amend your signed terms." },
      { q: "Is every Bitty financing offer the same product?", a: "No. The current website separates revenue-based financing from business loans. Compare the signed document and payment terms for the product actually offered." },
    ],
    sources: [
      { id: "home", label: "Bitty: current product directory", url: "https://bitty.com/" },
      { id: "rbf", label: "Bitty: revenue-based financing", url: "https://bitty.com/revenue-based-financing/" },
      { id: "privacy", label: "Bitty: privacy policy and entity identification", url: "https://bitty.com/privacy-policy/" },
    ],
    related: ["fundo", "credibly"],
  },
  {
    slug: "libertas-funding", name: "Libertas Funding", product: "Revenue-based financing and term loans",
    summary: "Libertas Funding publishes revenue-based financing and term loans as distinct offerings. Its solutions page identifies WebBank as the issuer of term loans, making the product and creditor names essential starting points for an account review.",
    distinction: "A growth-capital proposal needs a downside cash-flow case as well as a funding amount. For a project or acquisition, compare the expected revenue dates with the actual withdrawal dates. A financing schedule can create pressure even when the project itself looks profitable.",
    facts: [
      { label: "Product types", text: "Libertas’ solutions page lists revenue-based financing and term loans separately.", source: "solutions" },
      { label: "Loan issuer", text: "The same page states that business term loans are issued by WebBank.", source: "solutions" },
      { label: "Published financing range", text: "Its homepage advertises $500,000–$10 million in revenue-based financing, with a note that amounts can be as low as $100,000. A specific offer depends on underwriting.", source: "home" },
    ],
    questions: [
      "Is my proposed transaction a revenue purchase or a WebBank term loan?",
      "Which entity services the account and can agree to a modification?",
      "What happens if the financed acquisition or project produces revenue later than forecast?",
      "What reporting, liens, guarantees, or other financing restrictions appear in the documents?",
    ],
    paymentReview: "Prepare the original business case and a revised forecast showing the gap between expected and actual receipts. Ask the servicer which modification or revenue-adjustment provisions apply to this product. If several business entities are involved, have your adviser map which entity received funds and which assets or guarantees are included.",
    faq: [
      { q: "Is a Libertas term loan an MCA?", a: "The company publishes separate term-loan and revenue-based products. Its solutions page identifies WebBank as the term-loan issuer. Do not apply receivables-purchase terms to a loan without reviewing the agreement." },
      { q: "Does a large financing amount establish affordability?", a: "No. Build the payment schedule into a cash forecast using delayed-revenue and lower-margin scenarios as well as the expected case." },
    ],
    sources: [
      { id: "solutions", label: "Libertas: financing products and loan issuer", url: "https://libertasfunding.com/our-solutions" },
      { id: "home", label: "Libertas: published financing range", url: "https://libertasfunding.com/" },
    ],
    related: ["kapitus", "ondeck"],
  },
  {
    slug: "ondeck", name: "OnDeck", product: "Business term loans and lines of credit",
    summary: "OnDeck publishes business term loans and lines of credit. Frequent payments do not make a product an MCA: an OnDeck account should be reviewed using its loan agreement, payment schedule, and identified lender.",
    distinction: "A term loan and a revolving line can create different payment obligations even under the same brand. For a line, list each draw and the combined payment due. For a term loan, reconcile the original advance, fees, payments, and current payoff before comparing refinance proposals.",
    facts: [
      { label: "Products", text: "OnDeck’s small-business financing page separates term loans from lines of credit.", source: "loans" },
      { label: "Repayment frequency", text: "It lists daily or weekly payments for term loans and weekly or monthly payments for lines of credit.", source: "loans" },
      { label: "Lender and security", text: "The page states that lending may be through an OnDeck company or Celtic Bank and describes a general lien on business assets for its term loan.", source: "loans" },
    ],
    questions: [
      "Who is the lender of record, and is this a term loan or a line of credit?",
      "What is the combined schedule across all outstanding draws or loans?",
      "How do fees and any early-payoff provisions affect a refinance comparison?",
      "What changes require approval, and how would a workout affect further draws?",
    ],
    paymentReview: "Use the borrower portal to assemble the agreement, draw history, and scheduled payments. Ask servicing about options available for that loan if the current schedule is unaffordable. A receivables reconciliation request belongs only where the contract provides for it; daily withdrawals alone do not establish that right.",
    faq: [
      { q: "Is OnDeck a merchant cash advance?", a: "The products reviewed here are OnDeck’s business term loans and lines of credit. They should not be classified as MCAs solely because some payments occur daily or weekly." },
      { q: "Can an OnDeck loan have security without a specific pledged asset?", a: "Its published term-loan description refers to a general lien on business assets. Review your security agreement and guarantee documents to understand the actual scope." },
    ],
    sources: [{ id: "loans", label: "OnDeck: business loans, repayment schedules, and lender disclosures", url: "https://www.ondeck.com/small-business-loans" }],
    related: ["bluevine", "fundbox"],
  },
  {
    slug: "bluevine", name: "Bluevine", product: "Business line of credit",
    summary: "The Bluevine Line of Credit is issued by Celtic Bank, according to Bluevine’s product page. It is revolving business credit with scheduled repayments, not a merchant cash advance simply because payments may be weekly.",
    distinction: "An available credit limit is not the same as money already borrowed. When reviewing cash pressure, separate the limit, outstanding draws, remaining payments, and any unused availability. Do not build a recovery plan around a future draw that has not been approved.",
    facts: [
      { label: "Issuer", text: "Bluevine identifies itself as a financial technology company and Celtic Bank as the issuer of its line of credit.", source: "loc" },
      { label: "Repayment", text: "The product page describes weekly or monthly automatic payments depending on the approved plan.", source: "loc" },
      { label: "Future draws", text: "Bluevine states that draws remain subject to review and approval even though available credit replenishes as repayments are made.", source: "loc" },
    ],
    questions: [
      "Which repayment plan applies to each outstanding draw?",
      "What is the total scheduled payment across all draws this week or month?",
      "Could account changes affect access to unused credit?",
      "Who can approve a revised schedule, and how would it affect reporting and future availability?",
    ],
    paymentReview: "Create a draw-by-draw list from the account dashboard. Reconcile the next payments with your actual cash balance and contact servicing before relying on an additional draw. If a new offer comes through Bluevine’s partner network, identify its lender and product separately instead of assuming the same line-of-credit terms apply.",
    faq: [
      { q: "Is Bluevine itself the bank issuing the line of credit?", a: "The cited product page identifies Celtic Bank as issuer and describes Bluevine as a financial technology company. Confirm the lender in your agreement." },
      { q: "Are Bluevine weekly payments revenue-based reconciliation?", a: "A weekly schedule does not establish a right to reduce payments with sales. Review the line-of-credit agreement and any account-specific modification offered by servicing." },
    ],
    sources: [{ id: "loc", label: "Bluevine: line-of-credit terms and issuer disclosure", url: "https://www.bluevine.com/business-loans/line-of-credit" }],
    related: ["ondeck", "fundbox"],
  },
  {
    slug: "fundbox", name: "Fundbox", product: "Lines of credit, loans, and embedded financing",
    summary: "Fundbox publishes both business financing and financing delivered through partner platforms. Identify the actual product, originating lender, and servicing account before treating every Fundbox-powered offer as a line of credit or an MCA.",
    distinction: "A familiar software platform can be the entry point to financing without being the creditor. Keep the platform brand, financing provider, lender, and servicing contact in separate fields on your debt schedule. This prevents payment requests from going to the wrong support team.",
    facts: [
      { label: "Product variety", text: "Fundbox’s platform page lists lines of credit, term loans, invoice financing, and revenue-based financing among its products.", source: "platform" },
      { label: "Originating lenders", text: "Its business page identifies First Electronic Bank or Lead Bank for business loans and lines of credit, with separate California lending disclosure.", source: "business" },
      { label: "Account-specific terms", text: "Its business page advertises early repayment without a penalty. Review the actual offer for the cost and payment terms applicable to your product.", source: "business" },
    ],
    questions: [
      "What product did I receive through the platform, and which lender originated it?",
      "Are there several separate draws with overlapping payment dates?",
      "Which fees remain due if I repay early, and where is that shown in the agreement?",
      "Should a payment-difficulty request go to Fundbox, the platform, or another servicer?",
    ],
    paymentReview: "Download each financing agreement and its schedule rather than relying on a combined dashboard balance. Match every debit to a draw or contract and ask the identified servicer for current options. If the product is revenue-based, locate its specific adjustment language; the presence of other revenue-based products on Fundbox’s website does not change a loan agreement.",
    faq: [
      { q: "Is all Fundbox financing a merchant cash advance?", a: "No. Fundbox publishes several products, including business loans and lines of credit. Identify the particular agreement before comparing it with a receivables purchase." },
      { q: "Does a Fundbox early repayment have the same cost for every product?", a: "Do not assume that. Ask for a payoff quote and the relevant fee provisions for each agreement. A general no-penalty statement is not an itemized payoff calculation." },
    ],
    sources: [
      { id: "platform", label: "Fundbox: platform financing products", url: "https://fundbox.com/" },
      { id: "business", label: "Fundbox: business financing and lender disclosures", url: "https://fundbox.com/businesses/" },
    ],
    related: ["bluevine", "ondeck"],
  },
];

export function findLender(slug: string) {
  return LENDERS.find((lender) => lender.slug === slug);
}
