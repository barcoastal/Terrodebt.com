import { NextRequest, NextResponse } from "next/server";
import { recordVisitor } from "@/lib/visitor";

export const dynamic = "force-dynamic";

type GeoCacheEntry = { country: string | null; region: string | null; city: string | null; ts: number };
const geoCache = new Map<string, GeoCacheEntry>();
const GEO_TTL = 24 * 60 * 60 * 1000;

async function geoLookup(ip: string | null): Promise<{ country: string | null; region: string | null; city: string | null }> {
  if (!ip || ip === "127.0.0.1" || ip.startsWith("10.") || ip.startsWith("192.168.")) {
    return { country: null, region: null, city: null };
  }
  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.ts < GEO_TTL) {
    return { country: cached.country, region: cached.region, city: cached.city };
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,regionName,city`, {
      headers: { "user-agent": "BusinessDebtInsider/1.0" },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const j = await res.json();
    if (j.status !== "success") throw new Error("geo lookup unsuccessful");
    const entry: GeoCacheEntry = {
      country: j.country ?? null,
      region: j.regionName ?? null,
      city: j.city ?? null,
      ts: Date.now(),
    };
    geoCache.set(ip, entry);
    return { country: entry.country, region: entry.region, city: entry.city };
  } catch {
    return { country: null, region: null, city: null };
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const eliClickid = req.cookies.get("eli_clickid")?.value;
  if (!eliClickid) return NextResponse.json({ ok: false }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const geo = ip ? await geoLookup(ip) : { country: null, region: null, city: null };

  await recordVisitor({
    eliClickid,
    ip,
    userAgent: req.headers.get("user-agent"),
    utmSource: body.utm_source ?? null,
    utmMedium: body.utm_medium ?? null,
    utmCampaign: body.utm_campaign ?? null,
    utmContent: body.utm_content ?? null,
    utmTerm: body.utm_term ?? null,
    gclid: body.gclid ?? null,
    fbclid: body.fbclid ?? null,
    affiliateClickid: body.affiliate_clickid ?? null,
    referrer: body.referrer ?? null,
    path: body.path ?? null,
    country: geo.country,
    region: geo.region,
    city: geo.city,
  });

  const res = NextResponse.json({ ok: true });
  const NINETY_DAYS = 60 * 60 * 24 * 90;
  const setCookie = (name: string, value: string | null | undefined) => {
    if (!value) return;
    res.cookies.set(name, value, { maxAge: NINETY_DAYS, sameSite: "lax", path: "/", httpOnly: false });
  };
  setCookie("td_gclid", body.gclid);
  setCookie("td_fbclid", body.fbclid);
  setCookie("td_affiliate_clickid", body.affiliate_clickid);
  setCookie("td_utm_source", body.utm_source);
  setCookie("td_utm_medium", body.utm_medium);
  setCookie("td_utm_campaign", body.utm_campaign);
  setCookie("td_utm_content", body.utm_content);
  setCookie("td_utm_term", body.utm_term);
  return res;
}
