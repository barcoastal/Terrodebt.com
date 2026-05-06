import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updatePage, deletePage } from "../actions";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let p: Awaited<ReturnType<typeof db.page.findUnique>> = null;
  try { p = await db.page.findUnique({ where: { id } }); } catch {}
  if (!p) notFound();

  const updateAction = async (fd: FormData) => { "use server"; await updatePage(id, fd); };
  const deleteAction = async () => { "use server"; await deletePage(id); };

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Page: {p.slug}</h1>
      <form action={updateAction} className="mt-6 space-y-4 max-w-xl">
        <Field label="Slug"><input name="slug" required defaultValue={p.slug} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Title"><input name="title" required defaultValue={p.title} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Template type">
          <select name="templateType" defaultValue={p.templateType} className="w-full border border-border rounded-md px-3 py-2">
            <option value="form">form</option><option value="call">call</option><option value="game">game</option><option value="article">article</option>
          </select>
        </Field>
        <Field label="Hero headline"><input name="heroHeadline" required defaultValue={p.heroHeadline} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Hero subline"><textarea name="heroSubline" rows={2} defaultValue={p.heroSubline ?? ""} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Content (JSON)"><textarea name="content" rows={6} defaultValue={JSON.stringify(p.content, null, 2)} className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm" /></Field>
        <Field label="Phone override"><input name="phoneOverride" defaultValue={p.phoneOverride ?? ""} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Mobile CTA">
          <select name="mobileCta" defaultValue={p.mobileCta} className="w-full border border-border rounded-md px-3 py-2">
            <option value="form">form</option><option value="call">call</option>
          </select>
        </Field>
        <label className="flex items-center gap-2"><input name="skipPreQual" type="checkbox" defaultChecked={p.skipPreQual} /> Skip pre-qualification</label>
        <label className="flex items-center gap-2"><input name="published" type="checkbox" defaultChecked={p.published} /> Published</label>
        <div className="flex gap-2">
          <button type="submit" className="bg-electric text-white px-4 py-2 rounded-md">Save</button>
          <a href={`/lp/${p.slug}`} className="px-4 py-2 border border-border rounded-md no-underline" target="_blank" rel="noreferrer">Preview</a>
        </div>
      </form>
      <form action={deleteAction} className="mt-8">
        <button type="submit" className="text-sm text-red-600">Delete page</button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-sm font-medium mb-1">{label}</label>{children}</div>;
}
