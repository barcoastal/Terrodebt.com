import Link from "next/link";
import { db } from "@/lib/db";
import { LP_CONFIGS } from "@/lib/lp-config";

async function readSetting(key: string): Promise<string> {
  try {
    const row = await db.setting.findUnique({ where: { key } });
    if (!row) return "";
    const v = row.value;
    return typeof v === "string" ? v : "";
  } catch { return ""; }
}

export default async function PagesIndex() {
  let pages: Awaited<ReturnType<typeof db.page.findMany>> = [];
  try { pages = await db.page.findMany({ orderBy: { updatedAt: "desc" } }); } catch {}

  const lpRows = await Promise.all(
    Object.values(LP_CONFIGS).map(async (lp) => {
      const settingKey =
        lp.id === "google" ? "zapier_webhook_google"
        : lp.id === "affiliate" ? "zapier_webhook_affiliate"
        : "zapier_webhook_default";
      const webhook = await readSetting(settingKey);
      return { ...lp, webhook, settingKey };
    })
  );

  return (
    <>
      {/* Code-based landing pages */}
      <div>
        <h1 className="text-2xl font-bold">Landing pages (code-based)</h1>
        <p className="mt-2 text-sm text-muted">These live in the codebase under <code className="bg-offwhite px-1.5 py-0.5 rounded font-mono text-xs">app/(landing)/go/[id]</code>. Configure each one&apos;s Zapier webhook in <Link href="/admin/settings" className="text-electric">Settings</Link>.</p>

        <div className="mt-4 overflow-x-auto bg-white border border-border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-offwhite text-left">
              <tr>
                <th className="px-3 py-2">Live URL</th>
                <th>Source tag</th>
                <th>Headline</th>
                <th>Zapier webhook</th>
              </tr>
            </thead>
            <tbody>
              {lpRows.map((lp) => (
                <tr key={lp.id} className="border-t border-border">
                  <td className="px-3 py-2">
                    <a href={`/go/${lp.id}`} target="_blank" rel="noreferrer" className="font-mono text-xs text-electric no-underline hover:underline">
                      /go/{lp.id} →
                    </a>
                  </td>
                  <td className="font-mono text-xs">{lp.source}</td>
                  <td className="text-slate">
                    {lp.headlineLead} <span className="text-electric">{lp.headlineAccent}</span> {lp.headlineTail}
                  </td>
                  <td>
                    {lp.webhook ? (
                      <span className="inline-flex items-center gap-1.5 text-xs">
                        <span className="w-2 h-2 rounded-full bg-electric" />
                        <span className="font-mono text-muted truncate max-w-[280px]">{lp.webhook.slice(0, 48)}{lp.webhook.length > 48 ? "..." : ""}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                        <span className="w-2 h-2 rounded-full bg-border" />
                        Not configured · falls back to default
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DB-backed landing pages */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Landing pages (CMS-backed)</h2>
          <Link href="/admin/pages/new" className="bg-electric text-white px-3 py-1.5 rounded-md text-sm no-underline">New page</Link>
        </div>
        <p className="mt-2 text-sm text-muted">Custom landing pages stored in the DB. Use these for one-off campaigns, ad creatives, or partner pages. They render at <code className="bg-offwhite px-1.5 py-0.5 rounded font-mono text-xs">/lp/[slug]</code>.</p>

        <div className="mt-4 overflow-x-auto bg-white border border-border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-offwhite text-left">
              <tr><th className="px-3 py-2">Slug</th><th>Title</th><th>Template</th><th>Published</th><th>Updated</th></tr>
            </thead>
            <tbody>
              {pages.length === 0 && (
                <tr><td className="px-3 py-4 text-muted" colSpan={5}>No CMS-backed pages yet. Click &ldquo;New page&rdquo; to create one.</td></tr>
              )}
              {pages.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-3 py-2"><Link href={`/admin/pages/${p.id}`} className="font-mono text-xs">{p.slug}</Link></td>
                  <td>{p.title}</td>
                  <td className="font-mono text-xs">{p.templateType}</td>
                  <td>{p.published ? "Yes" : "No"}</td>
                  <td className="text-xs text-muted">{p.updatedAt.toISOString().slice(0, 16).replace("T", " ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
