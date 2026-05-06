"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createCaseStudy(fd: FormData) {
  const data = parse(fd);
  const created = await db.caseStudy.create({ data });
  redirect(`/admin/case-studies/${created.id}`);
}

export async function updateCaseStudy(id: string, fd: FormData) {
  const data = parse(fd);
  await db.caseStudy.update({ where: { id }, data });
  revalidatePath(`/admin/case-studies/${id}`);
  revalidatePath("/admin/case-studies");
  revalidatePath(`/case-studies/${data.slug}`);
}

export async function deleteCaseStudy(id: string) {
  await db.caseStudy.delete({ where: { id } });
  revalidatePath("/admin/case-studies");
  redirect("/admin/case-studies");
}

function parse(fd: FormData) {
  return {
    slug: String(fd.get("slug") ?? "").trim(),
    industry: String(fd.get("industry") ?? ""),
    debtAmount: Number(fd.get("debtAmount") ?? 0) || 0,
    savingsPct: Number(fd.get("savingsPct") ?? 0) || 0,
    months: Math.round(Number(fd.get("months") ?? 0)) || 0,
    storyMd: String(fd.get("storyMd") ?? ""),
    heroImage: String(fd.get("heroImage") ?? "") || null,
    published: fd.get("published") === "on",
  };
}
