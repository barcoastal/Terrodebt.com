import { db } from "./db";

export type VisitorPayload = {
  eliClickid: string;
  ip?: string | null;
  userAgent?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  affiliateClickid?: string | null;
  referrer?: string | null;
  path?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  deviceType?: string | null;
};

function deviceFromUA(ua: string | null | undefined): string {
  if (!ua) return "unknown";
  const s = ua.toLowerCase();
  if (/(iphone|android.+mobile|windows phone|ipod)/.test(s)) return "mobile";
  if (/(ipad|tablet|android(?!.*mobile))/.test(s)) return "tablet";
  if (/(bot|crawl|spider|slurp|mediapartners|facebookexternalhit|googlebot|bingbot)/.test(s)) return "bot";
  return "desktop";
}

export async function recordVisitor(p: VisitorPayload) {
  const deviceType = p.deviceType ?? deviceFromUA(p.userAgent ?? undefined);
  const existing = await db.visitor.findUnique({ where: { eliClickid: p.eliClickid }, select: { id: true, landingPath: true, referrer: true } });

  if (existing) {
    await db.visitor.update({
      where: { eliClickid: p.eliClickid },
      data: {
        lastSeen: new Date(),
        pageViews: { increment: 1 },
        ip: p.ip ?? undefined,
        userAgent: p.userAgent ?? undefined,
        utmSource: p.utmSource ?? undefined,
        utmMedium: p.utmMedium ?? undefined,
        utmCampaign: p.utmCampaign ?? undefined,
        utmContent: p.utmContent ?? undefined,
        utmTerm: p.utmTerm ?? undefined,
        gclid: p.gclid ?? undefined,
        fbclid: p.fbclid ?? undefined,
        affiliateClickid: p.affiliateClickid ?? undefined,
        country: p.country ?? undefined,
        region: p.region ?? undefined,
        city: p.city ?? undefined,
        deviceType,
      },
    });
    if (p.path) {
      await db.pageHit.create({
        data: {
          visitorId: existing.id,
          path: p.path,
          referrer: p.referrer ?? null,
        },
      });
    }
  } else {
    const created = await db.visitor.create({
      data: {
        eliClickid: p.eliClickid,
        ip: p.ip,
        userAgent: p.userAgent,
        utmSource: p.utmSource,
        utmMedium: p.utmMedium,
        utmCampaign: p.utmCampaign,
        utmContent: p.utmContent,
        utmTerm: p.utmTerm,
        gclid: p.gclid,
        fbclid: p.fbclid,
        affiliateClickid: p.affiliateClickid,
        referrer: p.referrer ?? null,
        landingPath: p.path ?? null,
        country: p.country ?? null,
        region: p.region ?? null,
        city: p.city ?? null,
        deviceType,
      },
    });
    if (p.path) {
      await db.pageHit.create({
        data: {
          visitorId: created.id,
          path: p.path,
          referrer: p.referrer ?? null,
        },
      });
    }
  }
}
