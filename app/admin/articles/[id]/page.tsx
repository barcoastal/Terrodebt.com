import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { updateArticle, deleteArticle } from "../actions";

export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let a: Awaited<ReturnType<typeof db.article.findUnique>> = null;
  try { a = await db.article.findUnique({ where: { id } }); } catch {}
  if (!a) notFound();

  const onSave = async (fd: FormData) => { "use server"; await updateArticle(id, fd); };
  const onDelete = async () => { "use server"; await deleteArticle(id); };

  return (
    <ArticleEditor
      mode="edit"
      articleSlug={a.slug}
      articlePublished={a.published}
      initial={{
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        contentMd: a.contentMd,
        heroImage: a.heroImage,
        author: a.author,
        published: a.published,
      }}
      onSave={onSave}
      onDelete={onDelete}
    />
  );
}
