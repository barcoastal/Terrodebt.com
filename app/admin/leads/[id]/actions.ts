"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function updateLeadStatus(id: string, status: string) {
  await db.lead.update({ where: { id }, data: { status } });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
}
