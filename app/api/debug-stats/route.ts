import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const result: Record<string, unknown> = {};
  try { result.leadCount = await db.lead.count(); } catch (e) { result.leadCountError = String(e); }
  try { result.articleCount = await db.article.count(); } catch (e) { result.articleCountError = String(e); }
  try { result.visitorCount = await db.visitor.count(); } catch (e) { result.visitorCountError = String(e); }
  try { result.userCount = await db.user.count(); } catch (e) { result.userCountError = String(e); }
  try { result.recentLeads = await db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { id: true, firstName: true, lastName: true, businessName: true, source: true, createdAt: true, status: true } }); } catch (e) { result.recentLeadsError = String(e); }
  try { result.recentVisitors = await db.visitor.count({ where: { firstSeen: { gte: new Date(Date.now() - 7 * 86400e3) } } }); } catch (e) { result.recentVisitorsError = String(e); }
  return NextResponse.json(result);
}
