import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { fanOutIntegrations } from "@/lib/integrations";

export async function POST(req: NextRequest) {
  const { reviewId, email } = await req.json();
  if (!reviewId || !email) return NextResponse.json({ ok: false }, { status: 400 });

  try {
    await db.contractReview.update({ where: { id: reviewId }, data: { emailCaptured: email } });

    const lead = await db.lead.create({
      data: {
        firstName: "Unknown",
        lastName: "Unknown",
        businessName: "(contract-review)",
        phone: "0000000000",
        email,
        hasMcaDebt: true,
        source: "ai-contract-review",
        eliClickid: req.cookies.get("eli_clickid")?.value,
      },
    });
    await db.contractReview.update({ where: { id: reviewId }, data: { leadId: lead.id } });

    await fanOutIntegrations(lead);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contract-review capture failed", e);
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "unknown" }, { status: 500 });
  }
}
