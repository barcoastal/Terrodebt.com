import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { LeadForm } from "@/components/lead/LeadForm";
import { STATES } from "@/lib/states";
import type { StateContent } from "@/lib/state-content";
import { buildStateContent } from "@/lib/state-content";

export async function generateStaticParams() {
  return STATES.map((s) => ({ state: s.code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const code = state.toUpperCase();
  const meta = STATES.find((s) => s.code === code);
  if (!meta) return {};
  return {
    title: `MCA Defense in ${meta.name} | TerraDebt`,
    description: `MCA defense in ${meta.name}: licensed counsel, COJ response, account freeze help, settlement coordination. Free assessment within one business hour.`,
  };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const stateCode = state.toUpperCase();
  const meta = STATES.find((s) => s.code === stateCode);
  if (!meta) notFound();

  let page: Awaited<ReturnType<typeof db.statePage.findUnique>> = null;
  try {
    page = await db.statePage.findUnique({ where: { stateCode } });
  } catch {}

  const c = (page?.content as unknown as StateContent | undefined) ?? buildStateContent(meta.name);
  const stateName = page?.stateName ?? meta.name;

  return (
    <article>
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">MCA Defense in {stateName}</h1>
            <p className="mt-4 text-lg text-muted">Settlement, restructure, and legal defense for {stateName} businesses with MCA debt.</p>
          </div>
          <LeadForm source={`state-${stateCode.toLowerCase()}`} />
        </div>
      </section>
      <section className="mx-auto max-w-content px-6 py-16 prose max-w-none">
        <h2>Confession of Judgment in {stateName}</h2>
        <p>{c.cojEnforceability}</p>
        <h2>Usury and MCA classification</h2>
        <p>{c.usuryNotes}</p>
        <h2>Recent developments</h2>
        <p>{c.recentDevelopments}</p>
        <h2>Local courts</h2>
        <p>{c.localCourts}</p>
      </section>
    </article>
  );
}
