import { readEnv, graphClient } from "./runtime.mjs";
const env = readEnv();
for (const name of ["FB_PAGE_TOKEN", "FB_PAGE_ID", "IG_USER_ID", "SOCIAL_LOG_SECRET"]) {
  if (!env[name]) throw new Error(`Missing ${name}`);
}
const graph = graphClient(env.FB_PAGE_TOKEN);
const page = await graph(`/${env.FB_PAGE_ID}`, { fields: "id,name,instagram_business_account" });
const ig = await graph(`/${env.IG_USER_ID}`, { fields: "id,username" });
if (page.instagram_business_account?.id !== env.IG_USER_ID) throw new Error("Instagram account does not match the configured Facebook page");
console.log(JSON.stringify({ page: page.name, instagram: ig.username, linked: true }, null, 2));
