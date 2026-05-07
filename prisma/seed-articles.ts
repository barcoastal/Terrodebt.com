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
    `### What a reverse consolidation actually is

A reverse consolidation is a new merchant cash advance that gets used to pay off prior MCAs. The pitch is appealing on its surface. Instead of four daily debits hitting the operating account every morning, the merchant has one. Instead of four lenders to coordinate with, the merchant deals with one. The pitch usually arrives with the words "consolidate" and "simplify" doing most of the heavy lifting.

The product itself is a new MCA. It carries a factor rate. It pulls daily through ACH or split funding. It is secured by a fresh UCC filing on the business&apos;s receivables. The new lender takes a position senior to or alongside the prior lenders, depending on how the prior contracts get released.

### Why the math almost always gets worse

The arithmetic of reverse consolidation rarely favors the merchant. A typical structure looks like this. The merchant owes $200,000 across four MCAs at face value, with roughly $140,000 in remaining principal once you discount accrued payback. The reverse consolidation pays out $180,000 to settle three of the four prior contracts. It is structured at a 1.42 factor over 12 months on a $250,000 funded amount, with the daily debit set at $1,150.

That looks good against the prior $1,800 a day in debits. But total payback on the new contract is $355,000. Add the fourth prior contract that did not get paid off, plus the residual $20,000 from the partial settlement on the first three, and the merchant has now committed to about $410,000 in total future payback. The original $200,000 in face debt has grown to roughly double once the reverse consolidation is layered on.

The lower daily debit looks like relief but is actually just a longer term. The merchant is paying less per day for more days, and the total cost is higher than the original stack would have been if it had been settled or restructured directly.

### When reverse consolidation might work

There are narrow circumstances where reverse consolidation is the right move. The merchant has to be current on all prior advances, the new lender has to fully release the prior UCCs, the new factor rate has to be meaningfully lower than the blended rate of the prior stack, and the daily debit has to fit cash flow with margin to spare. We have seen this combination work maybe one time in fifty.

If you are being pitched a reverse consolidation, the question to ask is whether the new lender is paying the prior lenders in full or just settling them at a discount. If they are settling at a discount, ask why you cannot just settle the priors yourself and avoid taking a new advance entirely.

### What to do instead

The first step is always the math. Pull every contract, calculate the effective APR on each, and figure out the true total payback against current revenue. Most stacked-MCA situations look much worse on paper than they actually are once the contracts get reviewed by a firm that knows what it is reading.

The right path in most cases is direct settlement or restructure of the existing MCAs, not consolidation. Settlement reduces the balance owed at terms negotiated against the actual contract structure. Restructure preserves the balance but extends the daily debit into a manageable monthly payment. Both produce better outcomes than a reverse consolidation in most situations.

Reverse consolidation should be a tool of last resort, not a first response. Owners who get pitched it deserve to see the numbers worked out side by side against the alternatives before signing anything. That comparison almost always shows the same thing: the consolidation looks like relief and ends up as more debt.`,
  ),
  build(
    "mca-settlement-vs-restructure",
    "MCA settlement vs restructure: which one fits your situation?",
    "Settlement reduces the balance owed. Restructure preserves it but extends terms. The right choice depends on default status, lender mix, and cash flow.",
    `Settlement and restructure are the two main paths a credible MCA relief firm will offer, and they solve different problems. Settlement programs negotiate the balance owed down, often 40 to 60 percent of face value, and resolve the contract for a defined lump sum or schedule. Restructure programs preserve the original balance but extend the payment timing, replacing a daily debit with a manageable monthly payment.

Settlement is typically faster and is used when a business is already past due, frozen, or in active default. The lender has limited options to collect once a default is documented and a credible counterparty is at the negotiating table. That leverage produces material discounts, and the resolution timeline runs 6 to 12 months in most cases.

Restructure is the right tool when the business is current but stretched. The merchant is making the daily debits but has nothing left over for working capital, payroll, or growth. The original lender relationship is preserved, the balance is paid in full over a longer term, and business credit takes minimal damage. Restructure programs typically run 12 to 18 months.

The right program is usually clear once we look at three things: how many lenders are involved, how recent the contracts are, and whether reconciliation has already been requested. Programs with five or more lenders almost always require some settlement to clear the stack. Contracts under six months old are typically restructure candidates because the relationship is fresh enough to extend. Cases where reconciliation has been formally requested and ignored have stronger settlement leverage.

Mixed programs are also common. We frequently settle the most aggressive two or three lenders in a stack and restructure the others, sequencing the work so the cash flow gap closes immediately while the longer-term resolution unfolds in the background. The decision is never one-size-fits-all, and any firm that pitches a single answer before reviewing the contracts is not doing the work.`,
  ),
  build(
    "how-to-read-your-mca-contract",
    "How to read your MCA contract before you sign or settle",
    "Most MCA contracts share five clauses that determine your real cost and your defense options. Read these first.",
    `MCA contracts are dense, full of unfamiliar language, and structured to disguise what is actually being charged. Most run between 15 and 40 pages, and most owners sign them after a 20 minute call with a sales rep who does not particularly want the contract studied closely. The five clauses below are where the real economics and the real defense options live.

The purchase price is what you receive. It is the dollars wired to your account on funding day. The purchased amount is what you pay back. The ratio of the two implies an effective annualized rate that is rarely disclosed in the contract itself. A 1.45 factor over 6 months looks like 45 percent annualized but actually exceeds 130 percent APR once the daily repayment cadence is factored in. Calculate the ratio yourself before signing.

The specified percentage is the slice of daily revenue the lender claims. It is the basis for the daily debit and the legal premise that an MCA is a sale of future receivables, not a loan. The specified percentage matters legally because it determines whether the contract qualifies as a true sale or whether it can be reclassified as a usurious loan in some jurisdictions.

The reconciliation clause is where leverage lives. It typically allows the merchant to request adjustment of the daily debit when actual revenue does not match the lender&apos;s projection. A documented reconciliation request, supported by bank statements, is the right tool to pause debits without triggering default. Lenders that refuse a properly documented reconciliation request are exposed legally, and the threat of that exposure is what produces settlement leverage.

The events of default determine when the lender can accelerate the balance, file a confession of judgment, or pursue UCC enforcement. Read these clauses carefully before you take any action that could be construed as default. A bank block, a missed debit, a transfer to a new bank account, even certain operational changes can trip these clauses. Understanding which actions are safe and which trigger acceleration is the foundation of every relief program.

Read these five clauses. Mark them in the margin. If you cannot find them clearly, ask the lender to point them out before you sign. Any lender that resists that request is telling you something about the contract.`,
  ),
  build(
    "effective-apr-explained",
    "Effective APR on an MCA: how to calculate it and why it matters",
    "MCAs are sold on factor rate, not APR. Effective APRs of 80 to 200 percent are common. Calculating yours changes the negotiation.",
    `### Why factor rate hides the real cost

MCAs are sold on factor rate, not APR. A factor rate of 1.45 sounds reasonable. It looks like 45 percent. The salesperson will often present it as "45 percent over the term" or compare it to a credit card. Both framings are misleading. The actual annualized cost of an MCA is almost always materially higher than the factor rate suggests, and the gap between the two is where the product makes its money.

APR is a standardized way to compare borrowing costs across different products. It accounts for the time value of money, the repayment schedule, and the actual cost of capital. Factor rate is a simple multiplier. The two cannot be compared directly without doing the conversion math, which the MCA industry generally hopes you do not do.

### How to convert factor rate to effective APR

The basic formula is straightforward in concept but the inputs matter. Effective APR depends on the funded amount, the total payback amount, the actual repayment schedule including the daily cadence, and the term. The faster the repayment, the higher the effective APR for a given factor rate. This is the part that catches owners off guard.

A 1.45 factor over a 12 month term has an effective APR around 90 percent. The same 1.45 factor over a 6 month term jumps to over 130 percent APR. Same factor rate, same total payback, dramatically different APR because the daily repayment cadence concentrates the cost into a shorter window.

### Worked example one: a 1.40 factor on a 9 month MCA

A merchant takes a $100,000 MCA at a 1.40 factor with a 9 month estimated term. Daily debits run roughly $617 over 22 business days a month for 9 months. Total payback is $140,000.

To calculate effective APR, you have to amortize the daily payment stream against the original $100,000 funded amount. Using a standard daily-payment amortization, the implied APR comes in around 95 to 105 percent depending on the exact daily cadence and weekend handling. The 40 percent factor cost translates to roughly 100 percent annualized once the daily repayment is amortized.

### Worked example two: a 1.49 factor on a 6 month MCA

A merchant takes a $50,000 MCA at a 1.49 factor with a 6 month term. Daily debits run roughly $568 over 22 business days a month for 6 months. Total payback is $74,500.

Amortizing the daily payment stream against the original $50,000 funded amount produces an effective APR in the range of 175 to 200 percent. The 49 percent factor cost translates to roughly 4x that annualized because the repayment is concentrated into half a year.

### Why this calculation changes the negotiation

Calculating the real APR matters because lenders settle more aggressively when the unconscionability angle is in play. Effective APRs above 100 percent in jurisdictions where usury is even loosely enforced create real legal exposure for the lender. The presence of that exposure on a contract changes the negotiating dynamic immediately. A merchant who can recite the effective APR on each contract in their stack is signaling that the firm representing them knows what it is doing, and lenders who recognize that signal settle faster and at better numbers.

The calculation also matters for the merchant&apos;s own decision making. Owners who have done the conversion once on their own contracts almost never sign another MCA. The number is too uncomfortable to pretend it does not exist. That clarity is half the battle in breaking the stacking cycle.

If you have stacked MCAs and have not calculated the effective APR on each one, that is the first thing to do. Our free contract review tool extracts the effective APR from any uploaded contract in 30 seconds. The number is rarely what the salesperson presented when the contract was signed.`,
  ),
  build(
    "coj-defense-basics",
    "COJ defense basics: what to do in the first 72 hours",
    "A confession of judgment can freeze accounts within days. The first 72 hours are critical. Here is what to do.",
    `### What a confession of judgment actually is

A confession of judgment, or COJ, is a pre-signed admission of liability that the merchant signs as part of the original MCA contract. The COJ is held by the lender and is filed with a court to obtain a judgment without the merchant&apos;s further participation if the lender declares default. In jurisdictions where COJs are enforceable, the lender can move from default declaration to filed judgment to bank levy or UCC enforcement in a matter of days.

The COJ is what makes MCA contracts particularly dangerous compared to ordinary commercial debt. With a normal commercial loan, the lender has to sue, serve, win at trial or default, and then enforce the judgment. That process typically takes months and gives the borrower time to defend or negotiate. With a COJ on file, the lender can compress that timeline to under a week.

### What happens once a COJ is filed

The first thing that usually happens is a bank levy or restraining notice on the merchant&apos;s primary operating account. Funds in the account are frozen immediately. New deposits are typically captured against the judgment until it is satisfied or vacated. Customers and processors served with UCC notices begin redirecting payments away from the merchant. Operating becomes effectively impossible within days.

The second-order effects compound quickly. Vendors hear about the freeze. Customers ask questions. Other lenders see the judgment and accelerate their own contracts. The merchant&apos;s entire commercial relationship network can deteriorate inside a week if the COJ is not addressed.

### The first 72 hours

Three things have to happen inside 72 hours of a COJ being filed.

First, engage MCA-defense counsel licensed in the jurisdiction where the COJ was filed. This is not a generic commercial litigation referral. COJ practice is a narrow specialty and the attorneys who do it well know which judges in which counties handle these motions and what arguments tend to succeed. Generic counsel will lose time learning the practice, and time is the resource you do not have.

Second, identify procedural challenges to the filing itself. Many COJs have procedural defects: the underlying contract may have been signed in a state where COJs are unenforceable, the COJ may have been filed in the wrong county or wrong court, the affidavit accompanying the COJ may have errors, the underlying default declaration may have been improper. Procedural defects are the fastest path to a vacated judgment.

Third, assess whether the COJ is enforceable given the specifics of the contract and the jurisdiction. New York banned COJs against out-of-state merchants in 2019, which dramatically narrowed where the product can be filed against most merchants. Florida has its own restrictions. Other states have varying enforceability rules. Knowing the jurisdictional posture of your COJ before responding is critical.

### Jurisdictional notes

New York used to be the venue of choice for MCA COJs because of friendly procedural rules. The 2019 amendments effectively ended that for out-of-state merchants. Most COJs filed against non-NY merchants in New York courts since 2019 have been vacated or unenforceable.

Florida allows COJs but has stricter procedural requirements than New York. Filings often have defects that make them vulnerable to motions to vacate. New Jersey, Pennsylvania, and a handful of other states have varying rules. Texas and California are generally hostile venues for MCA COJs and lenders avoid filing there.

The jurisdictional question often determines whether the defense path is fast and clean or long and contested. Get the venue assessed in the first 24 hours.

### What not to do

Do not attempt to negotiate with the lender directly without counsel involved once a COJ has been filed. The lender will use any communication as evidence of acknowledgment of the debt and validity of the filing. Do not move money out of the frozen account or attempt to evade the levy. That can create separate legal exposure. Do not assume the COJ is valid because it was filed.

The right move is fast professional defense. The first 72 hours often determine whether the COJ becomes a manageable legal action or a business-ending event. Owners who engage credible defense quickly almost always end up with the COJ vacated, settled at a steep discount, or otherwise resolved without the worst-case outcomes.`,
  ),
  build(
    "when-to-pause-mca-debits",
    "When and how to pause MCA debits without triggering default",
    "Reconciliation is the right tool. Bank blocks usually are not. Here is the difference.",
    `MCA contracts almost always include reconciliation language that allows the merchant to request adjustment of the daily debit when actual revenue does not match the projection. A documented reconciliation request, supported by bank statements and ideally also POS or processor reports, is the right tool. It pauses the debit without triggering default because it is exercising a right the contract itself grants the merchant.

The mechanics matter. The request needs to go in writing, ideally certified mail or a documented email thread. It needs to specify the actual revenue achieved versus the assumed revenue at funding. It needs to propose a reasonable adjusted daily debit, not just a pause to zero. And it needs to come from the merchant or from a credible representative the lender recognizes as a real counterparty.

Blocking the lender at the bank level without a documented reconciliation request is usually a default trigger. It signals breach and accelerates the contract. There are situations where a bank block is the right move, but those situations are narrower than the "I cannot afford it" framing suggests. Bank blocks make sense when default is already in play and the merchant is preserving cash to fund a settlement or a defense. They do not make sense as a first response.

The right pause is one that is documented, substantively justified by actual revenue performance, and timed correctly relative to other negotiations and any active legal exposure. Pauses that come before reconciliation requests, before legal coverage is in place, or before settlement funds are being accumulated typically create more problems than they solve.

The wrong way to pause MCA debits has cost merchants more in accelerated balances, COJ filings, and frozen accounts than almost any other category of self-help. The right way is technical and unglamorous, but it works. Most credible relief firms can pause debits within 5 to 14 days using reconciliation, depending on the lender mix and the documentation available.`,
  ),
  build(
    "how-mca-debt-relief-actually-works",
    "How MCA debt relief actually works behind the scenes",
    "The work is part negotiation, part legal coordination, and part cash flow engineering. Here is the order of operations.",
    `MCA debt relief looks like negotiation from the outside. Inside, it is mostly project management and forensic accounting. The negotiation calls are the visible 10 percent. The other 90 percent is the work that makes the negotiation calls produce a result.

The first step is always intake: pulling every contract, every bank statement, every UCC filing, and every prior funding document. Without that, no negotiation is grounded. We typically pull 90 to 180 days of bank statements for the operating account, every active and recently retired MCA contract, the UCC search for the merchant&apos;s state of formation, and any active legal filings. The intake usually takes the first week.

The second step is sequencing. Lenders are not approached in random order. The sequence depends on contract age, lender posture, exposure profile of the contract, and which lenders have the most leverage available against them. We typically map the lender stack into three buckets: aggressive lenders with weaker contracts and more legal exposure, neutral lenders with standard contracts and predictable behavior, and large institutional lenders that move slowly but settle reliably. Sequencing across those buckets shapes the entire program.

The third step is the negotiation itself, run in parallel across lenders. Each negotiation is a separate workstream with its own timeline, lender contact, and target outcome. Settlement disbursements are timed against escrow accumulation and against the sequencing decisions made up front. Restructure terms are negotiated against the merchant&apos;s realistic monthly cash flow rather than against a target the lender wants to achieve.

The fourth step is legal coordination where active or threatened litigation is in play. Counsel handles COJ defenses, UCC enforcement, and any civil suits while the negotiation continues in parallel. The legal track and the negotiation track inform each other but operate independently.

The fifth step is execution: the merchant pays the unified plan, settlements get disbursed on schedule, lender releases get recorded, and the program closes when the last balance is resolved. The execution phase is usually the longest and least dramatic part of the program, and it is where less-credible firms drop the ball.`,
  ),
  build(
    "signs-your-mca-relief-firm-is-a-scam",
    "Five signs your MCA relief firm is a scam",
    "Upfront fees, guaranteed outcomes, and pressure to take a new advance are the most common red flags.",
    `Real MCA relief is not free, but it is not paid upfront. Any firm asking for a large retainer before any work has been done is a red flag. Credible firms structure compensation against outcomes and progress, not against the act of signing the engagement.

Guaranteed outcomes are another red flag. Settlement percentages depend on lender mix, contract specifics, and timing. No reputable firm guarantees a number. A firm that tells you upfront you will save 60 percent without seeing the contracts is either lying or about to make a mess of your case to chase that number.

Pressure to take a new advance to pay the relief firm is the worst version of the scam. It stacks debt on top of debt and benefits the firm at the merchant&apos;s expense. Any firm that suggests you take a reverse consolidation or new MCA to fund their fee should be cut from consideration immediately.

Vague pricing is a fourth red flag. Credible firms publish their fee structure clearly. A firm that will not tell you the total program cost in writing before engagement is hiding something, usually performance bonuses or hourly billing layered on top of the disclosed fee.

Pressure to sign same-day is the fifth red flag. Real relief work is not time sensitive in the way the salesperson presents it. The "act now or lose your chance" framing is a sales tactic, not a legitimate constraint. Take 48 hours to read the engagement and have an attorney or accountant look at it before signing.

Other warning signs to watch for: refusal to coordinate with attorneys when legal issues arise, no published case studies or references, sales reps who cannot explain the program in technical detail, and fee structures that escalate based on outcomes the firm controls. Walk away from any of these signals. The MCA relief category has plenty of credible operators. There is no reason to settle for the predatory ones.`,
  ),
  build(
    "ucc-liens-and-account-freezes",
    "UCC liens and account freezes: what they are and what to do",
    "UCC enforcement can freeze receivables and customer payments very quickly. Knowing the timeline helps.",
    `Most MCA contracts grant a UCC security interest in receivables. The UCC filing itself is recorded at funding and is generally not a problem on its own. The problem starts once a default is declared, because the lender can then serve UCC notices on customers, processors, and other counterparties to redirect incoming payments away from the merchant.

The freeze typically hits processors first because they are the easiest to serve and have the cleanest payment flows to capture. Stripe, Square, Toast, Clover, and similar processors will honor a properly served UCC notice within days. Payment that would have settled to the merchant is held against the lender&apos;s claim instead.

Large customers are the next layer. Restaurants, retailers, and service businesses with concentrated customer relationships are particularly exposed because a single UCC notice on a major customer can capture a meaningful slice of monthly revenue. Once a few customers have been served, the disruption becomes operational very quickly. Inventory cannot be paid for. Payroll cannot clear. Operating effectively halts within a week or two.

Bank account freezes are usually the next escalation, often paired with a confession of judgment if one is on the contract. At that point, even cash that has not yet been claimed by the UCC notices becomes inaccessible.

The defense path includes immediate legal engagement, restraining orders where applicable, and parallel settlement negotiation. The order matters: cash flow has to be restored before settlement can be funded. We typically work to neutralize UCC notices through a combination of legal motions and direct lender negotiation, while simultaneously building the settlement path that ultimately resolves the underlying contract.

UCC enforcement is preventable in most cases if relief is engaged before the lender pulls the trigger. Once the notices are out, the cleanup is harder, slower, and more expensive. The single best move is engaging credible relief counsel at the first sign of lender aggression, not after the freeze is already in motion.`,
  ),
  build(
    "how-to-handle-stacked-mcas",
    "How to handle stacked MCAs without making it worse",
    "Three rules: stop stacking, document the cash flow, and engage early. Each one prevents a bigger problem.",
    `Stacking is the act of taking new MCAs to service prior MCAs. Each new advance reduces tomorrow&apos;s cash flow further than today&apos;s debits do. The math compounds against you, and most owners do not see how steeply until they are four or five contracts deep.

Rule one: stop stacking the moment the daily debits exceed sustainable cash flow. The exact threshold varies by industry, but a rough rule is that combined daily debits should not exceed 8 to 12 percent of average daily revenue net of variable costs. Past that, every additional advance adds more drag than it removes, and the path forward starts to look like a relief program rather than continued operations.

Rule two: document the gap with bank statements so reconciliation requests have substance. The single most useful asset a stacked-MCA merchant has is 90 to 180 days of clean operating account statements that show the cash flow shape. Those statements are the evidence base for every reconciliation request, every settlement negotiation, and every legal motion that may need to be filed. Owners who maintain clean documentation throughout the stacking period have dramatically better outcomes when they engage relief.

Rule three: engage relief counsel or a credible firm before the situation reaches default, frozen accounts, or COJ filings. Pre-default engagements have access to programs and leverage that disappear once default occurs. Lenders are more willing to negotiate restructure terms with a current merchant than with a defaulted one. Reconciliation requests carry more weight before any breach event has occurred. Legal exposure the merchant has against unconscionable contracts is easier to invoke when the merchant is still performing under those contracts.

The earliest engagement always produces the best outcomes. Owners who wait until the lender has already pulled the trigger pay more, recover less, and spend more time defending against escalations that could have been prevented. The hardest part of stacking is admitting that the situation has crossed the threshold where self-help is going to keep producing more debt rather than less. The owners who admit it earliest are the ones who recover fastest.`,
  ),
  build(
    "should-you-consolidate-mcas",
    "Should you consolidate your MCAs?",
    "Consolidation can help in narrow circumstances. In most cases it adds debt without solving the underlying cash flow problem.",
    `Consolidation pitches assume the underlying problem is too many lenders. The actual problem is usually too much debt relative to cash flow. Consolidation does not solve that. It simplifies the cap table without changing the math, and in most cases it makes the math worse.

Reverse consolidation is the most common version offered to merchants in distress. It is itself a new MCA, structured to pay off prior MCAs at a discount, with a new factor rate and a new daily debit. The pitch focuses on the lower daily payment but ignores the increase in total payback that comes from the longer term and the new factor rate. We see reverse consolidations grow total debt by 15 to 25 percent in typical cases, lengthen the term by 4 to 8 months, and add another secured creditor without paying off the prior contracts in full.

True consolidation through a bank line or SBA refinance can work in a narrow set of cases. The criteria are strict. The merchant has to qualify for the bank or SBA product on its own, which usually requires several years of clean financials, a debt-service coverage ratio above 1.25, no recent UCC filings, and a personal guarantor with strong credit. Most stacked-MCA businesses do not qualify, and the ones that do usually have a relationship with the bank already and do not need a broker to get there.

Other consolidation products like single-pay-off refinances or restructure programs through MCA-defense firms can be useful in specific situations. The key questions are always the same. Does the new product pay off the prior contracts in full? Does it have a meaningfully lower effective APR? Does it fit cash flow with margin? Does it preserve the merchant&apos;s legal position against any of the prior contracts? If the answer to any of these is no, the consolidation is not actually solving the problem.

The honest answer for most stacked-MCA merchants is that direct settlement or restructure of the existing contracts is more efficient than consolidation. Settle the most expensive contracts at a discount, restructure the rest into manageable monthly payments, and resolve the entire stack without taking on new debt. That path produces cleaner outcomes in almost every case.`,
  ),
  build(
    "mca-restructure-timeline",
    "MCA restructure: what the timeline really looks like",
    "Restructure programs typically run 12 to 18 months. Here is what happens in each phase.",
    `Phase one, weeks one through four, is intake and initial outreach. We pull contracts, calculate effective APRs, and request reconciliation across lenders. We coordinate with the merchant&apos;s bank and processor so cash flow is documented. We map the lender stack into the sequencing buckets that will drive the rest of the program. By the end of week four, every active lender has received a documented reconciliation request and most have responded.

Phase two, months two through four, is term negotiation. Each lender is approached individually. The objective is to extend the daily debit into a manageable monthly payment matched to actual cash flow rather than to an arbitrary projection. Successful restructures typically extend the term by 6 to 12 months and reduce the total daily payment burden by 40 to 60 percent. Lenders that resist restructure terms get escalated through legal pressure if the underlying contract supports it, or sequenced into a settlement track if restructure is not viable.

Phase three, months five through twelve plus, is execution. The merchant pays the unified monthly payment on schedule. We monitor lender behavior throughout, intervene where any lender deviates from agreed terms, and coordinate with counsel if any new legal exposure emerges. Most restructure programs run 12 to 18 months total, with the bulk of the timeline in the execution phase.

The restructure timeline is longer than settlement because the original balance is being paid in full rather than discounted. The trade-off is that lender relationships are preserved, business credit takes minimal damage, and the merchant&apos;s long-term financial profile recovers faster. Restructure is the right tool when the business is fundamentally healthy but stretched, not when the business is already past due or in active default.

What we do not promise is that every lender will agree to restructure. Some lenders are aggressive enough that settlement is the only path. The mix between restructure and settlement is determined contract by contract during the first six weeks of the program, and it is not unusual for a stack of five contracts to result in three restructures and two settlements running in parallel.`,
  ),
  build(
    "can-i-keep-operating-during-an-mca-program",
    "Can I keep operating during an MCA debt program?",
    "In almost all cases, yes. The program is designed around continued operations.",
    `Operating is the goal. A program that requires a business to stop operating typically defeats its own purpose because there is no revenue to fund settlements, no payroll for the staff that need to be retained, and no path back to a viable business at the end of the program. Credible relief firms design programs around continued operations, not around them.

The mechanics support continued operations in three ways. Reconciliation requests pause daily debits without triggering default, which restores cash flow within the first two to three weeks of the program. Escrow funding for settlements is structured around real cash flow, with monthly contributions sized so the merchant can fund operations and the program at the same time. Legal coordination addresses any UCC or COJ exposure that would otherwise threaten operations, before the exposure escalates into a freeze.

Industries with specific operational dependencies get extra coordination. Trucking with factoring requires direct conversations with the factor before lender outreach starts, so the receivable advance line continues without disruption. Construction with bonding requires working with the surety so program enrollment does not jeopardize active jobs or future bond capacity. Auto with floor plan requires pre-coordination with the floor plan provider so the inventory line is not disrupted. Healthcare with insurance reimbursement timing requires structuring the program around the actual reimbursement cycle. Each industry has its own operating constraints that the program has to respect.

What changes during the program is mostly invisible from the customer side. Daily debits pause. Cash flow normalizes. Vendor payments clear on time. Payroll runs without bouncing. From the operating perspective, the program looks like a six to eighteen month period during which the business runs the way it should have been running before the MCA stack accumulated.

What does change is the merchant&apos;s financial reporting. Settlements appear as discharge of indebtedness, which has tax implications that need to be planned for. UCC filings get released as contracts settle, which affects the public credit profile. A clean transition out of the program requires the same discipline that should have been in place before the MCAs were taken on, and most merchants come out of a relief program with cleaner financial hygiene than they had going in.`,
  ),
  build(
    "how-attorneys-help-with-mca-debt",
    "How attorneys help with MCA debt and when to engage one",
    "Attorneys are required for COJ defense, UCC enforcement, and any active litigation. They are useful long before that.",
    `An MCA-defense attorney plays three roles in a relief program. The first is defending against active legal action, including COJ filings, UCC enforcement, civil suits, and bank levies. This is the most visible role and the one most owners associate with attorneys in this space. The second role is providing leverage in settlement negotiations. The third is reviewing contracts for unconscionability and procedural defects that can be invoked in the negotiation or, if necessary, in court.

Engage an attorney immediately when a COJ is filed, an account is frozen, or litigation is active. The first 72 hours after any of these events are critical and the work is too jurisdictionally specific for generic counsel to handle efficiently. MCA-defense attorneys know which judges in which counties handle these motions, what arguments tend to succeed, and how to move quickly through procedural steps that less-experienced counsel will fumble.

Engage an attorney earlier when contracts contain clauses that look exposed: unusually high effective APRs, weak reconciliation language, clauses that may be unconscionable in the merchant&apos;s state, or COJ provisions in jurisdictions where COJs are restricted. Early legal review can identify defense angles that strengthen settlement leverage long before any litigation becomes necessary. The threat of a clean unconscionability argument often produces better settlement terms than the actual lawsuit would, and getting the threat documented early changes the dynamic of the entire negotiation.

A relief program that does not include legal coordination in its toolkit is incomplete. The negotiation side of relief work depends on legal posture, and a firm that cannot bring credible counsel into a case when it matters is operating with one hand tied. Credible firms maintain relationships with MCA-defense attorneys in the merchant&apos;s state and bring them in when the case requires it, rather than referring the merchant to an outside attorney mid-program and disrupting the workflow.

Attorneys are not a separate path from settlement and restructure. They are part of the toolkit. The right relief program uses them when needed and does not use them when not needed, and the cost of legal coordination is built into a transparent program fee rather than billed separately as a surprise.`,
  ),
  build(
    "negotiating-with-mca-lenders",
    "Negotiating with MCA lenders: what works and what does not",
    "Documentation, sequencing, and credibility move lenders. Pleas and partial information do not.",
    `Lenders see thousands of distressed merchants every year. They have heard every story. The salesperson on the phone has a script, the workout team has its own script, and most attempts at negotiation from the merchant side run into one of those scripts and stall. What actually moves lenders is documentation, sequencing, and credibility. None of those three are emotional and all of them are technical.

Documentation means the bank statements showing the gap between projected and actual revenue. The contracts annotated with the calculated effective APR. The UCC search showing the position of each lender in the stack. The legal filings, if any. Lenders that see clean documentation from a credible counterparty respond differently than lenders that get partial information from a distressed merchant trying to negotiate alone. The same dollar offer reads differently depending on what surrounds it.

Sequencing matters because the first lender approached sets the precedent for the others. The wrong first move can poison the rest of the negotiations. The right first move depends on which lender has the weakest contract, which lender is most likely to settle aggressively, which lender has the most legal exposure, and which lender&apos;s settlement will free up the most leverage against the rest of the stack. There is no formula. Each program requires its own sequencing decision based on the specifics.

Credibility matters most. Lenders that recognize the firm on the other side of the table settle faster and at better numbers. They know that the firm will follow through on the documented threats, will execute settlements on the agreed timeline, and will escalate to counsel cleanly if the negotiation breaks down. That recognition has to be earned over many cases. New firms or one-time merchant negotiators do not have it, and the absence of it shows up in the settlement numbers.

What does not work: pleas, partial information, vague threats, missed payment promises, and attempts to negotiate without legal cover. Lenders dismiss all of these in roughly five seconds. The negotiation that produces real outcomes looks more like an audit than a sales conversation, and the merchants who try to handle it themselves usually end up paying more in lost time and worse settlement terms than they would have paid for a credible firm to do it cleanly.`,
  ),
  build(
    "preserving-business-credit-while-resolving-mca-debt",
    "Preserving business credit while resolving MCA debt",
    "MCA balances usually do not report to consumer credit. Business credit takes a temporary hit and rebuilds quickly.",
    `MCAs are commercial transactions and most do not report to consumer credit bureaus. Personal credit usually stays intact through a relief program, except in cases where the contract includes a personal guarantee that gets called or where a personal asset is involved in a settlement payment. For most owners, personal credit is not a primary concern during the program.

Business credit is a different story. UCC filings recorded against the business appear on the public business credit profile and can affect bank line availability, vendor terms, and certain insurance products during the active period. Settlement of MCA contracts often involves UCC release filings that have to be recorded after the settlement clears, and the gap between settlement and release can be a few weeks to a few months depending on the lender&apos;s administrative speed.

Business credit can take a temporary hit during settlement, particularly when UCC filings are recorded as resolved-after-default versus paid-off-clean. The hit is recoverable. Most businesses see business credit rebuild within 12 to 18 months of program completion, and many see it return to better-than-pre-MCA levels because the underlying cash flow is healthier than it was during the stacking period.

The preserving step is documentation: keeping clean records of every settled balance, paid-off UCC filing, and lender release. That documentation is the foundation of the rebuild. When a future lender pulls a credit profile and sees a UCC filing, the question they ask is whether the filing was resolved cleanly. A merchant who can produce the lender release letter, the settlement agreement, and the recorded UCC termination has a complete answer. A merchant without that paperwork has a hole in the credit story that creates friction in every future financing application.

Vendor relationships are the other side of the business credit picture. Trade payables that stay current throughout the program preserve the vendor lines that matter most for ongoing operations. Most credible relief programs keep trade lines untouched and focus negotiations entirely on the MCAs, which preserves the most important commercial relationships the business has and accelerates the post-program recovery.`,
  ),
  build(
    "mca-pre-default-options",
    "MCA debt options when you are still current but stretched",
    "Pre-default is the best moment to act. You have leverage, options, and time that disappear once you default.",
    `Pre-default merchants have access to restructure programs, reconciliation requests, and refinance options that disappear once default occurs. The single best move at this stage is to act before the cushion disappears. Most owners who end up in worst-case relief situations were pre-default 60 to 90 days before they finally engaged, and the difference in outcomes between an early engagement and a post-default engagement is large enough to matter.

Restructure is usually the right path at this stage. Daily debits get extended into manageable monthly payments. Lender relationships are preserved. Business credit takes minimal damage. The lender, knowing the merchant is current and signaling proactively, has reasons to work with the merchant rather than escalate. Restructure programs from a pre-default position regularly produce 40 to 60 percent reductions in monthly debit burden without any settlement at all, which is often enough to break the stacking cycle and put the business back on a sustainable footing.

Reconciliation requests carry more weight pre-default than they do post-default. The lender is more inclined to grant an adjustment to a current merchant than to one that has already breached. Documented reconciliation responses produce a paper trail that strengthens the merchant&apos;s position in any future negotiation. A clean reconciliation history is one of the most valuable assets a merchant can build during the early stress period.

The wrong move at this stage is taking another MCA to bridge the gap. Stacking accelerates the path into default rather than preventing it, and once the stack reaches four or five contracts, the math no longer supports any path that does not involve a relief program. Owners who recognize the pre-default warning signs and engage credible help before the next advance is needed almost always recover faster, with cleaner credit, and at a lower total cost than owners who keep stacking.

The hardest part of pre-default engagement is admitting that the situation has crossed the line where self-help is going to keep producing more debt rather than less. The owners who admit it earliest are the ones who recover fastest.`,
  ),
  build(
    "what-happens-if-you-stop-paying-an-mca",
    "What happens if you stop paying an MCA?",
    "Default triggers a sequence: acceleration, UCC enforcement, COJ filing, and litigation. Each stage narrows the options.",
    `Stopping payments without coordination triggers default within days. The lender accelerates the balance, often to face value plus fees, and notice goes out to the merchant within the first business day or two. The acceleration converts a daily debit obligation into a single lump sum demand, and the math changes immediately. A contract that had $80,000 in remaining payments concentrated into a daily cadence becomes an $80,000 demand for immediate payment.

UCC notices may go out to processors and customers within a week of the default declaration. The processor freeze typically hits first because the documentation requirements are simpler than for customer notices. Once the processor freeze is in place, the merchant&apos;s daily settlement flow stops landing in the operating account. Customer-side UCC notices follow within another week or two depending on the lender&apos;s aggression and the customer relationships involved.

A COJ filing, where the contract permits and the jurisdiction supports, can result in a judgment within days of the default declaration. Once the judgment is recorded, bank levies and additional UCC enforcement can move very quickly. The window between default and severe operational disruption can be as short as 5 to 10 business days when an aggressive lender is involved.

Litigation typically follows for the unsecured portion of the balance, particularly in cases where the COJ is unenforceable or has been vacated. Civil suits in commercial debt cases run 6 to 18 months and can produce judgments that get enforced through bank levies and asset seizures. The litigation phase is more expensive for the merchant than the COJ phase because the legal defense carries through a longer timeline.

Each stage narrows what relief programs can do. Pre-default, the full range of restructure and settlement options is available. After default declaration, restructure becomes harder and settlement becomes the dominant path. After UCC enforcement, the negotiation shifts to defending receivables and unwinding freezes. After COJ or judgment, the negotiation shifts to vacating the judgment or settling at a steep discount under legal pressure.

Stopping payments is sometimes the right move, but only as part of a coordinated strategy with documented reconciliation, legal coverage, and a settlement plan ready to deploy. Stopping payments without that coordination is the most expensive form of self-help in the MCA space and consistently produces the worst outcomes.`,
  ),
  build(
    "choosing-an-mca-relief-partner",
    "Choosing an MCA relief partner: what to ask before you sign",
    "Five questions separate credible firms from ones that will make the situation worse.",
    `Question one: what is your fee structure and is it published? Credible firms publish flat fees in writing, with the total program cost defined upfront and locked in the engagement. Vague pricing, performance-only structures, and hourly billing layered on top of disclosed fees are all red flags. The firm should be able to tell you the total cost of the program before you sign anything.

Question two: do you charge upfront? Real relief is paid as outcomes happen, not before any work has been done. Firms that demand a large retainer before contracts are pulled or negotiations begin are operating on a different incentive than firms that earn against progress. The merchant&apos;s leverage comes from being able to walk away if the work is not getting done, and an upfront retainer eliminates that leverage immediately.

Question three: do you have attorneys you coordinate with for legal defense? Programs without legal coordination are incomplete. The negotiation side of relief work depends on legal posture, and a firm that cannot bring credible counsel into a case when it matters is operating with one hand tied. The right answer is that the firm has established relationships with MCA-defense attorneys in your state and brings them in when the case requires it.

Question four: how do you sequence lenders? The answer should reflect strategy, not improvisation. Real firms can explain their sequencing logic in detail, including which lenders they typically approach first, why, and how the sequence shifts based on the specific contracts in the stack. Firms that cannot articulate the sequencing decision are usually winging the program, which produces inconsistent outcomes.

Question five: can I see anonymized case studies that match my situation? Real firms can produce case studies quickly, including industry, debt size, lender count, program type, and outcome. A firm that cannot produce a comparable case study to your situation either does not have the experience or is not organized enough to surface it. Either is a problem.

Beyond the five questions, watch for behavioral signals. Sales reps who pressure same-day signing, refuse to put quotes in writing, or cannot explain the technical details of a restructure are usually working in firms with the wrong incentives. The interview goes both ways. The right relief partner expects to be vetted thoroughly and answers every question without hesitation.`,
  ),
  build(
    "life-after-mca-debt",
    "Life after MCA debt: rebuilding cash flow and credit",
    "The first 12 months after program completion are the most important. Here is what to focus on.",
    `Program completion is the start of the rebuild, not the finish line. Cash flow that was previously consumed by daily debits is now available for working capital, hiring, and growth. Discipline in those first 12 months matters because the same situational pressures that produced the original MCA stack are still present, and most businesses that re-stack do it within the first year after a relief program closes.

Priority one is rebuilding the cash buffer. Three months of operating expenses, in reserve, prevents any need to consider an MCA in the next downturn. The buffer is the single most useful financial asset a small business can maintain and the absence of it is the single most common reason owners take a first MCA. Building it back becomes much easier once the daily debits are gone, but it requires deliberate allocation of the recovered cash flow rather than absorbing it into expanded operations or owner draws.

Priority two is rebuilding business credit. Pay vendors early when possible. Keep UCC filings current and clean. Document every settled balance with the corresponding lender release. File the release with the secretary of state if the lender does not. Pull the business credit report quarterly during the first year and address any reporting errors quickly. The rebuild is mostly about consistency: months of clean reporting eventually move the score back into the financeable range.

Priority three is selecting growth capital carefully. SBA loans, bank lines of credit, equipment financing, and factoring are all preferable to MCAs in almost every case. The next time growth capital is needed, it should not come from a daily debit product. The reason owners who came through a relief program go back to MCAs is that MCAs are easy and other capital sources are harder. The right answer is to start the harder conversations early, build relationships with banks and SBA lenders before capital is urgently needed, and be ready to draw from those sources when the time comes.

Priority four is operational discipline. Most stacking situations have an underlying operational driver: customer concentration risk, weak collections, undisciplined growth investment, or seasonal cash flow that was not planned for. Resolving the MCA stack does not fix those operational issues. They have to be addressed directly, usually with help from an outside operator or fractional CFO. The owners who do this work in the first 12 months after program completion almost never end up back in an MCA situation.`,
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
