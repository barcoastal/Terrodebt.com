import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const REPLACEMENTS: Array<[string, string]> = [
  ["/services/creditor-liaison", "/services/business-debt-settlement"],
  ["/services/forensic-audit", "/services/business-debt-relief"],
  ["/services/liquidity-engineering", "/services/business-debt-restructuring"],
  ["/services/operational-restructuring", "/services/bankruptcy-alternative"],
  ["/services/mca-debt-relief", "/services/business-debt-relief"],
  ["/services/equipment-finance-restructure", "/services/business-debt-restructuring"],
  ["/services/vendor-supplier-debt", "/services/business-debt-settlement"],
  ["/services/bank-loan-workout", "/services/business-debt-restructuring"],
  ["/services/business-tax-debt", "/services/business-debt-settlement"],
];

export async function POST(req: NextRequest) {
  const { token } = await req.json().catch(() => ({ token: "" }));
  if (token !== "bdi-rewrite-service-links-2026-once") return NextResponse.json({ ok: false }, { status: 401 });

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
