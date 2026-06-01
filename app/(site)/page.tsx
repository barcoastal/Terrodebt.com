import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { SERVICES } from "@/lib/service-content";
import { priorityVerticals } from "@/lib/vertical-content";

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
            Business debt relief, restructuring & resolution
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-ink leading-[0.95]">
            Inside <span className="text-pine">business debt</span>.
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl text-ink leading-relaxed">
            Plain-spoken information and case-tested workouts for operators carrying stacked short-term debt. Daily debits replaced with weekly schedules, obligations resolved at 40-80% of balance where lenders accept, and the business operating throughout.
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
                  {s.metaDescription}
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    Insight <span className="text-hairline">·</span> {fmtDate(a.publishedAt ?? a.createdAt)}
                  </span>
                  <h3 className="mt-3 text-lg md:text-xl font-bold tracking-tight text-ink leading-snug group-hover:text-pine transition">
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
                A Fort Lauderdale practice for operators in distress.
              </h2>
              <div className="mt-6 space-y-4 text-base md:text-lg text-ink leading-relaxed">
                <p>
                  Formed in April 2026 to provide strategic financial consulting to small and mid-sized enterprises navigating stacked short-term debt. The practice operates from Fort Lauderdale, Florida, and serves operating entities nationally.
                </p>
                <p>
                  The methodology is grounded in forensic financial auditing. Every engagement begins with a verified reconstruction of the actual cash mechanics the business is operating under, and downstream work rests on that documentation. The practice does not lend, does not litigate, and coordinates with state-licensed counsel for legal defense matters.
                </p>
              </div>

              <div className="mt-8 border-t border-hairline pt-5 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em]">
                <div>
                  <div className="text-muted">Founded</div>
                  <div className="mt-1 text-ink">April 2026</div>
                </div>
                <div>
                  <div className="text-muted">Office</div>
                  <div className="mt-1 text-ink">Fort Lauderdale, FL</div>
                </div>
                <div>
                  <div className="text-muted">Discipline</div>
                  <div className="mt-1 text-ink">Strategic financial consulting</div>
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
