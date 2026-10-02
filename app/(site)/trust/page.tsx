import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  alternates: { canonical: "/trust" },
  title: "Business Debt Consulting: Transparency and Due Diligence",
  description: "Evaluate BDI's role, written engagement terms, fees, evidence of results, and the distinction between consulting and legal representation.",
};
export default function Trust() {
  return <article>
    <section className="bg-offwhite border-b border-border"><div className="mx-auto max-w-content px-6 py-16 md:py-20 max-w-5xl">
      <p className="font-mono text-xs uppercase tracking-wider text-muted">Transparency</p>
      <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">Make the decision on documents, scope, and total cost.</h1>
      <p className="mt-6 text-lg leading-relaxed max-w-3xl">A debt review should help you understand the choices and the people responsible for each part of the work. These are the questions to resolve before engaging BDI or another provider.</p>
    </div></section>
    <div className="mx-auto max-w-content px-6 py-14 md:py-20"><div className="max-w-3xl space-y-10 text-base md:text-lg leading-relaxed">
      <section><h2 className="text-2xl font-semibold">Know which business you are engaging</h2><p className="mt-4">Business Debt Insider is a trade name of GRL Recovery LLC. Our published address is 6301 NW 5th Way, Suite 5100, Fort Lauderdale, FL 33309. Confirm that the entity named in an engagement agreement matches the service provider you intend to hire.</p><p className="mt-4">BDI provides commercial financial consulting. We are not a lender or a law firm. Legal representation and tax advice require the appropriate professional and a confirmed scope. Read the <Link href="/disclosure" className="text-pine underline">business disclosures</Link> before making a decision.</p></section>
      <section><h2 className="text-2xl font-semibold">Ask for the full fee picture in writing</h2><p className="mt-4">The initial assessment is free. Before paid work begins, request the service scope, total fee or calculation method, due dates, cancellation terms, and any separate legal, administrative, or tax-professional costs. Clarify who holds funds and who receives each payment.</p><p className="mt-4">Compare the original obligation with the complete projected outlay. Gross balance reductions do not account for every fee or tax consequence, and a smaller weekly payment can come with a longer repayment period.</p></section>
      <section><h2 className="text-2xl font-semibold">Evaluate evidence behind an outcome</h2><p className="mt-4">For any case example, ask whether it is a documented engagement or an illustration. A useful case record explains the starting balance, creditor agreement, fees, payment completion, elapsed time, and what happened to guarantees or liens. Sensitive documents should be handled through an appropriate private process.</p><p className="mt-4">For an average or success rate, ask which cases were counted, over what dates, whether incomplete engagements were excluded, and whether the calculation includes fees. We do not present an aggregate savings rate or a standard completion time on this page. Your circumstances and creditor decisions determine the available outcome.</p></section>
      <section><h2 className="text-2xl font-semibold">Confirm who is responsible for deadlines</h2><p className="mt-4">If there is a lawsuit or account restraint, confirm directly with counsel who is handling the response and whether the attorney represents the entity, an individual guarantor, or both. A consultation request or a creditor negotiation does not by itself preserve a legal deadline.</p><p className="mt-4">Ask for a point of contact, the next milestone, and the documents that will demonstrate acceptance of any revised terms. Do not assume all creditors have agreed because one creditor has responded.</p></section>
      <section><h2 className="text-2xl font-semibold">Understand our publishing interests</h2><p className="mt-4">BDI publishes educational content and promotes its consulting services. Our comparison pages include our own program. An organization byline does not imply independent or licensed-professional review. Our <Link href="/editorial-policy" className="text-pine underline">editorial standards</Link> explain sources, examples, and how to raise a correction.</p></section>
      <nav aria-label="Next steps" className="flex flex-wrap gap-6 border-t border-border pt-6"><Link href="/programs" className="text-pine underline">Compare the program options</Link><Link href="/contact" className="text-pine underline">Request a free initial review</Link></nav>
    </div></div>
  </article>;
}
