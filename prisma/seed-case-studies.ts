import { PrismaClient } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
const db = new PrismaClient({ adapter });

const STUDIES = [
  {
    slug: "trucking-425k",
    industry: "Trucking",
    debtAmount: 425000,
    savingsPct: 42,
    months: 11,
    storyMd: `## The situation

A 14-truck regional carrier in the Southeast had stacked seven MCAs in 18 months to bridge slow-paying brokers and rising fuel. Daily debits hit $4,800 across all lenders. Two trucks were already parked because the operator could not afford fuel and an emergency repair the same week.

## What we did

We pulled all seven contracts and calculated effective APRs ranging from 78 to 142 percent. We requested reconciliation across all lenders within the first week, which paused the daily debits while we negotiated. We coordinated with the factor to keep receivable advances flowing so dispatch did not stop.

Settlement negotiations resolved each balance between 38 and 55 percent of face value. The operator continued running freight throughout the program.

## Outcome

Total debt of $425,000 was resolved for $246,500. The operator saved $178,500, brought both parked trucks back online, and exited the program after 11 months with one consolidated monthly payment that fit lane economics. The company hired two additional drivers in month 12.`,
  },
  {
    slug: "restaurant-180k",
    industry: "Restaurant",
    debtAmount: 180000,
    savingsPct: 51,
    months: 9,
    storyMd: `## The situation

A two-location independent restaurant in Texas had stacked four MCAs through the post-holiday slow season. Daily debits totaled $1,950 against a typical winter daily revenue of $4,200. Tipped payroll was bouncing and the owner was personally covering vendor checks.

## What we did

We requested reconciliation immediately given the demonstrable revenue drop. Three of four lenders agreed to pause within the first 14 days. We negotiated settled balances on all four contracts and structured a single monthly payment that respected the seasonal cycle.

## Outcome

The $180,000 debt resolved for $88,200. Tipped payroll cleared by week three. The owner kept both locations open and exited the program in nine months. Summer revenue rebuilt the cash buffer that the MCAs had drained.`,
  },
  {
    slug: "construction-560k",
    industry: "Construction",
    debtAmount: 560000,
    savingsPct: 47,
    months: 13,
    storyMd: `## The situation

A commercial GC in the Northeast had taken five MCAs to mobilize on a $2.1M project that hit a draw delay. Daily debits totaled $5,400 while the project sat 60 days behind on the third draw. Bonded backlog was at risk.

## What we did

We coordinated directly with the bonding company so program enrollment did not jeopardize active jobs. We negotiated extended terms and partial settlements across the five lenders, structuring payments around actual draw timing rather than calendar days.

## Outcome

Total debt of $560,000 resolved for $296,800. The bonded backlog stayed intact. The GC won two more projects during the program and exited month 13 with capacity to bond larger jobs again.`,
  },
  {
    slug: "healthcare-95k",
    industry: "Healthcare",
    debtAmount: 95000,
    savingsPct: 48,
    months: 10,
    storyMd: `## The situation

A three-provider physical therapy clinic had stacked three MCAs after an insurance denial cycle stretched reimbursement past 90 days. Daily debits were $1,100 and clinical staff payroll had bounced once.

## What we did

We pulled the contracts and the bank statements showing the reimbursement cycle. We negotiated settlement on two of three contracts and a restructure on the third, all without ever touching patient data. The single monthly payment matched the average reimbursement cadence.

## Outcome

The $95,000 debt resolved for $49,400. Clinical payroll stabilized. The clinic added a fourth provider in month 11 and exited the program with documented cash flow.`,
  },
  {
    slug: "retail-310k",
    industry: "Retail",
    debtAmount: 310000,
    savingsPct: 46,
    months: 12,
    storyMd: `## The situation

A specialty retail boutique with three locations had stacked five MCAs to fund a Q4 inventory build that did not sell through. Post-holiday daily debits of $3,200 collided with January revenue cut in half. Vendor terms had begun tightening.

## What we did

We negotiated settlements on three contracts and a restructure on two. Vendor relationships stayed intact because we focused negotiations entirely on the MCAs. Inventory was right-sized in coordination with the resolution plan.

## Outcome

The $310,000 debt resolved for $167,400. All three locations stayed open. Margin recovered as inventory normalized. The retailer exited month 12 ready for the next holiday cycle without re-stacking.`,
  },
  {
    slug: "ecommerce-220k",
    industry: "E-commerce",
    debtAmount: 220000,
    savingsPct: 55,
    months: 8,
    storyMd: `## The situation

A DTC apparel brand had stacked four MCAs to fund summer ad spend and inventory. iOS attribution losses cut ROAS in half and the daily debits of $2,400 were eating directly into ad budget. The brand was 10 days from going dark.

## What we did

We paused MCA debits within five business days through reconciliation. We negotiated aggressive settlements given the documented revenue concentration risk. The brand kept running ads throughout, which preserved the holiday revenue path.

## Outcome

The $220,000 debt resolved for $99,000. The brand hit a record Q4 with the ad budget intact. Program closed in 8 months with the lowest debt-to-revenue position the brand had seen in two years.`,
  },
  {
    slug: "auto-700k",
    industry: "Auto",
    debtAmount: 700000,
    savingsPct: 44,
    months: 12,
    storyMd: `## The situation

An independent used auto dealership with attached service had stacked six MCAs. Floor plan interest and parts inventory had absorbed the cash that the operator assumed would cover the daily debits of $7,800.

## What we did

We coordinated with the floor plan provider before approaching the MCAs so the inventory line was not disrupted. We negotiated settlements on four contracts and restructures on two. The shop kept service running and the lot kept selling.

## Outcome

The $700,000 debt resolved for $392,000. Floor plan stayed intact. Service revenue recovered as the parts ordering normalized. Program closed at month 12 with the lot inventory back at target.`,
  },
  {
    slug: "salon-65k",
    industry: "Salon",
    debtAmount: 65000,
    savingsPct: 53,
    months: 9,
    storyMd: `## The situation

A two-location salon had stacked three MCAs after a slow summer. Stylists were threatening to leave because checks were bouncing. Daily debits of $720 were small in absolute terms but enormous against the actual cash flow.

## What we did

We paused the debits within 48 hours through reconciliation, which let payroll clear that Friday. We negotiated settlements on all three contracts and structured a single monthly payment around booth rent and stylist payouts.

## Outcome

The $65,000 debt resolved for $30,550. All stylists stayed. Both locations continued operating. The owner exited the program in nine months and rebuilt a payroll buffer for the next slow season.`,
  },
  {
    slug: "hvac-145k",
    industry: "HVAC",
    debtAmount: 145000,
    savingsPct: 49,
    months: 10,
    storyMd: `## The situation

A 12-tech HVAC company had stacked four MCAs across the off-season. Daily debits of $1,650 were unsustainable against winter service-only revenue. Three trucks needed unscheduled repairs in the same month.

## What we did

We pulled bank statements showing the seasonal pattern and negotiated settlements that respected the shape of the year. The single monthly payment was structured higher in summer cooling season and lower in shoulder months.

## Outcome

The $145,000 debt resolved for $73,950. All three trucks were repaired. The company kept full headcount through winter and exited the program at month 10 ready for the install season.`,
  },
  {
    slug: "distributor-1m",
    industry: "Distributor",
    debtAmount: 1000000,
    savingsPct: 41,
    months: 16,
    storyMd: `## The situation

A regional food distributor had stacked nine MCAs across two years to bridge customer payment terms. Daily debits exceeded $11,000 and three accounts had filed UCC notices. Two key customers were threatening to switch suppliers.

## What we did

This was a coordinated multi-track program. We engaged legal defense for the UCC actions in week one. We negotiated with each of the nine lenders in parallel, sequencing settlements as funds became available. We coordinated with key customers so deliveries continued throughout.

## Outcome

The $1,000,000 debt resolved for $590,000. The UCC actions were vacated or settled. All key customer relationships stayed intact. Program closed at month 16 with the distributor positioned to grow into the route capacity again.`,
  },
];

async function main() {
  for (const s of STUDIES) {
    await db.caseStudy.upsert({
      where: { slug: s.slug },
      update: { ...s, published: true },
      create: { ...s, published: true },
    });
  }
  console.log("Seeded", STUDIES.length, "case studies");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
