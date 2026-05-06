"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createArticle(fd: FormData) {
  const data = parse(fd);
  const created = await db.article.create({ data: { ...data, publishedAt: data.published ? new Date() : null } });
  redirect(`/admin/articles/${created.id}`);
}

export async function updateArticle(id: string, fd: FormData) {
  const data = parse(fd);
  const existing = await db.article.findUnique({ where: { id } });
  const publishedAt = data.published && !existing?.publishedAt ? new Date() : existing?.publishedAt ?? null;
  await db.article.update({ where: { id }, data: { ...data, publishedAt } });
  revalidatePath(`/admin/articles/${id}`);
  revalidatePath("/admin/articles");
  revalidatePath(`/articles/${data.slug}`);
}

export async function deleteArticle(id: string) {
  await db.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

function parse(fd: FormData) {
  return {
    slug: String(fd.get("slug") ?? "").trim(),
    title: String(fd.get("title") ?? ""),
    excerpt: String(fd.get("excerpt") ?? "") || null,
    contentMd: String(fd.get("contentMd") ?? ""),
    heroImage: String(fd.get("heroImage") ?? "") || null,
    author: String(fd.get("author") ?? "TerraDebt Team"),
    published: fd.get("published") === "on",
  };
}
