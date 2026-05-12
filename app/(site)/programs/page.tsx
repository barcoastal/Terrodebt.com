import Link from "next/link";
import type { Metadata } from "next";
import { PROGRAMS, type ProgramKey } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Methods | TerraDebt Business Debt Restructure",
  description: "Three methods that run across our six product categories: settlement, restructure, and legal defense. Free assessment to scope the right approach.",
};

export default function ProgramsIndex() {
  const keys = Object.keys(PROGRAMS) as ProgramKey[];
  return (
    <article>
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Methods</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tighter">Three methods, six product categories.</h1>
          <p className="mt-5 text-lg text-muted max-w-2xl">Each case uses the right method for the debt mix. Most cases combine more than one across MCA, SBA, equipment, vendor, bank, and tax debt.</p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {keys.map((slug) => {
          const p = PROGRAMS[slug];
          const savedPct = Math.round((p.example.saved / p.example.debt) * 100);
          return (
            <Link key={slug} href={`/programs/${slug}`} className="group surface-card p-8 no-underline transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] flex flex-col">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-slate">{p.title}</h2>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">View →</span>
              </div>
              <p className="mt-3 text-muted leading-relaxed flex-1">{p.subline}</p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                <div className="bg-offwhite border border-border rounded-md p-3">
                  <div className="font-mono text-base font-semibold text-electric">${(p.example.debt / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-muted mt-0.5">Resolved</div>
                </div>
                <div className="bg-offwhite border border-border rounded-md p-3">
                  <div className="font-mono text-base font-semibold text-electric">{savedPct}%</div>
                  <div className="text-xs text-muted mt-0.5">Saved</div>
                </div>
                <div className="bg-offwhite border border-border rounded-md p-3">
                  <div className="font-mono text-base font-semibold text-electric">{p.example.months}mo</div>
                  <div className="text-xs text-muted mt-0.5">Timeline</div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">Methods vs products</span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">Methods are how we work. Products are what we work on.</h2>
            <p className="mt-4 text-muted leading-relaxed">
              The methods on this page (settlement, restructure, legal defense) are how we resolve debt. The product categories (MCA, SBA, equipment, vendor, bank, tax) are the types of debt we work on. A typical case uses one or two methods applied across one or more product categories.
            </p>
            <Link href="/services" className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-electric no-underline hover:underline">
              See the six product categories →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
