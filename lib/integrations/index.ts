import type { Lead } from "@/app/generated/prisma";

export type IntegrationResult = { name: string; ok: boolean; error?: string };

export async function fanOutIntegrations(_lead: Lead): Promise<IntegrationResult[]> {
  // Stub — Tasks 8/9/10/11 add Slack/CRM/GA4/Google Ads
  return [];
}
