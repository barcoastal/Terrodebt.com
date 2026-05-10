import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

const HEADERS = [
  "createdAt",
  "firstName",
  "lastName",
  "businessName",
  "email",
  "phone",
  "hasMcaDebt",
  "debtAmount",
  "debtAmountBucket",
  "source",
  "status",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "utmTerm",
  "gclid",
  "fbclid",
  "eliClickid",
  "ip",
  "userAgent",
  "consentAgreed",
  "consentAt",
] as const;

export async function GET() {
  const session = await getSession();
  if (!session.userId) return new NextResponse("unauthorized", { status: 401 });

  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });
  const rows = leads.map((l) => {
    const status = (l.integrationStatus ?? {}) as Record<string, unknown>;
    const consent = (status.consent ?? null) as { agreed?: boolean; at?: string } | null;
    const flat: Record<string, unknown> = {
      ...l,
      consentAgreed: consent?.agreed ?? false,
      consentAt: consent?.at ?? "",
    };
    return HEADERS.map((h) => csvEscape(flat[h])).join(",");
  });
  const body = HEADERS.join(",") + "\n" + rows.join("\n");
  return new NextResponse(body, {
    headers: { "content-type": "text/csv", "content-disposition": `attachment; filename="terradebt-leads-${Date.now()}.csv"` },
  });
}

function csvEscape(v: unknown) {
  if (v === null || v === undefined) return "";
  const s = String(v).replaceAll('"', '""');
  return /[,\n"]/.test(s) ? `"${s}"` : s;
}
