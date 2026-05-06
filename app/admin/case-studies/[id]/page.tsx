import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateCaseStudy, deleteCaseStudy } from "../actions";

export default async function EditCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let c: Awaited<ReturnType<typeof db.caseStudy.findUnique>> = null;
  try { c = await db.caseStudy.findUnique({ where: { id } }); } catch {}
  if (!c) notFound();

  const updateAction = async (fd: FormData) => { "use server"; await updateCaseStudy(id, fd); };
  const deleteAction = async () => { "use server"; await deleteCaseStudy(id); };

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Case Study: {c.slug}</h1>
      <form action={updateAction} className="mt-6 space-y-4 max-w-3xl">
        <Field label="Slug"><input name="slug" required defaultValue={c.slug} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Industry"><input name="industry" required defaultValue={c.industry} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Debt amount"><input name="debtAmount" type="number" step="1" required defaultValue={c.debtAmount} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Savings %"><input name="savingsPct" type="number" step="0.1" required defaultValue={c.savingsPct} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Months"><input name="months" type="number" step="1" required defaultValue={c.months} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Hero image (URL)"><input name="heroImage" defaultValue={c.heroImage ?? ""} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Story (Markdown)"><textarea name="storyMd" rows={20} defaultValue={c.storyMd} className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm" /></Field>
        <label className="flex items-center gap-2"><input name="published" type="checkbox" defaultChecked={c.published} /> Published</label>
        <div className="flex gap-2">
          <button type="submit" className="bg-electric text-white px-4 py-2 rounded-md">Save</button>
          <a href={`/case-studies/${c.slug}`} className="px-4 py-2 border border-border rounded-md no-underline" target="_blank" rel="noreferrer">Preview</a>
        </div>
      </form>
      <form action={deleteAction} className="mt-8">
        <button type="submit" className="text-sm text-red-600">Delete case study</button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-sm font-medium mb-1">{label}</label>{children}</div>;
}
