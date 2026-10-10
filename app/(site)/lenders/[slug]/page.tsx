import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findLender, LENDERS, LENDER_REVIEW_DATE } from "@/lib/lender-content";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

export function generateStaticParams() {
  return LENDERS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const lender = findLender((await params).slug);
  if (!lender) notFound();
  const title = `${lender.name} Review: Payments & Contract Questions | BDI`;
  return {
    title: { absolute: title }, description: lender.summary,
    alternates: { canonical: `/lenders/${lender.slug}` },
    openGraph: { title, description: lender.summary, type: "article", url: `/lenders/${lender.slug}`, publishedTime: LENDER_REVIEW_DATE, modifiedTime: LENDER_REVIEW_DATE },
  };
}

export default async function LenderPage({ params }: { params: Promise<{ slug: string }> }) {
  const lender = findLender((await params).slug);
  if (!lender) notFound();
  const related = lender.related.map(findLender).filter((item) => item !== undefined);
  const schema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: `${lender.name} review: payments and contract questions`,
    description: lender.summary,
    mainEntityOfPage: `https://businessdebtinsider.com/lenders/${lender.slug}`,
    datePublished: LENDER_REVIEW_DATE, dateModified: LENDER_REVIEW_DATE,
    author: { "@type": "Organization", name: "Business Debt Insider", url: "https://businessdebtinsider.com/editorial-policy" },
    publisher: { "@type": "Organization", name: "Business Debt Insider", url: "https://businessdebtinsider.com" },
    about: { "@type": "Organization", name: lender.name },
    citation: lender.sources.map(({ url }) => url),
  };
  return (
    <article className="mx-auto max-w-content px-6 py-10 md:py-16">
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Lender research", url: "/lenders" }, { name: lender.name, url: `/lenders/${lender.slug}` }]} />
      <FaqJsonLd items={lender.faq} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Breadcrumb items={[{ href: "/lenders", label: "Lender research" }, { label: lender.name }]} />
      <header className="mt-10 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-wider text-pine">{lender.product}</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-ink">{lender.name} review: payments and contract questions</h1>
        <p className="mt-6 text-lg leading-relaxed">{lender.summary}</p>
        <p className="mt-5 text-sm text-muted">By <Link className="underline" href="/editorial-policy">Business Debt Insider</Link> · Sources checked <time dateTime={LENDER_REVIEW_DATE}>October 10, 2026</time></p>
        <p className="mt-3 text-sm leading-relaxed text-muted">Disclosure: BDI offers business debt consulting and has a commercial interest in this topic. This review assesses the public sources below; it is not a customer testimonial, a rating, or an audit of the company’s results.</p>
      </header>
      <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-y border-hairline py-5 text-sm text-pine">
        <a href="#published-facts" className="underline">Published terms</a><a href="#questions" className="underline">Questions to ask</a><a href="#payment-review" className="underline">Payment difficulty</a><a href="#faq" className="underline">FAQ</a><a href="#sources" className="underline">Sources</a>
      </nav>
      <div className="max-w-4xl space-y-12 mt-10">
        <section id="published-facts" className="scroll-mt-40">
          <h2 className="text-2xl md:text-3xl font-bold">What {lender.name} publishes</h2>
          <dl className="mt-5 divide-y divide-hairline border-y border-hairline">
            {lender.facts.map((fact) => <div className="grid gap-2 md:grid-cols-[180px_1fr] py-5" key={fact.label}>
              <dt className="font-semibold">{fact.label}</dt><dd className="leading-relaxed">{fact.text} <a href={`#source-${fact.source}`} className="underline text-pine text-sm">Source</a></dd>
            </div>)}
          </dl>
          <p className="mt-5 leading-relaxed">{lender.distinction}</p>
        </section>
        <section id="questions" className="scroll-mt-40">
          <h2 className="text-2xl md:text-3xl font-bold">Questions to resolve in writing</h2>
          <p className="mt-4 text-muted">BDI’s checklist for reviewing your own offer or account:</p>
          <ul className="mt-4 space-y-3 list-disc pl-6 leading-relaxed">{lender.questions.map((question) => <li key={question}>{question}</li>)}</ul>
        </section>
        <section id="payment-review" className="scroll-mt-40 bg-paper-mute border border-hairline p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold">If payments are becoming difficult</h2>
          <p className="mt-4 leading-relaxed">{lender.paymentReview}</p>
          <p className="mt-4 leading-relaxed">Keep the contract, payment ledger, recent statements, notices, and a current cash forecast together. A changed payment, a reconciliation credit, and a reduced-balance settlement are different outcomes. Request the exact terms and any fees in writing.</p>
          <p className="mt-4 leading-relaxed">Use the <Link href="/tools/stack-calculator" className="underline text-pine">stack calculator</Link> to organize overlapping payments and read about <Link href="/services/business-debt-restructuring" className="underline text-pine">business debt restructuring</Link>. If you have received lawsuit papers, seek licensed counsel promptly for the actual response deadline.</p>
        </section>
        <section id="faq" className="scroll-mt-40">
          <h2 className="text-2xl md:text-3xl font-bold">Frequently asked questions</h2>
          <dl className="mt-5 divide-y divide-hairline">{lender.faq.map(({ q, a }) => <div key={q} className="py-5"><dt className="text-lg font-semibold">{q}</dt><dd className="mt-3 leading-relaxed">{a}</dd></div>)}</dl>
        </section>
        <section id="sources" className="scroll-mt-40 border-t border-hairline pt-8">
          <h2 className="text-2xl font-bold">Sources and scope</h2>
          <p className="mt-4 leading-relaxed text-muted">Company pages establish what the company publishes, not independently verified customer outcomes. We did not calculate a complaint rate, typical settlement discount, or customer satisfaction score. Terms can vary by product, state, and agreement date.</p>
          <ul className="mt-5 space-y-3">{lender.sources.map((source) => <li key={source.id} id={`source-${source.id}`} className="scroll-mt-40"><a className="underline text-pine" href={source.url}>{source.label}</a></li>)}</ul>
          <p className="mt-5 text-sm text-muted">For corrections or the review method, see our <Link href="/editorial-policy" className="underline">editorial policy</Link>.</p>
        </section>
        <section className="border-t border-hairline pt-8">
          <h2 className="text-2xl font-bold">Continue your research</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">{related.map((item) => <li key={item.slug}><Link className="underline text-pine" href={`/lenders/${item.slug}`}>{item.name} guide</Link></li>)}<li><Link href="/lenders" className="underline text-pine">All lender guides</Link></li><li><Link href="/reviews" className="underline text-pine">Debt-relief company reviews</Link></li></ul>
        </section>
      </div>
    </article>
  );
}
