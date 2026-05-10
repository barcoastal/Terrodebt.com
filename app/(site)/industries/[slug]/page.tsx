import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/site/Reveal";

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

export default async function VerticalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = VERTICAL_CONTENT.find((x) => x.slug === slug);
  if (!v) notFound();

  return (
    <article>
      {/* Hero with image + form */}
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 py-16 md:py-20 grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">{v.heroEyebrow}</span>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05]">{v.headline}</h1>
            <p className="mt-5 text-lg text-muted max-w-xl leading-relaxed">{v.subline}</p>
            <div className="mt-8 relative aspect-[16/10] rounded-2xl overflow-hidden surface-card-elevated">
              <Image src={`/images/industry-${slug}.png`} alt={v.name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 60vw" />
            </div>
          </div>
          <div className="md:col-span-5 md:sticky md:top-24">
            <LeadForm source={`industry-${slug}`} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-12 grid grid-cols-2 md:grid-cols-3 gap-6">
          {v.stats.map((s) => (
            <Reveal key={s.label}>
              <div className="surface-card p-6">
                <div className="font-mono text-3xl md:text-4xl font-bold text-electric tracking-tighter">{s.value}</div>
                <div className="mt-2 text-sm text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why it hits */}
      <Section eyebrow="Why this industry" title={`Why MCAs hit ${v.name.toLowerCase()} hard.`} body={v.whyHits} />

      {/* Pain points */}
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Common pain points</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">What we hear from {v.name.toLowerCase()} merchants.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="md:col-span-2 space-y-3 text-slate">
              {v.pains.map((p) => (
                <li key={p} className="flex gap-3 items-start">
                  <svg className="w-5 h-5 mt-1 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Patterns */}
      <Section eyebrow="What we see" title="Common stack patterns." body={v.patterns} />

      {/* Approach */}
      <Section eyebrow="Our approach" title="How TerraDebt works with you." body={v.approach} dark />

      {/* Scenario */}
      <Section eyebrow="Scenario" title={`A typical ${v.name.toLowerCase()} case.`} body={v.scenario} />

      {/* Risks */}
      <Section eyebrow="Watch for" title="Industry-specific risks." body={v.risks} dark />

      {/* FAQ */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">FAQ</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Frequent questions from {v.name.toLowerCase()} merchants.</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {v.faq.map((f) => (
              <Reveal key={f.q}>
                <details className="surface-card p-6 group">
                  <summary className="cursor-pointer flex items-start justify-between gap-4 list-none">
                    <span className="font-semibold text-slate">{f.q}</span>
                    <span className="text-electric font-mono transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-muted leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate text-white">
        <div className="mx-auto max-w-content px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Ready for a free assessment?</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">A TerraDebt advisor familiar with {v.name.toLowerCase()} will review your situation within one business hour.</p>
          <Link href="/get-started" className="mt-8 inline-block bg-electric text-white px-6 py-3 rounded-xl text-sm font-semibold no-underline hover:opacity-90 transition">Start my free assessment</Link>
        </div>
      </section>
    </article>
  );
}

function Section({ eyebrow, title, body, dark }: { eyebrow: string; title: string; body: string; dark?: boolean }) {
  return (
    <section className={dark ? "bg-white border-y border-border" : "bg-offwhite"}>
      <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
        <Reveal>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">{eyebrow}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="md:col-span-2 prose prose-slate max-w-none text-slate leading-relaxed prose-p:my-3 prose-headings:tracking-tight prose-strong:text-slate prose-li:my-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
