import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { LeadForm } from "@/components/lead/LeadForm";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const p = await db.page.findUnique({ where: { slug } });
    if (p && p.published) return { title: p.title, description: p.heroSubline ?? undefined };
  } catch {}
  return {};
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let page: Awaited<ReturnType<typeof db.page.findUnique>> = null;
  try { page = await db.page.findUnique({ where: { slug } }); } catch {}
  if (!page || !page.published) notFound();

  return (
    <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">{page.heroHeadline}</h1>
        {page.heroSubline && <p className="mt-4 text-lg text-muted">{page.heroSubline}</p>}
      </div>
      <LeadForm source={`lp-${slug}`} />
    </section>
  );
}
