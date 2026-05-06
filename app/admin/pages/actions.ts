"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createPage(formData: FormData) {
  const data = parsePageForm(formData);
  const created = await db.page.create({ data });
  redirect(`/admin/pages/${created.id}`);
}

export async function updatePage(id: string, formData: FormData) {
  const data = parsePageForm(formData);
  await db.page.update({ where: { id }, data });
  revalidatePath(`/admin/pages/${id}`);
  revalidatePath(`/admin/pages`);
  revalidatePath(`/lp/${data.slug}`);
}

export async function deletePage(id: string) {
  await db.page.delete({ where: { id } });
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

function parsePageForm(fd: FormData) {
  let parsedContent: object = {};
  const raw = String(fd.get("content") ?? "{}");
  try { parsedContent = JSON.parse(raw); } catch { parsedContent = { _raw: raw }; }

  return {
    slug: String(fd.get("slug") ?? "").trim(),
    templateType: String(fd.get("templateType") ?? "form"),
    title: String(fd.get("title") ?? ""),
    heroHeadline: String(fd.get("heroHeadline") ?? ""),
    heroSubline: String(fd.get("heroSubline") ?? "") || null,
    content: parsedContent,
    phoneOverride: String(fd.get("phoneOverride") ?? "") || null,
    mobileCta: String(fd.get("mobileCta") ?? "form"),
    skipPreQual: fd.get("skipPreQual") === "on",
    published: fd.get("published") === "on",
  };
}
