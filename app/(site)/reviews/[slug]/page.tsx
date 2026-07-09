import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  findReviewFirm,
  getReviewFirmSlugs,
  REVIEW_FIRMS,
} from "@/lib/reviews-content";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

export async function generateStaticParams() {
  return getReviewFirmSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = findReviewFirm(slug);
  if (!f) return {};
  return {
    title: f.metaTitle,
    description: f.metaDescription,
    alternates: { canonical: `/reviews/${f.slug}` },
    openGraph: {
      title: f.metaTitle,
      description: f.metaDescription,
      url: `/reviews/${f.slug}`,
      type: "article",
    },
  };
}

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = findReviewFirm(slug);
  if (!f) notFound();

  const others = REVIEW_FIRMS.filter((x) => x.slug !== f.slug && !x.isBDI).slice(
    0,
    3,
  );

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Organization", name: f.name },
    author: { "@type": "Organization", name: "Business Debt Insider" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: f.score,
      bestRating: 5,
      worstRating: 1,
    },
    name: `${f.name} Review`,
    reviewBody: f.verdict,
  };

  return (
    <article>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Reviews", url: "/reviews" },
          { name: f.name, url: `/reviews/${f.slug}` },
        ]}
      />
      <FaqJsonLd items={f.faq} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="border-b border-hairline bg-paper">
        <div className="mx-auto max-w-content px-6 py-5">
          <Breadcrumb
            items={[{ href: "/reviews", label: "Reviews" }, { label: f.name }]}
          />
        </div>
      </div>

      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
              {f.isBDI ? "Our program" : `Review ${f.numeral}`}
            </span>
            <div className="mt-6 border border-hairline p-5 bg-paper-mute">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-ink tabular-nums">
                  {f.score.toFixed(1)}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  / 5
                </span>
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Ranked #{f.rank} of {REVIEW_FIRMS.length}
              </div>
            </div>
          </div>
          <div className="md:col-span-9">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
              {f.name} Review
            </h1>
            <p className="mt-8 text-lg md:text-xl text-ink leading-relaxed max-w-3xl">
              {f.oneLiner}
            </p>
            {f.isBDI && (
              <p className="mt-5 max-w-3xl text-sm text-muted leading-relaxed">
                Disclosure: Business Debt Insider is the publisher of this
                comparison and lists its own program first. Every other firm on
                this page is reviewed using its public records, which we cite.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper-mute border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-14 md:py-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              At a glance
            </span>
          </div>
          <div className="md:col-span-9">
            <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
              {[
                { k: "Founded", v: f.founded },
                { k: "Headquarters", v: f.hq },
                { k: "BBB", v: f.bbb },
                { k: "Public reviews", v: f.publicReviews },
                { k: "Focus", v: f.focus },
                { k: "Fees", v: f.feeNote },
              ].map((row) => (
                <div key={row.k} className="border-t border-hairline pt-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
                    {row.k}
                  </dt>
                  <dd className="mt-2 text-base text-ink leading-relaxed">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Section eyebrow="Verdict" title={`Our read on ${f.shortName}`}>
        <p className="text-base md:text-lg text-ink leading-relaxed max-w-3xl">
          {f.verdict}
        </p>
      </Section>

      {f.bestFor.length > 0 && (
        <Section eyebrow="Fit" title="Best for" alt>
          <ul className="space-y-3 text-base md:text-lg text-ink leading-relaxed">
            {f.bestFor.map((p, i) => (
              <li
                key={i}
                className="grid grid-cols-[auto_1fr] gap-4 border-t border-hairline pt-3 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine pt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {f.watchFor.length > 0 && (
        <Section
          eyebrow="Diligence"
          title={f.isBDI ? "Worth knowing" : "What to watch for"}
          alt={f.bestFor.length === 0}
        >
          <ul className="space-y-3 text-base md:text-lg text-ink leading-relaxed">
            {f.watchFor.map((p, i) => (
              <li
                key={i}
                className="grid grid-cols-[auto_1fr] gap-4 border-t border-hairline pt-3 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted pt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section eyebrow="FAQ" title="Frequently asked">
        <dl className="space-y-0">
          {f.faq.map((item, i) => (
            <div
              key={i}
              className="border-t border-hairline py-5 last:border-b last:border-b-hairline"
            >
              <dt className="text-base md:text-lg font-bold tracking-tight text-ink">
                {item.q}
              </dt>
              <dd className="mt-3 text-base text-ink leading-relaxed">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {!f.isBDI && (
        <section className="bg-paper-mute border-b border-hairline">
          <div className="mx-auto max-w-content px-6 py-14 md:py-16 grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-pine">
                Comparing options
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-ink leading-tight">
                How Business Debt Insider approaches the same problem
              </h2>
              <p className="mt-4 max-w-2xl text-base text-ink leading-relaxed">
                We combine stacked business debt into one weekly payment on flat
                fees, with no new loan and no bankruptcy filing. Every engagement
                starts with a free written analysis.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/reviews/business-debt-insider"
                className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.18em] text-pine border-b border-pine pb-1 no-underline hover:text-ink hover:border-ink transition"
              >
                Read our program review →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20">
          <div className="flex items-end justify-between gap-6 border-b border-hairline pb-5 mb-10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Other firms
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-ink leading-tight">
                More reviews
              </h2>
            </div>
            <Link
              href="/reviews"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-pine no-underline hover:text-ink transition"
            >
              All reviews →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/reviews/${o.slug}`}
                className="group block no-underline border border-hairline p-6 hover:border-pine transition"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {o.score.toFixed(1)} / 5
                </span>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-ink group-hover:text-pine transition leading-snug">
                  {o.name}
                </h3>
                <p className="mt-3 text-sm text-ink leading-relaxed line-clamp-3">
                  {o.oneLiner}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-pine">
                  Read review →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Initial review
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
              Schedule an initial review.
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-ink leading-relaxed">
              Initial reviews are scoped to thirty minutes. The discussion is
              confidential and the review itself carries no fee.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/contact"
              className="inline-flex items-center bg-pine text-paper px-6 py-4 text-sm font-mono uppercase tracking-[0.18em] no-underline hover:bg-ink transition"
            >
              Schedule review →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

function Section({
  eyebrow,
  title,
  children,
  alt,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  alt?: boolean;
}) {
  return (
    <section
      className={`${alt ? "bg-paper-mute" : "bg-paper"} border-b border-hairline`}
    >
      <div className="mx-auto max-w-content px-6 py-14 md:py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {eyebrow}
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-ink leading-snug">
            {title}
          </h2>
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}
