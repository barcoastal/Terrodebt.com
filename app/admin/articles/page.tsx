import Link from "next/link";
import { db } from "@/lib/db";
import type { Prisma } from "@/app/generated/prisma";
import { importSeedArticles } from "./actions";

const PAGE_SIZE = 20;

type SortKey = "recent" | "views" | "oldest";

function fmt(d: Date | null | undefined): string {
  if (!d) return "-";
  return d.toISOString().slice(0, 16).replace("T", " ");
}

export default async function ArticlesIndex({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; sort?: SortKey; page?: string; imported?: string; updated?: string }> }) {
  const sp = await searchParams;
  const sort: SortKey = (sp.sort as SortKey) ?? "recent";
  const status = sp.status ?? "";
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where: Prisma.ArticleWhereInput = {};
  if (sp.q) {
    where.OR = [
      { title: { contains: sp.q, mode: "insensitive" } },
      { slug: { contains: sp.q, mode: "insensitive" } },
    ];
  }
  if (status === "published") where.published = true;
  if (status === "draft") where.published = false;

  const orderBy: Prisma.ArticleOrderByWithRelationInput =
    sort === "views" ? { viewCount: "desc" }
    : sort === "oldest" ? { createdAt: "asc" }
    : { updatedAt: "desc" };

  let articles: Awaited<ReturnType<typeof db.article.findMany>> = [];
  let total = 0;
  let totalArticles = 0;
  let publishedCount = 0;
  let viewSum = 0;

  try {
    [articles, total, totalArticles, publishedCount] = await Promise.all([
      db.article.findMany({ where, orderBy, take: PAGE_SIZE, skip }),
      db.article.count({ where }),
      db.article.count(),
      db.article.count({ where: { published: true } }),
    ]);
    const agg = await db.article.aggregate({ _sum: { viewCount: true } });
    viewSum = agg._sum.viewCount ?? 0;
  } catch {}

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = { q: sp.q, status: sp.status, sort: sp.sort, page: String(page), ...overrides };
    for (const [k, v] of Object.entries(merged)) {
      if (v) params.set(k, v);
    }
    return `/admin/articles?${params.toString()}`;
  };

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Articles</h1>
        <div className="flex gap-2">
          <form action={importSeedArticles}>
            <button type="submit" className="bg-white border border-border text-slate px-3 py-2 rounded-md text-sm hover:border-electric transition">
              Import 20 seed articles
            </button>
          </form>
          <Link href="/admin/articles/new" className="bg-electric text-white px-3 py-2 rounded-md text-sm no-underline">New article</Link>
        </div>
      </div>

      {(sp.imported || sp.updated) && (
        <div className="mt-3 surface-card p-3 text-sm text-slate">
          Imported {sp.imported ?? "0"} new articles. Updated {sp.updated ?? "0"} existing.
        </div>
      )}

      <form className="mt-4 flex flex-wrap gap-2 text-sm">
        <input name="q" defaultValue={sp.q ?? ""} placeholder="search by title or slug" className="border border-border rounded-md px-3 py-2 flex-1 min-w-[240px]" />
        <select name="status" defaultValue={status} className="border border-border rounded-md px-3 py-2">
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select name="sort" defaultValue={sort} className="border border-border rounded-md px-3 py-2">
          <option value="recent">Most recent</option>
          <option value="views">Most viewed</option>
          <option value="oldest">Oldest</option>
        </select>
        <button className="bg-slate text-white px-3 py-2 rounded-md">Filter</button>
      </form>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <Stat label="Total articles" value={totalArticles.toLocaleString()} />
        <Stat label="Published" value={publishedCount.toLocaleString()} />
        <Stat label="Total views" value={viewSum.toLocaleString()} />
      </div>

      <div className="mt-6 surface-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-offwhite text-left">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Author</th>
              <th>Views</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 && (
              <tr><td className="px-3 py-4 text-muted" colSpan={7}>No articles match these filters.</td></tr>
            )}
            {articles.map((a) => (
              <tr key={a.id} className="border-t border-border">
                <td className="px-3 py-2"><Link href={`/admin/articles/${a.id}`}>{a.title}</Link></td>
                <td className="font-mono text-xs">{a.slug}</td>
                <td>
                  {a.published ? (
                    <span className="inline-block bg-electric text-white text-xs font-semibold rounded-full px-2 py-0.5">Published</span>
                  ) : (
                    <span className="inline-block bg-offwhite text-muted text-xs rounded-full px-2 py-0.5">Draft</span>
                  )}
                </td>
                <td>{a.author}</td>
                <td className="font-mono">{a.viewCount.toLocaleString()}</td>
                <td>{fmt(a.updatedAt)}</td>
                <td><Link href={`/admin/articles/${a.id}`} className="text-electric">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-muted">Page {page} of {totalPages} · {total.toLocaleString()} match</div>
        <div className="flex gap-2">
          {page > 1 && <Link href={buildHref({ page: String(page - 1) })} className="px-3 py-1 border border-border rounded-md no-underline">Previous</Link>}
          {page < totalPages && <Link href={buildHref({ page: String(page + 1) })} className="px-3 py-1 border border-border rounded-md no-underline">Next</Link>}
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="surface-card p-4">
      <div className="text-xs text-muted uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-bold mt-1 text-slate">{value}</div>
    </div>
  );
}
