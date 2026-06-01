import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { token } = await req.json().catch(() => ({ token: "" }));
  if (token !== "bdi-demo-statuses-2026-once") return NextResponse.json({ ok: false }, { status: 401 });

  const recent = await db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { id: true, firstName: true, lastName: true } });
  const STATUSES = ["new", "lead", "opportunity", "closed_won", "lost"];

  const updates: Array<{ id: string; name: string; status: string }> = [];
  for (let i = 0; i < recent.length; i++) {
    const status = STATUSES[i % STATUSES.length];
    await db.lead.update({ where: { id: recent[i].id }, data: { status } });
    updates.push({ id: recent[i].id, name: `${recent[i].firstName} ${recent[i].lastName}`, status });
  }
  return NextResponse.json({ ok: true, updated: updates });
}
