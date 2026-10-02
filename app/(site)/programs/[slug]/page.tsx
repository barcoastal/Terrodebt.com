import { References } from "@/components/content/References";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PROGRAMS, type ProgramKey } from "@/lib/programs";
import { LeadForm } from "@/components/lead/LeadForm";

export async function generateStaticParams() {
  return Object.keys(PROGRAMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAMS[slug as ProgramKey];
  if (!p) return {};
  const meta = p;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/programs/${slug}` },
    openGraph: { title: meta.title, description: meta.description, url: `/programs/${slug}`, type: "website" },
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROGRAMS[slug as ProgramKey];
  if (!p) notFound();

  return (
    <article>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Programs", url: "/programs" }, { name: p.title, url: `/programs/${slug}` }]} />
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 pt-20 pb-20 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">Method</span>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tighter">{p.headline}</h1>
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed">{p.subline}</p>
            <p className="mt-5 text-sm text-slate leading-relaxed border-l-2 border-electric pl-4">
              {p.appliesTo}
            </p>
          </div>
          <LeadForm source={`program-${slug}`} />
        </div>
      </section>
      <section className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-2 gap-8">
        <div className="surface-card p-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Who this is for</h2>
          <ul className="mt-5 space-y-3 text-slate">{p.whoFor.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <svg className="w-4 h-4 mt-1 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              <span>{item}</span>
            </li>
          ))}</ul>
        </div>
        <div className="surface-card p-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How it works</h2>
          <ol className="mt-5 space-y-3 text-slate">{p.mechanism.map((m, i) => (
            <li key={m} className="flex items-start gap-3">
              <span className="font-mono text-xs font-semibold text-electric mt-1 w-5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span>{m}</span>
            </li>
          ))}</ol>
        </div>
      </section>
      <section className="border-t border-border">
        <div className="mx-auto max-w-content px-6 py-12 md:py-16">
          <div className="max-w-3xl space-y-10">
            {p.sections.map((section) => <section key={section.heading}>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-base md:text-lg leading-relaxed text-slate">{paragraph}</p>)}
            </section>)}
            <section>
              <h2 className="text-2xl font-semibold">What to bring to an initial review</h2>
              <ul className="mt-4 list-disc pl-5 space-y-3">{p.documents.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">Questions owners ask</h2>
              {p.questions.map((item) => <div key={item.q} className="mt-6"><h3 className="text-lg font-semibold">{item.q}</h3><p className="mt-2 leading-relaxed">{item.a}</p></div>)}
            </section>
            <nav aria-label="Compare program options" className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold">Compare your options</h2>
              <ul className="mt-4 space-y-3">{(Object.keys(PROGRAMS) as ProgramKey[]).filter((key) => key !== slug).map((key) => <li key={key}><Link href={`/programs/${key}`} className="text-electric underline">{PROGRAMS[key].title}</Link></li>)}
                <li><Link href="/mca-defense" className="text-electric underline">MCA defense: documents and state resources</Link></li>
                <li><Link href="/contact" className="text-electric underline">Request a free initial review</Link></li>
              </ul>
            </nav>
          </div>
          <References items={p.references} />
        </div>
      </section>
    </article>
  );
}
