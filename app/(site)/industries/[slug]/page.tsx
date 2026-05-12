import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { SubscribeForm } from "@/components/site/SubscribeForm";
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
      {/* Hero, single column */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-14 md:py-20">
          <span className="font-mono text-[11px] uppercase tracking-wider text-electric">{v.heroEyebrow}</span>
          <h1 className="mt-4 font-bold tracking-tighter text-slate text-4xl md:text-5xl lg:text-6xl leading-[1.04] max-w-4xl">
            {v.headline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-3xl leading-relaxed">{v.subline}</p>
          <div className="mt-10 relative aspect-[21/9] overflow-hidden bg-cream">
            <Image
              src={`/images/industry-${slug}.png`}
              alt={v.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-12 md:py-14">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">By the numbers</span>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
            {v.stats.map((s) => (
              <div key={s.label} className="bg-offwhite p-6">
                <div className="font-mono text-3xl md:text-4xl font-bold text-slate tracking-tight leading-none">{s.value}</div>
                <div className="mt-3 text-sm text-slate leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it hits */}
      <Section eyebrow="Why this industry" title={`Why MCAs hit ${v.name.toLowerCase()} hard.`} body={v.whyHits} />

      {/* Pain points */}
      <section className="bg-white border-y border-rule">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <Reveal>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Common pain points</span>
              <h2 className="mt-3 font-bold tracking-tighter text-slate text-3xl md:text-4xl leading-tight">
                What we hear from {v.name.toLowerCase()} merchants.
              </h2>
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

      <Section eyebrow="What we see" title="Common stack patterns." body={v.patterns} />
      <Section eyebrow="Our approach" title="How TerraDebt works with you." body={v.approach} alt />
      <Section eyebrow="Scenario" title={`A typical ${v.name.toLowerCase()} case.`} body={v.scenario} />
      <Section eyebrow="Watch for" title="Industry-specific risks." body={v.risks} alt />

      {/* FAQ */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="border-b border-rule pb-5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">FAQ</span>
            <h2 className="mt-2 font-bold tracking-tighter text-slate text-3xl md:text-4xl leading-tight">
              Frequent questions from {v.name.toLowerCase()} merchants.
            </h2>
          </div>
          <div className="divide-y divide-rule">
            {v.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6 text-slate">
                  <span className="font-semibold tracking-tight text-lg md:text-xl leading-snug">{f.q}</span>
                  <span className="text-muted text-xl group-open:rotate-45 transition-transform duration-200 leading-none flex-shrink-0 mt-1">+</span>
                </summary>
                <p className="mt-3 text-muted leading-relaxed pr-10">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial close */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
            <div className="bg-cream p-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Newsletter</span>
              <h3 className="mt-2 font-semibold tracking-tight text-slate text-xl md:text-2xl">Get the newsletter.</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed max-w-md">
                Weekly notes on business debt restructure. Industry-specific notes when they apply.
              </p>
              <div className="mt-5">
                <SubscribeForm source={`industry-${slug}`} />
              </div>
            </div>
            <div className="bg-cream p-8 flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Direct</span>
              <h3 className="mt-2 font-semibold tracking-tight text-slate text-xl md:text-2xl">
                Talk to the team about {v.name.toLowerCase()}.
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed max-w-md">
                A TerraDebt advisor familiar with {v.name.toLowerCase()} will review your situation. Free assessment.
              </p>
              <div className="mt-auto pt-5">
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 text-slate text-sm font-medium no-underline border-b border-slate pb-0.5 hover:border-electric hover:text-electric transition"
                >
                  Request an assessment
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function Section({ eyebrow, title, body, alt }: { eyebrow: string; title: string; body: string; alt?: boolean }) {
  return (
    <section className={alt ? "bg-white border-y border-rule" : "bg-offwhite border-b border-rule"}>
      <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
        <Reveal>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{eyebrow}</span>
            <h2 className="mt-3 font-bold tracking-tighter text-slate text-3xl md:text-4xl leading-tight">{title}</h2>
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
