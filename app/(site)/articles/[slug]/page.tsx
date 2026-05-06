import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db } from "@/lib/db";
import { LeadForm } from "@/components/lead/LeadForm";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let a: Awaited<ReturnType<typeof db.article.findUnique>> = null;
  try {
    a = await db.article.findUnique({ where: { slug } });
  } catch {}
  if (!a || !a.published) notFound();
  return (
    <article className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold">{a.title}</h1>
        <p className="mt-4 text-muted">{a.excerpt}</p>
        <div className="prose mt-8 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{a.contentMd}</ReactMarkdown>
        </div>
      </div>
      <aside className="sticky top-8 self-start">
        <LeadForm source={`article-${slug}`} />
      </aside>
    </article>
  );
}
