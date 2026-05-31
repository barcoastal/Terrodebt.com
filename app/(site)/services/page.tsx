import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/service-content";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export const metadata: Metadata = {
  title: "Debt Restructure Consulting Services for SMEs",
  description: "Four consulting services for businesses with stacked short-term debt: forensic audit, liquidity engineering, creditor liaison, operational restructuring.",
};

export default function ServicesIndex() {
  return (
    <article>
      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-4">
          <Breadcrumb items={[{ label: "Services" }]} />
        </div>
      </section>

      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 pt-14 pb-16 md:pt-20 md:pb-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
            Practice areas
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
            Services
          </h1>
          <p className="mt-6 max-w-3xl text-base md:text-lg text-ink leading-relaxed">
            The practice provides four professional consulting services to small and mid-sized enterprises facing liquidity crisis caused by stacked short-term debt. The service lines are designed to be retained as discrete engagements and, where the matter warrants, sequenced as a complete restructuring program.
          </p>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-muted leading-relaxed">
            The practice is not a law firm and is not a lender. Where a matter requires legal representation, the practice coordinates with state-licensed counsel retained directly by the client.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-content px-6 py-12 md:py-16">
          <div className="divide-y divide-hairline border-y border-hairline">
            {SERVICES.map((s) => (
              <article key={s.slug} className="grid md:grid-cols-12 gap-8 md:gap-12 py-12 md:py-16">
                <div className="md:col-span-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {s.numeral}
                  </span>
                  <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-ink leading-tight">
                    {s.name}
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <div className="space-y-4 text-base md:text-lg text-ink leading-relaxed">
                    {s.overview.slice(0, 2).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <div className="mt-6 border border-hairline p-5 bg-paper-mute">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      Engagement structure
                    </span>
                    <dl className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      {s.engagement.map((e) => (
                        <div key={e.step} className="flex items-baseline justify-between gap-3 border-b border-hairline pb-2 last:border-b-0">
                          <dt className="text-ink">{e.step}</dt>
                          <dd className="font-mono text-[11px] uppercase tracking-wider text-muted">{e.duration}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-pine border-b border-pine pb-1 no-underline hover:text-ink hover:border-ink transition"
                    >
                      Open service overview
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
