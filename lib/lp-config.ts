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
    metaTitle: "MCA Debt Relief - Free Assessment | TerraDebt",
    metaDescription: "Stacked MCAs? TerraDebt resolves merchant cash advance debt with tailored programs. Free assessment, no commitment, programs from $25K to $5M+.",
    eyebrow: "Free assessment for stacked MCA debt",
    headlineLead: "Get up to",
    headlineAccent: "60% off",
    headlineTail: "your stacked MCA debt.",
    subline:
      "Settlement and restructure programs for businesses stacked on merchant cash advances. Most programs resolve in 6 to 18 months.",
    bullets: [
      "Pause damaging daily debits",
      "Negotiate balances down 40-60 percent on settlements",
      "Restructure terms when settlement is not the right path",
      "Coordinated counsel in all 50 states for legal defense",
    ],
    ctaPrimary: "Start my free assessment",
    trustLine: "Pre-default and post-default · 50-state counsel · Tailored programs",
  },
  affiliate: {
    id: "affiliate",
    source: "affiliate-lp",
    metaTitle: "Resolve Stacked MCA Debt | TerraDebt",
    metaDescription: "A modern, transparent path out of stacked merchant cash advance debt. Free assessment, tailored programs, real counsel.",
    eyebrow: "Referred to TerraDebt",
    headlineLead: "Resolve your MCA stack with a",
    headlineAccent: "real plan",
    headlineTail: ".",
    subline:
      "TerraDebt builds a program that fits your situation. Settlement, restructure, or legal defense — coordinated end to end.",
    bullets: [
      "Free 60-second assessment",
      "Programs tailored to your stack and timeline",
      "Coordinated counsel in all 50 states",
      "Most programs resolve in 6 to 18 months",
    ],
    ctaPrimary: "Get my free assessment",
    trustLine: "Pre-default and post-default · 50-state counsel · Tailored programs",
  },
};

export function getLpIds(): string[] {
  return Object.keys(LP_CONFIGS);
}
