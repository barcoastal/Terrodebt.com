import { NextRequest, NextResponse } from "next/server";
import { recordVisitor } from "@/lib/visitor";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const eliClickid = req.cookies.get("eli_clickid")?.value;
  if (!eliClickid) return NextResponse.json({ ok: false }, { status: 400 });

  await recordVisitor({
    eliClickid,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? null,
    userAgent: req.headers.get("user-agent"),
    utmSource: body.utm_source ?? null,
    utmMedium: body.utm_medium ?? null,
    utmCampaign: body.utm_campaign ?? null,
    utmContent: body.utm_content ?? null,
    utmTerm: body.utm_term ?? null,
    gclid: body.gclid ?? null,
    fbclid: body.fbclid ?? null,
    affiliateClickid: body.affiliate_clickid ?? null,
  });
  return NextResponse.json({ ok: true });
}
