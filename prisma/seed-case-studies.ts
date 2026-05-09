import { PrismaClient } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { CASE_STUDY_SEEDS } from "../lib/seed-data/case-studies";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
const db = new PrismaClient({ adapter });

async function main() {
  for (const s of CASE_STUDY_SEEDS) {
    await db.caseStudy.upsert({
      where: { slug: s.slug },
      update: { ...s, published: true },
      create: { ...s, published: true },
    });
  }
  console.log("Seeded", CASE_STUDY_SEEDS.length, "case studies");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
