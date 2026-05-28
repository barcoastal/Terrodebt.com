"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function markRead(id: string) {
  await db.notification.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/notifications");
  revalidatePath("/admin");
}

export async function markAllRead() {
  await db.notification.updateMany({ where: { read: false }, data: { read: true } });
  revalidatePath("/admin/notifications");
  revalidatePath("/admin");
}

export async function deleteNotification(id: string) {
  await db.notification.delete({ where: { id } });
  revalidatePath("/admin/notifications");
  revalidatePath("/admin");
}
