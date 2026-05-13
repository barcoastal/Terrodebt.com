import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { PRODUCTS } from "@/lib/product-content";
import { db } from "@/lib/db";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { Toc, type TocItem } from "@/components/site/Toc";
import { RelatedShelf } from "@/components/site/RelatedShelf";
import { NewsletterStrip } from "@/components/site/NewsletterStrip";

export async function generateStaticParams() {
  return VERTICAL_CONTENT.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = VERTICAL_CONTENT.find((x) => x.slug === slug);
  if (!v) return {};
  return {
    title: v.metaTitle,
    description: v.metaDescription,
    openGraph: {
      title: v.metaTitle,
      description: v.metaDescription,
      type: "article",
      images: [{ url: `/images/industry-${slug}.png`, alt: v.name }],
    },
  };
}

const SECTIONS: TocItem[] = [
  { id: "why-it-hits", text: "Why this industry" },
  { id: "pain-points", text: "Pain points" },
  { id: "patterns", text: "Stack patterns" },
  { id: "approach", text: "Our approach" },
  { id: "scenario", text: "Scenario" },
  { id: "risks", text: "Risks" },
  { id: "faq", text: "FAQ" },
];

export default async function VerticalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = VERTICAL_CONTENT.find((x) => x.slug === slug);
  if (!v) notFound();

  let recent: { id: string; slug: string; title: string; excerpt: string | null; heroImage: string | null }[] = [];
  try {
    recent = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 4,
      select: { id: true, slug: true, title: true, excerpt: true, heroImage: true },
    });
  } catch {}

  const otherIndustries = VERTICAL_CONTENT.filter((x) => x.slug !== v.slug).slice(0, 4);

  return (
    <article>
      {/* Breadcrumb */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-4">
          <Breadcrumb items={[{ label: "Industries", href: "/industries" }, { label: v.name }]} />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-10 md:py-14">
          <span className="font-mono text-[11px] uppercase tracking-wider text-electric">{v.heroEyebrow}</span>
          <h1 className="mt-3 font-bold tracking-tighter text-slate text-4xl md:text-5xl lg:text-6xl leading-[1.04] max-w-4xl">
            {v.headline}
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted max-w-3xl leading-relaxed">{v.subline}</p>
          <div className="mt-5 font-mono text-[11px] uppercase tracking-wider text-muted">
            By the TerraDebt team · Updated {new Date().toISOString().slice(0, 10)}
          </div>
          <div className="mt-8 relative aspect-[16/9] overflow-hidden bg-cream border border-rule max-w-5xl">
            <Image
              src={`/images/industry-${slug}.png`}
              alt={v.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
            {v.stats.map((s) => (
              <div key={s.label} className="bg-white p-5">
                <div className="font-mono text-2xl md:text-3xl font-bold text-slate tracking-tight leading-none">{s.value}</div>
                <div className="mt-2 text-sm text-slate leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-col body */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-12 md:py-16 grid md:grid-cols-12 gap-10">
          <aside className="hidden md:block md:col-span-2">
            <div className="sticky top-32">
              <Toc items={SECTIONS} label="In this guide" />
            </div>
          </aside>

          <div className="md:col-span-7 space-y-12">
            <ProseSection id="why-it-hits" eyebrow="Why this industry" title={`Why MCAs hit ${v.name.toLowerCase()} hard`} body={v.whyHits} />

            <section id="pain-points" className="scroll-mt-32">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Common pain points</span>
              <h2 className="mt-1 font-bold tracking-tighter text-slate text-2xl md:text-3xl leading-tight">
                What we hear from {v.name.toLowerCase()} merchants
              </h2>
              <ul className="mt-5 space-y-2.5">
                {v.pains.map((p) => (
                  <li key={p} className="flex gap-3 items-start text-slate">
                    <svg className="w-4 h-4 mt-1 text-electric shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </section>

            <ProseSection id="patterns" eyebrow="What we see" title="Common stack patterns" body={v.patterns} />
            <ProseSection id="approach" eyebrow="Our approach" title="How TerraDebt works with you" body={v.approach} />
            <ProseSection id="scenario" eyebrow="Scenario" title={`A typical ${v.name.toLowerCase()} case`} body={v.scenario} />
            <ProseSection id="risks" eyebrow="Watch for" title="Industry-specific risks" body={v.risks} />

            <section id="faq" className="scroll-mt-32">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">FAQ</span>
              <h2 className="mt-1 font-bold tracking-tighter text-slate text-2xl md:text-3xl leading-tight">
                Frequent questions from {v.name.toLowerCase()} merchants
              </h2>
              <div className="mt-4 divide-y divide-rule border-y border-rule">
                {v.faq.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-6 text-slate">
                      <span className="font-semibold tracking-tight text-base md:text-lg leading-snug">{f.q}</span>
                      <span className="text-muted text-xl group-open:rotate-45 transition-transform duration-200 leading-none shrink-0 mt-1">+</span>
                    </summary>
                    <p className="mt-3 text-muted leading-relaxed pr-10">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-32 space-y-6">
              <div className="border border-rule bg-white p-5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Related topics</span>
                <ul className="mt-3 space-y-2.5">
                  {PRODUCTS.slice(0, 4).map((p) => (
                    <li key={p.slug} className="border-t border-rule pt-2.5 first:border-t-0 first:pt-0">
                      <Link
                        href={`/services/${p.slug}`}
                        className="text-sm font-medium text-slate leading-snug hover:text-electric no-underline transition"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-rule bg-white p-5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Other industries</span>
                <ul className="mt-3 space-y-2">
                  {otherIndustries.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/industries/${o.slug}`}
                        className="text-sm text-slate hover:text-electric no-underline transition"
                      >
                        {o.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-rule bg-slate text-white p-5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-electric-soft">
                  Talk to the team
                </span>
                <p className="mt-2 text-sm font-semibold leading-snug">
                  Free assessment for {v.name.toLowerCase()} operators
                </p>
                <Link
                  href="/get-started"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white border-b border-white pb-0.5 hover:border-electric-soft hover:text-electric-soft transition"
                >
                  Request an assessment
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <RelatedShelf
        items={recent.map((r) => ({
          slug: r.slug,
          title: r.title,
          excerpt: r.excerpt,
          heroImage: r.heroImage,
        }))}
        heading="Recent guides"
        eyebrow="Read next"
        allHref="/articles"
      />

      <NewsletterStrip source={`industry-${slug}`} />
    </article>
  );
}

function ProseSection({ id, eyebrow, title, body }: { id: string; eyebrow: string; title: string; body: string }) {
  return (
    <section id={id} className="scroll-mt-32">
      <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{eyebrow}</span>
      <h2 className="mt-1 font-bold tracking-tighter text-slate text-2xl md:text-3xl leading-tight">{title}</h2>
      <div className="mt-4 prose prose-slate max-w-none text-slate leading-relaxed prose-p:my-3 prose-headings:tracking-tight prose-strong:text-slate prose-li:my-1">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </section>
  );
}
