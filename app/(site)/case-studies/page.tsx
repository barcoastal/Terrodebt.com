import Link from "next/link";
import { db } from "@/lib/db";

export const metadata = { title: "Case Studies", description: "Real MCA debt outcomes from TerraDebt clients." };

export default async function CaseStudiesIndex() {
  let studies: Awaited<ReturnType<typeof db.caseStudy.findMany>> = [];
  try {
    studies = await db.caseStudy.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  } catch {}
  return (
    <section className="mx-auto max-w-content px-6 py-20">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Case Studies</h1>
      {studies.length === 0 && <p className="text-muted mt-4">Case studies coming soon.</p>}
      <div className="mt-10 grid md:grid-cols-2 gap-4">
        {studies.map((s) => (
          <Link key={s.id} href={`/case-studies/${s.slug}`} className="group block surface-card p-6 no-underline hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] hover:border-electric/40 transition-all">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{s.industry}</div>
            <div className="mt-3 font-mono text-2xl md:text-3xl font-semibold text-slate tracking-tight">${(s.debtAmount / 1000).toFixed(0)}K resolved</div>
            <div className="mt-2 flex gap-4 text-sm">
              <span className="font-mono text-electric font-semibold">{s.savingsPct}% saved</span>
              <span className="font-mono text-muted">{s.months} months</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
