import { articleLd, type ArticleLdInput } from "@/lib/structured-data";

export function ArticleJsonLd({ article }: { article: ArticleLdInput }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd(article)) }} />;
}
