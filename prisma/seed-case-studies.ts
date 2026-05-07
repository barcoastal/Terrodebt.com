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
    storyMd: `## Situation

A 14-truck regional carrier in the Southeast was running short-haul freight on a mix of brokered loads and a single dedicated lane. Diesel had moved up roughly 18 percent year over year and two key brokers had stretched payment timing from 30 days to 55. The owner had taken a first MCA two years earlier to cover a transmission repair on a tractor and had not stopped stacking since. By the time we met, there were seven active MCAs from a mix of direct funders and ISOs, with factor rates ranging from 1.32 to 1.49 and total daily debits of $4,800 against an account that was clearing roughly $7,200 a day net of fuel.

Two trucks had already been parked because the operator could not afford fuel and an emergency repair the same week, and the factor was threatening to reduce the advance percentage on freight invoices. The owner had been pitched a reverse consolidation by an ISO that would have layered an eighth advance on top of the seven already in play.

## What we did

We pulled all seven contracts on intake day and calculated effective APRs ranging from 78 to 142 percent. Three of the contracts contained clear reconciliation language we could lean on. We sent documented reconciliation requests to all seven lenders within the first eight days, supported by 90 days of bank statements that demonstrated the revenue gap. Five of the seven lenders paused debits within two weeks. We escalated the remaining two through counsel and got pauses inside three weeks.

In parallel we coordinated directly with the factor to keep receivable advances flowing at the existing rate so dispatch never stopped. Settlement negotiations resolved each balance between 38 and 55 percent of face value, with the worst factor rates settling for the largest discounts. We sequenced the lenders so the most aggressive ones settled first, which set the tone for the rest of the negotiations.

## Outcome

Total debt of $425,000 was resolved for $246,500 across 11 months. The operator saved $178,500 against face value, brought both parked trucks back online by month four, and exited the program with one consolidated monthly payment that fit lane economics. The factor relationship stayed intact throughout. The company hired two additional drivers in month 12 and is now back on a normal replacement cycle for tires and brakes instead of running them past spec.`,
  },
  {
    slug: "restaurant-180k",
    industry: "Restaurant",
    debtAmount: 180000,
    savingsPct: 51,
    months: 9,
    storyMd: `## Situation

A two-location independent restaurant in Texas serving Italian-American comfort food had been running for nine years on slim margins. The owner had taken a first MCA in late 2023 to cover a hood replacement that the property insurance would not pick up, then stacked three more across the post-holiday slow season as winter dining traffic dropped harder than expected. By the time we met there were four active MCAs at factor rates between 1.39 and 1.51, with daily debits totaling $1,950 against typical winter daily revenue of $4,200 net of food cost.

Tipped payroll had bounced twice. The owner was personally covering vendor checks to keep produce and protein deliveries arriving. A reverse consolidation pitch was on the table from one of the existing lenders, structured to grow total payback by roughly 22 percent in exchange for a slightly lower daily debit. The sales floor was empty by 8:30 most weeknights.

## What we did

Reconciliation was the obvious first move given the demonstrable seasonal revenue drop and the clean documentation we could pull from the POS. We sent reconciliation requests to all four lenders inside the first week, supported by trailing six months of bank statements and POS reports that showed the winter swing in plain numbers. Three of four lenders agreed to pause within 14 days. The fourth pushed back and we escalated through counsel, getting a pause inside three weeks.

We negotiated settled balances on all four contracts, sequencing the smallest and most aggressive lender first to set the precedent. The settlements landed between 42 and 56 percent of face value. We then structured a single monthly payment that respected the seasonal cycle, weighted heavier in summer and lighter in February and August.

## Outcome

The $180,000 debt resolved for $88,200 across 9 months. Tipped payroll cleared on time by week three, which kept the front-of-house team intact through the worst of the slow season. The owner kept both locations open, exited the program in nine months, and used the recovered summer revenue to rebuild the cash buffer that the MCAs had drained. The hood replacement that started the spiral is paid off in full.`,
  },
  {
    slug: "construction-560k",
    industry: "Construction",
    debtAmount: 560000,
    savingsPct: 47,
    months: 13,
    storyMd: `## Situation

A commercial general contractor in the Northeast had built a healthy book on mid-size school and municipal projects. Then a $2.1M renovation hit a draw delay because a change order dispute went to mediation, and 60 days of carrying costs piled up on subcontractors and material vendors. The owner had taken a first MCA to cover a payroll shortfall during the dispute and stacked four more over the next six months. Five active MCAs at factor rates between 1.35 and 1.48, total daily debits of $5,400.

Bonded backlog was the issue. Two upcoming projects required $4M and $6M in bonding capacity, and the bonding company was already asking questions about the UCC filings that had appeared on the company. A wrong move on the MCAs would have closed off the bonding line entirely and ended the company.

## What we did

The first step was coordinating directly with the bonding company. We walked the surety through the program plan before we approached any lender, so program enrollment did not jeopardize active jobs or future bond capacity. The bonding company agreed to hold the line as long as the program produced clean lender releases on a defined timeline.

We negotiated a mix of partial settlements and term extensions across the five lenders, sequencing them around actual draw timing on the active projects rather than calendar days. Three of the five contracts settled at 41 to 54 percent of face value. The remaining two were restructured into longer terms with the daily debit replaced by monthly payments matched to the draw schedule.

## Outcome

Total debt of $560,000 resolved for $296,800 across 13 months. The bonded backlog stayed intact throughout. The GC won two more projects during the program period and exited month 13 with capacity to bond larger jobs again. The change order dispute that started the spiral was resolved in the contractor&apos;s favor in month 7 and the recovered draw closed the funding gap on the original project.`,
  },
  {
    slug: "healthcare-95k",
    industry: "Healthcare",
    debtAmount: 95000,
    savingsPct: 48,
    months: 10,
    storyMd: `## Situation

A three-provider physical therapy clinic in the Mid-Atlantic had stacked three MCAs after an insurance denial cycle stretched reimbursement past 90 days on a major payer. The clinic had also taken on an equipment loan for a new traction unit and a separate financing line for billing software. Daily MCA debits were $1,100 on top of the equipment payments. Clinical staff payroll had bounced once and the practice manager was rebilling roughly 30 percent of claims by hand because the prior billing service had missed timely filing windows.

The clinic was busy. Schedule utilization was at 82 percent. The cash flow problem was entirely on the receivable side, not the demand side, and the MCA stack was the worst response to a payer-timing problem the owner could have made.

## What we did

We pulled the three MCA contracts and a clean set of bank statements showing the reimbursement cycle. The numbers told a clear reconciliation story, and we sent documented requests to all three lenders within the first week. Two paused inside ten days. The third required a follow-up through counsel before pausing in week three.

We negotiated settlement on two of the three contracts at 47 and 51 percent of face value, and a restructure on the third because the contract terms made settlement less efficient than extending the payment. The clinic was structured into a single monthly payment that matched the average reimbursement cadence, with an explicit catch-up provision for months when the payer mix delivered better-than-average timing. We never touched patient data and used only bank statements and contracts for the negotiation.

## Outcome

The $95,000 debt resolved for $49,400 across 10 months. Clinical payroll stabilized by week four and the rebilling backlog was cleared by month three. The clinic added a fourth provider in month 11. The equipment loan continued on its original terms and is on track to be paid off six months ahead of the contracted date.`,
  },
  {
    slug: "retail-310k",
    industry: "Retail",
    debtAmount: 310000,
    savingsPct: 46,
    months: 12,
    storyMd: `## Situation

A specialty retail boutique with three locations across two states had over-committed on a Q4 inventory build that did not sell through. The owner had used five MCAs to fund the buy, betting on a holiday season that came in 23 percent below forecast. Post-holiday daily debits of $3,200 collided with January revenue cut roughly in half from the prior year. Vendor terms were tightening because two of the inventory suppliers had heard the MCA chatter through the wholesale grapevine.

Factor rates on the five contracts ranged from 1.34 to 1.46. The owner had been talking to a debt consolidation broker who was pitching a single new advance to wrap the five existing MCAs, which would have grown total payback by roughly 18 percent and added a sixth lender to the cap table without paying off the prior contracts in full.

## What we did

We documented the inventory cycle and the post-holiday revenue gap with bank statements and POS reports across all three locations. Reconciliation requests went out to all five lenders in the first week. Four paused within two weeks and the fifth followed under counsel pressure in week three. We then negotiated settlements on three contracts at 44 to 53 percent of face value and restructured the remaining two into longer terms.

Inventory was right-sized in coordination with the resolution plan. We worked the calendar so settlement disbursements landed in months when inventory turn naturally produced surplus cash, rather than forcing settlement into the wrong part of the seasonal cycle. Vendor relationships stayed intact throughout because we focused negotiations entirely on the MCAs and never touched trade payables.

## Outcome

The $310,000 debt resolved for $167,400 across 12 months. All three locations stayed open. Margin recovered as inventory normalized to roughly 60 days on hand instead of the 110 days the over-buy had created. The retailer exited month 12 ready for the next holiday cycle without re-stacking, with vendor terms restored to the prior 30-day window.`,
  },
  {
    slug: "ecommerce-220k",
    industry: "E-commerce",
    debtAmount: 220000,
    savingsPct: 55,
    months: 8,
    storyMd: `## Situation

A direct-to-consumer apparel brand based in California had built a $4M revenue run rate over three years on Meta and TikTok ads. Then iOS attribution losses cut measured ROAS roughly in half across both platforms, and the founder had stacked four MCAs to bridge through a tactical reset on creative and audiences. Factor rates between 1.36 and 1.51, daily debits totaling $2,400, and a Shopify payout cadence that had been stretched twice in 30 days because of a chargeback spike.

The brand was 10 days from going dark on ads when we met. Without the ad spend, the inventory in the warehouse would not move. Without the inventory moving, the daily debits would freeze the operating account by the end of the month. The founder had been offered a reverse consolidation by one of the existing lenders that would have grown total payback by 20 percent and locked in a higher daily debit.

## What we did

We paused MCA debits within five business days through reconciliation, supported by bank statements and Shopify settlement reports that documented the revenue concentration risk. The aggressive pause timing was critical. With the cash flow gap closing, the brand could keep running ads at a reduced budget while we negotiated the lenders.

We negotiated aggressive settlements across all four contracts, with three of the four landing between 39 and 47 percent of face value. The fourth lender, an ISO with a more conservative posture, settled at 53 percent. Settlement disbursements were funded from a combination of recovered ad budget and a temporary inventory reduction in slow-moving SKUs.

## Outcome

The $220,000 debt resolved for $99,000 across 8 months. The brand kept running ads throughout and hit a record Q4 with the ad budget intact and the new attribution setup dialed in. Program closed in 8 months with the lowest debt-to-revenue position the brand had seen in two years. The founder has not taken a new MCA since.`,
  },
  {
    slug: "auto-700k",
    industry: "Auto",
    debtAmount: 700000,
    savingsPct: 44,
    months: 12,
    storyMd: `## Situation

An independent used auto dealership with attached service operating in the Mountain West had stacked six MCAs over an 18-month stretch. Floor plan interest had absorbed the cash that the operator assumed would cover the daily debits of $7,800. Factor rates on the six contracts ranged from 1.33 to 1.47, and two of the contracts were already showing UCC notices filed against the dealership&apos;s receivables.

The shop side was healthy. Service revenue ran $90K to $110K a month with a steady book of repeat customers. The lot side was where the cash flow had broken down. Inventory had aged past the floor plan interest sweet spot on roughly a third of the units, and the salesperson commission structure was eating margin on the units that did move quickly. The combination produced a cash flow profile the daily MCAs were not built for.

## What we did

We coordinated with the floor plan provider before approaching any of the MCAs so the inventory line was not disrupted. The floor plan had been the highest-risk variable and pre-coordination was non-negotiable. We then sent reconciliation requests to all six lenders simultaneously, supported by bank statements that documented the gap between the daily debits and the actual operating cash flow.

Four of the six contracts settled at 39 to 51 percent of face value. The remaining two were restructured into longer monthly terms because the underlying contract structure made settlement less efficient than extension. We sequenced the UCC-noticed contracts first to clear the lien posture, which protected the receivables and kept the floor plan provider comfortable.

## Outcome

The $700,000 debt resolved for $392,000 across 12 months. Floor plan stayed intact throughout, and the inventory mix was rebalanced in months 4 through 7 to clear aged units and restock with faster-turning vehicles. Service revenue recovered as the parts ordering normalized once the cash crunch eased. Program closed at month 12 with the lot inventory back at target and the UCC filings released and recorded clean.`,
  },
  {
    slug: "salon-65k",
    industry: "Salon",
    debtAmount: 65000,
    savingsPct: 53,
    months: 9,
    storyMd: `## Situation

A two-location independent salon in the Midwest had stacked three MCAs after a slow summer compounded with a roof repair the landlord had refused to cover under the lease. The owner ran a 1099 stylist booth model, which meant weekly stylist payouts had to clear or stylists would simply leave for a competitor down the block. Daily debits of $720 were small in absolute dollars but enormous against actual cash flow, which ran net $1,400 a day after booth rent splits, supplies, and lease.

Two stylists had already given notice the week before we met because their previous payouts had bounced. The beauty supply distributor had cut the salon back to COD instead of net 30. The owner was personally covering the supply runs to keep the locations stocked.

## What we did

Speed was the entire game in this case. We pulled the three MCA contracts on intake day and sent reconciliation requests within 36 hours, supported by bank statements showing the summer revenue drop. Two of the three lenders paused debits within 48 hours. The third followed inside a week. The pause cleared payroll that Friday and the two stylists who had given notice agreed to stay.

We negotiated settlements on all three contracts at 41 to 51 percent of face value. We then structured a single monthly payment around the booth rent and stylist payout cadence, weighted lighter in summer when traffic was naturally slower. The beauty supply distributor was brought back to net 30 in month four after two consecutive on-time monthly payments showed up clean on credit checks.

## Outcome

The $65,000 debt resolved for $30,550 across 9 months. All stylists stayed. Both locations continued operating without interruption. The owner exited the program in nine months and rebuilt a payroll buffer of roughly $18,000 that covers the next typical slow period without any need for additional financing. The roof repair that started the spiral is paid in full.`,
  },
  {
    slug: "hvac-145k",
    industry: "HVAC",
    debtAmount: 145000,
    savingsPct: 49,
    months: 10,
    storyMd: `## Situation

A 12-tech HVAC company in the Southeast had stacked four MCAs across the off-season. Winter service-only revenue could not support the daily debits of $1,650, and three trucks had needed unscheduled repairs in the same month, including one major transmission rebuild. Factor rates on the four contracts ranged from 1.34 to 1.45. The owner had skipped equipment financing on the truck repairs because the underwriter wanted bank statements that would have shown the MCA stack.

The company had a strong installation backlog booked for spring, but installation revenue was still 60 days out. Without intervention, the daily debits would have eaten the operating account before the install season started.

## What we did

We pulled the four contracts and a full year of bank statements showing the seasonal pattern of the business. The reconciliation case was clean and well documented. All four lenders paused debits within two weeks of the requests going out. We then negotiated settlements on three contracts at 43 to 53 percent of face value and a restructure on the fourth, because the contract terms made the restructure more efficient than the settlement.

The single monthly payment was structured higher in summer cooling season and lower in winter shoulder months, which let the business breathe through the months when service-only revenue was the only cash coming in. We coordinated with the truck repair vendor to extend payment terms on the transmission rebuild over six months instead of demanding the full balance up front.

## Outcome

The $145,000 debt resolved for $73,950 across 10 months. All three trucks were repaired and back in service by the start of the install season. The company kept full headcount of 12 techs through winter. Program closed at month 10 with the install season at full capacity and a healthy cash buffer rebuilt against the next off-season.`,
  },
  {
    slug: "distributor-1m",
    industry: "Distributor",
    debtAmount: 1000000,
    savingsPct: 41,
    months: 16,
    storyMd: `## Situation

A regional food distributor serving roughly 140 independent restaurants and corner stores had stacked nine MCAs across two years to bridge customer payment terms. Daily debits exceeded $11,000. Three of the MCA contracts had filed UCC notices against the distributor&apos;s receivables, which had spooked two of the largest customers into asking about supply continuity. The trade lines with food suppliers were holding but stretched to 50 day average pay against contracted 30 day terms.

The cash flow problem was structural. Customers paid on 30 day terms but the distributor&apos;s working capital cycle needed inventory paid for on 14 day terms with the supplier. The MCA stack had been the wrong tool to bridge that mismatch, and the daily debits were now compounding the original problem instead of solving it. Factor rates across the nine contracts ranged from 1.31 to 1.49.

## What we did

This was a coordinated multi-track program. We engaged legal defense for the three UCC actions in week one, both to protect the receivables and to send a clear posture signal to the remaining six lenders. We negotiated with each of the nine lenders in parallel, sequencing settlements as funds became available rather than approaching them in order.

We coordinated directly with the two largest customers so deliveries continued throughout the program and they had clean status updates on the supply line. The food suppliers were brought into the conversation with a defined repayment plan that pulled the trade lines back to 35 day average pay by month six and 30 day by month nine. Settlements landed between 35 and 49 percent of face value across the nine contracts. The three UCC actions were vacated or settled inside the first 90 days.

## Outcome

The $1,000,000 debt resolved for $590,000 across 16 months. The UCC actions were cleared. All key customer relationships stayed intact and two new customers were added in month 11. The distributor exited month 16 with the trade lines back to contracted terms, the receivables clean, and route capacity expanded to add a fourth delivery truck.`,
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
