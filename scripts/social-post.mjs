// Post to the Business Debt Insider Facebook Page and/or Instagram account.
//
// Usage:
//   node scripts/social-post.mjs fb "Post text" [--link https://...] [--image https://...]
//   node scripts/social-post.mjs ig "Caption" --image https://...   (image required for IG)
//   node scripts/social-post.mjs both "Text" --image https://...
//
// Reads FB_PAGE_ID / FB_PAGE_TOKEN / IG_USER_ID from .env.
// IG images must be publicly reachable URLs (JPEG best; PNG usually fine).

import fs from "node:fs";

const env = Object.fromEntries(
  fs
    .readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).replace(/^"|"$/g, "")])
);

const G = "https://graph.facebook.com/v25.0";
const [, , target, text, ...rest] = process.argv;
const flag = (name) => {
  const i = rest.indexOf(name);
  return i >= 0 ? rest[i + 1] : undefined;
};
const image = flag("--image");
const link = flag("--link");

if (!target || !text || !["fb", "ig", "both"].includes(target)) {
  console.error('Usage: node scripts/social-post.mjs fb|ig|both "Text" [--image URL] [--link URL]');
  process.exit(1);
}

async function call(path, params) {
  const res = await fetch(`${G}${path}`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ ...params, access_token: env.FB_PAGE_TOKEN }),
  });
  const data = await res.json();
  if (data.error) throw new Error(`${path}: ${data.error.message}`);
  return data;
}

async function postFacebook() {
  if (image) {
    const r = await call(`/${env.FB_PAGE_ID}/photos`, { url: image, caption: text });
    console.log("FB photo post:", r.post_id || r.id);
  } else {
    const params = { message: text };
    if (link) params.link = link;
    const r = await call(`/${env.FB_PAGE_ID}/feed`, params);
    console.log("FB post:", r.id);
  }
}

async function postInstagram() {
  if (!image) throw new Error("Instagram requires --image URL");
  const container = await call(`/${env.IG_USER_ID}/media`, { image_url: image, caption: text });
  // media containers can take a moment to process
  for (let i = 0; i < 10; i++) {
    const s = await fetch(`${G}/${container.id}?fields=status_code&access_token=${env.FB_PAGE_TOKEN}`).then((r) => r.json());
    if (s.status_code === "FINISHED") break;
    if (s.status_code === "ERROR") throw new Error("IG container failed processing");
    await new Promise((r) => setTimeout(r, 3000));
  }
  const r = await call(`/${env.IG_USER_ID}/media_publish`, { creation_id: container.id });
  console.log("IG post:", r.id);
}

if (target === "fb" || target === "both") await postFacebook();
if (target === "ig" || target === "both") await postInstagram();
