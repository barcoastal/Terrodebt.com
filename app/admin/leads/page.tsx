import Link from "next/link";
import { db } from "@/lib/db";
import type { Prisma } from "@/app/generated/prisma";

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ source?: string; status?: string; q?: string }> }) {
  const sp = await searchParams;
  const where: Prisma.LeadWhereInput = {};
  if (sp.source) where.source = sp.source;
  if (sp.status) where.status = sp.status;
  if (sp.q) where.OR = [
    { email: { contains: sp.q, mode: "insensitive" } },
    { firstName: { contains: sp.q, mode: "insensitive" } },
    { lastName: { contains: sp.q, mode: "insensitive" } },
    { businessName: { contains: sp.q, mode: "insensitive" } },
  ];
  let leads: Awaited<ReturnType<typeof db.lead.findMany>> = [];
  try { leads = await db.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }); } catch {}

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leads</h1>
        <a href="/api/admin/leads/export" className="bg-electric text-white px-3 py-1 rounded-md text-sm no-underline">Export CSV</a>
      </div>
      <form className="mt-4 flex gap-2 text-sm">
        <input name="q" defaultValue={sp.q ?? ""} placeholder="search by name, email, business..." className="border border-border rounded-md px-3 py-2 flex-1" />
        <select name="source" defaultValue={sp.source ?? ""} className="border border-border rounded-md px-3 py-2">
          <option value="">All sources</option>
          <option value="homepage">homepage</option>
          <option value="calculator">calculator</option>
          <option value="tools">tools</option>
          <option value="contact">contact</option>
        </select>
        <select name="status" defaultValue={sp.status ?? ""} className="border border-border rounded-md px-3 py-2">
          <option value="">All statuses</option>
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="qualified">qualified</option>
          <option value="signed">signed</option>
          <option value="dead">dead</option>
        </select>
        <button className="bg-slate text-white px-3 py-2 rounded-md">Filter</button>
      </form>
      <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
        <thead className="bg-offwhite text-left">
          <tr><th className="px-3 py-2">Time</th><th>Name</th><th>Business</th><th>Email</th><th>Source</th><th>Debt</th><th>Status</th></tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id} className="border-t border-border">
              <td className="px-3 py-2"><Link href={`/admin/leads/${l.id}`}>{l.createdAt.toISOString().slice(0, 16).replace("T", " ")}</Link></td>
              <td>{l.firstName} {l.lastName}</td>
              <td>{l.businessName}</td>
              <td>{l.email}</td>
              <td>{l.source}</td>
              <td>{l.debtAmountBucket ?? "-"}</td>
              <td>{l.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
