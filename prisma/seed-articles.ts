import { PrismaClient } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
const db = new PrismaClient({ adapter });

type ArticleSeed = {
  slug: string;
  title: string;
  excerpt: string;
  contentMd: string;
};

function build(slug: string, title: string, excerpt: string, body: string): ArticleSeed {
  const contentMd = `## TL;DR

${excerpt}

## Body

${body}

## What to do next

If your business is dealing with stacked MCAs, request a free assessment. We pull every contract, calculate the true effective APR, and tell you which program fits before you sign anything.`;
  return { slug, title, excerpt, contentMd };
}

const ARTICLES: ArticleSeed[] = [
  build(
    "what-is-reverse-consolidation",
    "What is reverse consolidation and why does it usually backfire?",
    "Reverse consolidation packages multiple MCAs into one new advance. It often increases total debt and accelerates daily debits.",
    `A reverse consolidation is a new MCA that pays off prior MCAs. The pitch is appealing: one daily debit instead of several. The math rarely is.

In most reverse consolidations the total payback grows, the term lengthens, and the new daily debit is calibrated against revenue assumptions that no longer hold. Worse, the underlying MCAs are not always paid in full, leaving the business exposed on two fronts.

We see reverse consolidations break for three reasons: assumed revenue does not materialize, fees and factor rates compound, and the new lender holds rights against future receivables that further constrain operations.`,
  ),
  build(
    "mca-settlement-vs-restructure",
    "MCA settlement vs restructure: which one fits your situation?",
    "Settlement reduces the balance owed. Restructure preserves it but extends terms. The right choice depends on default status, lender mix, and cash flow.",
    `Settlement programs negotiate balances down, often 40 to 60 percent. They are typically faster and used when a business is already past due, frozen, or in active default.

Restructure programs preserve the balance but extend payment terms and reduce daily debits. They take longer to complete and are typically used when the business is current but stretched.

The right program is usually clear once we look at three things: how many lenders are involved, how recent the contracts are, and whether reconciliation has already been requested.`,
  ),
  build(
    "how-to-read-your-mca-contract",
    "How to read your MCA contract before you sign or settle",
    "Most MCA contracts share five clauses that determine your real cost and your defense options. Read these first.",
    `The five clauses that matter most are the purchase price, the purchased amount, the specified percentage, the reconciliation language, and the events of default.

The purchase price is what you receive. The purchased amount is what you pay back. The ratio of the two implies an effective APR that is rarely disclosed.

The reconciliation clause is where leverage lives. It typically allows the merchant to request adjustment of the daily debit to match actual revenue. Lenders that refuse a documented reconciliation request are exposed.

The events of default determine when the lender can accelerate, file a COJ, or pursue UCC enforcement. Read these clauses before you take any action that could be construed as default.`,
  ),
  build(
    "effective-apr-explained",
    "Effective APR on an MCA: how to calculate it and why it matters",
    "MCAs are sold on factor rate, not APR. Effective APRs of 80 to 200 percent are common. Calculating yours changes the negotiation.",
    `Factor rate looks small. A 1.45 factor on a 12 month payback sounds like 45 percent annualized. It is not.

Effective APR depends on the actual repayment schedule, including the front-loading of daily debits. Most stacked MCAs come in at 80 to 200 percent effective APR once the math is done correctly.

Calculating the real APR matters because lenders settle more aggressively when the unconscionability angle is in play. It also matters for your own decision making before signing the next advance.`,
  ),
  build(
    "coj-defense-basics",
    "COJ defense basics: what to do in the first 72 hours",
    "A confession of judgment can freeze accounts within days. The first 72 hours are critical. Here is what to do.",
    `A COJ is a pre-signed admission of liability that the lender can file in certain jurisdictions to obtain a judgment without your participation. Once filed, it can lead to account freezes and UCC enforcement very quickly.

Within 72 hours, three things have to happen: engage MCA-defense counsel licensed in the filing jurisdiction, identify procedural challenges to the filing itself, and assess whether the COJ is enforceable given the specifics of the contract.

Many COJs have procedural defects that allow them to be vacated. Others are simply unenforceable in the venue where they were filed. The defense path depends on facts that have to be assessed quickly.`,
  ),
  build(
    "when-to-pause-mca-debits",
    "When and how to pause MCA debits without triggering default",
    "Reconciliation is the right tool. Bank blocks usually are not. Here is the difference.",
    `MCA contracts almost always include reconciliation language that allows the merchant to request adjustment of the daily debit when actual revenue does not match the projection. A documented reconciliation request, supported by bank statements, is the right tool.

Blocking the lender at the bank level without a documented request is usually a default trigger. It signals breach and accelerates the contract. There are situations where it is the right move, but they are narrower than they sound.

The right pause is one that is documented, substantively justified, and timed correctly relative to other negotiations.`,
  ),
  build(
    "how-mca-debt-relief-actually-works",
    "How MCA debt relief actually works behind the scenes",
    "The work is part negotiation, part legal coordination, and part cash flow engineering. Here is the order of operations.",
    `The first step is always intake: pulling every contract, every bank statement, and every UCC filing. Without that, no negotiation is grounded.

The second step is sequencing. Lenders are not approached in random order. The sequence depends on contract age, lender posture, and which contracts have the most leverage available.

The third step is the negotiation itself, run in parallel across lenders, with settlement disbursements timed against escrow accumulation. The fourth step is legal coordination where active or threatened litigation is in play.`,
  ),
  build(
    "signs-your-mca-relief-firm-is-a-scam",
    "Five signs your MCA relief firm is a scam",
    "Upfront fees, guaranteed outcomes, and pressure to take a new advance are the most common red flags.",
    `Real MCA relief is not free, but it is not paid upfront. Any firm asking for a large retainer before any work has been done is a red flag.

Guaranteed outcomes are another red flag. Settlement percentages depend on lender mix, contract specifics, and timing. No reputable firm guarantees a number.

Pressure to take a new advance to pay the relief firm is the worst version. It stacks debt on top of debt and benefits the firm at the merchant's expense.

Other warning signs: vague pricing, no published fee structure, pressure to sign same-day, and refusal to coordinate with attorneys.`,
  ),
  build(
    "ucc-liens-and-account-freezes",
    "UCC liens and account freezes: what they are and what to do",
    "UCC enforcement can freeze receivables and customer payments very quickly. Knowing the timeline helps.",
    `Most MCA contracts grant a UCC security interest in receivables. Once a default is declared, the lender can serve UCC notices on customers and processors, redirecting incoming payments away from the merchant.

The freeze typically hits processors first, then large customers. Once it propagates, operating becomes very difficult within days.

The defense path includes immediate legal engagement, restraining orders where applicable, and parallel settlement negotiation. The order matters: cash flow has to be restored before settlement can be funded.`,
  ),
  build(
    "how-to-handle-stacked-mcas",
    "How to handle stacked MCAs without making it worse",
    "Three rules: stop stacking, document the cash flow, and engage early. Each one prevents a bigger problem.",
    `Stacking is the act of taking new MCAs to service prior MCAs. Each new advance reduces tomorrow's cash flow further than today's debits do. The math compounds against you.

Rule one: stop stacking the moment the daily debits exceed sustainable cash flow. Rule two: document the gap with bank statements so reconciliation requests have substance. Rule three: engage relief counsel or a credible firm before the situation reaches default, frozen accounts, or COJ filings.

The earliest engagement always produces the best outcomes.`,
  ),
  build(
    "should-you-consolidate-mcas",
    "Should you consolidate your MCAs?",
    "Consolidation can help in narrow circumstances. In most cases it adds debt without solving the underlying cash flow problem.",
    `Consolidation pitches assume the underlying problem is too many lenders. The actual problem is usually too much debt relative to cash flow. Consolidation does not solve that.

Reverse consolidation is the most common version offered to merchants in distress. It typically grows total debt, lengthens the term, and adds another secured creditor without paying off the prior contracts in full.

In a narrow set of cases, true consolidation through a bank line or SBA refi can work. The criteria are strict and most stacked-MCA businesses do not qualify.`,
  ),
  build(
    "mca-restructure-timeline",
    "MCA restructure: what the timeline really looks like",
    "Restructure programs typically run 12 to 18 months. Here is what happens in each phase.",
    `Phase one, weeks one through four, is intake and initial outreach. We pull contracts, calculate effective APRs, and request reconciliation across lenders.

Phase two, months two through four, is term negotiation. Each lender is approached individually. Successful restructures extend the daily debit into a longer monthly payment matched to actual cash flow.

Phase three, months five through twelve plus, is execution. The merchant pays the unified monthly payment on schedule. We monitor lender behavior and intervene where needed.`,
  ),
  build(
    "can-i-keep-operating-during-an-mca-program",
    "Can I keep operating during an MCA debt program?",
    "In almost all cases, yes. The program is designed around continued operations.",
    `Operating is the goal. A program that requires a business to stop operating typically defeats its own purpose because there is no revenue to fund settlements.

The mechanics support continued operations: reconciliation requests pause daily debits, escrow funding is structured around real cash flow, and legal coordination addresses any UCC or COJ exposure that would otherwise threaten operations.

Industries with specific operational dependencies, like trucking with factoring, construction with bonding, or auto with floor plan, get extra coordination so those relationships are preserved.`,
  ),
  build(
    "how-attorneys-help-with-mca-debt",
    "How attorneys help with MCA debt and when to engage one",
    "Attorneys are required for COJ defense, UCC enforcement, and any active litigation. They are useful long before that.",
    `An MCA-defense attorney plays three roles: defending against active legal action, providing leverage in settlement negotiations, and reviewing contracts for unconscionability and procedural defects.

Engage an attorney immediately when a COJ is filed, an account is frozen, or litigation is active. Engage one earlier when contracts contain clauses that look exposed or when lenders are signaling aggressive posture.

A relief program that does not include legal coordination in its toolkit is incomplete.`,
  ),
  build(
    "negotiating-with-mca-lenders",
    "Negotiating with MCA lenders: what works and what does not",
    "Documentation, sequencing, and credibility move lenders. Pleas and partial information do not.",
    `Lenders see thousands of distressed merchants. They have heard every story. What moves them is documentation: bank statements showing the gap, contracts annotated with effective APR, and a credible counterparty making the request.

Sequencing matters. The first lender approached sets the precedent for the others. The wrong first move can poison the rest of the negotiations.

Credibility matters most. Lenders that recognize the firm on the other side of the table settle faster and at better numbers. That recognition has to be earned over many cases.`,
  ),
  build(
    "preserving-business-credit-while-resolving-mca-debt",
    "Preserving business credit while resolving MCA debt",
    "MCA balances usually do not report to consumer credit. Business credit takes a temporary hit and rebuilds quickly.",
    `MCAs are commercial transactions and most do not report to consumer credit bureaus. Personal credit usually stays intact through a relief program.

Business credit can take a temporary hit during settlement, particularly when UCC filings are recorded. The hit is recoverable. Most businesses see business credit rebuild within 12 to 18 months of program completion.

The preserving step is documentation: keeping clean records of every settled balance, paid-off UCC filing, and lender release. That documentation is the foundation of the rebuild.`,
  ),
  build(
    "mca-pre-default-options",
    "MCA debt options when you are still current but stretched",
    "Pre-default is the best moment to act. You have leverage, options, and time that disappear once you default.",
    `Pre-default merchants have access to restructure programs, reconciliation requests, and refinance options that disappear once default occurs. The single best move at this stage is to act before the cushion disappears.

Restructure is usually the right path. Daily debits get extended into manageable monthly payments. Lender relationships are preserved. Business credit takes minimal damage.

The wrong move at this stage is taking another MCA to bridge the gap. Stacking accelerates the path into default rather than preventing it.`,
  ),
  build(
    "what-happens-if-you-stop-paying-an-mca",
    "What happens if you stop paying an MCA?",
    "Default triggers a sequence: acceleration, UCC enforcement, COJ filing, and litigation. Each stage narrows the options.",
    `Stopping payments without coordination triggers default within days. The lender accelerates the balance, often to face value plus fees. UCC notices may go out to processors and customers within a week.

A COJ filing, where the contract permits, can result in a judgment within days. Litigation typically follows for the unsecured portion. Each stage narrows what relief programs can do.

Stopping payments is sometimes the right move, but only as part of a coordinated strategy with documented reconciliation, legal coverage, and a settlement plan ready to deploy.`,
  ),
  build(
    "choosing-an-mca-relief-partner",
    "Choosing an MCA relief partner: what to ask before you sign",
    "Five questions separate credible firms from ones that will make the situation worse.",
    `Question one: what is your fee structure and is it published? Credible firms publish flat fees. Vague pricing is a red flag.

Question two: do you charge upfront? Real relief is paid as outcomes happen, not before any work has been done.

Question three: do you have attorneys you coordinate with for legal defense? Programs without legal coordination are incomplete.

Question four: how do you sequence lenders? The answer should reflect strategy, not improvisation.

Question five: can I see anonymized case studies that match my situation? Real firms can produce them quickly.`,
  ),
  build(
    "life-after-mca-debt",
    "Life after MCA debt: rebuilding cash flow and credit",
    "The first 12 months after program completion are the most important. Here is what to focus on.",
    `Program completion is the start of the rebuild, not the finish line. Cash flow that was previously consumed by daily debits is now available for working capital, hiring, and growth. Discipline in those first 12 months matters.

Priority one is rebuilding the cash buffer. Three months of operating expenses, in reserve, prevents any need to consider an MCA in the next downturn.

Priority two is rebuilding business credit. Pay vendors early. Keep UCC filings current and clean. Document every settled balance with the corresponding lender release.

Priority three is selecting growth capital carefully. SBA, bank lines, and factoring are all preferable to MCAs in almost every case. The next time growth capital is needed, it should not come from a daily debit product.`,
  ),
];

async function main() {
  for (const a of ARTICLES) {
    await db.article.upsert({
      where: { slug: a.slug },
      update: { ...a, published: true, publishedAt: new Date() },
      create: { ...a, published: true, publishedAt: new Date() },
    });
  }
  console.log("Seeded", ARTICLES.length, "articles");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
