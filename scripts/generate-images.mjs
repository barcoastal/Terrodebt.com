import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) { console.error("Missing GEMINI_API_KEY"); process.exit(1); }

const MODEL = "gemini-2.5-flash-image";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const OUT_DIR = path.resolve("public/images");
await fs.mkdir(OUT_DIR, { recursive: true });

const STYLE = "Photorealistic, slightly desaturated cool color grading, natural daylight, candid editorial photography, premium fintech aesthetic, real and authentic feel, 35mm lens, shallow depth of field, no logos, no branding, no text overlays, no watermarks. Subject is in a real working environment.";

const TARGETS = [
  { name: "hero", aspect: "16:9",
    prompt: `Wide editorial photograph of a confident American small business owner standing in their workplace, mid-30s to 40s, working clothes, looking thoughtfully toward the right edge of frame leaving negative space on the left for headline overlay. ${STYLE}` },
  { name: "industry-trucking", aspect: "4:3",
    prompt: `Owner-operator truck driver in their late 30s standing next to a clean semi-truck at a highway truck stop. Golden hour soft warm light. Jeans and work shirt. ${STYLE}` },
  { name: "industry-restaurants", aspect: "4:3",
    prompt: `Restaurant owner in their 40s standing behind the counter of a small independent neighborhood restaurant. Warm interior light, daylight from windows. Working apron. ${STYLE}` },
  { name: "industry-construction", aspect: "4:3",
    prompt: `General contractor in their late 30s on a residential job site, hard hat in hand, work shirt, holding rolled blueprints. ${STYLE}` },
  { name: "industry-healthcare", aspect: "4:3",
    prompt: `Independent dental practice owner in their 40s in their clean clinic, business casual, looking professional and confident. Bright clinical natural light. ${STYLE}` },
  { name: "industry-retail", aspect: "4:3",
    prompt: `Boutique retail shop owner in their 30s arranging merchandise in their small independent store. Warm interior light, daylight from front windows. ${STYLE}` },
  { name: "industry-ecommerce", aspect: "4:3",
    prompt: `Small ecommerce business owner in their small home warehouse or garage office, packing online order boxes. ${STYLE}` },
  { name: "industry-salons", aspect: "4:3",
    prompt: `Independent salon owner in their 40s in their clean modern salon, professional attire, candid working moment. ${STYLE}` },
  { name: "industry-auto", aspect: "4:3",
    prompt: `Independent auto repair shop owner in their 50s in their shop, work clothes with light grease. ${STYLE}` },
  { name: "founder-scene", aspect: "4:3",
    prompt: `A focused operator in their late 30s working at a clean modern desk with a laptop, in a modern office with concrete and warm wood, late afternoon side light. Photographic, editorial. ${STYLE}` },
  { name: "process-call", aspect: "4:3",
    prompt: `Close-up of a person on a phone call in a small business office, shoulders and hand visible holding the phone, natural window light, candid. ${STYLE}` },
];

async function generateOne(target) {
  const body = {
    contents: [{ parts: [{ text: target.prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: target.aspect } },
  };
  const res = await fetch(URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HTTP ${res.status}: ${err.slice(0, 400)}`);
  }
  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p?.inlineData?.data);
  if (!imagePart) throw new Error("No inline image data in response: " + JSON.stringify(json).slice(0, 500));
  const buffer = Buffer.from(imagePart.inlineData.data, "base64");
  const filename = `${target.name}.png`;
  await fs.writeFile(path.join(OUT_DIR, filename), buffer);
  console.log(`OK ${filename} (${buffer.length} bytes)`);
}

for (const t of TARGETS) {
  try { await generateOne(t); }
  catch (e) { console.error(`FAIL ${t.name}:`, e.message); }
  await new Promise((r) => setTimeout(r, 800)); // gentle rate limit
}
