export type ProgramKey = "settlement" | "restructure" | "legal-defense";

export const PROGRAMS: Record<ProgramKey, {
  title: string;
  headline: string;
  subline: string;
  whoFor: string[];
  mechanism: string[];
  example: { debt: number; saved: number; months: number };
  appliesTo: string;
}> = {
  "settlement": {
    title: "Settlement",
    headline: "Settle distressed business debt for less than you owe.",
    subline: "We negotiate balances down with each creditor and structure a single affordable plan. Used across MCA, vendor, and tax debt where reductions of 40 to 75 percent are reachable.",
    whoFor: [
      "Behind on 2+ payments to one or more creditors",
      "Account frozen or facing UCC liens or levy notices",
      "Total debt $25K-$2M+ across MCA, vendor, or tax obligations",
    ],
    mechanism: [
      "Pause damaging activity (MCA reconciliation, IRS CNC, vendor COD)",
      "Negotiate settled balance per creditor",
      "Structure unified monthly payment to Freshline Advisory-managed escrow",
      "Disburse to creditors as settlements close",
    ],
    example: { debt: 425000, saved: 178500, months: 11 },
    appliesTo: "Most effective on MCAs, vendor and trade creditor debt, and IRS or state tax debt where the math supports a discounted resolution.",
  },
  "restructure": {
    title: "Restructure",
    headline: "Restructure your debt into one manageable monthly payment.",
    subline: "We renegotiate terms with each lender so payments fit your actual cash flow, without settling. Used across MCA, SBA, equipment, and bank debt where the relationship is worth preserving.",
    whoFor: [
      "Current but stretched on stacked debt",
      "Want to preserve lender relationships and credit profile",
      "Total debt $25K-$1M+ across the lender mix",
    ],
    mechanism: [
      "Aggregate all contracts and map total monthly obligation",
      "Negotiate extended terms, lower payments, or covenant relief per lender",
      "Single monthly payment plan or modified payment schedule",
      "Optional: pair with refinance where the business qualifies",
    ],
    example: { debt: 320000, saved: 96000, months: 14 },
    appliesTo: "Most effective on MCAs (term extension), SBA loans (hardship modification), equipment leases (term extension or buyout negotiation), and bank loans (covenant waiver or modification).",
  },
  "legal-defense": {
    title: "Legal Defense",
    headline: "Sued? COJ filed? Account frozen? We coordinate immediate defense.",
    subline: "Through our network of attorneys in all 50 states, we coordinate emergency response within 72 hours for any business debt enforcement action.",
    whoFor: [
      "Confession of Judgment filed (common on MCAs)",
      "Account frozen, levy issued, or UCC enforcement underway",
      "Active litigation from any business creditor",
    ],
    mechanism: [
      "Within 72 hours: emergency attorney engagement in the filing state",
      "File defense, motion to vacate, or restraining order where applicable",
      "Negotiate settlement or workout in parallel with litigation",
      "Coordinate across the debt mix (MCA, bank, equipment, tax) where multiple actions are live",
    ],
    example: { debt: 280000, saved: 134000, months: 8 },
    appliesTo: "Any business debt with an active enforcement action: MCA confessions of judgment, bank lawsuits, equipment lessor repossession, tax levy or lien filings, or vendor lawsuits.",
  },
};
