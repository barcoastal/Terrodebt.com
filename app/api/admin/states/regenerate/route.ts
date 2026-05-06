import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { regenerateAllStates } from "@/app/admin/states/actions";

export async function POST() {
  const session = await getSession();
  if (!session.userId) return new NextResponse("unauthorized", { status: 401 });
  await regenerateAllStates();
  return NextResponse.json({ ok: true });
}
