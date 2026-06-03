import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { findService, getServiceSlugs, SERVICES } from "@/lib/service-content";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

export async function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = findService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      url: `/services/${s.slug}`,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = findService(slug);
  if (!s) notFound();
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <article>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: s.name, url: `/services/${s.slug}` },
        ]}
      />
      <FaqJsonLd items={s.faq} />

      <div className="border-b border-hairline bg-paper">
        <div className="mx-auto max-w-content px-6 py-5">
          <Breadcrumb items={[{ href: "/services", label: "Services" }, { label: s.name }]} />
        </div>
      </div>

      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">{s.kicker}</span>
          </div>
          <div className="md:col-span-9">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05]">{s.name}</h1>
            <div className="mt-8 space-y-5 text-base md:text-lg text-ink leading-relaxed max-w-3xl">
              {s.overview.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-mute border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-14 md:py-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Engagement</span>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-ink leading-snug">Engagement structure</h2>
          </div>
          <div className="md:col-span-9">
            <div className="border border-hairline bg-paper">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline text-left">
                    <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted font-medium">Phase</th>
                    <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted font-medium">Duration</th>
                    <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted font-medium">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {s.engagement.map((e, i) => (
                    <tr key={i} className="border-b border-hairline last:border-b-0">
                      <td className="px-5 py-4 text-ink">{e.step}</td>
                      <td className="px-5 py-4 text-muted font-mono text-xs">{e.duration}</td>
                      <td className="px-5 py-4 text-muted font-mono text-xs">{e.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted font-mono uppercase tracking-[0.15em]">Engagement scope confirmed at intake.</p>
          </div>
        </div>
      </section>

      <Section eyebrow="Scope" title="What this addresses">
        <ul className="space-y-3 text-base md:text-lg text-ink leading-relaxed">
          {s.whatItAddresses.map((p, i) => (
            <li key={i} className="grid grid-cols-[auto_1fr] gap-4 border-t border-hairline pt-3 first:border-t-0 first:pt-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Method" title="Methodology" alt>
        <ol className="space-y-8">
          {s.methodology.map((m, i) => (
            <li key={i} className="grid grid-cols-[auto_1fr] gap-6 border-t border-hairline pt-6 first:border-t-0 first:pt-0">
              <span className="font-mono text-sm uppercase tracking-[0.2em] text-pine">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink leading-snug">{m.title}</h3>
                <p className="mt-2 text-base text-ink leading-relaxed">{m.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Output" title="Deliverables">
        <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3 text-base text-ink">
          {s.deliverables.map((d, i) => (
            <li key={i} className="border-t border-hairline pt-3">{d}</li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Scope of debt" title="Debt instruments covered" alt>
        <dl className="grid md:grid-cols-2 gap-x-10 gap-y-6">
          {s.debtInstruments.map((d) => (
            <div key={d.name} className="border-t border-hairline pt-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">{d.name}</dt>
              <dd className="mt-2 text-base text-ink leading-relaxed">{d.note}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Patterns" title="Common engagements">
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
          {s.commonEngagements.map((c, i) => (
            <div key={i} className="border-t border-hairline pt-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Pattern {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-ink leading-snug">{c.title}</h3>
              <p className="mt-3 text-base text-ink leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Frequently asked" alt>
        <dl className="space-y-0">
          {s.faq.map((f, i) => (
            <div key={i} className="border-t border-hairline py-5 last:border-b last:border-b-hairline">
              <dt className="text-base md:text-lg font-bold tracking-tight text-ink">{f.q}</dt>
              <dd className="mt-3 text-base text-ink leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <section className="bg-paper border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20">
          <div className="flex items-end justify-between gap-6 border-b border-hairline pb-5 mb-10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Other services</span>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-ink leading-tight">Adjacent practice areas</h2>
            </div>
            <Link href="/services" className="font-mono text-[11px] uppercase tracking-[0.18em] text-pine no-underline hover:text-ink transition">
              All services →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="group block no-underline border border-hairline p-6 hover:border-pine transition">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{o.numeral}</span>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-ink group-hover:text-pine transition leading-snug">{o.name}</h3>
                <p className="mt-3 text-sm text-ink leading-relaxed line-clamp-3">{o.metaDescription}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-pine">
                  Open service →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Initial review</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">Schedule an initial review.</h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-ink leading-relaxed">
              Initial reviews are scoped to thirty minutes. The discussion is confidential and the review itself carries no fee.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/contact" className="inline-flex items-center bg-pine text-paper px-6 py-4 text-sm font-mono uppercase tracking-[0.18em] no-underline hover:bg-ink transition">
              Schedule review →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

function Section({ eyebrow, title, children, alt }: { eyebrow: string; title: string; children: React.ReactNode; alt?: boolean }) {
  return (
    <section className={`${alt ? "bg-paper-mute" : "bg-paper"} border-b border-hairline`}>
      <div className="mx-auto max-w-content px-6 py-14 md:py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{eyebrow}</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-ink leading-snug">{title}</h2>
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}
