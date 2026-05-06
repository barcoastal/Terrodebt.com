import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateState } from "../actions";

export default async function EditState({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  let s: Awaited<ReturnType<typeof db.statePage.findUnique>> = null;
  try { s = await db.statePage.findUnique({ where: { stateCode: code } }); } catch {}
  if (!s) notFound();

  const updateAction = async (fd: FormData) => { "use server"; await updateState(code, fd); };

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit State: {s.stateName} ({s.stateCode})</h1>
      <form action={updateAction} className="mt-6 space-y-4 max-w-3xl">
        <Field label="Content (JSON)"><textarea name="content" rows={20} defaultValue={JSON.stringify(s.content, null, 2)} className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm" /></Field>
        <label className="flex items-center gap-2"><input name="published" type="checkbox" defaultChecked={s.published} /> Published</label>
        <div className="flex gap-2">
          <button type="submit" className="bg-electric text-white px-4 py-2 rounded-md">Save</button>
          <a href={`/mca-defense/${s.stateCode.toLowerCase()}`} className="px-4 py-2 border border-border rounded-md no-underline" target="_blank" rel="noreferrer">Preview</a>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-sm font-medium mb-1">{label}</label>{children}</div>;
}
