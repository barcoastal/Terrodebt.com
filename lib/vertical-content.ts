export type VerticalContent = {
  slug: string;
  name: string;
  headline: string;
  subline: string;
  pains: string[];
  stats: { label: string; value: string }[];
  faq: { q: string; a: string }[];
};

export const VERTICAL_CONTENT: VerticalContent[] = [
  {
    slug: "trucking",
    name: "Trucking",
    headline: "MCA Relief for Trucking Companies",
    subline: "When factoring stacks on top of MCAs and fuel costs spike, the daily debits stop matching the lane economics. We resolve that.",
    pains: [
      "Factoring advances and MCA debits hitting the same account every morning",
      "Fuel and driver pay outrunning weekly settlement timing",
      "Equipment financing payments competing with daily MCA pulls",
      "Brokers slow-paying loads while the MCA debit does not slow down",
    ],
    stats: [
      { label: "Average MCA debt resolved", value: "$425K" },
      { label: "Typical savings", value: "42%" },
      { label: "Average program length", value: "11 months" },
    ],
    faq: [
      { q: "Will my factor still advance while you negotiate?", a: "Yes in most cases. We coordinate directly with your factor so receivable advances continue while we pause and renegotiate the MCA debits." },
      { q: "Can I keep running my trucks during the program?", a: "Operating is the goal. Programs are designed so you can dispatch, fuel, and pay drivers while we work the lender side." },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    headline: "MCA Relief for Restaurants",
    subline: "Seasonal swings and tipped payroll do not match a fixed daily MCA debit. We renegotiate so the payment fits the actual cash flow.",
    pains: [
      "Daily MCA debit identical in February as in July",
      "Tipped payroll, food costs, and rent all due before the MCA pulls",
      "Slim margins leave nothing for an emergency repair",
      "Square or Toast hold capturing receivables before you see them",
    ],
    stats: [
      { label: "Average MCA debt resolved", value: "$180K" },
      { label: "Typical savings", value: "51%" },
      { label: "Average program length", value: "9 months" },
    ],
    faq: [
      { q: "Can you work with our POS hold?", a: "Yes. We have negotiated around Square, Toast, Clover, and Stripe holds in dozens of cases. The first move is usually requesting reconciliation." },
      { q: "What if we already missed payroll?", a: "Tell us during intake. Payroll is the priority. We can structure the program so payroll comes first and the MCAs queue behind it." },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    headline: "MCA Relief for Construction",
    subline: "Progress payments arrive in chunks. MCAs pull every business day. The math breaks. We fix it.",
    pains: [
      "Progress draws arriving every 30 to 60 days against daily MCA debits",
      "Subcontractor invoices and lien deadlines stacking with MCA pulls",
      "Mobilization costs hitting before the first draw clears",
      "Retainage tied up while MCAs keep debiting at full pace",
    ],
    stats: [
      { label: "Average MCA debt resolved", value: "$560K" },
      { label: "Typical savings", value: "47%" },
      { label: "Average program length", value: "13 months" },
    ],
    faq: [
      { q: "Will resolving MCAs put my bonding at risk?", a: "We coordinate carefully with bonding so the program does not jeopardize active jobs. Restructure programs are usually preferred for bonded contractors." },
      { q: "What about pending lien claims?", a: "Lien rights are time-sensitive. We layer MCA work around your lien calendar so deadlines are protected." },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "MCA Relief for Healthcare Practices",
    subline: "Insurance reimbursement runs on its schedule. MCA debits run on theirs. We bring them back into alignment.",
    pains: [
      "Insurance reimbursement lag of 30 to 90 days versus daily MCA debits",
      "Equipment loans on top of stacked MCAs",
      "Payroll for clinical staff competing with daily lender pulls",
      "Denials and re-bills delaying the cash flow MCAs assumed would arrive",
    ],
    stats: [
      { label: "Average MCA debt resolved", value: "$95K" },
      { label: "Typical savings", value: "48%" },
      { label: "Average program length", value: "10 months" },
    ],
    faq: [
      { q: "Are HIPAA-related concerns a problem?", a: "We never request patient data. Underwriting and negotiation use bank statements and contracts only." },
      { q: "Can I keep accepting new patients?", a: "Yes. The program is designed so the practice keeps operating, scheduling, and billing normally." },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    headline: "MCA Relief for Retail Businesses",
    subline: "Inventory ties up cash before sell-through happens. MCAs do not wait. We negotiate terms that respect the cycle.",
    pains: [
      "Inventory cash locked up for 60 to 120 days while MCAs debit daily",
      "Thin gross margins leaving nothing for a slow week",
      "Vendor terms tightening at the same time MCAs stack",
      "Seasonal inventory builds with no matched cash flow",
    ],
    stats: [
      { label: "Average MCA debt resolved", value: "$310K" },
      { label: "Typical savings", value: "46%" },
      { label: "Average program length", value: "12 months" },
    ],
    faq: [
      { q: "Will vendors still extend terms during the program?", a: "Often yes. Vendor relationships are usually preserved because we focus on the MCAs, not the trade." },
      { q: "What about my merchant processor?", a: "We coordinate with the processor so daily settlement continues normally while MCA debits are paused or restructured." },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    headline: "MCA Relief for E-commerce Businesses",
    subline: "Ad spend, inventory builds, and platform payout holds all compete with the daily MCA debit. We restore the room to operate.",
    pains: [
      "Ad spend due upfront before the orders convert and ship",
      "Inventory build on the wrong side of the cash conversion cycle",
      "Amazon, Shopify, or Stripe payout holds during dispute spikes",
      "Stacked MCAs taken on to fund Q4 leaving no room in Q1",
    ],
    stats: [
      { label: "Average MCA debt resolved", value: "$220K" },
      { label: "Typical savings", value: "55%" },
      { label: "Average program length", value: "8 months" },
    ],
    faq: [
      { q: "Can I keep running ads during the program?", a: "Yes. Ad spend is usually a non-negotiable cost. We design the monthly payment around continued operations." },
      { q: "What if my Amazon account is on hold?", a: "We have unwound holds in coordination with Amazon and the lender. Tell us during intake so we can sequence the work correctly." },
    ],
  },
  {
    slug: "salons",
    name: "Salons & Spas",
    headline: "MCA Relief for Salons and Spas",
    subline: "Stylist payouts, supplier credit, and rent all hit before the daily MCA debit. We bring those payments back into balance.",
    pains: [
      "1099 stylist payouts due weekly against daily MCA debits",
      "Beauty supplier credit pulling back as MCAs stack",
      "Booth rent and lease payments competing with MCA pulls",
      "Seasonal slowdowns in summer or post-holiday with no buffer",
    ],
    stats: [
      { label: "Average MCA debt resolved", value: "$65K" },
      { label: "Typical savings", value: "53%" },
      { label: "Average program length", value: "9 months" },
    ],
    faq: [
      { q: "What if my stylists are quitting because checks are bouncing?", a: "Stabilizing payroll is the first move. We have paused MCA debits within 48 hours in salon cases so payroll clears." },
      { q: "Can I keep my booth rental setup?", a: "Yes. The program does not require structural changes to how you compensate stylists." },
    ],
  },
  {
    slug: "auto",
    name: "Auto",
    headline: "MCA Relief for Auto Businesses",
    subline: "Floor plan financing and parts inventory tie up cash. MCAs do not care. We renegotiate so the dealership or shop can keep running.",
    pains: [
      "Floor plan interest stacking with daily MCA debits",
      "Parts inventory tied up while service revenue moves slowly",
      "Title work and DMV processing delays cutting into cash flow",
      "Seasonal swings in service work hitting fixed MCA payments",
    ],
    stats: [
      { label: "Average MCA debt resolved", value: "$700K" },
      { label: "Typical savings", value: "44%" },
      { label: "Average program length", value: "12 months" },
    ],
    faq: [
      { q: "Will resolving MCAs affect my floor plan?", a: "We coordinate with floor plan providers throughout the program. Most floor plans are unaffected if the program is run correctly." },
      { q: "What about service writers and techs payroll?", a: "Payroll comes first. The program is structured around keeping the shop staffed and operating." },
    ],
  },
];
