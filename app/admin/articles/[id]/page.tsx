import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateArticle, deleteArticle } from "../actions";

export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let a: Awaited<ReturnType<typeof db.article.findUnique>> = null;
  try { a = await db.article.findUnique({ where: { id } }); } catch {}
  if (!a) notFound();

  const updateAction = async (fd: FormData) => { "use server"; await updateArticle(id, fd); };
  const deleteAction = async () => { "use server"; await deleteArticle(id); };

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Article: {a.slug}</h1>
      <form action={updateAction} className="mt-6 space-y-4 max-w-3xl">
        <Field label="Slug"><input name="slug" required defaultValue={a.slug} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Title"><input name="title" required defaultValue={a.title} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Excerpt"><textarea name="excerpt" rows={2} defaultValue={a.excerpt ?? ""} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Hero image (URL)"><input name="heroImage" defaultValue={a.heroImage ?? ""} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Author"><input name="author" defaultValue={a.author} className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Content (Markdown)"><textarea name="contentMd" rows={20} defaultValue={a.contentMd} className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm" /></Field>
        <label className="flex items-center gap-2"><input name="published" type="checkbox" defaultChecked={a.published} /> Published</label>
        <div className="flex gap-2">
          <button type="submit" className="bg-electric text-white px-4 py-2 rounded-md">Save</button>
          <a href={`/articles/${a.slug}`} className="px-4 py-2 border border-border rounded-md no-underline" target="_blank" rel="noreferrer">Preview</a>
        </div>
      </form>
      <form action={deleteAction} className="mt-8">
        <button type="submit" className="text-sm text-red-600">Delete article</button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-sm font-medium mb-1">{label}</label>{children}</div>;
}
