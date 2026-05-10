import Link from "next/link";
import { db } from "@/lib/db";
import { publishAllCaseStudies, importSeedCaseStudies } from "./actions";

export default async function CaseStudiesIndex({ searchParams }: { searchParams: Promise<{ imported?: string; updated?: string; published?: string }> }) {
  const sp = await searchParams;
  let items: Awaited<ReturnType<typeof db.caseStudy.findMany>> = [];
  try { items = await db.caseStudy.findMany({ orderBy: { updatedAt: "desc" } }); } catch {}

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Case Studies</h1>
        <div className="flex gap-2">
          <form action={publishAllCaseStudies}>
            <button type="submit" className="bg-white border border-border text-slate px-3 py-2 rounded-md text-sm hover:border-electric transition">
              Publish all
            </button>
          </form>
          <form action={importSeedCaseStudies}>
            <button type="submit" className="bg-white border border-border text-slate px-3 py-2 rounded-md text-sm hover:border-electric transition">
              Import 10 seed studies
            </button>
          </form>
          <Link href="/admin/case-studies/new" className="bg-electric text-white px-3 py-2 rounded-md text-sm no-underline">New case study</Link>
        </div>
      </div>

      {(sp.imported || sp.updated) && (
        <div className="mt-3 surface-card p-3 text-sm text-slate">
          Imported {sp.imported ?? "0"} new case studies. Updated {sp.updated ?? "0"} existing.
        </div>
      )}
      {sp.published && (
        <div className="mt-3 surface-card p-3 text-sm text-slate">
          Published {sp.published} previously-draft case stud{sp.published === "1" ? "y" : "ies"}.
        </div>
      )}

      <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
        <thead className="bg-offwhite text-left">
          <tr><th className="px-3 py-2">Slug</th><th>Industry</th><th>Debt</th><th>Savings %</th><th>Months</th><th>Published</th></tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr><td className="px-3 py-4 text-muted" colSpan={6}>No case studies yet. Click &ldquo;Import 10 seed studies&rdquo; to start.</td></tr>
          )}
          {items.map((c) => (
            <tr key={c.id} className="border-t border-border">
              <td className="px-3 py-2"><Link href={`/admin/case-studies/${c.id}`}>{c.slug}</Link></td>
              <td>{c.industry}</td>
              <td>${c.debtAmount.toLocaleString()}</td>
              <td>{c.savingsPct}%</td>
              <td>{c.months}</td>
              <td>
                {c.published
                  ? <span className="inline-block bg-electric text-white text-xs font-semibold rounded-full px-2 py-0.5">Yes</span>
                  : <span className="inline-block bg-offwhite text-muted text-xs rounded-full px-2 py-0.5">Draft</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
