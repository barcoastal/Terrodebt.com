"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import type { Prisma } from "@/app/generated/prisma";
import { getSession } from "@/lib/session";
import { debtRangeFromAmount } from "@/components/lead/amount-options";

// Leads saved before we stored the selected range: bucket is empty or an old
// internal code (not a "$..." label). Convert each to its real range label.
const OLD_FORMAT_WHERE: Prisma.LeadWhereInput = {
  debtAmount: { not: null },
  OR: [
    { debtAmountBucket: null },
    { NOT: { debtAmountBucket: { startsWith: "$" } } },
  ],
};

export async function countOldFormatLeads(): Promise<number> {
  return db.lead.count({ where: OLD_FORMAT_WHERE });
}

export async function backfillDebtRanges(): Promise<void> {
  const session = await getSession();
  if (!session.userId) throw new Error("Unauthorized");

  const leads = await db.lead.findMany({
    where: OLD_FORMAT_WHERE,
    select: { id: true, debtAmount: true },
  });

  for (const l of leads) {
    if (l.debtAmount == null) continue;
    await db.lead.update({
      where: { id: l.id },
      data: { debtAmountBucket: debtRangeFromAmount(l.debtAmount) },
    });
  }

  revalidatePath("/admin/leads");
}
