import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session.userId) return new NextResponse("unauthorized", { status: 401 });

  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });
  const headers = ["createdAt","firstName","lastName","businessName","email","phone","hasMcaDebt","debtAmountBucket","source","status","utmSource","utmMedium","utmCampaign","gclid"] as const;
  const rows = leads.map((l) => headers.map((h) => csvEscape(l[h] as unknown)).join(","));
  const body = headers.join(",") + "\n" + rows.join("\n");
  return new NextResponse(body, {
    headers: { "content-type": "text/csv", "content-disposition": `attachment; filename="terradebt-leads-${Date.now()}.csv"` },
  });
}

function csvEscape(v: unknown) {
  if (v === null || v === undefined) return "";
  const s = String(v).replaceAll('"', '""');
  return /[,\n"]/.test(s) ? `"${s}"` : s;
}
