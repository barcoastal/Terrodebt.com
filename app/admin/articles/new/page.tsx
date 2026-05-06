import { createArticle } from "../actions";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">New Article</h1>
      <form action={createArticle} className="mt-6 space-y-4 max-w-3xl">
        <Field label="Slug"><input name="slug" required className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Title"><input name="title" required className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Excerpt"><textarea name="excerpt" rows={2} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Hero image (URL)"><input name="heroImage" className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Author"><input name="author" defaultValue="TerraDebt Team" className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Content (Markdown)"><textarea name="contentMd" rows={20} className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm" /></Field>
        <label className="flex items-center gap-2"><input name="published" type="checkbox" /> Published</label>
        <button type="submit" className="bg-electric text-white px-4 py-2 rounded-md">Create</button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-sm font-medium mb-1">{label}</label>{children}</div>;
}
