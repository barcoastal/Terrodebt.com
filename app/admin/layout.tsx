import { AdminShell } from "@/components/admin/AdminShell";
import { db } from "@/lib/db";

export const metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let unreadCount = 0;
  try {
    unreadCount = await db.notification.count({ where: { read: false } });
  } catch {}
  return <AdminShell unreadCount={unreadCount}>{children}</AdminShell>;
}
