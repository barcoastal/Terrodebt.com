import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSetting } from "@/lib/settings";
import { fireGoogleAdsEvent } from "@/lib/event-fire";
import { notifyPostback } from "@/lib/notifications";

export const dynamic = "force-dynamic";

function pick(obj: Record<string, unknown>, ...keys: string[]): string | null {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.length > 0) return v;
    if (typeof v === "number") return String(v);
  }
  return null;
}

async function handle(req: NextRequest) {
  const url = new URL(req.url);
  const params: Record<string, unknown> = {};
  url.searchParams.forEach((v, k) => { params[k] = v; });
  if (req.method === "POST") {
    try {
      const ct = req.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) {
        const body = await req.json();
        Object.assign(params, body);
      } else if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
        const fd = await req.formData();
        fd.forEach((v, k) => { params[k] = typeof v === "string" ? v : v.name; });
      }
    } catch {}
  }

  // Auth: shared secret in ?secret= or Authorization: Bearer
  const expectedSecret = await getSetting("postback_secret", process.env.POSTBACK_SECRET);
  const providedSecret = (params.secret as string | undefined)
    ?? req.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
    ?? null;
  if (expectedSecret && providedSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, error: "invalid secret" }, { status: 401 });
  }

  const source = (params.source as string | undefined)?.trim() || "unknown";
  const affiliateClickid = pick(params, "affiliate_clickid", "click_id", "clickid", "subid", "transaction_id");
  const gclid = pick(params, "gclid");
  const fbclid = pick(params, "fbclid");
  const eliClickid = pick(params, "eli_clickid");
  const payout = (() => {
    const v = pick(params, "payout", "value", "amount", "revenue");
    return v ? Number(v) : null;
  })();
  const status = pick(params, "status", "type");
  const eventName = pick(params, "event", "event_name");
  let conversionActionId = pick(params, "conversion_action_id", "action_id", "ga_action");
  if (!conversionActionId && eventName) {
    try {
      const match = await db.conversionAction.findFirst({
        where: { platform: "google_ads", name: { equals: eventName, mode: "insensitive" } },
        select: { actionId: true },
      });
      conversionActionId = match?.actionId ?? null;
    } catch {}
  }

  // Try to link to a visitor and lead
  let linkedVisitor: Awaited<ReturnType<typeof db.visitor.findFirst>> = null;
  if (affiliateClickid) {
    try { linkedVisitor = await db.visitor.findFirst({ where: { affiliateClickid } }); } catch {}
  }
  if (!linkedVisitor && gclid) {
    try { linkedVisitor = await db.visitor.findFirst({ where: { gclid } }); } catch {}
  }
  if (!linkedVisitor && eliClickid) {
    try { linkedVisitor = await db.visitor.findUnique({ where: { eliClickid } }); } catch {}
  }

  let linkedLead: Awaited<ReturnType<typeof db.lead.findFirst>> = null;
  if (affiliateClickid) {
    try { linkedLead = await db.lead.findFirst({ where: { affiliateClickid } }); } catch {}
  }
  if (!linkedLead && gclid) {
    try { linkedLead = await db.lead.findFirst({ where: { gclid } }); } catch {}
  }
  if (!linkedLead && linkedVisitor?.eliClickid) {
    try { linkedLead = await db.lead.findFirst({ where: { eliClickid: linkedVisitor.eliClickid } }); } catch {}
  }

  const postback = await db.postback.create({
    data: {
      source,
      affiliateClickid,
      gclid,
      fbclid,
      eliClickid: eliClickid ?? linkedVisitor?.eliClickid ?? null,
      payout,
      status,
      conversionActionId,
      rawPayload: params as object,
      ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? null,
      userAgent: req.headers.get("user-agent"),
      linkedLeadId: linkedLead?.id ?? null,
      linkedVisitorId: linkedVisitor?.id ?? null,
    },
  });

  // If the postback is for a converted user, fire a Google Ads event.
  const forwardEnabled = ((await getSetting("postback_forward_to_google_ads", process.env.POSTBACK_FORWARD_TO_GOOGLE_ADS)) ?? "true") !== "false";
  if (forwardEnabled && linkedLead && linkedLead.gclid) {
    const result = await fireGoogleAdsEvent({
      lead: linkedLead,
      conversionActionId: conversionActionId ?? undefined,
      source: "postback",
      postbackId: postback.id,
      conversionValue: typeof payout === "number" && payout > 0 ? payout : undefined,
    });
    await db.postback.update({
      where: { id: postback.id },
      data: { forwarded: true, forwardResult: { ok: result.ok, error: result.error ?? null } as object },
    });
    const refreshed = await db.postback.findUnique({ where: { id: postback.id } });
    if (refreshed) await notifyPostback(refreshed, linkedLead ? `${linkedLead.firstName} ${linkedLead.lastName}` : undefined);
    return NextResponse.json({ ok: true, postbackId: postback.id, forwardedToGoogleAds: result.ok, error: result.error });
  }

  await notifyPostback(postback, linkedLead ? `${linkedLead.firstName} ${linkedLead.lastName}` : undefined);
  return NextResponse.json({ ok: true, postbackId: postback.id, forwardedToGoogleAds: false, reason: linkedLead ? "no gclid on linked lead" : "no linked lead" });
}

export async function GET(req: NextRequest) { return handle(req); }
export async function POST(req: NextRequest) { return handle(req); }
