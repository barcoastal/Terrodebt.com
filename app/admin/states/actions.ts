"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { STATES } from "@/lib/states";
import { buildStateContent } from "@/lib/state-content";

export async function updateState(code: string, fd: FormData) {
  const raw = String(fd.get("content") ?? "{}");
  let content: object = {};
  try { content = JSON.parse(raw); } catch { content = { _raw: raw }; }
  const published = fd.get("published") === "on";
  await db.statePage.update({ where: { stateCode: code }, data: { content, published } });
  revalidatePath(`/admin/states/${code}`);
  revalidatePath("/admin/states");
  revalidatePath(`/mca-defense/${code.toLowerCase()}`);
}

export async function regenerateAllStates() {
  for (const s of STATES) {
    const content = buildStateContent(s.name);
    await db.statePage.upsert({
      where: { stateCode: s.code },
      update: { content: content as object, published: true, stateName: s.name },
      create: { stateCode: s.code, stateName: s.name, content: content as object, published: true },
    });
  }
  revalidatePath("/admin/states");
}
