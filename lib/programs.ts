export type ProgramKey = "settlement" | "restructure" | "reverse-consolidation-defense" | "legal-defense";

export const PROGRAMS: Record<ProgramKey, {
  title: string;
  headline: string;
  subline: string;
  whoFor: string[];
  mechanism: string[];
  example: { debt: number; saved: number; months: number };
}> = {
  "settlement": {
    title: "MCA Settlement",
    headline: "Settle stacked MCAs for less than you owe.",
    subline: "We negotiate balances down with each MCA lender, typically 40 to 60 percent, and structure a single affordable plan.",
    whoFor: [
      "Behind on 2+ MCA payments",
      "Account frozen or facing UCC liens",
      "Total MCA debt $50K-$2M+",
    ],
    mechanism: [
      "Pause MCA debits via reconciliation request",
      "Negotiate settled balance per lender",
      "Structure unified monthly payment to TerraDebt-managed escrow",
      "Disburse to lenders as settlements close",
    ],
    example: { debt: 425000, saved: 178500, months: 11 },
  },
  "restructure": {
    title: "MCA Restructure",
    headline: "Restructure your MCAs into one manageable monthly payment.",
    subline: "We renegotiate terms with each lender so your payments fit your actual cash flow, without settling.",
    whoFor: ["Current but stretched on stacked MCAs", "Want to preserve lender relationships", "Total debt $25K-$1M"],
    mechanism: [
      "Aggregate all MCA contracts and effective APRs",
      "Negotiate extended terms / lower daily debit per lender",
      "Single monthly payment plan",
      "Optional: pair with refi if business qualifies",
    ],
    example: { debt: 320000, saved: 96000, months: 14 },
  },
  "reverse-consolidation-defense": {
    title: "Reverse Consolidation Defense",
    headline: "Already in reverse consolidation? Get out without losing more.",
    subline: "Reverse consolidation often makes things worse. We unwind the consolidation and renegotiate with the underlying MCAs.",
    whoFor: [
      "Currently in a reverse consolidation",
      "Total debt actually grew after consolidating",
      "Daily debits exceed sustainable cash flow",
    ],
    mechanism: [
      "Audit current reverse consolidation contract",
      "Identify breach + unwind opportunities",
      "Engage underlying MCA holders directly",
      "Settle or restructure underlying debt",
    ],
    example: { debt: 540000, saved: 220000, months: 13 },
  },
  "legal-defense": {
    title: "MCA Legal Defense",
    headline: "Sued? COJ filed? Account frozen? We coordinate immediate legal defense.",
    subline: "Through our network of MCA-defense attorneys in all 50 states, we coordinate response within 72 hours.",
    whoFor: ["Confession of Judgment filed", "Account frozen / UCC enforcement", "Active litigation from MCA lender"],
    mechanism: [
      "Within 72 hours: emergency attorney engagement",
      "File defense, motion to vacate where applicable",
      "Negotiate settlement parallel to litigation",
      "Coordinate restraining orders for frozen accounts",
    ],
    example: { debt: 280000, saved: 134000, months: 8 },
  },
};
