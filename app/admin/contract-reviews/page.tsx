import Link from "next/link";
import { db } from "@/lib/db";

export default async function ContractReviewsPage() {
  let reviews: Awaited<ReturnType<typeof db.contractReview.findMany>> = [];
  try {
    reviews = await db.contractReview.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { lead: true },
    });
  } catch {}

  return (
    <>
      <h1 className="text-2xl font-bold">Contract Reviews</h1>
      <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
        <thead className="bg-offwhite text-left">
          <tr><th className="px-3 py-2">Time</th><th>File</th><th>Eff. APR</th><th>Total payback</th><th>Email</th><th>Linked lead</th></tr>
        </thead>
        <tbody>
          {reviews.map((r) => {
            const lead = (r as { lead?: { firstName: string; lastName: string } | null }).lead;
            return (
              <tr key={r.id} className="border-t border-border">
                <td className="px-3 py-2"><Link href={`/admin/contract-reviews/${r.id}`}>{r.createdAt.toISOString().slice(0, 16).replace("T", " ")}</Link></td>
                <td>{r.contractFilename}</td>
                <td>{r.effectiveApr ? `${r.effectiveApr.toFixed(1)}%` : "-"}</td>
                <td>{r.totalPayback ? `$${r.totalPayback.toLocaleString()}` : "-"}</td>
                <td>{r.emailCaptured ?? "-"}</td>
                <td>{lead ? `${lead.firstName} ${lead.lastName}` : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
