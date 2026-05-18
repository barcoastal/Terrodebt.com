import { z } from "zod";

export const debtBuckets = ["<25k", "25k-75k", "75k-200k", "200k-500k", "500k+"] as const;

export const leadSchema = z.object({
  debtAmount: z.number().min(0).max(1_000_000),
  hasMcaDebt: z.boolean().optional(),
  debtAmountBucket: z.enum(debtBuckets).nullable().optional(),
  businessName: z.string().min(1, "Business name required"),
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  phone: z.string().min(7, "Valid phone required"),
  email: z.string().email("Valid email required"),
  source: z.string().default("homepage"),
  consent: z.boolean().optional(),
});

export const CONSENT_TEXT =
  "I agree to Business Debt Insider's Terms and Privacy Policy, and consent to receive calls, texts, and emails from Business Debt Insider at the number and email provided, including marketing communications. Message and data rates may apply. Consent is not a condition of any service. Reply STOP to opt out.";

export type LeadInput = z.infer<typeof leadSchema>;

export function bucketFromAmount(amount: number): typeof debtBuckets[number] | null {
  if (amount <= 0) return null;
  if (amount < 25_000) return "<25k";
  if (amount < 75_000) return "25k-75k";
  if (amount < 200_000) return "75k-200k";
  if (amount < 500_000) return "200k-500k";
  return "500k+";
}
