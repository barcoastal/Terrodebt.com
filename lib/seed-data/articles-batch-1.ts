type SeedArticle = {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  contentMd: string;
  author?: string;
};

export const ARTICLE_SEEDS_BATCH_1: SeedArticle[] = [
  {
    slug: "settle-mca-debt-without-bankruptcy",
    title: "How to Settle Merchant Cash Advance Debt Without Filing Bankruptcy",
    excerpt:
      "Settlement closes MCA balances at 40 to 60 percent of face without the credit damage, asset exposure, and operating constraints of a Chapter 11 filing.",
    heroImage: "/images/articles/settle-mca-debt-without-bankruptcy.png",
    author: "Business Debt Insider",
    contentMd: `Most owners with a stacked MCA book hear about bankruptcy first because it is the option their accountant or attorney knows best. Chapter 11 is a real tool, and on the right facts it is the only tool. It is also expensive, public, and slow, and for a meaningful number of MCA-heavy businesses it is not the right fit. Settlement is the alternative, and on the math it usually wins. This article walks through how settlement actually works, what the timeline looks like, and the cases where it beats bankruptcy.

## TL;DR

- Settlement closes each MCA contract at a discounted lump sum, typically 40 to 60 percent of face balance.
- A typical $400K stack across four contracts settles in 9 to 14 months for $160K to $200K plus program fees.
- Chapter 11 on the same stack runs $150K to $350K in professional fees alone, takes 12 to 24 months, and lives on the public docket.
- Settlement keeps you in operational control. Bankruptcy puts a trustee, a creditors committee, and a judge in your decision loop.
- Settlement fits when the underlying business throws off cash and the only real problem is the MCA stack. Bankruptcy fits when the whole capital structure needs to be rebuilt.
- The decision is not theoretical. Pull contracts, run the numbers, and compare side by side before either path commits.

## What settlement actually is

Settlement is a negotiated reduction of the balance owed on each MCA contract, paid as a lump sum that closes the contract and triggers a UCC release. It is not litigation. It is not bankruptcy. It is a commercial negotiation between you (usually through a [creditor liaison](/services/business-debt-resolution)) and each funder, one contract at a time.

The mechanics are straightforward. You stop the daily debit. Funds that were going to the MCA every day now accumulate in a managed escrow account. The liaison approaches each funder with a documented package: 90 days of bank statements, the original contract, a UCC search showing position, and a proposed settlement amount. The funder accepts, counters, or refuses. Most accept after one or two rounds because the alternative on their side is litigation that produces a worse net recovery.

When a funder accepts, the escrow funds the settlement, the contract is closed in writing, and the UCC release gets recorded. The next contract enters negotiation. Programs typically resolve in 9 to 14 months for a 3 to 5 contract stack, longer for larger stacks.

## The math against bankruptcy

Run the same $400K stack through both paths.

Stack: four MCAs, face balances of $120K, $110K, $95K, and $75K, combined daily debits of $2,400.

Settlement path: forty-five percent average reduction, settling each contract for $54K, $50K, $43K, and $34K. Total settlements paid: $181K. Program fee at 20 percent of savings (a common structure) on $219K of savings: $44K. Total out: $225K. Timeline: 11 months. Credit impact: temporary, recovers within 18 to 24 months post-program.

Chapter 11 on the same stack: filing fees and counsel retainer around $50K to start. Total legal and professional fees over the case life: $150K to $300K depending on creditor pushback. Disclosure statement and plan confirmation: 9 to 18 months. The MCAs become unsecured claims and typically receive 10 to 30 cents on the dollar through the plan, so total MCA payback might be $40K to $120K. Plus the professional fees. Net cost is comparable to settlement on the low end and meaningfully worse on the high end. Plus the case is public, you operate as debtor in possession under court oversight, and any non-debt creditor (landlord, key vendor, insurer) sees the filing and may react.

The numbers are not a knockout for settlement in every case. They are a knockout for getting both paths costed out before choosing.

## When settlement is the right path

Settlement works cleanly when four conditions hold.

### The underlying business is profitable

If the business generates cash before MCA debits, settlement is feasible. The escrow contributions during the program come from operating cash flow. A business that is operationally healthy and only dragged down by the MCA stack is the textbook settlement candidate.

If the business is also losing money at the operating line, settlement does not fix the underlying problem. That case needs an [operational restructuring](/services/bankruptcy-alternative) review before the debt strategy is set.

### The debt problem is concentrated in MCAs

Settlement is highly effective against MCAs because the contracts are commercially exposed. Factor rates that imply 80 to 250 percent effective APR, aggressive collection practices, and confession of judgment instruments give counsel and liaisons leverage to compress the balance. The same leverage does not exist against a bank term loan or a real estate mortgage.

If the stack is mostly MCAs with a small amount of vendor or equipment debt, settlement handles the whole picture. If the stack includes substantial secured debt that needs to be restructured along with the MCAs, the calculus changes.

### The owner can tolerate temporary credit impact

Settlement does damage personal and business credit during the program. UCC filings stay live until release. Defaulted contracts get reported. Underwriters see the pattern.

The damage is temporary. Most clients see business credit recover within 18 months of program close, especially if the post-program cash flow supports clean trade lines and bank deposits. If the owner needs new institutional credit in the next 12 months, settlement creates a window where that is hard.

### There is no pending COJ or active litigation

A confession of judgment that has already been entered changes the picture. So does an active lawsuit by a senior lender. Both can be worked into a settlement strategy, but they require coordinated legal action through [licensed counsel](/services/business-debt-resolution) at the same time as the negotiation. If those threats are already live, the timing window for clean settlement compresses.

## When bankruptcy is the right path

Settlement is not a universal answer. Chapter 11 is the better tool when:

- The capital structure includes substantial secured debt that needs to be crammed down or rejected.
- A lease portfolio is upside down and needs court-supervised rejection.
- Preference claims, fraudulent transfer issues, or insider transactions need the cleansing of court approval.
- The business operates in a regulated industry where licensure is tied to clean creditor relationships.
- One or more MCA funders has demonstrated they will litigate every negotiation in bad faith and the cost of fighting in commercial court is higher than the cost of filing.

The fifth scenario is rare but real. A handful of funders are known for stonewalling settlement and forcing every contract to the courthouse. Against them, bankruptcy's automatic stay is sometimes the cleanest way through.

## The settlement timeline, step by step

A clean settlement program runs through five distinct phases.

### Phase 1: forensic intake (weeks 1 to 3)

Every contract is pulled. Bank statements going back 12 months come in. A [forensic audit](/services/business-debt-relief) confirms the actual factor rate, the effective APR, any double-charged debits, and whether the contracts include unenforceable language. UCC searches confirm position. Personal guarantees get reviewed. This is the data foundation. Without it, negotiation is improvisation.

### Phase 2: debit pause and reconciliation (weeks 2 to 4)

Most MCA contracts include a reconciliation clause that allows the merchant to request adjustment of the daily debit based on actual revenue. A documented reconciliation request, supported by 90 days of bank statements, pauses or reduces debits without triggering default. This is the legal mechanism that creates breathing room during the program.

If reconciliation is refused or the contracts do not include the clause, a controlled default with simultaneous settlement outreach is the alternative. The [liquidity engineering](/services/business-debt-restructuring) phase identifies which path is cleaner contract by contract.

### Phase 3: sequenced negotiation (months 2 to 10)

Negotiations run in sequence, not in parallel. The first contract to settle is chosen carefully. Usually it is the contract with the weakest legal exposure (highest effective APR, most aggressive funder, or most defective documentation). A successful first settlement at 40 to 50 percent sets the anchor for the rest. Other funders price their own settlement against what the first one accepted.

Each settlement closes with a written release and UCC discharge. The escrow funds the payment. The merchant continues to operate.

### Phase 4: contingency contracts (months 8 to 14)

Some contracts settle late. A funder may hold out for a higher number, or may push for litigation that gets resolved on the courthouse steps for a 55 percent settlement instead of the 45 percent that settled the earlier contracts. The program plans for this with reserved escrow capacity and counsel on standby.

### Phase 5: closeout (months 12 to 16)

The final UCC releases get filed. The escrow zeroes out. Post-program reporting documents the closure of each contract. Banking relationships get rebuilt with the institutions that had pulled back during the program.

## Common questions

### Does settlement count as a default

Yes. From the funder's perspective, settling for less than face value is a default event under the contract. It will be reported as such. The reporting is temporary and recovers as the post-program business clears clean cycles.

### Will settlement trigger a personal lawsuit

In a properly run program, no. The settlement document includes a release of personal guarantee claims along with the corporate balance. A liaison that skips this step has done half a job. Every settlement agreement should be reviewed by counsel before signing.

### What if a funder refuses to settle

Funders who refuse to engage typically face one of three outcomes. The contract is litigated and resolved on the courthouse steps. The contract is litigated and a court enters a judgment that the funder then accepts a settlement on to avoid collection costs. Or, rarely, the contract goes to a full trial. The third outcome is uncommon because MCA contracts do not hold up well in front of judges who understand the math.

## What to do next

Get the math done before either path commits. Pull every contract. Run a forensic audit on factor rate, effective APR, and contract defects. Cost out a settlement scenario at 45 percent average reduction. Cost out a Chapter 11 with realistic professional fee assumptions. Compare side by side. The right answer is usually obvious once both numbers are on paper.

If you want help running the comparison, [reach out](/contact) and we will walk it through with you. No fee for the assessment, and we will tell you honestly which path fits your situation.`,
  },
  {
    slug: "mca-settlement-letter-template",
    title: "MCA Settlement Letter: Exact Language That Gets Lenders to the Table",
    excerpt:
      "The right settlement letter triggers a counter, not a denial. Here are the four required sections, the percentage ranges funders actually accept, and the phrases that get the file moved to underwriting.",
    heroImage: "/images/articles/mca-settlement-letter-template.png",
    author: "Business Debt Insider",
    contentMd: `A settlement letter is not a request for sympathy. It is a commercial document that gives the funder a reason to move your file from collections into settlement underwriting. The wrong letter dies in the inbox. The right letter gets a counter within two to ten business days. The difference is mostly structure and tone, not magic. This article walks through what works, with the actual phrases that move files, and what to leave out.

## TL;DR

- A working settlement letter has four sections: identification, hardship documentation, proposal, and deadline. Skip any one and the letter underperforms.
- Open settlement proposals at 30 to 35 percent of face balance. Funders typically counter at 50 to 60. Final settlements land at 40 to 55.
- Attach bank statements, the contract, and a brief revenue narrative. Empty letters get filed under low priority.
- Do not threaten litigation in the opening letter. Do not admit liability in language a funder can use later. Do not promise a payment date you cannot hit.
- Send via certified mail and email both, addressed to a named human at the funder when possible. Letters to generic inboxes get processed slower.
- Coordinate the letter with [licensed counsel](/services/business-debt-resolution) if a confession of judgment is filed or threatened.

## Why the letter matters

Most MCA funders run two parallel workflows on past-due accounts. One is collections, where the file gets handed to in-house or third-party collectors who call, email, and threaten. The other is settlement underwriting, where the file gets reviewed by an analyst who decides what discount the funder will accept to close the balance.

A well-structured settlement letter is the document that moves your file from the first workflow to the second. Without the letter, you stay in collections, and collections does not have authority to settle below face. The letter gives the funder a reason to escalate to underwriting, which is where the real numbers happen.

The letter is also a documentation event. It creates a written record of good-faith engagement that matters if the contract later goes to court. Judges look favorably on merchants who documented attempts to settle before litigation. A funder who ignored a written proposal and went straight to court looks worse on the same record.

## The four required sections

A settlement letter that performs has the same structure every time. Identification, hardship, proposal, deadline. Adjust the words. Keep the bones.

### Section 1: identification

Top of the letter. Address the funder by legal name and the file by contract identifiers. Reference your business legal name, the contract date, the original purchased amount, and the current outstanding balance as reflected on the most recent statement.

Example opening:

"Re: Merchant Cash Advance Agreement dated [date], Merchant: [Business LLC], Agreement Number [number], Original Purchased Amount: $[face]. Current outstanding balance per the most recent statement dated [date]: $[balance]."

This block does two things. It confirms you have the contract in front of you, which signals you are not a confused merchant who can be brushed off. And it pins down the exact balance you are negotiating against, which prevents the funder from later claiming the proposal was against a stale or inaccurate figure.

### Section 2: hardship documentation

Two short paragraphs. State the operational reason for the request. Specifics, not generalities. The funder analyst reading the letter is looking for evidence that the merchant cannot continue at the current daily debit and that some form of resolution is in the funder's interest.

What works: a 30 to 45 percent revenue decline since contract origination, documented loss of a major customer, seasonal collapse, equipment failure, key staff departure, regulatory change. Cite specific dates and amounts.

What does not work: general statements about "economic conditions" or "cash flow problems." These look like every other letter the analyst has seen this week.

Example:

"Revenue at [Business LLC] has declined approximately 38 percent year over year, from $[prior month avg] in monthly deposits at the time of contract origination to $[current month avg] in the trailing three months. This decline reflects the loss of [specific customer or contract], which represented approximately [percent] of monthly revenue. Despite operational adjustments including [specific actions taken], the current daily debit of $[amount] is not sustainable against operating cash flow."

### Section 3: the proposal

State the dollar amount and the terms. One paragraph. No hedging.

Open at 30 to 35 percent of face balance. Funders expect to counter. If you open at 50 percent, the counter lands at 65 and the final at 55 or 60. If you open at 30, the counter lands at 55 and the final at 45.

Example:

"To resolve this balance, [Business LLC] proposes a one-time lump sum settlement of $[amount], representing approximately [percent] of the current outstanding balance. Settlement funds are held in escrow and available for transfer within 5 business days of executed settlement agreement and full release of all claims, including release of any personal guarantee. Settlement will be conditioned on filing of UCC-3 termination statements for any UCC filings related to this agreement."

The UCC release language is required. Without it, the funder can take the settlement and leave the UCC live, which blocks your business from future financing. Always include it.

### Section 4: the deadline

Give the funder 10 to 14 business days to respond. Not less, because underwriting takes time. Not more, because open-ended letters drift.

Example:

"This proposal is open for acceptance through [date 12 business days out]. After that date, [Business LLC] reserves the right to revise or withdraw the offer. We are prepared to discuss reasonable counterproposals within that window."

The "reserve the right" language signals seriousness without sounding aggressive. The "discuss reasonable counterproposals" language signals you expect a counter and are open to negotiation.

## What to leave out

Three categories of language kill settlement letters.

### Litigation threats

Do not threaten litigation in the opening letter. Phrases like "if not resolved, we will pursue all available legal remedies" make the funder defensive and route the file to their legal team instead of underwriting. The legal team does not settle. They litigate.

If the contract has actual legal defects (usurious effective APR, defective confession of judgment, unconscionable terms) those defenses get raised by [counsel](/services/business-debt-resolution) in a separate channel, not in the opening settlement letter.

### Admissions of liability

Avoid language like "we acknowledge the full amount is owed" or "we are not disputing the validity of the contract." These are useful to the funder if the file later goes to court and not useful to you. Stick to the balance as reflected in the funder's records, without endorsing it.

### Specific payment dates you cannot hit

If escrow is not yet funded, do not promise payment within 5 days. Say "available within 5 business days of executed agreement" instead. This conditions the payment on the agreement getting signed, which protects you if the funder counters and you need time to refund the proposal.

## Percentage ranges, by funder type

Different funder categories accept different settlement levels. Plan the opening offer accordingly.

### Institutional funders (top 10 by volume)

These funders have settlement desks and standard ranges. Expect to settle at 45 to 55 percent of face on a current balance, 35 to 45 percent on a defaulted balance with documented hardship. Open at 30 to 35.

### Mid-tier funders (top 11 to 50)

Wider variance. Some settle aggressively at 35 to 45 percent because they want files closed. Others hold out for 55 to 65. The opening tactic is the same. Open at 30 to 35.

### Aggressive funders (small, high-factor)

These are the funders with the worst contracts and the most legal exposure on the underlying instruments. They also settle the deepest, often at 25 to 40 percent of face, because the alternative is litigation that exposes their documentation to a court. Open at 20 to 25.

### Bank product MCAs

A small number of MCAs are originated by bank-affiliated funders or securitized into bank-held portfolios. These settle worse than standalone MCAs because the bank's recovery economics are different. Expect 60 to 75 percent of face. Open at 45.

## Delivery mechanics

Send the letter three ways. Certified mail with return receipt. Email to the named contact at the funder. Email to a generic settlement@funder address if that is the only option.

Address the letter to a named human. Pull the name from prior correspondence, the website, or LinkedIn. Letters addressed to "To Whom It May Concern" land in lower-priority queues. Letters addressed to "[Name], Director of Settlements" land on a desk.

Follow up by phone 5 business days after delivery. One call, brief. "I sent a settlement proposal on [date], wanted to confirm receipt and ask when I should expect a response." Then wait.

## What to do next

A settlement letter is the opening move in a longer negotiation. Get the structure right and the response rate is dramatically higher. Get it wrong and the file sits.

If you want help drafting the letters, sequencing the outreach, and managing counters, [contact us](/contact). We coordinate the documentation, the [forensic audit](/services/business-debt-relief) that informs the proposal numbers, and the licensed counsel that handles any legal escalation. The letter is the easiest part. The leverage that makes the letter land is the harder part.`,
  },
  {
    slug: "coj-filed-against-me",
    title: "Confession of Judgment Filed Against You: First 72 Hours",
    excerpt:
      "A COJ becomes an enforceable judgment within hours of filing. The first 72 hours determine whether you can vacate it, freeze the freeze, and protect operating accounts. State procedures matter.",
    heroImage: "/images/articles/coj-filed-against-me.png",
    author: "Business Debt Insider",
    contentMd: `A confession of judgment is the fastest enforcement instrument an MCA funder has. It converts a contract dispute into an enforceable judgment without notice, without a hearing, and often within 24 hours of filing. By the time most owners learn a COJ has been entered, the bank has already received a restraining notice and the operating account is frozen. The first 72 hours determine whether you can vacate the judgment, free the account, and protect the business. This article walks through the procedures in the four states where COJ enforcement is most active: New York, Florida, California, and Texas.

## TL;DR

- A COJ becomes an enforceable judgment as soon as it is filed and signed by the clerk. Typical filing-to-account-freeze is 24 to 72 hours.
- New York is the most active COJ venue but reformed the statute in 2019 to require the funder to be located in New York. Many older COJs are now defective.
- Florida and Texas remain active COJ venues with shorter motion-to-vacate windows. California does not recognize COJs entered against California businesses.
- The motion to vacate must be filed in the venue named in the COJ, not your home venue, and the deadline ranges from 10 days to 30 days depending on state.
- An account freeze can be partially lifted within 5 to 10 days through a motion or a negotiated release, often before the underlying COJ is resolved.
- Coordinate immediately with [licensed counsel](/services/business-debt-resolution) in the COJ venue. Self-representation on a COJ motion is almost always a losing path.

## What a COJ actually does

A confession of judgment is a clause buried in the MCA contract where the merchant pre-authorizes the funder to enter judgment against the business and any personal guarantors upon default. The clause typically names a venue (often New York, Florida, or Texas regardless of where the merchant is based) and waives the merchant's rights to notice, hearing, and most defenses.

When a default occurs (typically defined as a missed daily debit or a "stacking" event where the merchant takes a new MCA), the funder's counsel files the COJ in the named venue along with an affidavit of default. The clerk signs the judgment. The judgment is now enforceable.

Within 24 to 72 hours, the funder serves a restraining notice on the merchant's bank. The bank freezes the account up to the judgment amount, including treble damages and attorneys' fees if the COJ language allows. Operating cash that was there yesterday is gone today.

The merchant typically learns about the COJ from the bank, not from the funder.

## The first 24 hours

What to do in the first 24 hours after learning of a COJ:

### Locate the filing

Search the docket in the named venue. New York County Supreme Court, Miami-Dade County Circuit Court, and Harris County District Court are the most common venues. The filing will name the merchant, the personal guarantors, the underlying contract, and the judgment amount. Pull the filed documents (the COJ itself, the affidavit, and the proposed judgment).

If you cannot find the filing, the freeze may be a pre-judgment attachment rather than a post-judgment freeze. Different procedures apply.

### Inventory the freeze

Call the bank. Determine which accounts are frozen and the exact amount of the freeze. The freeze is typically capped at the judgment amount plus interest plus fees, often 110 to 130 percent of the actual judgment. Funds above that cap should be available.

If the bank has frozen all funds without applying the cap, that is itself a basis for a motion to release. Banks sometimes over-freeze.

### Identify other accounts

The restraining notice goes to the banks named in the funder's research. If the merchant has accounts at other banks not named in the notice, those accounts are not frozen. Move operating cash to those accounts immediately if they exist and the transfer is permitted under the underlying agreements.

Do not open new accounts at the same bank that received the notice. The notice applies to the bank, not the specific account number, so new accounts at that bank will be frozen on opening.

### Engage counsel in the COJ venue

The motion to vacate must be filed in the venue named in the COJ, by counsel licensed in that state. The home-state attorney cannot file in another state's court. Engage local counsel in the COJ venue immediately. [Our liaison practice](/services/business-debt-resolution) coordinates licensed counsel in all 50 states.

## State-by-state procedures

The procedure for vacating a COJ varies meaningfully by state. Below are the four most common venues.

### New York

New York was historically the most active COJ venue. In 2019, the New York State legislature amended CPLR 3218 to require that the COJ be signed in New York, against a New York resident or business, by a person who was in New York at the time of signing. COJs that do not meet these requirements are facially defective.

Many MCAs filed before 2020 used New York COJs against out-of-state merchants. These COJs are vacatable on the amended statute, often through a relatively quick motion. New York COJs filed after the amendment, against out-of-state merchants, are also vacatable on the same ground.

The motion to vacate in New York is filed in the same Supreme Court that entered the judgment. The standard deadline is 30 days from learning of the judgment, though courts have accepted motions filed later when the merchant can show prompt action.

The restraining notice in New York operates under CPLR 5222. A motion for partial release can be filed alongside the motion to vacate, asking the court to release operating funds while the underlying motion is decided. These motions are often granted on the same docket.

### Florida

Florida recognizes COJs under Florida Statutes section 55.05. The statute requires the COJ to be in writing, signed by the obligor, and contain specific warning language. Many older MCA COJs lack the required warning language and are defective on the face of the document.

The motion to vacate in Florida is filed under Florida Rule of Civil Procedure 1.540, with a deadline that depends on the basis for the motion. Defective COJs (lack of warning language, lack of consideration, fraud) can be challenged at any time. Procedural defects must typically be challenged within 30 days.

Florida courts are generally more receptive to merchant defenses than New York courts on COJs, particularly where the underlying contract is unconscionable or the effective APR is usurious. Florida usury law applies different standards depending on contract size, with the 18 percent civil usury cap relevant for contracts under $500,000 and the 25 percent criminal usury cap relevant for larger contracts. MCA contracts that exceed these thresholds on effective APR have a real usury defense in Florida.

### Texas

Texas allows COJs only in limited circumstances. Texas Civil Practice and Remedies Code section 31.005 requires the COJ to be entered into after the cause of action has accrued, which makes pre-default COJs (the standard MCA form) generally unenforceable in Texas.

MCA funders sometimes file COJs in Texas anyway, treating the contract clause as enforceable. These judgments are typically vacatable on a motion that argues the COJ was entered before the default and therefore outside the statute. The motion deadline in Texas under Rule 329b is 30 days, but extensions are commonly granted.

Texas account freezes operate through writs of garnishment, which require a separate proceeding from the COJ filing. A successful motion to vacate the COJ also dissolves the writ of garnishment.

### California

California does not enforce COJs entered against California businesses or residents under California Code of Civil Procedure section 1132. A COJ filed against a California-based merchant in any state is unenforceable in California for purposes of asset attachment in California.

In practice, this means California-based merchants targeted by COJs filed in New York or Florida face freezes only on out-of-state accounts. California bank accounts remain unfrozen. The COJ itself is not vacated automatically, but the practical effect on California assets is limited.

A California-based merchant should still file a motion to vacate the COJ in the named venue, because the judgment is otherwise reportable and can be domesticated in California later if California law changes.

## The motion to vacate

The motion to vacate is the legal instrument that undoes the COJ. The grounds vary by state but typically include:

- Defective COJ language (missing warnings, missing signatures, missing notarization)
- Funder location violations (in New York post-2019)
- Pre-default execution (in Texas)
- Underlying contract defects (usury, unconscionability, fraud in the inducement)
- Procedural failures in the filing (improper service, incorrect amount, wrong venue)

A successful motion vacates the judgment and dissolves the restraining notice. Funds are released. The underlying dispute reverts to the contract, which can then be settled or litigated on the merits.

Motion timelines vary. New York motions are often decided within 30 to 60 days of filing. Florida motions can take 60 to 120 days. Texas motions are typically decided in 30 to 90 days.

## Coordinated settlement during the motion

The motion to vacate creates leverage for settlement. A funder facing a credible motion that may vacate the COJ often settles the underlying contract to avoid the risk of losing the judgment entirely.

A coordinated strategy runs the motion and a settlement proposal in parallel. The motion creates pressure. The settlement proposal gives the funder a clean exit. Many COJ cases resolve through settlement at 30 to 50 percent of face balance within 60 to 120 days of the motion filing, before the motion is even decided.

This coordination requires a [creditor liaison](/services/business-debt-resolution) working with licensed counsel in the COJ venue. The liaison handles the settlement outreach. Counsel handles the motion. Information flows between both.

## What to do next

If a COJ has been filed against you and your account has been frozen, the clock is short and the venue rules matter. [Contact us today](/contact). We coordinate licensed counsel in the COJ venue, file the motion to vacate, run the parallel settlement outreach, and protect the operating accounts that have not yet been frozen. The first 72 hours set the timeline for everything that follows.`,
  },
  {
    slug: "stop-mca-daily-ach-debits",
    title: "How to Stop Daily ACH Debits from Your Business Account",
    excerpt:
      "Three mechanisms stop MCA daily debits: contractual reconciliation, ACH revocation, and account protection. Each has a place, and using them in the wrong order makes things worse.",
    heroImage: "/images/articles/stop-mca-daily-ach-debits.png",
    author: "Business Debt Insider",
    contentMd: `Daily MCA debits drain operating cash before payroll, rent, or vendors can clear. When the debits exceed the cash flow that can sustain them, the standard advice is to stop the debits. That advice is right, but the mechanism matters. Done correctly, stopping the debits buys breathing room without triggering default escalation. Done wrong, it accelerates collections and exposes the business to confession of judgment filings. This article walks through the three mechanisms, when each fits, and the letter language that makes them work.

## TL;DR

- Three mechanisms stop MCA debits: contractual reconciliation, ACH revocation through the bank, and account protection through routing changes.
- Reconciliation is the preferred path. It uses contract language to reduce or pause debits without triggering default.
- ACH revocation is faster but triggers default in most contracts. Use only when reconciliation is refused or impossible.
- Account protection (moving operating cash to a new bank not on the funder's records) is supplemental, not standalone, and has limits.
- A documented reconciliation request, sent the right way, gets a response from most funders within 5 to 10 business days.
- Stopping the debits is the first step in a workout. Without a parallel settlement or restructure plan, the funder will accelerate within 30 to 60 days.

## Why the mechanism matters

MCA contracts treat any unauthorized interruption of the daily debit as a default event. The default triggers acceleration of the full balance, can trigger confession of judgment filings, and routes the file from collections to litigation. The wrong mechanism turns a $200K problem into a $260K problem with a frozen account.

The right mechanism uses the contract's own language against the contract. Most MCAs include a reconciliation clause that gives the merchant a contractual right to request adjustment when actual revenue does not match the funder's projection. Using that clause does not trigger default. It triggers a workout conversation.

## Mechanism 1: contractual reconciliation

Reconciliation is the preferred mechanism. It uses the contract.

### How reconciliation works

The standard MCA reconciliation clause reads approximately like this:

"If, in any given month, the daily debits cause the actual percentage of Daily Receipts collected to exceed the Specified Percentage stated in this Agreement, the Merchant may request a reconciliation. Upon receipt of documentation supporting such request, the Funder will adjust the Daily Debit amount to reflect the Specified Percentage applied to the Merchant's actual Daily Receipts."

The clause exists because MCAs are structured as a purchase of future receivables, not as a loan. If the receivables are not coming in at the projected rate, the daily debit must adjust or the legal characterization of the contract breaks. Funders that refuse reconciliation are exposing their contracts to recharacterization risk in court.

### What to send

The reconciliation request is a written letter, sent by email and certified mail. It includes:

- Identification of the contract and merchant
- A statement that the actual daily debit is exceeding the contractual Specified Percentage
- Documentation: 90 days of bank statements showing actual deposits
- A calculation of the corrected daily debit based on actual deposits
- A request that the funder reduce the debit to the corrected amount effective immediately
- A deadline for response (10 business days is standard)

Example language:

"Pursuant to Section [X] of the Agreement, [Merchant LLC] hereby requests reconciliation of the Daily Debit. Actual Daily Receipts over the trailing 90 days have averaged $[amount], significantly below the projection underlying the Daily Debit of $[debit]. Applying the Specified Percentage of [X percent] to actual Daily Receipts yields a corrected Daily Debit of approximately $[corrected amount]. We request that the Daily Debit be adjusted to this amount effective with the next debit cycle. Supporting documentation is attached. We expect a response within 10 business days of receipt."

### What happens next

Funders respond to reconciliation requests in three ways.

Grant the request. The funder adjusts the debit. This happens about 30 to 40 percent of the time, especially with institutional funders that understand the legal exposure of refusing.

Counter the request. The funder offers a partial adjustment or requests additional documentation. This happens about 40 percent of the time. The counter is the opening of a negotiation, and most counters can be moved toward the merchant's number with one or two rounds.

Refuse the request. The funder ignores the request or explicitly refuses. This happens about 20 to 30 percent of the time, more often with aggressive small funders. Refusal of a documented reconciliation request is itself useful evidence in a later settlement negotiation or litigation, because it shows the funder is treating the contract as a loan rather than as a true receivables purchase.

### When reconciliation does not work

Reconciliation has limits.

Some contracts do not include a reconciliation clause. These are older or particularly aggressive contracts. Without the clause, the contract language does not provide a no-default path to debit reduction.

Some funders refuse to engage. They are betting that the merchant will not litigate. They are sometimes right.

Some contracts have already accelerated. Once acceleration has been declared, reconciliation is no longer the operative mechanism. The contract is in default and the conversation is about settlement.

## Mechanism 2: ACH revocation

When reconciliation is refused or unavailable, ACH revocation through the bank is the faster path. It also triggers default.

### How ACH revocation works

Under NACHA rules and Regulation E (for personal accounts) or commercial bank policies (for business accounts), the account holder can revoke ACH authorization at any time. The mechanism is a written instruction to the bank, with a copy to the originator, stopping further ACH debits.

The bank is obligated to honor the revocation within 1 to 3 business days. Subsequent debits attempted by the funder are returned with code R10 (customer advises unauthorized) or R29 (corporate customer advises unauthorized).

### The trade-off

ACH revocation works fast. The debits stop within days. The funder cannot easily reinstate them without a new authorization, which the merchant will not provide.

ACH revocation also triggers default under almost every MCA contract. The default triggers the funder's escalation: phone calls, collection letters, demand for payment of the full accelerated balance, and potentially confession of judgment filing.

The merchant needs a settlement plan in place before pulling this trigger. Without a plan, the time between debit stop and COJ filing is 30 to 60 days, sometimes less.

### Letter language for ACH revocation

The revocation letter goes to the bank and the funder simultaneously.

To the bank:

"Pursuant to NACHA Operating Rules and the account agreement, [Merchant LLC] hereby revokes all ACH authorizations on account [number] in favor of [Funder Name]. Please block all further ACH debits originating from [Funder Name] or any affiliated originator. Return any future ACH debit attempts as R29 (corporate customer advises unauthorized). This revocation is effective immediately."

To the funder:

"Effective [date], [Merchant LLC] has revoked the ACH authorization underlying the Daily Debit under Agreement [number]. Future debit attempts will be returned as unauthorized. [Merchant LLC] remains open to discussion of a settlement or restructure of the outstanding balance and will follow up separately with a settlement proposal."

The second paragraph is critical. Pairing the revocation with explicit settlement engagement positions the merchant as acting in good faith on the underlying obligation, even while stopping the unauthorized mechanism. This matters in any subsequent litigation.

## Mechanism 3: account protection

The third mechanism is supplemental: protecting operating cash by routing it through accounts the funder does not have on file.

### How account protection works

Most MCA contracts list a specific bank account for the daily debit. The funder's records show that account. If operating cash flows through a different account, the funder cannot debit it directly.

Mechanically: open an operating account at a bank not on the funder's records. Route customer payments to the new account. Keep only a minimum balance in the listed account to cover any debits that still go through.

### Limits

Account protection has real limits.

UCC filings cover all receivables, not just the listed account. The funder can serve a UCC notice on the new bank if they identify it, and the bank may then freeze the account.

The funder's records can update. If the merchant files a tax return, a loan application, or anything else that names the new bank, the funder may discover it and update their records.

Personal guarantors' accounts are separately exposed. If the guarantor's personal accounts are at the same bank or are identifiable, those become targets after the business accounts are exhausted.

Account protection works best as a 30 to 90 day bridge during which a settlement or workout is being negotiated. It does not work as a long-term solution.

### Coordination with [liquidity engineering](/services/business-debt-restructuring)

Account protection should be coordinated with a broader liquidity plan. Which accounts hold cash. Which accounts receive deposits. Which accounts pay vendors. The architecture matters because the funder is looking for the cash. A clean architecture buys time. A sloppy architecture creates fraud exposure if the moves look like asset hiding.

## Sequencing the three mechanisms

The mechanisms work best in sequence, not in parallel.

Step 1: send the reconciliation request. Wait 10 business days.

Step 2: if reconciliation is granted, the debits adjust. Move to settlement or restructure planning on the new debit level.

Step 3: if reconciliation is refused or ignored, prepare the settlement proposal and the ACH revocation simultaneously. Send both within the same 5 day window.

Step 4: in parallel, open account protection at a new bank and begin routing.

Step 5: engage [counsel](/services/business-debt-resolution) on COJ defense before the revocation lands, not after.

The sequence preserves the contractual high ground (reconciliation first), accelerates only when necessary (revocation), and protects operations during the transition (account protection). Skipping steps or running them in the wrong order produces worse outcomes.

## What to do next

If the daily debits are no longer sustainable, the first move is the reconciliation letter. The second move is the settlement plan. The third move is the bank architecture. All three need to be coordinated, because each one trips wires in the others.

[Contact us](/contact) and we will walk you through your specific contracts, send the reconciliation requests, prepare the settlement proposals, and coordinate the counsel that handles any COJ exposure. The mechanics matter, and the sequencing matters even more.`,
  },
  {
    slug: "stacked-mca-complete-guide",
    title: "The Complete Guide to Resolving Stacked Merchant Cash Advances",
    excerpt:
      "Stacked MCAs are not a single problem. They are a sequence of overlapping contracts, cash flow gaps, and legal exposures that require a layered resolution. This is the full playbook.",
    heroImage: "/images/articles/stacked-mca-complete-guide.png",
    author: "Business Debt Insider",
    contentMd: `Stacked MCAs do not happen by accident. They happen because the first MCA created a cash flow problem that the second MCA tried to solve, which created a bigger cash flow problem that the third MCA tried to solve. By the time the stack is recognized as a stack, the business has three to seven contracts on the books, daily debits consuming 40 to 70 percent of deposits, and a calendar of escalation triggers that none of the contracts mention but all of them are about to hit. Resolution requires more than negotiation. It requires a layered plan that addresses the contracts, the cash flow, the legal exposure, and the operations underneath. This is the complete playbook.

## TL;DR

- A typical stack is 3 to 7 MCA contracts totaling $200K to $1.5M in face balance, with combined daily debits consuming 35 to 70 percent of revenue.
- Consolidation products (reverse consolidation, new MCAs to pay old MCAs) almost always increase total debt. They do not work as a primary strategy.
- Resolution runs through four phases: forensic audit, liquidity stabilization, creditor sequencing, and post-settlement operations.
- Forensic audit identifies which contracts have legal defects, which have the highest effective APR, and which funders are most likely to settle deepest.
- Liquidity stabilization buys 60 to 120 days of operating runway through reconciliation, controlled defaults, and account architecture.
- Creditor sequencing settles or restructures contracts in an order that uses each resolution to strengthen leverage against the next.
- Legal integration runs in parallel through [licensed counsel](/services/business-debt-resolution) handling confession of judgment defense and litigation exposure.
- Post-settlement, the business needs operational restructuring to prevent re-stacking. Most owners who settle without operational change re-stack within 18 months.
- A typical $500K stack resolves at 45 to 55 percent of face over 10 to 16 months when the plan is layered correctly.

## Anatomy of a stack

Stacked MCAs share a common structure. Understanding the structure is the first step to resolving it.

### How stacks form

The first MCA is taken to bridge a real cash flow gap. Equipment repair, customer payment delay, seasonal slowdown, new contract financing. The terms look manageable on paper: 6 months, 1.30 factor, daily debit that the merchant believes the business can absorb.

The first MCA's daily debit creates a cash flow gap of its own. The business is now operating with less working capital than before. The next quarterly bill, the next slow week, the next unexpected expense pushes the business below operating threshold.

A second MCA is taken to cover the gap created by the first. The terms are worse: shorter, higher factor, smaller advance for the same daily debit because the underwriter sees the existing MCA on the bank statements.

The cycle repeats. By the third or fourth MCA, the daily debit total is structural, not bridge financing. By the fifth, the business cannot operate without continuous new advances.

### The math of the stack

A typical 4-contract stack:

- MCA 1: $150K face, $100K advance, 1.30 factor, 6 month original term, $1,150 daily debit
- MCA 2: $120K face, $80K advance, 1.40 factor, 5 month original term, $1,090 daily debit
- MCA 3: $90K face, $60K advance, 1.42 factor, 4 month original term, $1,050 daily debit
- MCA 4: $75K face, $50K advance, 1.45 factor, 3 month original term, $1,150 daily debit

Total face: $435K. Total advance received: $290K. Total daily debit: $4,440. On a business doing $25K daily deposits, the debits consume nearly 18 percent of gross deposits. Add credit card processing, payroll, vendor payments, and the math does not close.

The 4-contract stack is mid-range. A 6-contract stack with combined daily debits of $7K to $9K on the same revenue base is the more common presentation by the time the business reaches out for help.

### The escalation calendar

Every stack has an escalation calendar. The earliest contract is closest to maturity, which means its daily debit was originally calibrated to a higher revenue level. As that contract approaches its scheduled payoff, the merchant expects relief. The relief does not come, because the later contracts (taken at progressively worse terms) consume the savings from the early one paying off.

Within the escalation calendar are trigger dates: contract maturities, reconciliation deadlines, default thresholds in the contract language. Most owners do not track these dates. The funders do.

## Why consolidation fails

The most common response to a stacked situation is to pursue a consolidation product. The pitch is intuitive: one new advance pays off the existing advances, leaving one daily debit instead of four.

The product fails on the math, almost every time.

### Reverse consolidation

A reverse consolidation is a new MCA whose daily debit is sized to cover the existing daily debits. It does not pay down the principal of the prior contracts. The merchant ends up with N+1 contracts (the original ones plus the new one) and the new one carries its own factor rate on the full new advance amount.

Total payback on a 4-contract stack with a $250K reverse consolidation at 1.45 factor: prior contracts still owe their face balance of $435K minus whatever has already been paid (call it $200K remaining), plus the new advance pays back $362K on the $250K advance. Total commitment: $562K, where the original was $435K.

The pitch promised one daily debit. The result is N+1 daily debits, with the new lender as the most aggressive new collector.

### Cash-out refinance

Cash-out refinance products promise to pay off the prior MCAs with proceeds from a new advance. They sometimes work, in the narrow sense that the prior contracts are actually closed. They fail in the broader sense because the new advance is itself an MCA on worse terms, sized to extract more total payback than the contracts it replaced.

### Stack consolidation programs

Some operators advertise "stack consolidation" as a non-product service that resolves the stack through negotiation. The good ones are settlement programs by another name. The bad ones are reverse consolidations packaged as services. Read carefully.

## Phase 1: forensic audit

The first phase of real resolution is a [forensic audit](/services/business-debt-relief) of every contract in the stack.

### Document collection

Pull every contract. Pull the funding statements showing actual disbursement amounts. Pull 12 months of bank statements showing daily debits. Pull any prior reconciliation requests and funder responses. Pull UCC filings. Pull personal guarantee documents.

This is not a small exercise. A 5-contract stack typically produces 200 to 400 pages of documents. The forensic audit reads all of them.

### Effective APR calculation

Every MCA contract has a stated factor rate (typically 1.25 to 1.49) and an implied effective APR based on the actual term. A 1.35 factor on a contract that pays off in 4 months implies an effective APR of roughly 105 percent. A 1.45 factor on a 3 month term implies an effective APR of approximately 180 percent.

Effective APR matters legally because it triggers usury defenses in several states. Florida and California, among others, have civil and criminal usury caps that MCA contracts often exceed when characterized as loans rather than receivables purchases.

The forensic audit calculates effective APR for each contract and identifies which contracts have the strongest usury defense.

### Document defects

Many MCA contracts contain procedural or substantive defects:

- Missing or improperly executed confession of judgment language
- Personal guarantees signed without proper notarization
- Reconciliation clauses that promise adjustment but specify no enforcement mechanism
- Stacking covenants that contradict each other across contracts
- UCC filings that name the wrong entity or list the wrong collateral

Each defect is a negotiation lever or a litigation defense. The audit catalogs them.

### Funder posture mapping

Different funders settle at different ranges. The audit maps each contract to its funder's known settlement posture. Funder A typically settles at 40 to 50 percent. Funder B settles at 50 to 60. Funder C litigates aggressively but settles for 35 to 45 on the courthouse steps.

This mapping informs the sequencing in Phase 3.

## Phase 2: liquidity stabilization

The second phase creates 60 to 120 days of operating runway.

### Reconciliation requests

Most contracts include a reconciliation clause that allows the merchant to request reduction of the daily debit when actual revenue does not support the projected debit. Documented reconciliation requests, supported by bank statements, pause or reduce debits without triggering default.

The audit identifies which contracts have functional reconciliation language. Requests go to those funders first.

### Account architecture

Operating cash gets reorganized through [liquidity engineering](/services/business-debt-restructuring). The goal is to maintain enough deposit flow in the listed account to avoid triggering the funder's split-funding override, while moving the bulk of operating cash to accounts the funders do not control.

The architecture has to be defensible. Moving cash to hide it from creditors is fraud. Moving cash to maintain operations during a documented workout is standard practice. The difference is documentation and intent.

### Controlled defaults

Some contracts cannot be reconciled and cannot be moved out of their debit pattern without revocation. For those contracts, a controlled default is the alternative. The debit gets revoked at the bank, the funder is notified in writing, and a settlement proposal lands in the funder's inbox within 24 hours.

The controlled default is timed. Multiple defaults in the same week create chaos. Sequenced defaults, one or two per month with parallel settlement outreach, are manageable.

### Cash runway

By end of Phase 2, the business should have 60 to 120 days of operating cash on hand and a manageable monthly contribution to the escrow account that will fund settlements. The runway is the foundation for Phase 3.

## Phase 3: creditor sequencing

The third phase resolves the contracts in sequence.

### Choosing the first settlement

The first settlement sets the anchor. Other funders will price their settlement against what the first one accepted. The first contract to settle should be the one with the highest legal exposure (worst effective APR, weakest documentation, most aggressive original terms). A 45 percent settlement on the worst contract anchors the rest of the stack at 45 to 50 percent.

The wrong first move sets the wrong anchor. Settling the cleanest contract first at 60 percent gives every other funder a 60 percent ceiling to negotiate against, which costs the merchant tens of thousands of dollars across the rest of the stack.

### Parallel settlements

After the first settlement closes, multiple settlements can run in parallel. The escrow funds them in order of agreement. The [creditor liaison](/services/business-debt-resolution) handles correspondence with all funders simultaneously.

Parallel settlements typically close 1 to 2 per month across a 4 to 7 contract stack.

### Restructure vs settle

Not every contract should settle. Some contracts are workable. A contract from an institutional funder with reasonable terms, where the relationship has future value, may be better restructured into a longer payment term at the original face balance.

The decision is made contract by contract based on:

- Total cost of settlement vs total cost of restructure
- Future value of the lender relationship
- Credit impact of settlement vs continued performance
- Operational disruption of either path

A typical 5-contract stack might end with 3 settlements and 2 restructures.

### Closeout

Each closed contract produces a written release and a UCC-3 termination filing. The closeout package is the documentation that proves the contract is resolved. Without it, residual claims and credit reporting issues persist.

## Phase 4: legal integration

Throughout Phases 1 through 3, legal exposure runs in parallel. The legal track is managed by [licensed counsel](/services/business-debt-resolution) coordinated by the liaison.

### COJ defense

If any contract has a confession of judgment clause and the funder is positioned to file, counsel files defensive motions or coordinates the timing of settlement to avoid the COJ filing. If a COJ has already been filed, counsel files a motion to vacate in the COJ venue.

### Litigation defense

Some funders sue instead of, or in addition to, filing COJ. Counsel defends the underlying contract claim. The defense often runs alongside settlement negotiation, with the litigation becoming the leverage that drives the funder to settle.

### Counter-claims

Some MCA contracts give the merchant counter-claims against the funder: usury, fraud in the inducement, breach of contract, violations of state lending laws. Counsel evaluates the counter-claim posture and pursues claims where the math supports it.

### Coordination

The liaison coordinates the legal track with the settlement track. Information flows in both directions. A settlement proposal that contradicts a legal defense weakens both. A legal defense that contradicts a settlement proposal weakens both. Coordination keeps them aligned.

## Phase 5: post-settlement operations

Settlement alone does not prevent re-stacking. Most owners who settle a stacked MCA situation re-stack within 18 to 36 months because the underlying business has not changed. The fifth phase prevents that.

### Operational restructuring

[Operational restructuring](/services/bankruptcy-alternative) addresses the gap between revenue and required operating capital that drove the original MCA. Cost structure, pricing, customer concentration, working capital cycle. The diagnostic identifies why the business needed an MCA in the first place and the changes that remove the need.

A business that runs on 14 day customer terms and 60 day vendor terms is structurally short on working capital and will need bridge financing forever. Negotiate the terms. A business with 18 percent gross margin and 14 percent overhead has no room. Cut the overhead or raise the prices. A business with one customer representing 40 percent of revenue is one cancellation away from a crisis. Diversify.

The restructuring is not always dramatic. Sometimes it is a 2 percent price increase and a 30 day terms negotiation with a key vendor. Sometimes it is a fundamental rebuild. The audit identifies what is needed.

### Banking and credit rebuild

Post-settlement, the business needs banking relationships that did not exist during the workout. Operating accounts, line of credit (small, eventually), trade credit references, payroll services. The rebuild takes 12 to 24 months.

The right relationships understand the post-settlement profile. They are not bridge MCA funders. They are community banks, credit unions, and institutional lenders who can underwrite a business that has been through a workout and come out clean.

### Capital strategy

The final piece is a forward capital strategy. The business needs to know what financing it will need in the next 24 months and where it will come from. The plan is not just "no more MCAs." It is a specific architecture: line of credit for working capital cycles, term loan for equipment, factor or trade credit for customer concentration risk. Without the architecture, the next gap becomes the next MCA.

## Common failure modes

Resolution programs fail for predictable reasons. The pattern is worth naming because each failure mode has a counter.

### Settling the easy contracts first

The most common tactical error. The merchant or an unsophisticated liaison settles the most cooperative funder first, often at 55 to 60 percent of face, because the deal closes quickly and feels like progress. The closed file sets the anchor for every other funder in the stack. Now the funders with weak documentation and high effective APR, who would have settled at 35 to 40, push for 55 because the first one accepted it. The merchant pays an extra $50K to $120K across the rest of the stack for the early easy win.

The counter is sequencing discipline. The first settlement is the one with the most legal exposure, not the one with the friendliest funder. Slow the early conversation. Move the harder file first.

### Hidden personal guarantees

Many MCA contracts include a personal guarantee that the funder does not invoke until after the corporate settlement closes. The merchant signs the corporate release, the funder then sues the guarantor personally for the difference between settlement and face balance. Settlement agreements that do not explicitly release the personal guarantee leave the merchant exposed.

Every settlement agreement should be reviewed before signing. The release language must cover both the entity and any named guarantors. The UCC release must terminate filings against both.

### Unscoped tax exposure

Settled MCA debt may trigger cancellation of indebtedness income for tax purposes. If a funder settles $150K of face for $60K of payment, the $90K difference may be reportable as taxable income to the merchant. Depending on the business structure (S-corp, LLC, etc.), this can flow through to the owner's personal return.

There are exceptions. Insolvency exclusions under IRC 108 can shield much or all of the COD income if the business is insolvent immediately before the discharge. A coordinated workout includes a tax position memo so the owner knows what the year-end will look like and can plan estimated payments accordingly.

### Re-funding mid-program

The single most destructive failure mode. The merchant has 4 contracts settling, the escrow is building, the cash flow is stabilizing, and a new MCA broker calls with a "bridge advance" to "tide things over." The merchant takes the bridge. The bridge funder pulls a UCC search, sees the existing filings, and structures the new advance to extract aggressively. Within 60 days, the new advance has destabilized the cash flow that was funding the settlements, the escrow is depleted, and the program collapses.

The rule is firm. No new MCAs during the program. Period. If the business needs additional cash during the program, the program design is wrong and the plan needs to be redone, not patched.

## Categories of debt beyond MCAs

A stack rarely lives in isolation. By the time the MCA situation is acute, there are usually other categories of debt in the picture. Each one interacts with the MCA resolution differently.

### Equipment debt

Equipment loans and equipment leases are typically secured by the equipment itself. The lender's recovery is the equipment, not the business's general assets. In a workout, equipment debt is often easier to restructure than MCAs because the lender's alternative is repossession of equipment they do not want to liquidate.

A stalled equipment payment can usually be restructured into a longer term with the original lender. The negotiation does not require the same legal exposure leverage that MCAs do, because the equipment lender is not facing usury or unconscionability claims. The conversation is commercial: extend the term, lower the payment, keep the equipment producing revenue.

### Vendor debt

Past-due vendor balances are often the most negotiable. Vendors want their customer to survive, want future revenue from the relationship, and will accept extended payment plans or modest discounts to clear aged receivables. In a coordinated workout, vendor balances are typically restructured into 12 to 24 month payment plans at face value, sometimes with modest discounts of 10 to 20 percent.

Vendor coordination matters because vendor cutoffs can be more disruptive than MCA defaults. A vendor that stops shipping supplies or pulls a credit line can shut down operations faster than a frozen account. The workout sequence often prioritizes vendor stabilization in Phase 2 before MCA defaults are triggered in Phase 3.

### Bank debt

Bank term loans and lines of credit are secured by specific collateral and usually backed by personal guarantees. Bank workouts are slower and more formal than MCA workouts. The bank assigns a special assets officer, requests detailed financial documentation, and proposes a workout that typically extends the term and modifies covenants without reducing principal.

Banks rarely settle for principal reduction unless the alternative is foreclosure on collateral worth less than the loan balance. The workout strategy is restructure, not settle. The leverage is the bank's preference for performing-but-modified loans over non-performing ones.

### Tax debt

Federal and state tax debt has its own resolution paths. The IRS offers installment agreements, currently-not-collectible status, and offers in compromise. State tax authorities have parallel programs. Tax debt does not settle on the MCA model. It resolves through the formal IRS or state procedures.

Tax debt also has priority. A federal tax lien attaches to all business assets and primes most subsequent UCC filings. If there is tax debt in the stack, it gets addressed early and often through a separate tax resolution track running alongside the MCA work.

## Choosing a partner

The resolution of a stacked MCA situation depends heavily on who is running it. The market has many operators. Some are competent. Some are predatory. The differences are not always obvious upfront.

### What good looks like

A competent practice will:

- Run a forensic audit before proposing a strategy
- Walk through the math in writing during the consultation, not after a contract is signed
- Disclose fee structure with specific percentages and trigger events
- Identify and disclose any conflicts (referrals, kickbacks, lender relationships)
- Coordinate licensed counsel for any contracts with legal exposure
- Refuse to take cases where the strategy will not work
- Provide anonymized case studies that match the profile

### What predatory looks like

The predatory operators:

- Promise specific settlement percentages before reviewing contracts
- Charge large upfront fees with no escrow protection
- Use the program to lock the merchant out of independent legal counsel
- Refuse to identify the counsel who will handle legal work
- Pitch reverse consolidation or new MCAs as a primary strategy
- Cannot explain why a particular sequence is being chosen
- Have a high re-engagement rate (the same clients coming back stacked again)

The differences are visible early in the conversation. The good practices welcome scrutiny. The predatory ones deflect.

## A worked example

A $620K stack across 5 contracts, mid-sized service business doing $4.2M in revenue.

### Starting position

- MCA 1: $190K face, $1,400 daily, 5 months remaining, 1.38 factor
- MCA 2: $145K face, $1,200 daily, 4 months remaining, 1.42 factor
- MCA 3: $110K face, $1,050 daily, 3 months remaining, 1.45 factor
- MCA 4: $95K face, $1,100 daily, 3 months remaining, 1.49 factor
- MCA 5: $80K face, $850 daily, 2 months remaining, 1.45 factor

Combined daily debits: $5,600. Daily deposits: $17K. Debits consuming 33 percent of gross. The business is profitable before debits, losing $30K/month after debits.

### Phase 1 (weeks 1 to 4)

Forensic audit identifies that contracts 4 and 5 have effective APRs above 200 percent, with weak documentation on the COJ clauses. Contract 3 has a defective reconciliation clause that may not be enforceable. Contracts 1 and 2 are institutional funders with clean documentation.

### Phase 2 (weeks 3 to 10)

Reconciliation requests sent to contracts 1, 2, and 3. Contract 1 grants partial reconciliation, dropping daily to $900. Contract 2 grants full reconciliation, dropping daily to $700. Contract 3 ignores the request.

Controlled defaults on contracts 4 and 5 are sequenced 3 weeks apart, with settlement proposals landing within 48 hours of each.

Cash runway: 90 days of operating cash secured. Monthly escrow contribution: $42K.

### Phase 3 (months 3 to 14)

Contract 4 settles first at 38 percent of face: $36K. Anchor set.

Contract 5 settles at 41 percent: $33K.

Contract 3, after a COJ filing and motion to vacate, settles at 44 percent: $48K.

Contract 2 restructures to 24 months at original face: $145K paid over 2 years at $6K/month.

Contract 1 restructures to 18 months at original face: $190K paid over 18 months at $10.6K/month.

### Final position

Total cash paid for settlements: $117K. Total restructure obligation: $335K over 24 months at $16.6K/month combined.

Total cost vs original face of $620K: $452K, a 27 percent reduction. Cash flow improvement: from negative $30K/month to positive $40K/month after the restructure payments.

Program fee at 20 percent of settlement savings of $228K: $46K. Total cost including fee: $498K. Net savings off original face: $122K.

Timeline: 14 months from intake to last closeout.

### Phase 5

Post-settlement operational review identifies a customer concentration risk (one client at 31 percent of revenue) and a working capital cycle that runs 35 days short. Both get addressed with a line of credit at a community bank and a renegotiated payment term with the largest vendor. Twenty-four months post-settlement, business is operating cleanly, no MCAs on the books.

## What to do next

Stacked MCAs are not solved by negotiation alone. They require forensic work, cash flow architecture, legal coordination, and operational change. Each piece supports the others. Skipping any one of them puts the resolution at risk.

If you have a stacked MCA situation and want a real plan, [contact us](/contact). We will walk through your specific contracts, identify the resolution path, and lay out the math before you commit to anything. The first conversation is free. The plan that follows is built to your situation, not pulled from a template.`,
  },
];
