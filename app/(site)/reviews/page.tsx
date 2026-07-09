import Link from "next/link";
import type { Metadata } from "next";
import { REVIEW_FIRMS } from "@/lib/reviews-content";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export const metadata: Metadata = {
  title: "MCA Debt Relief Company Reviews (2026): Ranked & Compared",
  description:
    "Independent-style reviews of the main MCA and business debt relief firms, ranked and compared on ratings, fees, and complaints. Published by Business Debt Insider.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsIndex() {
  return (
    <article>
      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-4">
          <Breadcrumb items={[{ label: "Reviews" }]} />
        </div>
      </section>

      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 pt-14 pb-16 md:pt-20 md:pb-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
            Company reviews
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
            MCA and business debt relief companies, reviewed
          </h1>
          <p className="mt-6 max-w-3xl text-base md:text-lg text-ink leading-relaxed">
            We review the firms a business owner actually runs into when they
            search for MCA settlement or business debt relief, and rank them on
            ratings, fees, track record, and complaints. Each firm is assessed
            against its public records.
          </p>
          <p className="mt-4 max-w-3xl text-sm text-muted leading-relaxed">
            Disclosure: this comparison is published by Business Debt Insider,
            which lists its own program first. Every other firm is reviewed using
            its public records, which we cite on each page. We are not a lender
            and not a law firm.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-content px-6 py-12 md:py-16">
          <div className="divide-y divide-hairline border-y border-hairline">
            {REVIEW_FIRMS.map((f) => (
              <article
                key={f.slug}
                className={`grid md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 ${
                  f.isBDI ? "bg-paper-mute -mx-6 px-6" : ""
                }`}
              >
                <div className="md:col-span-1 flex md:block items-baseline gap-3">
                  <span className="font-mono text-2xl md:text-3xl font-bold tracking-tight text-ink tabular-nums">
                    {f.rank}
                  </span>
                </div>
                <div className="md:col-span-7">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ink leading-snug">
                      <Link
                        href={`/reviews/${f.slug}`}
                        className="no-underline text-ink hover:text-pine transition"
                      >
                        {f.name}
                      </Link>
                    </h2>
                    {f.isBDI && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper bg-pine px-2 py-1">
                        Our program
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm md:text-base text-ink leading-relaxed max-w-2xl">
                    {f.oneLiner}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    <span>{f.hq}</span>
                    <span className="truncate max-w-xs normal-case tracking-normal">
                      {f.bbb}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-4 flex items-start justify-between md:justify-end gap-6">
                  <div className="text-right">
                    <div className="text-3xl font-bold tracking-tight text-ink tabular-nums leading-none">
                      {f.score.toFixed(1)}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      Score / 5
                    </div>
                  </div>
                  <Link
                    href={`/reviews/${f.slug}`}
                    className="self-center font-mono text-[11px] uppercase tracking-[0.18em] text-pine border-b border-pine pb-1 no-underline hover:text-ink hover:border-ink transition whitespace-nowrap"
                  >
                    Read →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper border-t border-hairline">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Initial review
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
              Not sure which firm fits? Start with a free written analysis.
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-ink leading-relaxed">
              We map your total outflow and exposure and recommend the path your
              business can actually support. The review carries no fee.
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
