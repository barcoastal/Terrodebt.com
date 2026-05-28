import Link from "next/link";
import { db } from "@/lib/db";
import { markRead, markAllRead, deleteNotification } from "./actions";

const PAGE_SIZE = 50;

const TYPE_LABEL: Record<string, { label: string; cls: string }> = {
  "new-lead": { label: "New lead", cls: "bg-emerald-100 text-emerald-800" },
  "postback": { label: "Postback", cls: "bg-sky-100 text-sky-800" },
  "status-change": { label: "Status", cls: "bg-violet-100 text-violet-800" },
  "integration-failure": { label: "Failure", cls: "bg-red-100 text-red-800" },
};

export default async function NotificationsPage({ searchParams }: { searchParams: Promise<{ filter?: string; page?: string; type?: string }> }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;
  const filter = sp.filter ?? "all";

  const where: Record<string, unknown> = {};
  if (filter === "unread") where.read = false;
  if (filter === "read") where.read = true;
  if (sp.type) where.type = sp.type;

  let total = 0;
  let unread = 0;
  let items: Awaited<ReturnType<typeof db.notification.findMany>> = [];
  try {
    [total, unread, items] = await Promise.all([
      db.notification.count({ where }),
      db.notification.count({ where: { read: false } }),
      db.notification.findMany({ where, orderBy: { createdAt: "desc" }, take: PAGE_SIZE, skip }),
    ]);
  } catch {}
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <form action={markAllRead}>
          <button className="text-sm text-muted hover:text-slate underline" disabled={unread === 0}>Mark all as read</button>
        </form>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <FilterLink current={filter} value="all" label={`All (${total})`} />
        <FilterLink current={filter} value="unread" label={`Unread (${unread})`} />
        <FilterLink current={filter} value="read" label="Read" />
        <div className="ml-4 flex gap-2 items-center">
          <span className="text-xs text-muted">type:</span>
          <TypeLink type={sp.type} value="" label="all" />
          <TypeLink type={sp.type} value="new-lead" label="new-lead" />
          <TypeLink type={sp.type} value="postback" label="postback" />
          <TypeLink type={sp.type} value="status-change" label="status" />
          <TypeLink type={sp.type} value="integration-failure" label="failure" />
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {items.length === 0 && <li className="text-sm text-muted">No notifications match.</li>}
        {items.map((n) => {
          const meta = TYPE_LABEL[n.type] ?? { label: n.type, cls: "bg-offwhite text-muted" };
          return (
            <li key={n.id} className={`surface-card p-4 flex items-start gap-4 ${n.read ? "opacity-70" : ""}`}>
              <span className={`inline-block text-xs font-semibold rounded-full px-2 py-0.5 mt-0.5 ${meta.cls}`}>{meta.label}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate text-sm">{n.title}</div>
                {n.body && <div className="text-sm text-muted mt-0.5 break-words">{n.body}</div>}
                <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                  <span className="font-mono">{n.createdAt.toISOString().slice(0, 19).replace("T", " ")}</span>
                  {n.leadId && <Link href={`/admin/leads/${n.leadId}`} className="text-electric hover:underline">Open lead →</Link>}
                  {n.postbackId && <Link href="/admin/postbacks" className="text-electric hover:underline">Open postback →</Link>}
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                {!n.read && (
                  <form action={async () => { "use server"; await markRead(n.id); }}>
                    <button className="text-xs text-muted hover:text-slate underline">Mark read</button>
                  </form>
                )}
                <form action={async () => { "use server"; await deleteNotification(n.id); }}>
                  <button className="text-xs text-red-700 hover:underline">Delete</button>
                </form>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex justify-between items-center text-sm text-muted">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          {page > 1 && <Link href={buildHref({ ...sp, page: String(page - 1) })} className="px-3 py-1 border border-border rounded-md no-underline">Previous</Link>}
          {page < totalPages && <Link href={buildHref({ ...sp, page: String(page + 1) })} className="px-3 py-1 border border-border rounded-md no-underline">Next</Link>}
        </div>
      </div>
    </>
  );
}

function buildHref(sp: Record<string, string | undefined>): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) if (v) params.set(k, v);
  return `/admin/notifications?${params.toString()}`;
}

function FilterLink({ current, value, label }: { current: string; value: string; label: string }) {
  const active = current === value;
  return (
    <Link
      href={`/admin/notifications?filter=${value}`}
      className={`px-3 py-1 rounded-md text-sm no-underline ${active ? "bg-slate text-white" : "border border-border text-slate hover:bg-offwhite"}`}
    >
      {label}
    </Link>
  );
}

function TypeLink({ type, value, label }: { type: string | undefined; value: string; label: string }) {
  const active = (type ?? "") === value;
  const params = new URLSearchParams();
  if (value) params.set("type", value);
  return (
    <Link
      href={`/admin/notifications${params.toString() ? `?${params.toString()}` : ""}`}
      className={`text-xs px-2 py-0.5 rounded-full ${active ? "bg-slate text-white" : "bg-offwhite text-muted hover:text-slate"}`}
    >
      {label}
    </Link>
  );
}
