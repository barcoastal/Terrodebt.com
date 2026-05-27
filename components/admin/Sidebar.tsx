import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

const ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/pages", label: "Landing Pages" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/verticals", label: "Verticals" },
  { href: "/admin/states", label: "States" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/visitors", label: "Visitors" },
  { href: "/admin/events", label: "Event center" },
  { href: "/admin/postbacks", label: "Postbacks" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminSidebar() {
  return (
    <aside className="w-60 border-r border-border bg-white min-h-screen flex flex-col">
      <div className="px-4 py-4 font-bold text-slate">Business Debt Insider Admin</div>
      <nav className="px-2 space-y-1 text-sm flex-1">
        {ITEMS.map((i) => (
          <Link key={i.href} href={i.href} className="block px-3 py-2 rounded-md hover:bg-offwhite no-underline text-slate">{i.label}</Link>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <LogoutButton />
      </div>
    </aside>
  );
}
