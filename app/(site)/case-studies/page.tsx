import Link from "next/link";
import { db } from "@/lib/db";

export const metadata = { title: "Case Studies", description: "Real MCA debt outcomes from TerraDebt clients." };

export default async function CaseStudiesIndex() {
  let studies: Awaited<ReturnType<typeof db.caseStudy.findMany>> = [];
  try {
    studies = await db.caseStudy.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  } catch {}
  return (
    <section className="mx-auto max-w-content px-6 py-16">
      <h1 className="text-4xl font-bold">Case Studies</h1>
      {studies.length === 0 && <p className="text-muted mt-4">Case studies coming soon.</p>}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {studies.map((s) => (
          <Link key={s.id} href={`/case-studies/${s.slug}`} className="block p-6 bg-white border border-border rounded-xl no-underline hover:border-electric hover:no-underline">
            <div className="text-sm text-muted">{s.industry}</div>
            <div className="mt-1 text-xl font-semibold text-slate">${(s.debtAmount / 1000).toFixed(0)}K resolved · {s.savingsPct}% saved · {s.months} months</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
