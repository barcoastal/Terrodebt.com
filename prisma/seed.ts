import { PrismaClient, Prisma } from "../app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { STATES } from "../lib/states";
import { VERTICALS } from "../lib/verticals";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg(process.env.DATABASE_URL ?? "");
const db = new PrismaClient({ adapter });

async function main() {
  const defaults: Record<string, Prisma.InputJsonValue> = {
    site_phone: "1-800-TERRA-00",
    aggregate_resolved_dollars: 0,
    bbb_status: "founding",
    slack_leads_webhook_url: "",
    coastal_crm_webhook_url: "",
    ga4_measurement_id: "",
    google_ads_conversion_id: "",
    anthropic_api_key_present: false,
  };
  for (const [key, value] of Object.entries(defaults)) {
    await db.setting.upsert({ where: { key }, update: {}, create: { key, value } });
  }

  for (const s of STATES) {
    await db.statePage.upsert({
      where: { stateCode: s.code },
      update: { stateName: s.name },
      create: { stateCode: s.code, stateName: s.name, content: {}, published: false },
    });
  }

  for (const v of VERTICALS) {
    await db.vertical.upsert({
      where: { slug: v.slug },
      update: { name: v.name },
      create: { slug: v.slug, name: v.name, headline: `MCA Relief for ${v.name}`, published: false },
    });
  }

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "fdshisddns";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await db.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: "admin" },
    create: { email: adminEmail, passwordHash, role: "admin" },
  });

  console.log("Seed complete");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
