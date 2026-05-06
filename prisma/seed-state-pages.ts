import { PrismaClient } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { STATES } from "../lib/states";
import { buildStateContent } from "../lib/state-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
const db = new PrismaClient({ adapter });

async function main() {
  for (const s of STATES) {
    await db.statePage.upsert({
      where: { stateCode: s.code },
      update: { stateName: s.name, content: buildStateContent(s.name), published: true },
      create: { stateCode: s.code, stateName: s.name, content: buildStateContent(s.name), published: true },
    });
  }
  console.log("Seeded", STATES.length, "state pages");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
