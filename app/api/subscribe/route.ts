import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  let payload: { email?: string; source?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  const email = payload.email?.trim();
  const source = payload.source?.trim() || "newsletter";

  if (!email || typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });
  }

  try {
    const h = await headers();
    await db.lead.create({
      data: {
        firstName: "Subscriber",
        lastName: "",
        businessName: "(newsletter)",
        phone: "0000000000",
        email,
        hasMcaDebt: false,
        source,
        status: "new",
        ip: h.get("x-forwarded-for")?.split(",")[0] ?? null,
        userAgent: h.get("user-agent"),
        integrationStatus: {
          db: "ok",
          consent: { agreed: true, text: "Newsletter subscribe", at: new Date().toISOString() },
        },
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
