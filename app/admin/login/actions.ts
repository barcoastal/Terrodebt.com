"use server";
import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth";
import { getSession } from "@/lib/session";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
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
