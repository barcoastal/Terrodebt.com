import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { SERVICES } from "@/lib/service-content";
import { priorityVerticals } from "@/lib/vertical-content";
import { ArticleCover } from "@/components/site/ArticleCover";

export const metadata: Metadata = {
  title: { absolute: "Business Debt Insider — Relief, Restructuring & Resolution" },
  description:
    "Plain-spoken guides and case-tested workouts on stacked business debt. Daily debits replaced with weekly schedules, resolutions at 40-80% of balance.",
  openGraph: {
    title: "Business Debt Insider — Relief, Restructuring & Resolution",
    description:
      "Plain-spoken guides and case-tested workouts on stacked business debt.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Debt Insider — Relief, Restructuring & Resolution",
    description:
      "Plain-spoken guides and case-tested workouts on stacked business debt.",
  },
};

export const revalidate = 300;

function fmtDate(d: Date | null | undefined): string {
  const date = d ?? new Date();
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function Home() {
  const verticals = priorityVerticals();

  let insights: { id: string; slug: string; title: string; excerpt: string | null; publishedAt: Date | null; createdAt: Date }[] = [];
  try {
    insights = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { id: true, slug: true, title: true, excerpt: true, publishedAt: true, createdAt: true },
    });
  } catch {}

  return (
    <>
      {/* 1. Hero */}
      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
            Plain-spoken information on business debt
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-ink leading-[0.95]">
            The only way out of <span className="text-pine">business debt</span> is in.
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl text-ink leading-relaxed">
            Most operators try to outrun debt by stacking new advances on old ones. It never works. Business Debt Insider goes the other direction: into the stack. We take it apart with you, lender by lender, debit by debit, until you understand exactly how it got there.
          </p>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-ink leading-relaxed">
            From that understanding, you get out. Daily debits replaced with weekly schedules, obligations resolved at a reduced balance, the business operating throughout. Then we rebuild the cash discipline that keeps you from reaching for the next advance.
          </p>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-muted leading-relaxed">
            We do not lend, do not issue new debt, and do not act as a law firm. Flat fees, documented agreements, no contingency.
          </p>
          <div className="mt-10 flex flex-wrap gap-6 items-center">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.18em] text-pine border-b border-pine pb-1 no-underline hover:text-ink hover:border-ink transition"
            >
              Read the guides
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.18em] text-pine border-b border-pine pb-1 no-underline hover:text-ink hover:border-ink transition"
            >
              See the four services
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.18em] text-muted hover:text-ink transition"
            >
              Or schedule a call
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Four services 2x2 */}
      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-10">
            <div className="md:col-span-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Practice areas
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
                Four ways out of business debt.
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base md:text-lg text-ink leading-relaxed">
                Every engagement starts with a free written analysis. From there, the right service depends on what the business can support: relief on the daily debits, a restructured weekly payment, settlement at a discounted lump sum, or a coordinated workout as an alternative to filing.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 border-l border-t border-hairline">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group block no-underline border-r border-b border-hairline p-8 md:p-10 hover:bg-paper-mute transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {s.numeral}
                </span>
                <h3 className="mt-3 text-xl md:text-2xl font-bold tracking-tight text-ink leading-snug group-hover:text-pine transition">
                  {s.name}
                </h3>
                <p className="mt-4 text-sm md:text-base text-ink leading-relaxed">
                  {s.homeSummary}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-pine">
                  Service overview
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2b. How a workout actually works */}
      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-10">
            <div className="md:col-span-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Inside the process
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
                How a business debt workout actually works.
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base md:text-lg text-ink leading-relaxed">
                Every engagement runs the same four phases regardless of which service line ends up applying. The first two phases are free. Engagement fees apply only if the operator decides to move forward after seeing the written plan.
              </p>
            </div>
          </div>

          <ol className="border-t border-hairline">
            {[
              {
                step: "01",
                title: "Free analysis",
                body: "We map every active credit instrument the business is carrying, reconstruct the daily debit pattern hitting the operating account, and identify which lenders have the strongest recourse. The output is a single-page composite of total outflow and total exposure.",
              },
              {
                step: "02",
                title: "Written plan",
                body: "Before any engagement fee is charged, the operator receives a written plan showing the recommended path — relief, restructure, resolution, or out-of-court workout — with the target weekly payment, the timeline to reach it, and the specific creditor concessions we will request.",
              },
              {
                step: "03",
                title: "Negotiation period",
                body: "Each lender is approached in sequence based on lien position and recourse. Modifications, deferrals, and resolutions are presented as documented proposals supported by the file. Every communication is logged. Most engagements close within 45 to 120 days.",
              },
              {
                step: "04",
                title: "Documented agreements",
                body: "Accepted terms are reduced to writing with release language reviewed line by line. The business operates on a new single payment schedule. Personal guaranties are released where the obligation has been resolved.",
              },
            ].map((p) => (
              <li key={p.step} className="border-b border-hairline">
                <div className="grid md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10">
                  <div className="md:col-span-2">
                    <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-pine">{p.step}</span>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-ink leading-snug">{p.title}</h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-base md:text-lg text-ink leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Priority industries */}
      <section className="bg-paper-mute border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-10">
            <div className="md:col-span-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Priority sectors
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
                Three industries the practice prioritizes.
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base md:text-lg text-ink leading-relaxed">
                The practice prioritizes three industries where the cash flow shape, the typical credit profile, and the operational complexity align with the methodology. Other industries are served on a case-by-case basis.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {verticals.map((v) => (
              <Link
                key={v.slug}
                href={`/industries/${v.slug}`}
                className="group block no-underline bg-paper border border-hairline hover:border-pine transition"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-mute">
                  <Image
                    src={`/images/industry-${v.slug}.png`}
                    alt={v.name}
                    fill
                    className="object-cover photo-desat transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    Industry
                  </span>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-ink leading-snug">
                    {v.name}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-pine">
                    Sector view
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Recent insights */}
      {insights.length > 0 && (
        <section className="bg-paper border-b border-hairline">
          <div className="mx-auto max-w-content px-6 py-16 md:py-20">
            <div className="flex items-end justify-between gap-6 border-b border-hairline pb-5 mb-10">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Working notes
                </span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
                  Recent insights
                </h2>
              </div>
              <Link
                href="/insights"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-pine no-underline hover:text-ink transition"
              >
                All insights →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {insights.map((a) => (
                <Link key={a.id} href={`/insights/${a.slug}`} className="group block no-underline">
                  <ArticleCover
                    title={a.title}
                    topic="Guide"
                    date={a.publishedAt ?? a.createdAt}
                    size="small"
                  />
                  <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    Insight <span className="text-hairline">·</span> {fmtDate(a.publishedAt ?? a.createdAt)}
                  </span>
                  <h3 className="mt-2 text-lg md:text-xl font-bold tracking-tight text-ink leading-snug group-hover:text-pine transition">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="mt-3 text-sm text-ink leading-relaxed line-clamp-3">{a.excerpt}</p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-pine">
                    Read insight
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4b. Browse by topic */}
      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-10">
            <div className="md:col-span-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Browse the library
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
                Find what you need by topic.
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base md:text-lg text-ink leading-relaxed">
                The library is organized by debt instrument and by procedural posture. Pick the topic closest to your situation — every entry links to the underlying guides, calculators, and engagement notes.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                topic: "Stacked MCAs",
                body: "When a business takes one merchant cash advance, then another, then another, daily debits start outpacing receipts. Guides on how the stack got there, how to ask the lender for a refund or settlement, and what each MCA company usually accepts.",
                href: "/insights",
              },
              {
                topic: "Confession of Judgment",
                body: "Most MCA contracts written in New York or Florida include a confession of judgment clause. If a lender files one, your bank account can be frozen in a single business day. Guides on how a COJ gets entered, how to react in the first 48 hours, and what licensed counsel does next.",
                href: "/insights/coj-filed-against-me",
              },
              {
                topic: "Bank loan workouts",
                body: "When a covenant gets broken or a payment gets missed, the loan moves from the original banker to the special assets group. Guides on forbearance, covenant waivers, and how to present a credible plan that keeps the relationship alive.",
                href: "/insights",
              },
              {
                topic: "Equipment finance",
                body: "Equipment leases and financed assets behave differently than MCAs in a workout. Guides on voluntary surrender, deficiency claims after repossession, and how to decide which pieces are worth keeping.",
                href: "/insights",
              },
              {
                topic: "Vendor and trade debt",
                body: "Aged supplier balances do not have to mean losing the supplier. Guides on written paydown plans, COD-plus-arrears arrangements, and mechanic's lien matters in construction and manufacturing.",
                href: "/insights",
              },
              {
                topic: "Business tax debt",
                body: "Past-due payroll, sales, and income tax balances carry different risks than other creditors. Guides on installment agreements, offers in compromise, and how trust fund liability can become personal if it is not handled quickly.",
                href: "/insights",
              },
            ].map((c) => (
              <Link
                key={c.topic}
                href={c.href}
                className="block no-underline border border-hairline p-6 hover:border-pine transition"
              >
                <h3 className="text-base md:text-lg font-bold tracking-tight text-ink leading-snug">{c.topic}</h3>
                <p className="mt-2 text-sm text-ink leading-relaxed">{c.body}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-pine">
                  Open
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-6 items-center border-t border-hairline pt-6">
            <Link href="/insights" className="font-mono text-[11px] uppercase tracking-[0.18em] text-pine no-underline hover:text-ink transition">
              All insights →
            </Link>
            <Link href="/tools" className="font-mono text-[11px] uppercase tracking-[0.18em] text-pine no-underline hover:text-ink transition">
              All calculators →
            </Link>
            <Link href="/glossary" className="font-mono text-[11px] uppercase tracking-[0.18em] text-pine no-underline hover:text-ink transition">
              Glossary of terms →
            </Link>
            <Link href="/mca-defense" className="font-mono text-[11px] uppercase tracking-[0.18em] text-pine no-underline hover:text-ink transition">
              Legal defense by state →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. About strip */}
      <section className="bg-paper-mute border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] bg-paper-mute overflow-hidden">
                <Image
                  src="/images/founder-scene.png"
                  alt="Business Debt Insider, Fort Lauderdale office"
                  fill
                  className="object-cover photo-desat"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                About the practice
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
                A working desk for business debt restructure.
              </h2>
              <div className="mt-6 space-y-4 text-base md:text-lg text-ink leading-relaxed">
                <p>
                  Business Debt Insider publishes plain-spoken information on how stacked short-term business debt actually gets resolved. The work covers the four common paths an operator has when daily debits start outpacing receipts: relief on the existing schedule, restructure into a single weekly payment, resolution at a discounted balance, or an out-of-court workout as an alternative to filing.
                </p>
                <p>
                  Every guide is written from the engagement file: real lender postures, real settlement ranges by instrument type, real timelines from intake to closeout. The practice does not lend, does not act as a law firm, and coordinates with state-licensed counsel where a matter has matured into litigation.
                </p>
                <p>
                  Operations are based in Fort Lauderdale, Florida. Engagements serve operating entities in every state.
                </p>
              </div>

              <div className="mt-8 border-t border-hairline pt-5 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em]">
                <div>
                  <div className="text-muted">Office</div>
                  <div className="mt-1 text-ink">Fort Lauderdale, FL</div>
                </div>
                <div>
                  <div className="text-muted">Discipline</div>
                  <div className="mt-1 text-ink">Business debt restructure</div>
                </div>
                <div>
                  <div className="text-muted">Reach</div>
                  <div className="mt-1 text-ink">All 50 states</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Initial review
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
              Schedule an initial review with the practice.
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-ink leading-relaxed">
              Initial reviews are scoped to thirty minutes and are designed to determine whether the practice is the appropriate engagement for the matter. The discussion is confidential and the review itself carries no fee.
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
    </>
  );
}
