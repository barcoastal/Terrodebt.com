export type LpConfig = {
  id: string;
  source: string;        // Lead.source tag, used to route the Zapier webhook
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTail: string;
  subline: string;
  bullets: string[];
  ctaPrimary: string;
  trustLine: string;
};

export const LP_CONFIGS: Record<string, LpConfig> = {
  google: {
    id: "google",
    source: "google-lp",
    metaTitle: "Business Debt Restructure - Free Assessment",
    metaDescription: "Restructure stacked MCA, equipment, vendor, bank, or tax debt with a coordinated workout. Free assessment, real counsel, no commitment.",
    eyebrow: "Free assessment for stretched business debt",
    headlineLead: "Restructure your business debt with a",
    headlineAccent: "tailored workout",
    headlineTail: ".",
    subline:
      "MCA, equipment finance, vendor, bank, and tax debt. Most workouts resolve in 6 to 18 months across five product categories.",
    bullets: [
      "Pause damaging daily debits on stacked MCAs",
      "Term extensions and acceleration defense on equipment leases",
      "Coordinated vendor paydowns and bank workouts",
      "IRS installment agreements and offer in compromise",
      "Coordinated counsel in all 50 states when legal defense is needed",
    ],
    ctaPrimary: "Start my free assessment",
    trustLine: "Pre-default and post-default · 50-state counsel · Five product categories",
  },
  affiliate: {
    id: "affiliate",
    source: "affiliate-lp",
    metaTitle: "Resolve Business Debt with a Coordinated Workout",
    metaDescription: "A modern, transparent path through business debt. Free assessment, tailored programs across MCA, equipment, vendor, bank, and tax debt.",
    eyebrow: "Referred to Business Debt Insider",
    headlineLead: "Resolve your business debt with a",
    headlineAccent: "real plan",
    headlineTail: ".",
    subline:
      "Business Debt Insider builds a workout that fits your situation. MCA, equipment, vendor, bank, and tax debt. Coordinated end to end.",
    bullets: [
      "Free 60-second assessment",
      "Five product categories covered by one team",
      "Coordinated counsel in all 50 states",
      "Most workouts resolve in 6 to 18 months",
    ],
    ctaPrimary: "Get my free assessment",
    trustLine: "Pre-default and post-default · 50-state counsel · Five product categories",
  },
};

export function getLpIds(): string[] {
  return Object.keys(LP_CONFIGS);
}
