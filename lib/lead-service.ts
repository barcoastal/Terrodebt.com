import { db } from "./db";
import { leadSchema, bucketFromAmount, CONSENT_TEXT, type LeadInput } from "./lead-schema";

export type LeadSubmitInput = LeadInput & {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
  affiliateClickid?: string;
  eliClickid?: string;
  ip?: string | null;
  userAgent?: string | null;
};

export async function createLead(input: LeadSubmitInput) {
  const debtAmount = Math.max(0, Math.min(1_000_000, Number(input.debtAmount) || 0));
  const bucket = input.debtAmountBucket ?? bucketFromAmount(debtAmount);
  const parsed = leadSchema.parse({
    debtAmount,
    hasMcaDebt: input.hasMcaDebt ?? debtAmount > 0,
    debtAmountBucket: bucket,
    businessName: input.businessName || "(no-mca off-ramp)",
    firstName: input.firstName || "Unknown",
    lastName: input.lastName || "Unknown",
    phone: input.phone || "0000000000",
    email: input.email,
    source: input.source,
  });
  return db.lead.create({
    data: {
      hasMcaDebt: parsed.hasMcaDebt ?? false,
      debtAmount: parsed.debtAmount,
      debtAmountBucket: parsed.debtAmountBucket ?? null,
      businessName: parsed.businessName,
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      phone: parsed.phone,
      email: parsed.email,
      source: parsed.source,
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
      utmContent: input.utmContent,
      utmTerm: input.utmTerm,
      gclid: input.gclid,
      fbclid: input.fbclid,
      affiliateClickid: input.affiliateClickid,
      eliClickid: input.eliClickid,
      ip: input.ip ?? undefined,
      userAgent: input.userAgent ?? undefined,
      integrationStatus: {
        db: "ok",
        consent: input.consent === true
          ? { agreed: true, text: CONSENT_TEXT, at: new Date().toISOString() }
          : { agreed: false },
      },
    },
  });
}
