import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PROGRAMS, type ProgramKey } from "@/lib/programs";
import { LeadForm } from "@/components/lead/LeadForm";

const PROGRAM_META: Record<ProgramKey, { title: string; description: string }> = {
  "settlement": {
    title: "Debt Settlement | Business Debt Insider",
    description: "Settle distressed business debt at typically 40 to 75 percent of face balance. Used across MCAs, vendor debt, and IRS or state tax debt.",
  },
  "restructure": {
    title: "Debt Restructure | Business Debt Insider",
    description: "Renegotiate terms without settling. Used across MCAs, equipment finance, and bank workouts to preserve lender relationships.",
  },
  "legal-defense": {
    title: "Legal Defense | Business Debt Insider",
    description: "72-hour coordinated counsel for confessions of judgment, frozen accounts, levies, and active litigation against any business debt.",
  },
};

export async function generateStaticParams() {
  return Object.keys(PROGRAMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAMS[slug as ProgramKey];
  if (!p) return {};
  const meta = PROGRAM_META[slug as ProgramKey];
  return { title: meta.title, description: meta.description };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROGRAMS[slug as ProgramKey];
  if (!p) notFound();

  return (
    <article>
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
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Recent example</h2>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl">
            <div className="surface-card p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">Resolved</div>
              <div className="mt-2 font-mono text-2xl md:text-3xl font-semibold text-slate tracking-tight">${(p.example.debt / 1000).toFixed(0)}K</div>
            </div>
            <div className="surface-card p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">Saved</div>
              <div className="mt-2 font-mono text-2xl md:text-3xl font-semibold text-electric tracking-tight">{Math.round((p.example.saved / p.example.debt) * 100)}%</div>
            </div>
            <div className="surface-card p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">Months</div>
              <div className="mt-2 font-mono text-2xl md:text-3xl font-semibold text-slate tracking-tight">{p.example.months}</div>
            </div>
          </div>
          <Link href="/services" className="mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-electric no-underline hover:underline">
            See the five product categories →
          </Link>
        </div>
      </section>
    </article>
  );
}
