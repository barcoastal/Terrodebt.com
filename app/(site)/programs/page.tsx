import Link from "next/link";
import type { Metadata } from "next";
import { PROGRAMS, type ProgramKey } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Programs",
  description: "Settlement, restructure, reverse consolidation defense, and legal defense. Four programs, one published flat fee.",
};

export default function ProgramsIndex() {
  const keys = Object.keys(PROGRAMS) as ProgramKey[];
  return (
    <article>
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Programs</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tighter">Four programs. One published flat fee.</h1>
          <p className="mt-5 text-lg text-muted max-w-2xl">Each program is built for a specific situation. We tell you which one fits before we propose anything.</p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        {keys.map((slug) => {
          const p = PROGRAMS[slug];
          const savedPct = Math.round((p.example.saved / p.example.debt) * 100);
          return (
            <Link key={slug} href={`/programs/${slug}`} className="group surface-card p-8 no-underline transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] flex flex-col">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-slate">{p.title}</h2>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">View →</span>
              </div>
              <p className="mt-3 text-muted leading-relaxed">{p.subline}</p>
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
    </article>
  );
}
