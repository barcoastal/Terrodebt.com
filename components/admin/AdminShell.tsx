"use client";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./Sidebar";

export function AdminShell({ children, unreadCount = 0 }: { children: React.ReactNode; unreadCount?: number }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }
  return (
    <div className="flex bg-offwhite min-h-screen">
      <AdminSidebar unreadCount={unreadCount} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
