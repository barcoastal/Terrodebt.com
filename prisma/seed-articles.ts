import { PrismaClient } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { ARTICLE_SEEDS } from "../lib/seed-data/articles";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
const db = new PrismaClient({ adapter });

async function main() {
  for (const a of ARTICLE_SEEDS) {
    await db.article.upsert({
      where: { slug: a.slug },
      update: { ...a, published: true, publishedAt: new Date() },
      create: { ...a, published: true, publishedAt: new Date() },
    });
  }
  console.log("Seeded", ARTICLE_SEEDS.length, "articles");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
