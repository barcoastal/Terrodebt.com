import { createPage } from "../actions";

export default function NewPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">New Page</h1>
      <form action={createPage} className="mt-6 space-y-4 max-w-xl">
        <PageFormFields />
        <button type="submit" className="bg-electric text-white px-4 py-2 rounded-md">Create</button>
      </form>
    </div>
  );
}

function PageFormFields() {
  return (
    <>
      <Field label="Slug"><input name="slug" required className="w-full border border-border rounded-md px-3 py-2" /></Field>
      <Field label="Title"><input name="title" required className="w-full border border-border rounded-md px-3 py-2" /></Field>
      <Field label="Template type">
        <select name="templateType" defaultValue="form" className="w-full border border-border rounded-md px-3 py-2">
          <option value="form">form</option>
          <option value="call">call</option>
          <option value="game">game</option>
          <option value="article">article</option>
        </select>
      </Field>
      <Field label="Hero headline"><input name="heroHeadline" required className="w-full border border-border rounded-md px-3 py-2" /></Field>
      <Field label="Hero subline"><textarea name="heroSubline" rows={2} className="w-full border border-border rounded-md px-3 py-2" /></Field>
      <Field label="Content (JSON)"><textarea name="content" rows={6} defaultValue="{}" className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm" /></Field>
      <Field label="Phone override"><input name="phoneOverride" className="w-full border border-border rounded-md px-3 py-2" /></Field>
      <Field label="Mobile CTA">
        <select name="mobileCta" defaultValue="form" className="w-full border border-border rounded-md px-3 py-2">
          <option value="form">form</option>
          <option value="call">call</option>
        </select>
      </Field>
      <label className="flex items-center gap-2"><input name="skipPreQual" type="checkbox" /> Skip pre-qualification</label>
      <label className="flex items-center gap-2"><input name="published" type="checkbox" /> Published</label>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-sm font-medium mb-1">{label}</label>{children}</div>;
}
