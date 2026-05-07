import Link from "next/link";
import { db } from "@/lib/db";

export const metadata = { title: "Articles", description: "Education on MCA debt relief." };

export default async function ArticlesIndex() {
  let articles: Awaited<ReturnType<typeof db.article.findMany>> = [];
  try {
    articles = await db.article.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });
  } catch {}
  return (
    <section className="mx-auto max-w-content px-6 py-20">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Articles</h1>
      <p className="mt-4 text-lg text-muted">Education on MCA debt relief.</p>
      {articles.length === 0 && <p className="text-muted mt-8">Articles coming soon.</p>}
      <ul className="mt-12 divide-y divide-border">
        {articles.map((a) => (
          <li key={a.id} className="py-7 group">
            <Link href={`/articles/${a.slug}`} className="block no-underline">
              <h2 className="text-xl md:text-2xl font-semibold text-slate tracking-tight group-hover:text-electric transition">{a.title}</h2>
              <p className="mt-2 text-muted leading-relaxed">{a.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
