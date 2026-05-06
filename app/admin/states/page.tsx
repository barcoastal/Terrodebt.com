import Link from "next/link";
import { db } from "@/lib/db";
import { regenerateAllStates } from "./actions";

export default async function StatesIndex() {
  let states: Awaited<ReturnType<typeof db.statePage.findMany>> = [];
  try { states = await db.statePage.findMany({ orderBy: { stateCode: "asc" } }); } catch {}

  const regen = async () => { "use server"; await regenerateAllStates(); };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">States</h1>
        <form action={regen}>
          <button type="submit" className="bg-electric text-white px-3 py-1 rounded-md text-sm">Regenerate all from template</button>
        </form>
      </div>
      <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
        <thead className="bg-offwhite text-left">
          <tr><th className="px-3 py-2">Code</th><th>Name</th><th>Published</th><th>Updated</th></tr>
        </thead>
        <tbody>
          {states.map((s) => (
            <tr key={s.id} className="border-t border-border">
              <td className="px-3 py-2"><Link href={`/admin/states/${s.stateCode}`}>{s.stateCode}</Link></td>
              <td>{s.stateName}</td>
              <td>{s.published ? "Yes" : "No"}</td>
              <td>{s.updatedAt.toISOString().slice(0, 16).replace("T", " ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
