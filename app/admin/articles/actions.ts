"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ARTICLE_SEEDS } from "@/lib/seed-data/articles";

export async function publishAllArticles() {
  const res = await db.article.updateMany({
    where: { published: false },
    data: { published: true, publishedAt: new Date() },
  });
  revalidatePath("/admin/articles");
  revalidatePath("/insights");
  redirect(`/admin/articles?published=${res.count}`);
}

export async function importSeedArticles() {
  let inserted = 0;
  let updated = 0;
  for (const a of ARTICLE_SEEDS) {
    const existing = await db.article.findUnique({ where: { slug: a.slug } });
    if (existing) {
      await db.article.update({
        where: { slug: a.slug },
        data: { ...a, published: true, publishedAt: existing.publishedAt ?? new Date() },
      });
      updated += 1;
    } else {
      await db.article.create({
        data: { ...a, published: true, publishedAt: new Date() },
      });
      inserted += 1;
    }
  }
  revalidatePath("/admin/articles");
  revalidatePath("/insights");
  redirect(`/admin/articles?imported=${inserted}&updated=${updated}`);
}

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
    author: String(fd.get("author") ?? "Business Debt Insider Team"),
    published: fd.get("published") === "on",
  };
}
