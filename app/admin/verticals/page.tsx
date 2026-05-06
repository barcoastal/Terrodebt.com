import Link from "next/link";
import { db } from "@/lib/db";

export default async function VerticalsIndex() {
  let verticals: Awaited<ReturnType<typeof db.vertical.findMany>> = [];
  try { verticals = await db.vertical.findMany({ orderBy: { slug: "asc" } }); } catch {}

  return (
    <>
      <h1 className="text-2xl font-bold">Verticals</h1>
      <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
        <thead className="bg-offwhite text-left">
          <tr><th className="px-3 py-2">Slug</th><th>Name</th><th>Published</th><th>Updated</th></tr>
        </thead>
        <tbody>
          {verticals.map((v) => (
            <tr key={v.id} className="border-t border-border">
              <td className="px-3 py-2"><Link href={`/admin/verticals/${v.id}`}>{v.slug}</Link></td>
              <td>{v.name}</td>
              <td>{v.published ? "Yes" : "No"}</td>
              <td>{v.updatedAt.toISOString().slice(0, 16).replace("T", " ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
