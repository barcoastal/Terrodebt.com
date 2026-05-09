"use server";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { verifyCredentials } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

const BOOTSTRAP_EMAIL = process.env.SEED_ADMIN_EMAIL ?? "admin";
const BOOTSTRAP_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "fdshisddns";

async function bootstrapAdminIfNeeded() {
  try {
    const count = await db.user.count();
    if (count > 0) return;
    const passwordHash = await bcrypt.hash(BOOTSTRAP_PASSWORD, 10);
    await db.user.create({
      data: { email: BOOTSTRAP_EMAIL, passwordHash, role: "admin" },
    });
  } catch (e) {
    console.error("admin bootstrap failed", e);
  }
}

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  await bootstrapAdminIfNeeded();

  const user = await verifyCredentials(email, password);
  if (!user) {
    redirect("/admin/login?error=invalid");
  }
  const session = await getSession();
  session.userId = user.id;
  session.email = user.email;
  await session.save();
  redirect("/admin");
}
