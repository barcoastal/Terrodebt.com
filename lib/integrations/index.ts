import type { Lead } from "@/app/generated/prisma";
import { notifySlack } from "./slack";
import { postToCrm } from "./crm";

export type IntegrationResult = { name: string; ok: boolean; error?: string };

export async function fanOutIntegrations(lead: Lead): Promise<IntegrationResult[]> {
  return Promise.all([notifySlack(lead), postToCrm(lead)]);
}
