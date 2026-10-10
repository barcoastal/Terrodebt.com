import Link from "next/link";
import type { Metadata } from "next";
import { LENDERS, LENDER_REVIEW_DATE } from "@/lib/lender-content";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: { absolute: "MCA & Business Lender Reviews: Payments, Costs & Options | BDI" },
  description: "Source-checked guides to 10 business financing providers. Compare MCA, revenue-based financing, and loan terms, payment-adjustment questions, and account review steps.",
  alternates: { canonical: "/lenders" },
};

export default function LendersPage() {
  const lenders = [...LENDERS].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <article className="mx-auto max-w-content px-6 py-12 md:py-20">
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Lender research", url: "/lenders" }]} />
      <header className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-wider text-pine">Lender research</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-ink">Know the company. Understand the agreement.</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink">Reviews of business lenders and MCA funders, focused on product terms, payment questions, and what to check when cash flow changes.</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">By <Link href="/editorial-policy" className="underline">Business Debt Insider</Link> · Sources checked <time dateTime={LENDER_REVIEW_DATE}>October 10, 2026</time>. BDI offers debt consulting and has a commercial interest in this subject. These are public-source assessments, not customer ratings or endorsements.</p>
      </header>

      <section className="mt-12 border-y border-hairline bg-paper-mute p-6 md:p-8">
        <h2 className="text-2xl font-bold tracking-tight">Start with the product, not the payment frequency</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3 text-base leading-relaxed">
          <div><h3 className="font-semibold">MCA / revenue purchase</h3><p className="mt-2">Locate the purchased amount, revenue percentage, and adjustment or reconciliation provisions in the agreement.</p></div>
          <div><h3 className="font-semibold">Term loan</h3><p className="mt-2">Identify the lender, payment schedule, finance charges, security, and any modification or early-payoff provisions.</p></div>
          <div><h3 className="font-semibold">Line of credit</h3><p className="mt-2">List each outstanding draw and its payments. Separate the credit limit from the amount already borrowed.</p></div>
        </div>
        <p className="mt-6 text-sm text-muted">Daily or weekly withdrawals alone do not establish which product you have. The profiles below link directly to the published product descriptions behind these distinctions.</p>
      </section>

      <section className="mt-12" aria-labelledby="directory-heading">
        <h2 id="directory-heading" className="text-3xl font-bold tracking-tight">Research a financing provider</h2>
        <p className="mt-3 text-muted">Alphabetical order. No paid ranking, aggregate star score, or implied settlement success rate.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {lenders.map((lender) => <Link key={lender.slug} href={`/lenders/${lender.slug}`} className="group block border border-hairline p-6 no-underline hover:border-pine transition">
            <p className="text-xs font-mono uppercase tracking-wider text-pine">{lender.product}</p>
            <h3 className="mt-3 text-2xl font-bold text-ink group-hover:text-pine">{lender.name}</h3>
            <p className="mt-3 text-base leading-relaxed text-ink">{lender.summary}</p>
            <span className="mt-5 inline-block text-sm font-semibold text-pine">Read the guide →</span>
          </Link>)}
        </div>
      </section>

      <section className="mt-12 border-t border-hairline pt-8 max-w-3xl">
        <h2 className="text-2xl font-bold">How these guides are researched</h2>
        <p className="mt-4 leading-relaxed">We identify the product from the company’s own website, link material facts to the relevant page, and distinguish published terms from our suggested questions. We have not audited customer files or established provider-specific settlement rates. A company website does not replace your signed agreement.</p>
        <p className="mt-4 leading-relaxed">For the next step, <Link className="underline text-pine" href="/tools/apr-calculator">estimate financing cost</Link>, <Link className="underline text-pine" href="/tools/stack-calculator">map overlapping payments</Link>, or <Link className="underline text-pine" href="/reviews">compare debt-relief providers</Link>. Our <Link className="underline text-pine" href="/editorial-policy">editorial policy</Link> explains corrections and commercial disclosures.</p>
      </section>
    </article>
  );
}
