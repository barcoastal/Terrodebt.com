import Link from "next/link";
import { db } from "@/lib/db";

export const metadata = { title: "Articles", description: "Education on MCA debt relief." };

export default async function ArticlesIndex() {
  let articles: Awaited<ReturnType<typeof db.article.findMany>> = [];
  try {
    articles = await db.article.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });
  } catch {}
  return (
    <section className="mx-auto max-w-content px-6 py-16">
      <h1 className="text-4xl font-bold">Articles</h1>
      {articles.length === 0 && <p className="text-muted mt-4">Articles coming soon.</p>}
      <ul className="mt-8 divide-y divide-border">
        {articles.map((a) => (
          <li key={a.id} className="py-6">
            <Link href={`/articles/${a.slug}`} className="block no-underline hover:no-underline">
              <h2 className="text-xl font-semibold text-slate">{a.title}</h2>
              <p className="mt-1 text-muted">{a.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
