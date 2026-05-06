import Link from "next/link";
import { db } from "@/lib/db";

export default async function CaseStudiesIndex() {
  let items: Awaited<ReturnType<typeof db.caseStudy.findMany>> = [];
  try { items = await db.caseStudy.findMany({ orderBy: { updatedAt: "desc" } }); } catch {}

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Case Studies</h1>
        <Link href="/admin/case-studies/new" className="bg-electric text-white px-3 py-1 rounded-md text-sm no-underline">New case study</Link>
      </div>
      <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
        <thead className="bg-offwhite text-left">
          <tr><th className="px-3 py-2">Slug</th><th>Industry</th><th>Debt</th><th>Savings %</th><th>Months</th><th>Published</th></tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id} className="border-t border-border">
              <td className="px-3 py-2"><Link href={`/admin/case-studies/${c.id}`}>{c.slug}</Link></td>
              <td>{c.industry}</td>
              <td>${c.debtAmount.toLocaleString()}</td>
              <td>{c.savingsPct}%</td>
              <td>{c.months}</td>
              <td>{c.published ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
