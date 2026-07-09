import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const DAY_MS = 86400000;
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Planned cadence, shown for future days: daily image post, reels Tue + Thu.
function plannedFor(date: Date): string[] {
  const planned = ["Image post 10:00"];
  const dow = date.getDay(); // 2 = Tue, 4 = Thu
  if (dow === 2 || dow === 4) planned.push("Reel 13:00");
  return planned;
}

export default async function SocialCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ m?: string }>;
}) {
  const sp = await searchParams;
  const now = new Date();
  const [y, m] = (sp.m ?? `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`)
    .split("-")
    .map(Number);
  const monthStart = new Date(y, m - 1, 1);
  const monthEnd = new Date(y, m, 1);
  const prev = `${m === 1 ? y - 1 : y}-${String(m === 1 ? 12 : m - 1).padStart(2, "0")}`;
  const next = `${m === 12 ? y + 1 : y}-${String(m === 12 ? 1 : m + 1).padStart(2, "0")}`;

  let posts: Awaited<ReturnType<typeof db.socialPost.findMany>> = [];
  let total = 0;
  let reels = 0;
  try {
    [posts, total, reels] = await Promise.all([
      db.socialPost.findMany({
        where: { publishedAt: { gte: monthStart, lt: monthEnd } },
        orderBy: { publishedAt: "asc" },
      }),
      db.socialPost.count(),
      db.socialPost.count({ where: { type: "reel" } }),
    ]);
  } catch {}

  const byDay = new Map<number, typeof posts>();
  for (const p of posts) {
    const day = p.publishedAt.getDate();
    byDay.set(day, [...(byDay.get(day) ?? []), p]);
  }

  // Monday-first grid
  const firstDow = (monthStart.getDay() + 6) % 7;
  const daysInMonth = Math.round((monthEnd.getTime() - monthStart.getTime()) / DAY_MS);
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const monthName = monthStart.toLocaleString("en-US", { month: "long", year: "numeric" });
  const today = new Date();
  const isThisMonth = today.getFullYear() === y && today.getMonth() === m - 1;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Social calendar</h1>
        <div className="flex items-center gap-3 text-sm">
          <Link href={`/admin/social?m=${prev}`} className="text-muted hover:text-slate">← {prev}</Link>
          <span className="font-semibold">{monthName}</span>
          <Link href={`/admin/social?m=${next}`} className="text-muted hover:text-slate">{next} →</Link>
        </div>
      </div>
      <p className="text-sm text-muted mt-1">
        Published Facebook + Instagram posts, plus the planned auto-post schedule (daily image at
        10:00, reels Tue and Thu at 13:00). {total} posts published so far, {reels} reels.
      </p>

      <div className="mt-6 grid grid-cols-7 gap-px bg-border border border-border rounded-lg overflow-hidden text-xs">
        {WEEKDAYS.map((d) => (
          <div key={d} className="bg-offwhite px-2 py-1.5 font-semibold text-muted uppercase tracking-wide">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} className="bg-white min-h-28" />;
          const date = new Date(y, m - 1, day);
          const isToday = isThisMonth && today.getDate() === day;
          const isFuture = date.getTime() > today.getTime() - (today.getTime() % DAY_MS) + (isToday ? DAY_MS : 0);
          const dayPosts = byDay.get(day) ?? [];
          return (
            <div key={day} className={`bg-white min-h-28 p-1.5 ${isToday ? "ring-2 ring-inset ring-electric" : ""}`}>
              <div className={`font-mono ${isToday ? "text-electric font-bold" : "text-muted"}`}>{day}</div>
              <div className="mt-1 space-y-1">
                {dayPosts.map((p) => (
                  <a
                    key={p.id}
                    href={p.igPermalink ?? p.mediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`block px-1.5 py-1 rounded no-underline truncate ${
                      p.status === "failed"
                        ? "bg-red-50 text-red-700"
                        : p.type === "reel"
                          ? "bg-electric/15 text-electric font-medium"
                          : "bg-offwhite text-slate"
                    }`}
                    title={p.caption}
                  >
                    {p.type === "reel" ? "▶ " : "▦ "}
                    {p.slug ?? p.caption.slice(0, 30)}
                  </a>
                ))}
                {dayPosts.length === 0 &&
                  isFuture &&
                  plannedFor(date).map((label) => (
                    <div key={label} className="px-1.5 py-1 rounded border border-dashed border-border text-muted truncate">
                      {label}
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Recent posts</h2>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          {posts
            .slice()
            .reverse()
            .slice(0, 10)
            .map((p) => (
              <div key={p.id} className="border border-border rounded-lg p-3 flex gap-3 bg-white">
                {p.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.mediaUrl} alt="" className="w-16 h-16 object-cover rounded" />
                ) : (
                  <div className="w-16 h-16 rounded bg-slate text-white flex items-center justify-center text-xl">▶</div>
                )}
                <div className="min-w-0 text-sm">
                  <div className="font-medium text-slate truncate">{p.slug ?? "post"}</div>
                  <div className="text-muted text-xs mt-0.5 line-clamp-2">{p.caption}</div>
                  <div className="mt-1 flex gap-3 text-xs">
                    {p.igPermalink && (
                      <a href={p.igPermalink} target="_blank" rel="noreferrer" className="text-electric">
                        Instagram →
                      </a>
                    )}
                    {p.fbPostId && (
                      <a
                        href={`https://www.facebook.com/${p.fbPostId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-electric"
                      >
                        Facebook →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          {posts.length === 0 && <p className="text-sm text-muted">No posts recorded this month.</p>}
        </div>
      </section>
    </>
  );
}
