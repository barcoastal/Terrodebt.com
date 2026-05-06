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
};

export async function recordVisitor(p: VisitorPayload) {
  await db.visitor.upsert({
    where: { eliClickid: p.eliClickid },
    update: {
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
    },
    create: {
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
    },
  });
}
