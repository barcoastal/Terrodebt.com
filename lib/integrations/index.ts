import type { Lead } from "@/app/generated/prisma";
import { postToCrm } from "./crm";
import { fireGa4Conversion } from "./ga4";
import { postToZapier } from "./zapier";
import { fireGoogleAdsEvent } from "../event-fire";

export type IntegrationResult = { name: string; ok: boolean; error?: string };

export async function fanOutIntegrations(lead: Lead): Promise<IntegrationResult[]> {
  return Promise.all([
    postToCrm(lead),
    fireGa4Conversion(lead),
    fireGoogleAdsEvent({ lead, source: "auto-on-submit" }),
    postToZapier(lead),
  ]);
}
