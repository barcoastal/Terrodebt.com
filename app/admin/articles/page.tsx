import Link from "next/link";
import { db } from "@/lib/db";

export default async function ArticlesIndex() {
  let articles: Awaited<ReturnType<typeof db.article.findMany>> = [];
  try { articles = await db.article.findMany({ orderBy: { updatedAt: "desc" } }); } catch {}

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link href="/admin/articles/new" className="bg-electric text-white px-3 py-1 rounded-md text-sm no-underline">New article</Link>
      </div>
      <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
        <thead className="bg-offwhite text-left">
          <tr><th className="px-3 py-2">Slug</th><th>Title</th><th>Published</th><th>Updated</th></tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} className="border-t border-border">
              <td className="px-3 py-2"><Link href={`/admin/articles/${a.id}`}>{a.slug}</Link></td>
              <td>{a.title}</td>
              <td>{a.published ? "Yes" : "No"}</td>
              <td>{a.updatedAt.toISOString().slice(0, 16).replace("T", " ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
