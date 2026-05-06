import { notFound } from "next/navigation";
import { PROGRAMS, type ProgramKey } from "@/lib/programs";
import { LeadForm } from "@/components/lead/LeadForm";

export async function generateStaticParams() {
  return Object.keys(PROGRAMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROGRAMS[slug as ProgramKey];
  if (!p) return {};
  return { title: p.title, description: p.subline };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROGRAMS[slug as ProgramKey];
  if (!p) notFound();

  return (
    <article>
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{p.headline}</h1>
            <p className="mt-4 text-lg text-muted">{p.subline}</p>
          </div>
          <LeadForm source={`program-${slug}`} />
        </div>
      </section>
      <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold">Who this is for</h2>
          <ul className="mt-4 space-y-2 text-slate">{p.whoFor.map((item) => <li key={item}>{`✓ ${item}`}</li>)}</ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-4 space-y-2 text-slate list-decimal list-inside">{p.mechanism.map((m) => <li key={m}>{m}</li>)}</ol>
        </div>
      </section>
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-12">
          <h2 className="text-2xl font-semibold">Recent example</h2>
          <p className="mt-4 text-slate">${(p.example.debt / 1000).toFixed(0)}K resolved over {p.example.months} months. Saved ${(p.example.saved / 1000).toFixed(0)}K ({Math.round((p.example.saved / p.example.debt) * 100)}%).</p>
        </div>
      </section>
    </article>
  );
}
