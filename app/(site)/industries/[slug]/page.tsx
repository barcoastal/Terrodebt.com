import { notFound } from "next/navigation";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { LeadForm } from "@/components/lead/LeadForm";

export async function generateStaticParams() {
  return VERTICAL_CONTENT.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = VERTICAL_CONTENT.find((x) => x.slug === slug);
  return v ? { title: v.headline, description: v.subline } : {};
}

export default async function VerticalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = VERTICAL_CONTENT.find((x) => x.slug === slug);
  if (!v) notFound();
  return (
    <article>
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{v.headline}</h1>
            <p className="mt-4 text-lg text-muted">{v.subline}</p>
          </div>
          <LeadForm source={`vertical-${slug}`} />
        </div>
      </section>
      <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-3 gap-6">
        {v.stats.map((s) => (
          <div key={s.label} className="bg-white border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-electric">{s.value}</div>
            <div className="text-sm text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-content px-6 pb-16">
        <h2 className="text-2xl font-semibold">Common pain points we solve</h2>
        <ul className="mt-4 space-y-2 text-slate">{v.pains.map((p) => <li key={p}>{`• ${p}`}</li>)}</ul>
      </section>
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="text-2xl font-semibold">FAQ for {v.name}</h2>
          <dl className="mt-4 space-y-4">{v.faq.map((f) => (
            <div key={f.q}>
              <dt className="font-medium text-slate">{f.q}</dt>
              <dd className="mt-1 text-muted">{f.a}</dd>
            </div>
          ))}</dl>
        </div>
      </section>
    </article>
  );
}
