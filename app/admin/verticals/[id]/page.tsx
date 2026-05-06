import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateVertical } from "../actions";

export default async function EditVertical({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let v: Awaited<ReturnType<typeof db.vertical.findUnique>> = null;
  try { v = await db.vertical.findUnique({ where: { id } }); } catch {}
  if (!v) notFound();

  const updateAction = async (fd: FormData) => { "use server"; await updateVertical(id, fd); };

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Vertical: {v.slug}</h1>
      <p className="text-muted text-sm">Slug is managed by lib/verticals.ts and is locked.</p>
      <form action={updateAction} className="mt-6 space-y-4 max-w-3xl">
        <Field label="Name"><input name="name" required defaultValue={v.name} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Headline"><input name="headline" required defaultValue={v.headline} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Subline"><textarea name="subline" rows={2} defaultValue={v.subline ?? ""} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Stats (JSON)"><textarea name="stats" rows={4} defaultValue={JSON.stringify(v.stats ?? null, null, 2)} className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm" /></Field>
        <Field label="Pain points (JSON)"><textarea name="painPoints" rows={6} defaultValue={JSON.stringify(v.painPoints ?? null, null, 2)} className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm" /></Field>
        <Field label="Proof (JSON)"><textarea name="proof" rows={6} defaultValue={JSON.stringify(v.proof ?? null, null, 2)} className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm" /></Field>
        <Field label="FAQ (JSON)"><textarea name="faq" rows={6} defaultValue={JSON.stringify(v.faq ?? null, null, 2)} className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm" /></Field>
        <label className="flex items-center gap-2"><input name="published" type="checkbox" defaultChecked={v.published} /> Published</label>
        <div className="flex gap-2">
          <button type="submit" className="bg-electric text-white px-4 py-2 rounded-md">Save</button>
          <a href={`/industries/${v.slug}`} className="px-4 py-2 border border-border rounded-md no-underline" target="_blank" rel="noreferrer">Preview</a>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-sm font-medium mb-1">{label}</label>{children}</div>;
}
