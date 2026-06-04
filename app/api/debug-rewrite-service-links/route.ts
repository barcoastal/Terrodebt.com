import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const REPLACEMENTS: Array<[string, string]> = [
  ["/services/business-debt-relief", "/services/debt-relief-planning"],
  ["/services/business-debt-resolution", "/services/debt-relief-planning"],
  ["/services/business-debt-settlement", "/services/debt-relief-planning"],
  ["/services/creditor-liaison", "/services/creditor-communication"],
  ["/services/forensic-audit", "/services/debt-relief-planning"],
  ["/services/liquidity-engineering", "/services/debt-relief-planning"],
  ["/services/operational-restructuring", "/services/bankruptcy-alternative"],
];

export async function POST(req: NextRequest) {
  const { token } = await req.json().catch(() => ({ token: "" }));
  if (token !== "bdi-rewrite-service-links-2026-06-04") return NextResponse.json({ ok: false }, { status: 401 });

  const articles = await db.article.findMany({ select: { id: true, slug: true, contentMd: true } });
  const updates: Array<{ id: string; slug: string; replaced: number }> = [];
  for (const a of articles) {
    let body = a.contentMd;
    let replaced = 0;
    for (const [from, to] of REPLACEMENTS) {
      const matches = body.split(from).length - 1;
      if (matches > 0) {
        body = body.split(from).join(to);
        replaced += matches;
      }
    }
    if (replaced > 0) {
      await db.article.update({ where: { id: a.id }, data: { contentMd: body } });
      updates.push({ id: a.id, slug: a.slug, replaced });
    }
  }
  return NextResponse.json({ ok: true, articleCount: articles.length, updated: updates });
}
