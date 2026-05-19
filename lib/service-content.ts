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
    slug: "forensic-audit",
    name: "Forensic Financial Auditing",
    shortName: "Forensic Audit",
    numeral: "01",
    metaTitle: "Forensic Financial Audit for Business Debt | Business Debt Insider",
    metaDescription:
      "Deep-dive audit of debt-to-income, daily cash outflow, and lender exposure for SMEs with stacked MCA and equipment debt. The starting point of every Business Debt Insider engagement.",
    kicker: "Service 01",
    overview: [
      "Forensic Financial Auditing is the first engagement most clients enter. The practice performs a deep-dive analysis of the operating entity's debt-to-income ratio, daily cash outflow, and the underlying contracts driving both. The objective is not a financial statement audit in the GAAS sense. It is a forensic reconstruction of the actual cash mechanics the business is operating under, which in most distressed cases differ materially from what the operator believes is happening.",
      "The audit reads every active credit instrument, reconstructs the daily and weekly cash sweep, identifies cross-default exposure, maps lien priority, and produces a single composite view of total obligated outflow against actual receipts. Most owners arriving at the practice cannot answer with precision how much capital leaves the operating account on a given Tuesday, or which lender holds first position on receivables. The audit answers those questions before any restructuring conversation begins.",
      "The deliverable is a written report that the practice uses as the working document for any subsequent engagement. The report stands on its own and can be relied upon by counsel, accountants, or independent advisors retained by the client.",
    ],
    engagement: [
      { step: "Discovery call", duration: "30 min", fee: "No fee" },
      { step: "Document intake", duration: "5-7 days", fee: "Flat fee" },
      { step: "Forensic review", duration: "2-3 weeks", fee: "Flat fee" },
      { step: "Report delivery + walkthrough", duration: "60 min", fee: "Included" },
    ],
    whatItAddresses: [
      "Owners who cannot accurately quantify total daily outflow across all active credit instruments",
      "Operating entities with stacked short-term debt where the composite cost of capital has never been calculated",
      "Cases where lien priority across receivables, equipment, and real estate is unclear and the practice needs a documented position before negotiating",
      "Situations where the operator suspects but cannot prove that one or more contracts contain procedural defects or off-market pricing",
      "Engagements where independent counsel or a tax professional has requested a forensic file as part of a parallel matter",
    ],
    methodology: [
      {
        title: "Contract collection and indexing",
        body: "Every active credit instrument is collected in original form. Each is indexed by lender, instrument type, origination date, original principal, current balance, daily or periodic payment, factor or rate, lien position, and any personal guaranty or confession provision. The index is the foundation of every downstream calculation.",
      },
      {
        title: "Cash sweep reconstruction",
        body: "Operating account statements covering the trailing 90 days are reconciled line by line against the contract index. Every debit is attributed to a specific instrument. The result is a verifiable daily, weekly, and monthly outflow figure that has been ground-truthed against bank records rather than inferred from contract terms alone.",
      },
      {
        title: "Debt service coverage analysis",
        body: "Trailing twelve-month revenue, cost of goods, and operating expense are reconstructed from accounting records or, where accounting records are insufficient, from deposit and disbursement patterns in the bank statements. The practice computes a true debt service coverage ratio against actual cash-basis income, not adjusted EBITDA.",
      },
      {
        title: "Cross-default and lien mapping",
        body: "Every contract is read for cross-default clauses, cross-collateralization, UCC filings, and acceleration triggers. The output is a sequencing map showing which obligations control downstream exposure if any single instrument is renegotiated, settled, or defaulted. The sequencing map is the input to any liquidity engineering or creditor liaison engagement that follows.",
      },
    ],
    deliverables: [
      "Composite debt schedule with every active instrument, balance, periodic payment, and effective annual cost",
      "Trailing 90-day cash sweep reconstruction with daily and weekly aggregates",
      "Twelve-month debt service coverage ratio on a cash basis",
      "Lien priority map across receivables, equipment, real estate, and personal collateral",
      "Cross-default and acceleration exposure schedule",
      "Written forensic report suitable for use by counsel, accountants, or independent advisors",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "Reviewed for true effective annual cost, reconciliation provisions, COJ exposure, and stacking violations." },
      { name: "Equipment finance and capital leases", note: "Reviewed for cross-collateralization, GAP coverage, end-of-term obligations, and UCC filings on the underlying equipment." },
      { name: "Vendor and trade debt", note: "Reviewed for aging, contractual interest provisions, and mechanic's lien rights in construction or manufacturing contexts." },
      { name: "Bank term loans and lines of credit", note: "Reviewed for financial covenants, reporting covenants, deposit account offset rights, and cross-collateralization across the relationship." },
      { name: "IRS and state tax obligations", note: "Reviewed for assessed liability, lien filings, Trust Fund Recovery Penalty exposure, and collection statute expiration dates." },
    ],
    commonEngagements: [
      {
        title: "Owner-operator trucking company",
        body: "A small fleet operator with four stacked merchant cash advances, daily combined debits exceeding 4,000 dollars, and two tractors parked due to deferred maintenance. The audit reconstructs the daily debit pattern, identifies the senior factor lien on receivables, and produces a composite cost of capital that the operator can present to counsel before any creditor conversation begins.",
      },
      {
        title: "Independent restaurant group",
        body: "A two-unit operator with a bank term loan that funded kitchen build-out, equipment leases on the buildout, an active line of credit with a regional bank, and aging trade payables to a primary food distributor. The audit identifies a covenant violation on the bank line that the operator was not aware of, and the resulting cross-default exposure across the equipment leases.",
      },
      {
        title: "Specialty medical practice",
        body: "A two-physician practice with a bank acquisition loan secured by practice receivables, a working capital advance taken during a Medicare reimbursement delay, and outstanding payroll tax obligations approaching the Trust Fund Recovery Penalty threshold. The audit prioritizes the tax exposure and produces a sequencing map that protects the practice's federal payer relationships.",
      },
    ],
    faq: [
      {
        q: "Is the forensic audit a financial statement audit?",
        a: "No. The engagement is not a financial statement audit performed under GAAS, and the practice does not issue an audit opinion. The work is a forensic reconstruction of the actual cash mechanics the business is operating under, and the deliverable is a written report intended for internal management use and, where applicable, sharing with counsel or independent professional advisors.",
      },
      {
        q: "How long does the audit take from intake to delivery?",
        a: "Most engagements move from document intake through final report delivery in three to four weeks. Cases involving complex multi-entity structures, multiple bank accounts, or substantial unfiled tax filings may run longer, and the practice scopes the timeline at engagement.",
      },
      {
        q: "What does the practice need from the client to begin?",
        a: "Operating bank statements covering the trailing ninety days, every active credit instrument in original form, the trailing two years of tax returns, the most recent profit and loss and balance sheet, and any creditor correspondence that has been received in the trailing six months.",
      },
      {
        q: "Can the audit be performed without disclosing the engagement to creditors?",
        a: "Yes. The forensic audit is an internal engagement between the client and the practice. No outbound communication to lenders, vendors, or other counterparties is part of the scope unless the client subsequently engages the practice for creditor liaison work.",
      },
      {
        q: "Does the audit work on multi-entity or holding company structures?",
        a: "Yes. The practice routinely audits operating entities that sit under a holding structure, and where the credit obligations span multiple related entities the audit is scoped to cover the full obligated group. Holding company guaranties and inter-entity guarantees are documented as part of the lien map.",
      },
      {
        q: "Is the audit suitable for use in legal proceedings?",
        a: "The forensic report is suitable for use as a working document by independent counsel retained by the client. The practice does not provide expert witness testimony and is not engaged as a litigation consultant. Counsel may rely on the report for fact development but should perform its own independent legal analysis.",
      },
    ],
  },
  {
    slug: "liquidity-engineering",
    name: "Liquidity Engineering",
    shortName: "Liquidity Engineering",
    numeral: "02",
    metaTitle: "Liquidity Engineering for Business Cash Flow | Business Debt Insider",
    metaDescription:
      "Restructure operating budgets to prioritize survival while meeting creditor obligations. Cash flow consulting for SMEs stacked on MCAs and short-term debt.",
    kicker: "Service 02",
    overview: [
      "Liquidity Engineering is the practice's structured approach to restructuring the internal budget of an operating entity so that operational continuity is preserved while creditor obligations are met to the maximum extent the business actually supports. The work begins where the forensic audit ends. With a verified picture of daily outflow and obligated payments, the practice rebuilds the budget from the operational floor up.",
      "The premise is that most distressed operators are running a budget that no longer matches the cash reality of the business. Payroll cycles, vendor terms, and tax deposit schedules were sized for a revenue and margin profile that has since changed, and creditor obligations that originated under different cash conditions are now extracting capital that operations require. The work is not cost cutting in the conventional sense. It is a precision recalibration of which dollars stay inside the operating envelope and which dollars leave on schedule.",
      "The output is a working liquidity plan with a 13-week cash forecast, a creditor payment schedule that fits the actual margin available, and a sequenced approach to any required modifications, deferrals, or formal restructurings that are negotiated as part of a subsequent creditor liaison engagement.",
    ],
    engagement: [
      { step: "Audit prerequisite", duration: "Completed forensic file required", fee: "N/A" },
      { step: "Liquidity workshop", duration: "Half-day on-site or remote", fee: "Flat fee" },
      { step: "Plan build", duration: "2-3 weeks", fee: "Flat fee" },
      { step: "Ongoing monitoring", duration: "Monthly retainer", fee: "Scoped per engagement" },
    ],
    whatItAddresses: [
      "Operations where weekly payroll, vendor terms, or tax deposit schedules are missing because creditor obligations consume available cash first",
      "Businesses that need a credible 13-week cash forecast before any creditor negotiation begins",
      "Situations where insurance, fuel, payroll, or equipment maintenance has slipped behind discretionary creditor payments",
      "Cases where the operator is meeting nominal obligations but the business is deteriorating because reserves and working capital have been exhausted",
      "Multi-entity structures where intercompany flows require sequencing before any external restructuring can be presented as credible",
    ],
    methodology: [
      {
        title: "Operating envelope definition",
        body: "The practice and the operator define the minimum operational envelope: payroll, payroll taxes, rent, utilities, insurance, fuel and direct cost of goods, equipment maintenance critical to revenue generation, and any tax deposits required to remain compliant with current quarter filings. The envelope is computed as a weekly figure and verified against trailing operating history.",
      },
      {
        title: "Discretionary creditor inventory",
        body: "Every credit instrument outside the operational envelope is inventoried by liquidity priority, lien position, and contractual recourse. Instruments with confession of judgment provisions, deposit offset rights, or short repossession timelines are prioritized differently from instruments where the lender's recourse is slower and more procedural.",
      },
      {
        title: "Thirteen-week cash forecast",
        body: "A rolling 13-week forecast is constructed from the verified envelope, projected revenue against trailing performance, and a sequenced creditor payment schedule. The forecast becomes the operating control document for the engagement and is updated weekly with actual results so that variances are caught before they compound.",
      },
      {
        title: "Operational triage",
        body: "Where the envelope cannot be met without restructuring one or more creditor obligations, the practice identifies the specific obligations that require renegotiation, deferral, or settlement. The triage produces the engagement scope for any subsequent creditor liaison work and ensures the operational envelope is held through the negotiation period.",
      },
    ],
    deliverables: [
      "Verified weekly operational envelope with line-item detail across payroll, rent, utilities, insurance, fuel, cost of goods, and tax deposits",
      "Discretionary creditor inventory sorted by recourse priority and lien position",
      "Thirteen-week cash forecast updated weekly during the engagement",
      "Sequenced creditor payment schedule that fits the verified envelope",
      "Operational triage memorandum identifying any creditor obligations that require subsequent renegotiation",
      "Monthly variance reporting comparing forecast against actual operating results",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "Daily debit timing is mapped against payroll cycles and operating disbursements to identify required reconciliation or restructuring." },
      { name: "Equipment finance and capital leases", note: "Equipment payments are prioritized against the revenue contribution of each underlying asset, with non-essential assets candidates for surrender or restructure." },
      { name: "Vendor and trade debt", note: "Vendor terms are sequenced to preserve supply chain continuity, with COD-plus-arrears arrangements modeled where appropriate." },
      { name: "Bank term loans and lines of credit", note: "Covenant exposure is modeled against the forecast, and deposit relocation is evaluated where offset risk is elevated." },
      { name: "IRS and state tax obligations", note: "Current quarter deposit compliance is prioritized inside the envelope, with past-due obligations sequenced for installment agreement or compromise consideration." },
    ],
    commonEngagements: [
      {
        title: "Trucking carrier post-MCA stack",
        body: "A regional carrier with stacked merchant cash advances and a factor relationship in place. Liquidity engineering rebuilds the weekly envelope around fuel, driver pay, insurance, and equipment maintenance, isolates the creditor obligations that require renegotiation, and establishes a 13-week forecast that preserves the factor relationship.",
      },
      {
        title: "Restaurant group navigating seasonal trough",
        body: "A multi-unit operator entering a seasonal slow period with stretched vendor terms and a stretched equipment lease portfolio. The engagement compresses non-essential disbursements, sequences vendor paydowns against critical supply needs, and produces a forecast that bridges to the seasonal recovery.",
      },
      {
        title: "Medical practice with reimbursement delay",
        body: "A specialty practice experiencing a Medicare or third-party payer reimbursement delay that has compressed working capital. Liquidity engineering rebuilds the practice budget around payroll, malpractice insurance, and required clinical supplies, and identifies which non-essential obligations require deferral until reimbursement timing normalizes.",
      },
    ],
    faq: [
      {
        q: "Does the practice require completion of the forensic audit before liquidity engineering begins?",
        a: "Yes. The forensic audit produces the verified inputs that liquidity engineering relies upon. Engaging liquidity engineering without a completed audit is possible only in unusual circumstances where another independent professional has produced an equivalent verified file and the practice can validate the inputs.",
      },
      {
        q: "Is liquidity engineering a creditor negotiation engagement?",
        a: "No. The engagement is an internal financial management engagement and does not include outbound communication to lenders or other counterparties. Where the resulting liquidity plan identifies creditor obligations that require renegotiation, the practice offers a separate creditor liaison engagement with its own scope and fee structure.",
      },
      {
        q: "How is the engagement priced?",
        a: "The engagement carries a flat fee for the plan build, with an optional monthly retainer for ongoing monitoring. Specific fees are scoped at engagement based on entity complexity, the number of operating accounts, and the number of active credit instruments in the obligated group.",
      },
      {
        q: "How is the 13-week forecast maintained over time?",
        a: "Under a monitoring retainer, the practice updates the forecast weekly using actual operating results from the prior week, and variance against forecast is reviewed in a scheduled weekly call with the operator. The forecast horizon rolls forward each week so that the rolling 13-week view is always current.",
      },
      {
        q: "Does the practice take possession of operating funds during the engagement?",
        a: "No. The practice does not control operating bank accounts, does not hold client funds, and does not act as a fiduciary over operating capital. The client retains direct control over all banking and disbursement activity.",
      },
      {
        q: "Is liquidity engineering appropriate for businesses that are not yet in distress?",
        a: "The engagement is most often retained by businesses in active distress, but the methodology is equally applicable as a preventive engagement for owners who recognize early warning indicators and want a verified cash control system in place before distress materializes.",
      },
    ],
  },
  {
    slug: "creditor-liaison",
    name: "Creditor Liaison & Communication",
    shortName: "Creditor Liaison",
    numeral: "03",
    metaTitle: "Creditor Negotiation & Liaison Services | Business Debt Insider",
    metaDescription:
      "Professional intermediary services for negotiating with MCA lenders, equipment lessors, vendors, and banks. Data-backed repayment proposals.",
    kicker: "Service 03",
    overview: [
      "Creditor Liaison and Communication is the practice's third service line and the one in which the practice acts as a technical intermediary between the operating entity and its creditors. The work is grounded in the documentation produced through forensic auditing and the operating plan produced through liquidity engineering, and the role is purely procedural and informational. The practice presents structured, data-backed proposals to lenders on behalf of the client, manages the cadence of correspondence, and produces the written record that supports any agreement reached.",
      "The practice is not a law firm and does not provide legal representation. Where a creditor matter requires legal counsel, including pending litigation, confession of judgment defense, or any creditor action that has matured into formal enforcement, the practice coordinates with state-licensed counsel retained directly by the client. The liaison role is technical, not adversarial, and the practice's value is in the precision of the proposal and the rigor of the supporting documentation.",
      "Most creditors prefer a credible, documented proposal to silence or to the standard relief-firm template. The proposals the practice presents are sized to the actual liquidity available, supported by the forensic file and the operating forecast, and structured to address the specific recourse and procedural posture of each individual creditor. The result, in most engagements, is a written agreement that the client can rely upon and that fits the operating envelope established earlier in the engagement.",
    ],
    engagement: [
      { step: "Audit and liquidity prerequisites", duration: "Completed files required", fee: "N/A" },
      { step: "Proposal package preparation", duration: "1-2 weeks", fee: "Flat fee per creditor" },
      { step: "Active liaison period", duration: "30-180 days typical", fee: "Monthly retainer" },
      { step: "Agreement documentation and closeout", duration: "As reached", fee: "Included" },
    ],
    whatItAddresses: [
      "Engagements where one or more credit instruments require renegotiation, restructure, deferral, or settlement to fit the verified operating envelope",
      "Cases where the operator has been receiving creditor correspondence and has not been responding because no credible position has been available",
      "Situations where a covenant violation, an acceleration notice, or a default notice has been issued and a structured response is required",
      "Engagements where multiple creditors must be addressed in coordinated sequence rather than handled ad hoc",
      "Cases where the operator is contemplating settlement of one or more obligations and requires a structured presentation supported by forensic documentation",
    ],
    methodology: [
      {
        title: "Proposal preparation",
        body: "For each creditor, the practice prepares a written proposal package that includes a hardship narrative grounded in the forensic file, the specific modification being requested, supporting financial documentation extracted from the audit work, and the offered terms. Each package is structured to address the specific recourse and procedural posture of the creditor being engaged.",
      },
      {
        title: "Sequenced outreach",
        body: "Outreach to creditors is sequenced according to the lien priority and recourse map produced in the audit. Senior secured creditors and creditors with the shortest recourse timelines are engaged first when their cooperation conditions downstream work. Creditors with longer procedural timelines are sequenced later to preserve negotiating posture across the obligated group.",
      },
      {
        title: "Cadence management",
        body: "The practice manages the correspondence cadence with each creditor, tracks every communication in a single client-facing log, and ensures that response times, document submissions, and proposal revisions are managed against documented deadlines. The cadence log is updated continuously and shared with the client on a weekly basis through the active liaison period.",
      },
      {
        title: "Agreement documentation",
        body: "Where a creditor accepts a structured proposal, the practice ensures the written agreement reflects the negotiated terms with precision, including release language on any personal guaranty, lien release on any secured collateral, and reporting and covenant requirements going forward. Legal review of any executed agreement is recommended and the practice will coordinate with the client's counsel on document review.",
      },
    ],
    deliverables: [
      "Proposal packages prepared for each creditor in the obligated group",
      "Cadence log tracking every communication, deadline, and document submission",
      "Negotiated written agreements documented and filed in the engagement record",
      "Reporting and covenant tracking schedule for any agreements that include ongoing obligations",
      "Closeout documentation for each resolved obligation, including release language where applicable",
      "Coordination memoranda with client counsel where legal review or representation is required",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "The practice presents reconciliation requests, settlement offers, or restructure proposals supported by the forensic file. Where a confession of judgment has been filed or threatened, client counsel is coordinated directly." },
      { name: "Equipment finance and capital leases", note: "Term extensions, payment modifications, buyout negotiations, and voluntary surrender plus deficiency settlements are presented as packaged proposals to the relevant equipment lender." },
      { name: "Vendor and trade debt", note: "Single-vendor paydown plans, multi-vendor coordinated proposals, and COD-plus-arrears arrangements are presented as written packages. Mechanic's lien matters are coordinated with counsel." },
      { name: "Bank term loans and lines of credit", note: "Covenant waivers, forbearance proposals, modification packages, and (where applicable) note sale facilitation are coordinated with the bank's special assets group. Deposit account offset risk is addressed in the liquidity plan in advance." },
      { name: "IRS and state tax obligations", note: "Installment agreement requests, offer in compromise submissions, and currently not collectible packages are prepared, with formal IRS submissions coordinated through a qualified tax professional or counsel as required." },
    ],
    commonEngagements: [
      {
        title: "Multi-MCA portfolio across one obligor",
        body: "An operator with several active merchant cash advances. The practice prepares reconciliation requests and settlement proposals for each lender, sequences outreach to address the lender with confession of judgment exposure first, and documents the resulting agreements. Where any creditor escalates to litigation, client counsel is coordinated directly.",
      },
      {
        title: "Bank covenant violation with cross-default exposure",
        body: "A bank line of credit with a covenant violation and cross-collateralized term loan. The practice prepares a covenant waiver and forbearance proposal to the bank's special assets group, supported by the audit and liquidity plan, and addresses the cross-default exposure on the term loan in the same package. Equipment lease cross-default exposure is addressed separately.",
      },
      {
        title: "Payroll tax obligation with TFRP exposure",
        body: "A practice with a payroll tax obligation approaching the Trust Fund Recovery Penalty threshold. The practice coordinates with a qualified tax professional to prepare an installment agreement or offer in compromise package, and addresses the immediate trust fund deposit compliance through the liquidity plan to prevent additional exposure.",
      },
    ],
    faq: [
      {
        q: "Does the practice negotiate on behalf of the client?",
        a: "The practice acts as a technical intermediary, presenting structured proposals and managing correspondence cadence. The client retains decision authority over every position taken and every agreement executed. Where a matter requires legal representation, including litigation defense, the practice coordinates with state-licensed counsel retained directly by the client.",
      },
      {
        q: "Will creditors agree to a structured proposal?",
        a: "Outcomes vary by creditor, by instrument, and by the specific facts of the engagement. The practice does not guarantee specific terms or specific outcomes. The premise of the engagement is that a credible, documented proposal supported by a verified forensic file is more likely to produce a workable agreement than silence or an undocumented approach, but no specific result is guaranteed.",
      },
      {
        q: "What does the practice do when a creditor has filed suit or a confession of judgment?",
        a: "When a creditor matter has matured into formal legal action, the practice coordinates with state-licensed counsel retained directly by the client. The practice may continue to support the engagement with forensic and operating documentation, but legal representation is the responsibility of qualified counsel, not the practice.",
      },
      {
        q: "How is the engagement priced?",
        a: "The engagement carries a flat fee per creditor for proposal package preparation, and a monthly retainer through the active liaison period. Specific fees are scoped at engagement based on the number of creditors in the obligated group and the complexity of each individual matter.",
      },
      {
        q: "Does the practice charge contingency or success fees?",
        a: "No. The practice operates on flat fee and monthly retainer structures. The practice does not charge contingency fees, percentage-of-savings fees, or any fee structure tied to the specific terms of a negotiated agreement.",
      },
      {
        q: "What happens to existing creditor correspondence?",
        a: "During an active liaison engagement, the client typically routes incoming creditor correspondence to the practice for review and structured response. Direct client-creditor communication is not prohibited but is sequenced through the practice to preserve consistency across the engagement.",
      },
    ],
  },
  {
    slug: "operational-restructuring",
    name: "Operational Restructuring",
    shortName: "Operational Restructuring",
    numeral: "04",
    metaTitle: "Operational Restructuring Consulting for SMEs | Business Debt Insider",
    metaDescription:
      "Lean management consulting to increase Free Cash Flow for small and mid-sized businesses restructuring stacked debt. Operational discipline that supports the workout.",
    kicker: "Service 04",
    overview: [
      "Operational Restructuring is the practice's fourth and final service line, retained most frequently after a creditor engagement has reached resolution and the operating entity is ready to rebuild a durable margin. The engagement consults on lean management practices, organizational structure, pricing discipline, and capital allocation, with the objective of increasing sustainable Free Cash Flow rather than simply controlling distress.",
      "The premise is that the cash mechanics that produced the original distress almost always include identifiable operational patterns that compound over time. Underpriced services, working capital tied up in slow-paying receivables, organizational structures sized for a prior revenue profile, and capital allocation discipline that does not match the actual margin of the business. Operational restructuring identifies these patterns and consults on a structured path to address each one.",
      "The work is not a generic operational consulting engagement. It is grounded in the same forensic discipline that defines the practice's other service lines, draws directly from the audit and liquidity files where they exist, and produces a single integrated plan with measurable Free Cash Flow targets and quarterly review milestones.",
    ],
    engagement: [
      { step: "Operational assessment", duration: "2-3 weeks", fee: "Flat fee" },
      { step: "Restructuring plan delivery", duration: "30-day plan + walkthrough", fee: "Included" },
      { step: "Quarterly advisory", duration: "Quarterly cadence, 12-month minimum", fee: "Monthly retainer" },
      { step: "Targeted projects", duration: "Scoped as required", fee: "Project fees" },
    ],
    whatItAddresses: [
      "Operating entities emerging from creditor restructuring that require a durable margin path to prevent recurrence",
      "Businesses where pricing discipline has lagged inflation, input cost changes, or competitive repositioning",
      "Organizations carrying staffing structures, real estate footprints, or operating practices sized for an earlier revenue profile",
      "Cases where working capital is structurally tied up in slow-paying receivables, slow-moving inventory, or unproductive deposits",
      "Engagements where capital allocation discipline, including equipment refresh cycles and growth investment, is not aligned with the underlying margin of the business",
    ],
    methodology: [
      {
        title: "Margin diagnostic",
        body: "The practice reconstructs gross margin and operating margin at a product, service line, or unit level, depending on the structure of the business. The diagnostic identifies which revenue is genuinely accretive, which is margin-neutral, and which is contributing negative margin once allocated cost is included. The diagnostic is the foundation for pricing and capital allocation recommendations.",
      },
      {
        title: "Working capital review",
        body: "Accounts receivable aging, inventory turnover, and supplier payment terms are reviewed against industry-appropriate benchmarks. Specific recommendations are produced for receivables collection discipline, inventory rationalization, and supplier term renegotiation, with each recommendation accompanied by a target Free Cash Flow impact.",
      },
      {
        title: "Organizational and overhead structure",
        body: "Compensation, headcount, real estate, and discretionary overhead are reviewed against the current revenue profile and gross margin of the business. The review identifies positions where structural cost has not been recalibrated since a prior revenue peak and produces a sequenced approach to alignment without disrupting operational continuity.",
      },
      {
        title: "Capital allocation discipline",
        body: "Equipment refresh cycles, growth investment, owner distributions, and reserve policy are reviewed against the underlying margin and Free Cash Flow generation of the business. The output is a written capital allocation framework with thresholds for reinvestment, distribution, and reserve maintenance that can be applied consistently going forward.",
      },
    ],
    deliverables: [
      "Margin diagnostic at the appropriate unit of measure for the business",
      "Working capital recommendations with target Free Cash Flow impact for each item",
      "Organizational and overhead alignment plan",
      "Capital allocation framework with documented thresholds for reinvestment, distribution, and reserve maintenance",
      "Quarterly review schedule with measurable targets and variance reporting",
      "Project scope memoranda for any discrete projects (system implementation, role hiring, pricing rollout, etc.) requested under the engagement",
    ],
    debtInstruments: [
      { name: "Merchant Cash Advance (MCA)", note: "Capital allocation framework explicitly excludes new merchant cash advance origination as a working capital source under any operational restructuring plan." },
      { name: "Equipment finance and capital leases", note: "Equipment refresh cycles and lease versus purchase decisions are framed against the capital allocation framework and the underlying utilization economics of each asset." },
      { name: "Vendor and trade debt", note: "Supplier payment terms are renegotiated as part of the working capital review, with extended terms or volume-based discounts pursued where they increase the structural margin." },
      { name: "Bank term loans and lines of credit", note: "Bank facility structure is reviewed against actual working capital needs, with line right-sizing, term loan refinancing, or facility consolidation evaluated as part of the capital plan." },
      { name: "IRS and state tax obligations", note: "Current quarter deposit compliance is incorporated into the operating envelope as a non-discretionary obligation, and any structured installment agreement is honored within the capital allocation framework." },
    ],
    commonEngagements: [
      {
        title: "Trucking operator post-creditor resolution",
        body: "A carrier emerging from an MCA workout. Operational restructuring evaluates lane mix, rate discipline, equipment utilization, and driver retention practices, and rebuilds the capital allocation framework to fund equipment refresh, owner distributions, and reserve maintenance from operating margin rather than from external short-term capital.",
      },
      {
        title: "Restaurant group margin recovery",
        body: "A multi-unit operator that has stabilized creditor obligations and is rebuilding margin. The engagement reviews menu engineering, labor structure across day parts, vendor sourcing economics, and unit-level capital allocation, with measurable Free Cash Flow targets at the unit and group level.",
      },
      {
        title: "Medical practice working capital optimization",
        body: "A specialty practice with substantial accounts receivable tied up in payer reimbursement cycles. The engagement reviews payer mix, billing cycle discipline, denial management practices, and clinical efficiency, with targeted Free Cash Flow improvement through receivables acceleration and operational throughput.",
      },
    ],
    faq: [
      {
        q: "Is operational restructuring only appropriate after creditor resolution?",
        a: "The engagement is most commonly retained after creditor obligations have been restructured or resolved, but the methodology is equally applicable to stable businesses seeking durable margin improvement. The work is independent of any active distress and stands on its own as a strategic consulting engagement.",
      },
      {
        q: "What unit of measure does the margin diagnostic use?",
        a: "The diagnostic is scoped to the operational structure of the business. For a multi-unit operator, the diagnostic is performed at the unit level. For a service business, the diagnostic is performed at the service line or engagement type level. For a product business, the diagnostic is performed at the SKU or category level as appropriate.",
      },
      {
        q: "Does the engagement include implementation support?",
        a: "The base engagement produces the diagnostic, the restructuring plan, and the quarterly review cadence. Implementation of specific recommendations is supported by targeted project engagements under separate scope, including pricing rollout, system implementation, role hiring, or vendor renegotiation, as required.",
      },
      {
        q: "How is the engagement priced?",
        a: "The base engagement carries a flat fee for the diagnostic and plan, and a monthly retainer for ongoing quarterly advisory. Targeted projects are scoped and priced individually. Specific fees are established at engagement based on the size and complexity of the business.",
      },
      {
        q: "Does the practice provide accounting, tax, or legal advice as part of operational restructuring?",
        a: "No. The engagement is a strategic and operational consulting engagement. Accounting, tax, and legal matters are addressed in coordination with the client's existing accountant, tax professional, and counsel, or with such professionals as the client retains during the engagement.",
      },
      {
        q: "Does the engagement involve direct interaction with the client's team?",
        a: "Yes. The engagement is collaborative and the practice works directly with the operator and, where appropriate, with key members of the client's management team. The work is structured to build internal capability rather than to replace it.",
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
