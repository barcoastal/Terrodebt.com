import type { Lead } from "@/app/generated/prisma";
import { notifySlack } from "./slack";
import { postToCrm } from "./crm";
import { fireGa4Conversion } from "./ga4";

export type IntegrationResult = { name: string; ok: boolean; error?: string };

export async function fanOutIntegrations(lead: Lead): Promise<IntegrationResult[]> {
  return Promise.all([notifySlack(lead), postToCrm(lead), fireGa4Conversion(lead)]);
}
