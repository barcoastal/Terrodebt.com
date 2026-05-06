import { db } from "./db";
import { leadSchema, type LeadInput } from "./lead-schema";

export type LeadSubmitInput = LeadInput & {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
  eliClickid?: string;
  ip?: string | null;
  userAgent?: string | null;
};

export async function createLead(input: LeadSubmitInput) {
  const parsed = leadSchema.parse({
    hasMcaDebt: input.hasMcaDebt,
    debtAmountBucket: input.debtAmountBucket,
    businessName: input.businessName || "(no-mca off-ramp)",
    firstName: input.firstName || "Unknown",
    lastName: input.lastName || "Unknown",
    phone: input.phone || "0000000000",
    email: input.email,
    source: input.source,
  });
  return db.lead.create({
    data: {
      ...parsed,
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
      utmContent: input.utmContent,
      utmTerm: input.utmTerm,
      gclid: input.gclid,
      fbclid: input.fbclid,
      eliClickid: input.eliClickid,
      ip: input.ip ?? undefined,
      userAgent: input.userAgent ?? undefined,
      integrationStatus: { db: "ok" },
    },
  });
}
