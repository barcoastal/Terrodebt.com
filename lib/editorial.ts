export type Reference = { label: string; url: string };
export const REFERENCES = {
  ftc: { label: "FTC: Protecting small businesses seeking financing", url: "https://www.ftc.gov/business-guidance/blog/2020/08/protecting-small-businesses-seeking-financing-during-pandemic" },
  disclosure: { label: "California DFPI: Commercial financing disclosures", url: "https://dfpi.ca.gov/regulated-industries/california-financing-law/about-california-financing-law/california-financing-law-commercial-financing-disclosures/" },
  ny: { label: "New York CPLR §3218: Judgment by confession", url: "https://www.nysenate.gov/legislation/laws/CVP/3218" },
  fl: { label: "Florida Statutes §55.05: Powers of attorney to confess judgment", url: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0000-0099/0055/Sections/0055.05.html" },
  ca: { label: "California Code of Civil Procedure §1132", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=1132." },
  ucc: { label: "New York Department of State: UCC filing questions", url: "https://dos.ny.gov/ucc-frequently-asked-questions" },
  irsOffer: { label: "IRS: Offer in compromise", url: "https://www.irs.gov/payments/offer-in-compromise" },
  irsPlan: { label: "IRS: Payment plans and installment agreements", url: "https://www.irs.gov/payments/payment-plans-installment-agreements" },
  bankruptcy: { label: "U.S. Courts: Chapter 11 bankruptcy basics", url: "https://www.uscourts.gov/court-programs/bankruptcy/bankruptcy-basics/chapter-11-bankruptcy-basics" },
  sba: { label: "U.S. Small Business Administration: Loan programs", url: "https://www.sba.gov/loans/" },
} satisfies Record<string, Reference>;

export function editorialAuthor(author?: string | null): string {
  return !author?.trim() || /^(terradebt(?: team)?|business debt insider)$/i.test(author.trim())
    ? "Business Debt Insider" : author.trim();
}

// References are further reading for a topic, not an assertion that every
// historical article claim has been independently checked or legally reviewed.
export function articleReferences(slug: string): Reference[] {
  if (/irs|tax/.test(slug)) return [REFERENCES.irsPlan, REFERENCES.irsOffer];
  if (/florida/.test(slug)) return [REFERENCES.fl, REFERENCES.ny];
  if (/coj|attorney/.test(slug)) return [REFERENCES.ny, REFERENCES.ca, REFERENCES.fl];
  if (/ucc|lien|freeze/.test(slug)) return [REFERENCES.ucc, REFERENCES.ny];
  if (/bankruptcy/.test(slug)) return [REFERENCES.bankruptcy, REFERENCES.sba];
  if (/apr|contract|reconciliation/.test(slug)) return [REFERENCES.disclosure, REFERENCES.ftc];
  if (/bank-loan|business-loan|equipment|credit|loan-during|loans-to/.test(slug)) return [REFERENCES.sba, REFERENCES.ucc];
  if (/vendor/.test(slug)) return [REFERENCES.ucc, REFERENCES.bankruptcy];
  return [REFERENCES.ftc, REFERENCES.disclosure];
}
