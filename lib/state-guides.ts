import { REFERENCES, type Reference } from "./editorial";
export type StateGuide = {
  summary: string;
  ruleHeading: string;
  rule: string;
  source: Reference;
  sections: { heading: string; paragraphs: string[] }[];
};
// Only these pages currently have researched, state-specific guidance.
export const STATE_GUIDES: Record<string, StateGuide> = {
  FL: {
    summary: "For a Florida business facing MCA collection, separate the agreement, any filed case, and the action affecting your bank account. The location of your business does not by itself tell you which court procedure applies.",
    ruleHeading: "Florida's rule on powers to confess judgment",
    rule: "Florida Statutes §55.05 makes a power of attorney given before an action to confess judgment null and void. This is more specific than saying Florida courts merely impose extra procedural requirements. Ask counsel to distinguish that issue from a lawsuit on the agreement or an existing judgment from another jurisdiction.",
    source: REFERENCES.fl,
    sections: [
      { heading: "A Florida business with an out-of-state case", paragraphs: ["Check the caption on the actual court documents. A business operating in Fort Lauderdale may receive papers referring to a different state, and the contract may name another forum. Give counsel the complete agreement, the case number, the filing location, and the date you learned of the proceeding. Do not assume the Florida business address alone resolves jurisdiction or the effect of an out-of-state judgment.", "Keep the signed guarantee separate from the business agreement. Ask the attorney to identify which entity or owner is named and which documents need a response. A proposed workout for the business should not leave an individual guarantor's position unexplained."] },
      { heading: "If a Florida bank account is restricted", paragraphs: ["Request the bank's written notice and the underlying case or order details. Record which account is affected and whether the restriction is connected to a judgment, levy, garnishment, or another action. These labels matter when an attorney evaluates a response.", "Prepare a short operating forecast showing payroll, rent, supplier payments, and the balances currently accessible to the business. It can support a discussion about practical options, but it is not a substitute for an appropriate legal response. Avoid promising vendors a release date before the basis of the restriction has been reviewed."] },
      { heading: "Prepare the financial side of the review", paragraphs: ["List every MCA and other creditor, including the outstanding amount claimed, debits taken, payments already made, security documents, and any pending deadlines. Include reconciliation requests and lender replies. Keep a copy of the Florida rule linked above with the file so counsel can explain whether it is relevant to your documents.", "Ask whether the immediate priority is responding to a case, evaluating a proposed modification, or comparing a settlement. A creditor discussion does not replace the court response or establish that a claimed balance is correct."] },
    ],
  },
  NY: {
    summary: "New York MCA disputes require attention to the actual affidavit, filing county, and court record. A confession-of-judgment clause and a judgment already entered are not the same stage of a matter.",
    ruleHeading: "What CPLR §3218 says about filing",
    rule: "New York CPLR §3218 specifies the defendant's affidavit and restricts filing to a county of residence identified in the statute. It also provides a three-year period after execution for filing the affidavit. For an entity, the section treats a county containing a place of business as a residence. Counsel should evaluate the facts and any exceptions against the current statutory text.",
    source: REFERENCES.ny,
    sections: [
      { heading: "Build an affidavit and filing timeline", paragraphs: ["Locate the signed affidavit, the original agreement, any amendments, and the entered judgment if one exists. Put the signature date, filing date, case number, and county on a single timeline. Record the business locations at the relevant times and keep documents supporting those locations.", "That organization helps counsel evaluate the statutory requirements without relying on a lender's summary. It does not establish that a judgment is valid or invalid. Ask the attorney which documents are missing and how they will obtain the court file."] },
      { heading: "Separate the claimed balance from the legal procedure", paragraphs: ["Reconcile the amount claimed with the funding received, the contracted receivables amount, all withdrawals, returned payments, fees, and any prior resolution. Supply bank records rather than an estimated total. Keep evidence of requests to adjust collections and the responses received.", "An accounting dispute and a procedural issue may require different treatment. Ask counsel how the payment record affects the matter and whether a proposed financial workout should be discussed while a legal response is prepared."] },
      { heading: "Owners operating outside New York", paragraphs: ["If the business operates elsewhere, identify every business location and the contractual forum provision. Tell counsel where the owner and entity were based when the documents were signed and when the filing occurred. Do not rely on a blanket online statement that every out-of-state business is protected or every New York filing is enforceable.", "If a bank in another state has restricted an account, supply its notice too. The financial team and attorney need the same file, with a clear allocation of responsibility for court deadlines, creditor contact, and any payment proposal."] },
    ],
  },
  CA: {
    summary: "A California MCA review should distinguish the state's confession-of-judgment rule from ordinary collection litigation, older judgments, and the financial terms of the advance.",
    ruleHeading: "California's current confession-of-judgment rule",
    rule: "California Code of Civil Procedure §1132 states that a judgment by confession is unenforceable and may not be entered in superior court. The section expressly excludes judgments obtained or entered before January 1, 2023. Counsel should check the judgment date and the kind of proceeding instead of applying this rule to every debt dispute.",
    source: REFERENCES.ca,
    sections: [
      { heading: "Check the dates and the type of court document", paragraphs: ["Gather the agreement, any confession documents, and the complete court record supplied to you. Note whether you have received a demand, a summons and complaint, or notice of an existing judgment. An owner should not ignore ordinary lawsuit papers because a different enforcement mechanism is restricted.", "For an older judgment or a proceeding originating elsewhere, ask counsel which rules apply to recognition or enforcement. A California address and an MCA label do not replace review of the actual documents."] },
      { heading: "Review the commercial financing disclosures", paragraphs: ["California's Department of Financial Protection and Innovation publishes information on commercial financing disclosures. Preserve the disclosure presented with your offer, along with the signed agreement and funding record. Ask a qualified adviser whether the transaction and provider fall within the applicable rules.", "For a practical cost review, compare net funds received, the total amount to be collected, payment frequency, fees, and any reconciliation or prepayment provisions. Do not treat a factor rate as interchangeable with an annual percentage rate. The DFPI reference below provides the regulatory background."] },
      { heading: "Prepare a workable response", paragraphs: ["Make one list of legal deadlines and another of operating obligations. The first belongs in the attorney's review; the second should include payroll, rent, essential suppliers, taxes, and creditor withdrawals. A workable proposal needs to reflect both, without assuming a creditor discussion pauses a court matter.", "Ask counsel to explain who is represented, whether an owner is named personally, and what work is included in the engagement. Ask the financial consultant to explain the payment proposal, total fees, and the consequences if one creditor declines. Keep accepted terms in writing."] },
    ],
  },
};
export const hasStateGuide = (code: string) => Object.prototype.hasOwnProperty.call(STATE_GUIDES, code.toUpperCase());
