"use server";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { verifyCredentials } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { ARTICLE_SEEDS } from "@/lib/seed-data/articles";
import { CASE_STUDY_SEEDS } from "@/lib/seed-data/case-studies";
import { STATES } from "@/lib/states";
import { VERTICALS } from "@/lib/verticals";
import { buildStateContent } from "@/lib/state-content";

const BOOTSTRAP_EMAIL = process.env.SEED_ADMIN_EMAIL ?? "admin";
const BOOTSTRAP_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "fdshisddns";

async function bootstrapIfNeeded() {
  try {
    const userCount = await db.user.count();
    if (userCount === 0) {
      const passwordHash = await bcrypt.hash(BOOTSTRAP_PASSWORD, 10);
      await db.user.create({ data: { email: BOOTSTRAP_EMAIL, passwordHash, role: "admin" } });
    }

    const settingDefaults: Record<string, unknown> = {
      site_phone: "",
      aggregate_resolved_dollars: 0,
      bbb_status: "founding",
      slack_leads_webhook_url: "",
      coastal_crm_webhook_url: "",
      zapier_webhook_default: "",
      zapier_webhook_google: "",
      zapier_webhook_affiliate: "",
      ga4_measurement_id: "",
      google_ads_conversion_id: "",
    };
    for (const [key, value] of Object.entries(settingDefaults)) {
      await db.setting.upsert({ where: { key }, update: {}, create: { key, value: value as object } });
    }

    const verticalCount = await db.vertical.count();
    if (verticalCount === 0) {
      for (const v of VERTICALS) {
        await db.vertical.create({
          data: { slug: v.slug, name: v.name, headline: `MCA Relief for ${v.name}`, published: true },
        });
      }
    }

    const stateCount = await db.statePage.count();
    if (stateCount === 0) {
      for (const s of STATES) {
        await db.statePage.create({
          data: {
            stateCode: s.code,
            stateName: s.name,
            content: buildStateContent(s.name) as unknown as object,
            published: true,
          },
        });
      }
    }

    const articleCount = await db.article.count();
    if (articleCount === 0) {
      for (const a of ARTICLE_SEEDS) {
        await db.article.create({
          data: { ...a, published: true, publishedAt: new Date() },
        });
      }
    }

    const caseStudyCount = await db.caseStudy.count();
    if (caseStudyCount === 0) {
      for (const c of CASE_STUDY_SEEDS) {
        await db.caseStudy.create({ data: { ...c, published: true } });
      }
    }
  } catch (e) {
    console.error("bootstrap failed", e);
  }
}

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  await bootstrapIfNeeded();

  const user = await verifyCredentials(email, password);
  if (!user) {
    redirect("/admin/login?error=invalid");
  }
  const session = await getSession();
  session.userId = user.id;
  session.email = user.email;
  await session.save();
  redirect("/admin");
}
