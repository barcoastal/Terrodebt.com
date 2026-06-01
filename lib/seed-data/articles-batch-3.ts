export type SeedArticle = {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  contentMd: string;
  author?: string;
};

export const ARTICLE_SEEDS_BATCH_3: SeedArticle[] = [
  {
    slug: "loan-during-debt-workout",
    title: "Can You Get a Business Loan While in a Debt Workout?",
    excerpt:
      "Bank lines, equipment finance, and vendor terms can be obtained during an active restructure, but only if you sequence the workout correctly first.",
    heroImage: "/images/articles/loan-during-debt-workout.png",
    author: "Business Debt Insider",
    contentMd: `Owners come into a workout asking the same question on day one. If I do this, when can I borrow again? The answer is not as far away as most people assume, but it is also not what most owners hope to hear. New credit during an active workout is possible. The shape of the credit, the timing, and the sources all depend on how the workout is sequenced and how cleanly the existing debt is being resolved.

## TL;DR

- New unsecured bank credit during an open workout is rare. Plan on 9 to 18 months after closeout for clean bank product access.
- Equipment finance is the most accessible category mid-workout, often available 60 to 120 days after the workout stabilizes.
- Vendor terms can usually be repaired within 30 to 90 days once daily MCA debits stop and operating cash flow normalizes.
- Asset-based lines and factoring are accessible during the workout itself if receivables or inventory support it.
- The order of resolution matters. Settle or restructure the most aggressive lenders first, then approach new credit sources.
- Documentation discipline during the workout is what makes the next financing cycle possible. Track every payment, release, and balance.

## What "in a workout" actually means to a lender

Lenders evaluate two things when you apply for credit. The first is the static picture: balance sheet, tax returns, debt schedule, personal credit. The second is the dynamic picture: what is happening in the operating account, what UCC filings are active, what litigation is pending, what the trade references say.

A business in an open workout looks distinctive on both pictures. The debt schedule shows MCA balances or accelerated bank notes. The operating account history shows daily debits, NSF activity, or recent restructure-related payment changes. UCC filings from MCA funders are active. Trade references may be mixed if vendors were stretched during the cash flow squeeze.

The combination shuts down most unsecured bank credit. It does not shut down everything. Lenders who underwrite against specific collateral, vendors who underwrite against transaction history, and equipment finance companies who underwrite against the equipment itself all have separate appetites. Each category has its own timing curve.

## Bank lines and term loans during the workout

Conventional bank credit (operating lines, term loans, real estate-secured facilities) is generally out of reach during an active workout. Banks underwriting decisions key on personal credit, business credit reports, and the debt schedule. An open MCA stack with daily debits or a recent settlement carries weight against approval.

The realistic timeline for clean bank product access runs 9 to 18 months after the last workout balance closes. Two things have to be true at the application. First, the operating account has to show a clean rhythm with no MCA debits, no NSF activity, and consistent deposits aligned with reported revenue. Second, the business credit profile has to show updated trade references and resolved UCC filings.

The work that compresses that timeline starts during the workout itself. Documentation of every settlement, every UCC release, every restructured balance becomes the package you walk into the next bank with. A workout that closes cleanly with documented releases puts you 6 months ahead of a workout that closes ambiguously with paperwork gaps.

[Creditor liaison work during the program](/services/business-debt-resolution) is what generates that documentation. Every settlement letter, every release confirmation, every payoff statement gets organized into a package that a future lender can underwrite from.

### What banks look for after a workout closes

After closeout, banks weigh four signals. Trailing twelve months of operating account activity, ideally clean. Business credit report showing resolved UCC filings and updated paydex. Personal credit recovery to mid-600s or better. Trade references from current vendors confirming payment within terms.

The first signal takes time and cannot be accelerated. The other three can be actively rebuilt during the closeout period.

## Equipment finance: the most accessible mid-workout category

Equipment finance underwrites primarily against the equipment itself, with secondary weight on the business's ability to make payments. Because the lender holds a specific lien on a depreciating asset they can repossess, their tolerance for messy debt schedules is higher than unsecured bank lenders.

Equipment finance becomes accessible 60 to 120 days into a workout, sometimes earlier. The criteria that matter: the equipment is essential to revenue (a truck for a logistics business, a CNC machine for a fabricator, a kitchen build-out for a restaurant), the down payment is real (15 to 30 percent), and the operating account shows the workout payments are being made on schedule.

A practical example. A landscaping company in a workout with $180K of MCA debt being settled over 14 months needed a $65K truck. Six months into the workout, with three settlements closed and two restructures performing, they put 25 percent down and financed the truck at a 12 percent rate over 60 months. The same company would not have qualified for an unsecured term loan at any rate during the same period.

The equipment finance approach during a workout requires honesty. The application has to disclose the workout. Equipment finance underwriters know how to read it and have a category for it. What kills these applications is non-disclosure that surfaces during verification.

## Vendor terms during and after the workout

Vendor credit is the fastest category to repair and the most directly tied to operating cash flow. During an active MCA squeeze, vendors get stretched. Net-30 stretches to 60, then 90. Some go to COD. Some put the account on hold.

When the workout starts and daily debits stop, the operating account stabilizes within 30 to 60 days. Vendors notice. The work to repair vendor terms is direct conversation: a call to each key vendor, a brief explanation that the cash flow squeeze has been addressed, a commitment to a specific catch-up schedule for any past-due amounts, and a request to return to standard terms.

Most vendors return to terms inside 90 days when this conversation happens early and the catch-up commitment is honored. The vendors that do not (typically the ones who took the hardest hit during the squeeze) can be replaced. By month 6 of a workout, a clean vendor reference list is achievable.

## Asset-based lending and factoring during the workout

Two categories of credit are sometimes available during the workout itself. Asset-based lending (ABL) facilities underwrite against inventory or specific receivables. Factoring underwrites against individual invoices.

ABL and factoring are the cleanest options when receivables or inventory support them. The lender's security is in the asset, not in the business's general creditworthiness. A business with $400K of qualified receivables can often access $250K to $300K of factoring advance regardless of an open workout.

The work to set these up during the workout is coordinating with the existing UCC filings. Most MCA UCC filings claim a blanket lien on all receivables. A factor or ABL lender will require subordination or release on the specific receivables they will advance against. [Liquidity engineering work](/services/business-debt-restructuring) often involves negotiating those subordinations as part of the broader workout structure.

The timing: ABL and factoring can be live within 45 to 75 days of starting the workout if the receivables base supports it and the UCC coordination gets done early.

## Sequencing matters more than speed

The instinct during a workout is to chase new credit as fast as possible. The instinct is wrong. New credit pulled too early, into a stack that is not yet stabilized, becomes the next problem.

The right sequence: stabilize the workout first, close the most aggressive contracts, then approach new credit in the order that fits the business need.

### Sequence in practice

Month 1 to 3: Workout intake, [forensic audit](/services/business-debt-relief) of the debt stack, initial creditor outreach, escrow funding begins. No new credit.

Month 3 to 6: First settlements close, daily debits stop, operating account stabilizes. Vendor conversations begin. Possible ABL or factoring setup if receivables qualify.

Month 6 to 12: Workout midpoint. Equipment finance becomes accessible for essential capex. Vendor terms back to standard for most accounts. Business credit profile begins to show UCC releases.

Month 12 to 18: Workout closing out. Final settlements paid. Documentation packet assembled for future bank applications.

Month 18+: Bank product applications. Operating account TTM is clean. Business credit profile shows resolved UCCs. Personal credit recovering.

## The risk of borrowing too early

The pattern that derails workouts most often is a new MCA taken during the program. The pitch comes in: a funder offering to consolidate, to bridge, to provide working capital. The math feels manageable because the daily debit is sized to fit the post-workout cash flow.

It is the same trap that built the original stack. A new MCA layered onto a workout creates a new senior creditor with a new daily debit, just as escrow is building for the original settlements. The escrow gets cannibalized. The original lenders, sensing the new advance, become harder to settle.

The discipline during a workout is to wait for the right credit, not the available credit. New MCAs are almost always the available credit. Equipment finance, ABL, factoring, and eventually bank product are almost always the right credit.

## What to do next

If you are in an active workout and weighing new credit, the question is not whether to borrow. The question is what to borrow against, in what order, and at what point in the workout timeline. The wrong sequence undoes the workout. The right sequence has you exiting closeout with new financing relationships already in place. [Reach out](/contact) and we will map the credit sequence against your current workout stage.`,
  },
  {
    slug: "how-many-mcas-too-many",
    title: "How Many MCAs Is Too Many? A Decision Framework",
    excerpt:
      "Three MCAs is the warning line. Five is critical. The real signal is what percent of daily revenue is going to debits, and what is left to operate.",
    heroImage: "/images/articles/how-many-mcas-too-many.png",
    author: "Business Debt Insider",
    contentMd: `The count of MCAs on a business is a rough proxy. The real signal is the percentage of daily revenue going to debits and what is left to actually operate the business. A single MCA pulling 25 percent of daily deposits is more dangerous than four MCAs pulling 8 percent combined. That said, the count itself carries information, because each additional contract layers a new factor rate, a new UCC filing, and a new lender with their own escalation patterns.

## TL;DR

- 1 to 2 MCAs is the manageable zone for most businesses with stable revenue.
- 3 MCAs is the warning line. Daily debit burden typically reaches 12 to 18 percent of revenue at this point.
- 4 to 5 MCAs is the critical zone. Daily debits commonly reach 20 to 30 percent of revenue, and stacking dynamics start to feed themselves.
- 5+ MCAs almost always means active distress. The business is borrowing to make payments.
- The harder metric: daily debit total divided by average daily revenue. Above 15 percent, the business cannot grow. Above 25 percent, it cannot operate sustainably.
- The right framework runs both numbers together. Count tells you about lender complexity. Percentage tells you about operational viability.

## Why count alone is insufficient

A business with two MCAs totaling $400K and combined daily debits of $4,200 against $30K of daily revenue is in worse shape than a business with four MCAs totaling $180K and combined daily debits of $1,600 against $22K of daily revenue. The first business is paying 14 percent of revenue to debt. The second is paying 7 percent.

Owners and advisors fixate on count because it is the visible number. The percentage of revenue going to debits is the operational number, and it is what determines whether the business can pay vendors, payroll, rent, and taxes after the debits clear.

That said, count is not noise. Each additional contract adds three real costs: another factor rate compounding the total payback, another UCC filing complicating future credit, and another lender to negotiate with when the workout begins. Five lenders is not five times harder than one lender, but it is substantially more complex than three lenders.

## The zones, by count

### 1 to 2 MCAs: manageable for most businesses

One MCA, taken for a defined purpose with a payback window that fits the business cycle, is a working capital tool. The factor rate is high but the duration is short and the use of funds is contained.

Two MCAs is the first inflection point. The reasons businesses take a second MCA are revealing: the first one is paying off and they want to refresh, the first one did not cover what they expected, or revenue dipped and they need to bridge. The first reason is benign. The second and third are early warning signals.

At 2 MCAs, daily debit burden typically sits between 6 and 12 percent of revenue for businesses that are otherwise healthy. The business can absorb this level. Growth is constrained but possible. The exit path is to ride out the existing contracts and not stack a third.

### 3 MCAs: the warning line

The third MCA is where the trajectory changes. By count, three MCAs is a stack. By math, daily debits typically reach 12 to 18 percent of revenue at this point. By behavior, the reason for the third advance is usually defensive: the first two are pulling so hard that the business needs new capital to cover ongoing obligations.

This is the point where intervention is cheapest and most effective. Three contracts can be settled or restructured in 6 to 9 months. The business can stabilize while still maintaining most lender relationships. Personal credit has not yet taken the full hit. Vendor terms are usually still intact.

Three is also the point where lenders start noticing each other. A funder running underwriting on a fourth advance will see the three prior UCCs and price accordingly, or decline outright. The fourth MCA is harder to get than the third, which is harder than the second.

### 4 to 5 MCAs: critical

Four MCAs is the zone where stacking dynamics start to feed themselves. Each new advance is taken to cover the debits of the prior advances. The daily debit total commonly reaches 20 to 30 percent of revenue. The business is paying for the privilege of having less working capital than before each new advance.

Operationally, four MCAs means the operating account is fragile. A single slow week of receivables triggers NSF activity. Reconciliation requests become survival tools. Confession of judgment risk is real for the older contracts.

This is the point where most owners realize the path they are on. It is also the point where the workout becomes more complex. Four to five contracts means four to five separate negotiations, each with its own posture and timing. The total payback across the stack often exceeds the business's annual revenue.

The decision at four to five MCAs is binary. Either stop stacking and start a workout, or continue and accept that the next advance will be the trigger for forced collections.

### 5+ MCAs: active distress

Five or more MCAs almost always means the business is borrowing to make payments. The most recent advances are not funding operations or growth. They are funding the daily debits of the prior advances. This is the pattern that ends in confession of judgment, frozen accounts, and forced collection.

By the time a business has 6, 7, or 8 MCAs, the workout has to address not just the debt but the cash flow rhythm. Some businesses at this level have lost track of which contracts are senior, which lenders have actually filed UCCs versus which threatened to, and what the actual total payback is.

[Forensic audit](/services/business-debt-relief) work at this stage is non-negotiable. Before any settlement or restructure conversation, the actual obligations have to be mapped: face balance, accrued balance, daily debit, UCC position, contract terms, lender escalation history. Without that map, every negotiation is partial.

## The math that matters more than count

The harder metric is daily debit burden as a percentage of daily revenue. The formula is straightforward.

Daily debit total = sum of all MCA daily debits.

Average daily revenue = trailing 90-day deposits divided by 90.

Debit burden = daily debit total / average daily revenue.

The bands.

### Under 8 percent: sustainable

The business can grow, pay vendors on time, build reserves, and absorb a slow week without distress. Most healthy businesses with one or two MCAs operate in this band.

### 8 to 15 percent: constrained but stable

The business can operate but cannot grow. Reserves do not build. A slow week creates stress but not crisis. This is the band where most businesses sit when they realize they should not take another MCA.

### 15 to 25 percent: critical

The business is paying for the existence of the debt. Reserves are not just flat; they are decaying. Vendor terms start stretching. Payroll becomes a question. This band is where the workout decision usually gets made.

### Above 25 percent: unsustainable

The business cannot operate at this level. Every NSF, every slow customer, every vendor demand triggers a cash crisis. Continuation requires new advances, which deepen the problem. This band requires immediate intervention.

## The decision tree

Run the count and the percentage together. The decision matrix:

**1 to 2 MCAs and under 12 percent debit burden:** Manageable. Ride out the contracts. Do not stack.

**3 MCAs at any debit burden, or 1 to 2 MCAs above 12 percent:** Warning zone. Begin workout planning. The right time to engage is before the fourth advance is taken.

**4 to 5 MCAs, or any count above 15 percent debit burden:** Critical. Start workout intake within 30 days. Stop taking new advances regardless of how the math is pitched. [Creditor liaison](/services/business-debt-resolution) and [liquidity engineering](/services/business-debt-restructuring) coordination start here.

**5+ MCAs, or debit burden above 25 percent:** Active distress. Workout intake immediately. Forensic audit first. Reconciliation requests to pause debits while the workout is structured. Consider [operational restructuring](/services/bankruptcy-alternative) alongside the debt work.

## A real example, walked through

A specialty contractor with $1.8M of annual revenue had four MCAs totaling $310K in face balance. Combined daily debits ran $3,400. Average daily revenue was $7,200. Debit burden: 47 percent.

By count, four MCAs put the business in the critical zone. By math, 47 percent debit burden was past unsustainable into the territory where every operating week was a crisis.

The workout structure: forensic audit revealed two of the contracts had reconciliation language the funders were not honoring. Reconciliation requests went out on those two, pausing $1,800 of daily debits within 21 days. The other two contracts were negotiated to settlements at 47 percent and 52 percent of face. Total program ran 11 months. The business exited with $0 of MCA debt and 8 percent debit burden (on a single equipment finance note that survived the workout).

The count signaled the problem. The percentage measured the urgency. The workout addressed both.

## What to do next

If you are above three MCAs or above 12 percent debit burden, the framework above is the start. The actual decision requires running your specific debt stack, daily revenue, and lender mix against the matrix. [Reach out](/contact) and we will walk through your numbers and show you which zone the business is in and what the cleanest path looks like from there.`,
  },
  {
    slug: "mca-settlement-success-rates",
    title: "MCA Settlement Success Rates: What Actually Closes",
    excerpt:
      "Settlement programs close 75 to 90 percent of contracts at 40 to 55 percent of face. The rest get restructured, litigated, or escalated to counsel.",
    heroImage: "/images/articles/mca-settlement-success-rates.png",
    author: "Business Debt Insider",
    contentMd: `Owners considering a settlement program want one number: will this actually work. The honest answer is that settlement closes the majority of contracts at meaningful discounts, but the distribution matters. Some contracts settle in 60 days at 35 percent of face. Others take 14 months and close at 65 percent. Some do not settle at all and end up in restructure or litigation. Understanding the distribution is more useful than chasing a single average.

## TL;DR

- Across a typical stack, 75 to 90 percent of contracts close through settlement.
- Average settlement lands between 40 and 55 percent of face balance.
- Total stack reduction (face balance vs settled cost) typically falls in the 35 to 50 percent range after program fees.
- Timelines run 6 to 18 months from intake to closeout for most programs.
- The 10 to 25 percent of contracts that do not settle either restructure, escalate to counsel, or sit unresolved if they are small enough.
- Lender posture, contract age, and the quality of the documentation package drive variance more than the size of the balance.

## What "success" means in a settlement program

The word success carries weight. In a settlement program, success has three layers that often get conflated.

The first layer is closure: did the contract get resolved with a release. The second layer is discount: how much off the face balance was the resolution. The third layer is timeline: how long did it take from intake to release.

A successful settlement is all three: closed, discounted, within a reasonable timeline. A contract that "settled" at 95 percent of face after 18 months of negotiation is technically closed but did not achieve the discount that justifies the program. A contract that got a 35 percent offer in month two but never closed because the merchant could not fund the settlement is not a success either.

The aggregated numbers below reflect contracts that closed with a release, at a documented discount, within the program timeline.

## Closure rates by contract characteristics

### Contracts in active default: 85 to 95 percent close

Contracts where the merchant has stopped paying and the lender is past initial collections close at the highest rate. The lender has acknowledged the default, the relationship is already adversarial, and both sides are looking for a number that resolves the matter.

Average settlement on defaulted contracts: 35 to 50 percent of face. Timeline: 60 to 180 days from settlement offer to release. This is the cleanest category in a settlement program.

### Contracts pre-default but distressed: 75 to 85 percent close

Contracts where the merchant is still paying but the relationship is strained (reconciliation requests pending, payment changes recent, NSF activity present) close at high rates with somewhat lower discounts. Lenders in this zone are weighing the probability of full collection against the probability of default, and a discounted lump sum often resolves the question.

Average settlement: 45 to 60 percent of face. Timeline: 90 to 240 days.

### Performing contracts: 50 to 70 percent close

Contracts that are still performing on schedule are the hardest to settle. The lender has no immediate incentive to discount. Settlement of these contracts typically requires a credible distress narrative: revenue decline, other lender pressure, or a documented event that changes the picture.

Average settlement when performing contracts close: 55 to 70 percent of face. Timeline: 6 to 14 months. Many performing contracts do not settle and instead get restructured or paid through closeout.

### Contracts with weak underlying paper: 90+ percent close

Some MCA contracts have legal weaknesses that surface during [forensic audit](/services/business-debt-relief). Missing reconciliation language, unconscionable factor rates, improper UCC filings, or signature defects. Contracts with these characteristics close at the highest rates and the deepest discounts because the lender's legal exposure outweighs the collection value.

Average settlement on weak-paper contracts: 25 to 40 percent of face. Timeline: 60 to 150 days.

## Why averages mislead

Owners ask for "the average" and the average across a typical program is 47 percent of face. The number is real but it conceals the distribution.

A stack of five contracts might settle at: 32 percent, 41 percent, 48 percent, 55 percent, and 68 percent. The average is 49 percent. Each contract had its own posture, its own lender, its own contract weaknesses. Treating the program as if every contract settles at 49 percent leads to bad cash planning.

The right way to model a settlement program is contract by contract, with a range. The forensic audit at intake produces those ranges. The actual settlements come in within or near those ranges for the contracts that close. The contracts that do not close get reclassified into restructure, escalation, or hold.

## What does not close, and why

Across a typical program, 10 to 25 percent of contracts do not settle. Understanding the pattern helps.

### Contracts that move to restructure

Some lenders flatly refuse settlement and only offer restructure. This is more common with bank-product MCAs (term advances issued by funders affiliated with chartered institutions) and with some of the larger funders who have institutional policies against discounted resolution. These contracts get restructured into monthly payment plans, often at the original balance but with extended terms.

A contract that restructures is not a settlement failure. It is a different resolution path. The merchant pays more in total dollars but preserves the lender relationship and avoids the default reporting.

### Contracts that escalate to counsel

Some contracts go to litigation. This happens in two directions. Either the lender sues the merchant (confession of judgment, breach of contract action) before settlement is reached, or counsel for the merchant raises defenses that move the matter to court. Our practice does not litigate, but we coordinate with [licensed counsel in all 50 states](/services/business-debt-resolution) when escalation becomes necessary.

Litigation tends to resolve at meaningful discounts when the underlying paper has weaknesses, but the timeline extends to 12 to 24 months and counsel fees become a factor in the math.

### Contracts that sit

Small balances on contracts where the lender has not actively pursued collection sometimes sit unresolved. The merchant stops paying, the lender does not escalate, and the balance ages. Eventually these either get charged off, sold to a debt buyer (who often settles deeply discounted), or pursued years later when collection economics change.

Sitting is not a strategy. It is a residual category for contracts that did not fit settlement or restructure cleanly and where the cost of further work exceeded the expected recovery.

## Timeline distribution

Settlement programs close most contracts in clusters rather than evenly across the program.

### Months 1 to 3: Setup phase

No settlements close. Forensic audit completes. Initial creditor outreach. Escrow funding begins. Reconciliation requests on contracts with applicable language. The pace feels slow to the merchant but the foundation work is what determines outcomes in months 4 through 12.

### Months 3 to 6: First wave

The contracts in active default and the weak-paper contracts start closing. This is typically 25 to 40 percent of the stack closing in this window at the deepest discounts of the program (32 to 42 percent of face on average).

### Months 6 to 12: Bulk of closures

The middle band of contracts (pre-default but distressed, lenders with moderate posture) closes through this window. Another 40 to 55 percent of the stack resolves. Settlements in this window typically land at 45 to 55 percent of face.

### Months 12 to 18: Final closures and reclassifications

The last 10 to 25 percent of contracts either close at higher percentages (55 to 70 percent of face) or get reclassified to restructure, escalation, or hold. The program enters closeout with documentation of every release.

## Total stack reduction

The headline number most merchants want is total cost vs face balance.

A typical stack of $400K face balance closes a settlement program at approximately $200K to $260K of total cost (settlements paid plus program fees). That is a 35 to 50 percent reduction off face.

The reduction is larger if the stack includes weak-paper contracts. It is smaller if the stack includes a high proportion of bank-affiliated lenders who will only restructure.

The actual number for a specific stack is knowable at intake within a tight range. The forensic audit produces a contract-by-contract estimate. The program performance over 12 to 18 months tracks against that estimate, usually landing within 5 to 8 percentage points of the intake projection.

## Settlement vs restructure trade-offs

The choice between settlement and restructure on a specific contract comes down to four factors.

Lender posture: aggressive funders settle, conservative funders restructure.

Contract weaknesses: weak paper favors settlement.

Merchant credit considerations: settlement reports as settled-after-default, restructure reports as performing.

Cash flow capacity: settlement requires escrow buildup, restructure requires steady monthly payments.

Most workouts end up hybrid: 60 to 75 percent of contracts settle, 25 to 40 percent restructure. The right mix depends on the specific stack, not on a preference for one path over the other.

## What to do next

If you are weighing a settlement program, the right question is not "what is the average discount." The right question is "what does my specific stack look like contract by contract." The answer comes from a forensic audit at intake, which produces ranges for each contract and a total stack projection. [Reach out](/contact) and we will run the numbers on your stack and show you the realistic settlement, restructure, and escalation projections before you commit to a program.`,
  },
  {
    slug: "mca-reconciliation-request-template",
    title: "MCA Reconciliation Request: Exact Language That Gets Results",
    excerpt:
      "Most MCA contracts contain reconciliation language that funders ignore until pressed. Here is the exact request structure, section references, and adjustment math.",
    heroImage: "/images/articles/mca-reconciliation-request-template.png",
    author: "Business Debt Insider",
    contentMd: `Reconciliation is the most overlooked tool in an MCA stack. Most contracts include a clause requiring the funder to recalculate the daily debit when actual receivables fall below the projected receivables the original advance was sized against. Funders do not honor this clause until a merchant formally invokes it with the right documentation and the right language. Done correctly, a reconciliation request can pause or substantially reduce daily debits within 14 to 30 days. Done incorrectly, it gets ignored or denied.

## TL;DR

- Reconciliation clauses appear in most MCA contracts, typically under sections titled "Reconciliation," "True-Up," or "Adjustment of Specified Percentage."
- The clause generally requires the funder to recalculate the daily debit based on actual receivables when the merchant requests it in writing with supporting documentation.
- A proper request includes: contract reference, bank statement documentation, calculation of actual vs projected receivables, proposed adjustment amount, and a specific response deadline.
- Funders ignore informal requests. They respond to formal written requests delivered via traceable means.
- Response timelines vary by contract: 5 business days is common; some require up to 30 days.
- If the funder fails to respond within the contractual window, the request itself becomes evidence of bad faith that strengthens later settlement or litigation positioning.

## What reconciliation actually is

When a merchant takes an MCA, the daily debit is set at a fixed dollar amount that represents an estimated percentage of expected daily receivables. The contract language often says something like: "Merchant shall remit to Funder a Specified Percentage of Merchant's Future Receipts, estimated at $X per business day."

The estimated percentage is the key phrase. The daily debit is not a fixed payment. It is an estimate of a percentage. The contract obligation is the percentage, not the dollar amount. When actual receipts come in below the projection, the dollar amount of the debit is, by the contract's own terms, overstated.

Reconciliation is the mechanism to correct it. The merchant provides documentation of actual receipts over a defined period. The funder calculates what the daily debit should have been based on actual receipts at the contractual percentage. The funder either refunds the overage or adjusts forward debits, or both.

The clause exists because MCAs are not loans. They are purchases of future receivables at a specified percentage. The legal structure of the product requires the reconciliation mechanism to maintain the purchase-of-receivables fiction. Without reconciliation, the product is a fixed-payment loan, which would subject it to usury laws.

## Why funders do not volunteer reconciliation

Reconciliation reduces the funder's daily cash flow. They do not surface the option proactively. Most merchants do not know the clause exists until counsel or a workout advisor reads the contract.

Funders also know that informal reconciliation requests (a phone call, an email asking for help) can be deflected, delayed, or denied without consequence. A formal written request invoking specific contract language is harder to ignore because it creates a paper trail.

The work of a reconciliation request is to make the formal record. The funder either honors the request, denies it (creating a documented bad-faith argument), or fails to respond (creating a stronger documented bad-faith argument).

## Locating the reconciliation clause

Pull the MCA contract. The reconciliation language is usually in one of these sections:

- "Reconciliation" (most common section name)
- "Adjustment of Specified Percentage"
- "True-Up Provision"
- "Recalculation of Daily Remittance"
- "Specified Percentage and Estimated Daily Amount"

Some contracts bury the language in a paragraph within "Merchant's Obligations" or "Payment Terms." Read the entire payment section carefully.

The clause typically reads something like: "Upon Merchant's written request, accompanied by such documentation as Funder may reasonably require, Funder shall reconcile the Specified Daily Amount to reflect actual Future Receipts and either refund overpaid amounts or adjust subsequent daily remittances accordingly."

If the contract does not contain reconciliation language at all, the request structure changes. That is a separate conversation involving the legal characterization of the product. [Forensic audit](/services/business-debt-relief) work surfaces this gap.

## The request structure

A reconciliation request that works contains six components.

### 1. Contract identification

Open with the specific contract reference: funder name, agreement date, advance amount, funding date, contract number if present. This eliminates any ambiguity about which obligation is being addressed.

Example language: "This letter concerns the Merchant Agreement dated March 14, 2025 between [Merchant LLC] and [Funder LLC], advance amount $185,000, funded on March 17, 2025."

### 2. Invocation of the reconciliation clause

Cite the section of the contract by number and title. Quote the operative language verbatim. This makes the request impossible to mischaracterize as informal.

Example language: "Pursuant to Section 4(c) of the Merchant Agreement, titled 'Reconciliation,' which provides: 'Upon Merchant's written request and submission of bank statements evidencing actual Future Receipts, Funder shall recalculate the Specified Daily Amount to reflect the Specified Percentage of actual Future Receipts and adjust subsequent daily remittances accordingly,' Merchant hereby requests reconciliation."

### 3. Documentation of actual receipts

Attach bank statements covering the reconciliation period (typically the most recent 30 to 90 days). Calculate the actual daily average of receipts in that period and present it clearly.

Example language: "Attached are bank statements for [Merchant LLC]'s operating account at [Bank Name] for the period February 1, 2025 through April 30, 2025. During this 89-day period, total receipts deposited were $623,400, representing an average daily receipt of $7,005."

### 4. Calculation of the corrected debit

State the contractual Specified Percentage. Multiply by the actual average daily receipt. Compare to the current daily debit. The difference is the adjustment requested.

Example language: "The Merchant Agreement establishes the Specified Percentage at 12 percent. Applied to the actual average daily receipt of $7,005, the corrected Specified Daily Amount is $840.60. The current daily debit is $1,240, representing an overstatement of $399.40 per business day."

### 5. Proposed adjustment

State exactly what the funder should do: adjust forward debits, refund prior overpayments, or both. Specify the dollar amount and the effective date.

Example language: "Merchant requests that Funder adjust the daily remittance from $1,240 to $840.60, effective for the next business day following Funder's response. Merchant further requests refund of $7,988 representing 20 business days of documented overpayment between April 1, 2025 and April 30, 2025."

### 6. Response deadline

State the contractual response deadline if specified. If no deadline is stated, propose a reasonable one (5 to 10 business days) and reserve rights.

Example language: "Section 4(c) of the Merchant Agreement requires Funder's response within 5 business days of receipt. Merchant requests Funder's written response by May 22, 2025. In the event Funder fails to respond within the contractual deadline, Merchant reserves all rights, including but not limited to suspension of daily remittances pending good-faith reconciliation."

## Delivery and documentation

Deliver via traceable means. Email with read receipt to the funder's noticed address, with a copy via certified mail to the funder's address of record on the UCC filing. Keep copies of all delivery confirmations.

Some funders require notice to specific email addresses or specific officers. Check the contract's notice section for delivery requirements.

## What happens after delivery

Three outcomes are typical.

### Outcome 1: Funder adjusts

The funder reviews the documentation, agrees with the calculation, and adjusts the daily debit. This happens about 30 to 45 percent of the time with funders who respect their contractual obligations. The adjustment is the contractual remedy and the matter resolves at the new debit level.

### Outcome 2: Funder negotiates

The funder responds with a counter-calculation, often disputing the documentation, the time period, or the calculation method. This opens a negotiation. With proper documentation, the negotiation usually lands at an adjusted debit somewhere between the original and the requested amount. This happens about 30 to 40 percent of the time.

### Outcome 3: Funder ignores or denies

The funder either does not respond within the contractual window or responds with a blanket denial. This happens about 20 to 35 percent of the time. The non-response or unsupported denial becomes evidence of bad faith and strengthens later settlement positioning. [Creditor liaison](/services/business-debt-resolution) work escalates the matter to counsel at this point.

## When reconciliation alone is not enough

Reconciliation is a tool, not a solution. It can pause or reduce a single funder's debit but it does not resolve the underlying stack. A reconciliation that succeeds on one contract may free up cash that enables settlement on other contracts. A reconciliation that fails creates documented bad faith that improves the settlement position on that contract.

The strategic use of reconciliation is within a broader workout. Reconciliation requests go out on contracts with applicable language while [liquidity engineering](/services/business-debt-restructuring) restructures the operating cash flow and settlement negotiations begin on other contracts.

A reconciliation request on every contract simultaneously is usually counterproductive. It signals a coordinated workout to all funders at once and can accelerate aggressive responses. Sequenced reconciliation requests, timed against the broader workout, produce better outcomes.

## A real example, walked through

A regional distributor had four MCAs with combined daily debits of $4,800 against actual daily revenue of $18,000 (a 27 percent debit burden). Two of the four contracts had reconciliation language.

Reconciliation requests went out on the two applicable contracts with 60 days of bank documentation. The first funder adjusted within 9 days, dropping that contract's debit from $1,400 to $920. The second funder ignored the request through the 5-day contractual window, then sent a non-substantive denial on day 12.

The first reconciliation freed up $480 per business day immediately. The second funder's non-response became evidence in subsequent settlement negotiations. That contract eventually settled at 38 percent of face, partly on the strength of the bad-faith record.

The combined effect: $480 per day of immediate relief plus a documented basis for aggressive settlement positioning on the second contract.

## What to do next

If you have MCA contracts that may contain reconciliation language, the first step is the contract review itself. The clauses are often present but buried. [Reach out](/contact) and we will review your contracts, identify reconciliation provisions, and draft the formal requests with the right structure and timing for your situation.`,
  },
  {
    slug: "rebuild-business-credit-after-settlement",
    title: "Rebuilding Business Credit After MCA Settlement",
    excerpt:
      "Post-settlement credit recovery takes 12 to 24 months. The right sequence (UCC releases, trade lines, D&B updates) compresses that significantly.",
    heroImage: "/images/articles/rebuild-business-credit-after-settlement.png",
    author: "Business Debt Insider",
    contentMd: `The end of a settlement program is not the end of the story. The contracts are resolved but the business credit profile carries the workout for 12 to 24 months. Personal credit recovers on its own timeline. UCC filings may still show as active until the funders file releases. Trade references may be mixed if vendors took hits during the squeeze. The work of rebuilding business credit after settlement is sequenced and deliberate. Done well, the business is back to clean financing access in 12 to 18 months. Done passively, the recovery stretches to 30 months or longer.

## TL;DR

- UCC release filings are the fastest credit signal to clean up. Confirm every settled funder files UCC-3 termination within 60 to 90 days of settlement.
- Dun and Bradstreet profile rebuilds take 6 to 12 months of active trade reference reporting.
- Personal credit (which gates most small business credit decisions) recovers on a 12 to 24 month curve depending on starting point.
- Trade lines from suppliers and vendors are the foundation of the rebuild. Three to five new reporting trade lines within 6 months of closeout is the target.
- Asset-based credit (equipment finance, factoring) is accessible 60 to 120 days after closeout. Unsecured bank credit takes 12 to 18 months.
- A documentation packet (settlement letters, UCC releases, updated debt schedule) is the artifact that future lenders underwrite from.

## What "business credit" actually means

Business credit is not one number. It is the composite picture lenders assemble from several sources: UCC filings, business credit bureau reports (D&B, Experian Business, Equifax Business), trade references, bank account history, personal credit of guarantors, and tax returns.

Each source has its own recovery timeline. The work after settlement addresses each one in the right order.

## UCC releases: the fastest signal

Every MCA carries a UCC-1 filing recording the funder's lien on the business's receivables. When a contract settles, the funder is obligated to file a UCC-3 termination releasing the lien. Many funders do not file the termination promptly. Some never file it without prompting.

Active UCCs from settled debts are the most damaging artifact in the post-settlement profile. They appear on every UCC search any future lender runs. An active UCC from a funder you no longer owe looks identical, in a UCC search, to an active obligation. Lenders assume the worst.

The work: within 30 days of each settlement closing, confirm the funder has filed a UCC-3 termination in the original filing jurisdiction. If they have not, send a formal demand citing the settlement agreement's release language. Continue weekly follow-up until the termination is filed and confirmed in the public record.

[Creditor liaison](/services/business-debt-resolution) work during closeout typically includes this verification as part of the documentation package. Without it, the business carries phantom liens that block future credit.

### Timeline target

All UCC terminations filed and confirmed within 60 to 90 days of program closeout. Periodic UCC searches in the relevant secretary of state databases (every 90 days for the first year) confirm the public record is clean.

## D&B and business credit bureau rebuilds

Dun and Bradstreet (D&B) is the primary business credit bureau used by most institutional underwriters. The D&B profile is built from trade references reported by suppliers and lenders. A business in a workout typically sees its D&B Paydex score (the payment promptness index) decline as vendors get stretched.

Post-settlement, the Paydex score rebuilds based on new reported trade activity. The bureau weights recent activity heavily. Six months of consistent on-time reporting from three to five trade lines can substantially improve the score.

The work: identify which vendors and suppliers actively report to D&B (many do not). Open or repair relationships with the reporting vendors. Maintain consistent on-time payment for at least 6 months. Verify the reports are appearing on the D&B profile.

### Trade lines that move the score

Some categories of trade lines carry more weight than others.

Net-30 supplier accounts with companies that report to D&B (Uline, Grainger, Quill, and similar) are the foundation. Three to five of these reporting consistently is the target.

Fleet and fuel cards (WEX, Comdata) report and contribute to the profile.

Business credit cards from issuers that report to D&B (rare but present) contribute. Most consumer-issued business cards report only to personal bureaus.

Equipment finance and ABL facilities, when present, report and carry significant weight because of the size and structure of the obligation.

### Timeline target

Paydex score recovery from a workout-impacted baseline to 75+ (the threshold most lenders look for) takes 6 to 12 months of active reporting.

## Personal credit: the gating factor

For most small businesses, personal credit of the owner and any guarantors gates business credit decisions. Lenders use personal credit as a proxy for business creditworthiness, especially for unsecured products.

Settlement programs typically impact personal credit through three vectors. First, MCAs that were personally guaranteed and settled-after-default appear as derogatory accounts on personal credit reports. Second, personal credit cards or lines may have been drawn down during the cash flow squeeze, raising utilization ratios. Third, late payments on personal obligations during the squeeze period appear on the report.

The recovery curve depends on the starting point and the specific items. A few key dynamics.

### Settled accounts age out

Settled-after-default tradelines remain on the report for 7 years from the original delinquency. Their negative weight decreases substantially over time, especially after the first 24 months. By month 24 of recovery, the impact on the FICO score is meaningfully reduced even though the trade line is still present.

### Utilization is the fastest lever

Personal credit cards drawn down during the squeeze can be paid down quickly post-settlement. Utilization ratio is heavily weighted in the FICO score. Bringing total utilization below 30 percent (and ideally below 10 percent) within 60 to 90 days of closeout produces measurable score recovery.

### New positive trade lines matter

Opening one or two new personal credit accounts (a secured card if needed, then a regular card 6 months later) and managing them with low utilization rebuilds the positive trade line history that offsets the workout impact.

### Timeline target

Personal credit recovery from a workout-impacted FICO of 580 to 620 (typical post-settlement starting point) to 680+ (the threshold for most unsecured business credit) takes 12 to 24 months with active management.

## Trade references: the foundation

Vendors and suppliers who carried the business through the squeeze are the foundation of the post-settlement rebuild. The work of repairing those relationships starts during the workout (see [the workout-credit article](/insights/loan-during-debt-workout)) and continues through closeout.

The post-settlement work: confirm each key vendor is on standard terms, paid current, and willing to be listed as a trade reference. Three to five solid trade references on the business credit profile improve underwriter confidence substantially.

For vendors that were lost during the squeeze, the work is replacement. New vendor relationships, established post-settlement with clean payment from the start, contribute to the profile within 90 days.

## Future financing readiness

The business is ready for new financing on different timelines depending on the category.

### Equipment finance and ABL: 60 to 120 days post-closeout

Asset-based products are the first category accessible. Underwriting focuses on the asset, not the messy debt history. Equipment finance for essential capex is often live within 90 days of closeout if the operating account shows clean post-program activity.

### Factoring: immediate to 60 days

Factoring against specific invoices can be live during the closeout period itself. The factor underwrites against the customer paying the invoice, not against the business's general creditworthiness. Receivables-rich businesses can have a factoring facility in place within 30 days of closeout.

### SBA-adjacent products: 12 to 18 months

Most institutional small business credit products with bank involvement require 12 to 18 months of post-workout clean history before approval is realistic. The clean history requirement is the trailing twelve months of bank statements, business credit profile, and personal credit.

### Unsecured bank lines: 18 to 24 months

Unsecured operating lines and bank term loans require the longest recovery curve. Underwriters want to see resolved UCCs, clean trade references, restored personal credit, and trailing twelve months of clean account activity.

## Working capital alternatives during recovery

The window between closeout and full bank product access is 12 to 18 months for most businesses. Working capital during that window comes from a few sources.

Factoring or ABL against receivables is the primary source for businesses with qualifying receivables.

Equipment finance for capex needs, accessible from month 3 onward.

Vendor terms expanded after 6 months of clean payment history.

Owner contributions or retained earnings, where the business has rebuilt operating margin.

The categories that should be avoided during recovery: MCAs (resumes the original problem), reverse consolidation products (same), high-cost online term lenders that operate adjacent to the MCA market. The discipline of waiting for the right credit, not the available credit, is what makes the recovery hold.

## The documentation packet

The artifact that compresses the recovery timeline is the documentation packet assembled at closeout. The packet contains:

- Every settlement agreement, signed and counter-signed
- Every UCC-3 termination filing confirmation
- A final debt schedule showing zero balances on resolved obligations
- An updated personal financial statement
- Trailing twelve months of operating account statements (assembled at the recovery milestones, not at closeout)
- Trade references from current vendors with contact info
- A narrative summary explaining the workout context and resolution

When the business approaches a new lender 12 or 18 months post-closeout, the documentation packet is the application supplement that explains the credit profile context. Lenders who see a packet like this respond differently than lenders who see only the credit report. [Operational restructuring](/services/bankruptcy-alternative) work during the program often includes building this packet as a closeout deliverable.

## What to do next

If you are in closeout or recently closed a settlement program, the work of rebuilding credit starts now and follows a sequence. UCC releases first, then trade lines, then personal credit work, then category-by-category new credit applications on the right timeline. [Reach out](/contact) and we will assess your current profile, identify the highest-impact actions for the next 90 days, and map the credit calendar that gets you back to clean financing access on the shortest realistic timeline.`,
  },
];
