import Link from "next/link";
import { db } from "@/lib/db";

export default async function PagesIndex() {
  let pages: Awaited<ReturnType<typeof db.page.findMany>> = [];
  try { pages = await db.page.findMany({ orderBy: { updatedAt: "desc" } }); } catch {}

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Landing Pages</h1>
        <Link href="/admin/pages/new" className="bg-electric text-white px-3 py-1 rounded-md text-sm no-underline">New page</Link>
      </div>
      <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
        <thead className="bg-offwhite text-left">
          <tr><th className="px-3 py-2">Slug</th><th>Title</th><th>Template</th><th>Published</th><th>Updated</th></tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.id} className="border-t border-border">
              <td className="px-3 py-2"><Link href={`/admin/pages/${p.id}`}>{p.slug}</Link></td>
              <td>{p.title}</td>
              <td>{p.templateType}</td>
              <td>{p.published ? "Yes" : "No"}</td>
              <td>{p.updatedAt.toISOString().slice(0, 16).replace("T", " ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
