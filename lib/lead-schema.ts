import { z } from "zod";

export const debtBuckets = ["<25k", "25k-75k", "75k-200k", "200k-500k", "500k+"] as const;

export const leadSchema = z.object({
  hasMcaDebt: z.boolean(),
  debtAmountBucket: z.enum(debtBuckets).nullable().optional(),
  businessName: z.string().min(1, "Business name required"),
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  phone: z.string().min(7, "Valid phone required"),
  email: z.string().email("Valid email required"),
  source: z.string().default("homepage"),
});

export type LeadInput = z.infer<typeof leadSchema>;
