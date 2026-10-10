import test from "node:test";
import assert from "node:assert/strict";
import { aiReferral, summarizeAiReferrals, type AiVisitor } from "../../lib/ai-referrals";
import { visitorSource } from "../../lib/visitor-source";
import { indexNowPayload } from "../../lib/indexnow";
import { estimateMcaCost } from "../../lib/mca-cost";
import revision from "../../lib/seed-data/effective-apr-explained-revision.json";

test("recognizes actual AI domains, legacy ChatGPT, tags, and subdomains", () => {
  for (const [url,provider] of [["https://chatgpt.com/c/123","ChatGPT"],["https://chat.openai.com/","ChatGPT"],["https://www.perplexity.ai/","Perplexity"],["https://copilot.microsoft.com/","Microsoft Copilot"],["https://gemini.google.com/","Gemini"],["https://claude.ai/","Claude"],["https://grok.com/","Grok"]]) assert.equal(aiReferral({referrer:url})?.provider,provider);
  assert.deepEqual(aiReferral({utmSource:" ChatGPT.com "}),{provider:"ChatGPT",evidence:"utm"});
  assert.equal(visitorSource({referrer:"https://chatgpt.com/"}).category,"ai");
});
test("does not mistake spoofed domains, ordinary search, or missing referrers for AI", () => {
  for (const referrer of ["https://chatgpt.com.evil.example/","https://evil.example/?source=chatgpt.com","https://chatgpt.com@evil.example/","https://bing.com/search?q=test","https://google.com/","javascript:chatgpt.com","chatgpt.com",null]) assert.equal(aiReferral({referrer}),null);
});
test("preserves paid, affiliate, and explicit campaign precedence", () => {
  for (const data of [{gclid:"paid"},{fbclid:"paid"},{affiliateClickid:"aff"},{utmMedium:"CPC"},{utmSource:"newsletter"}]) assert.equal(aiReferral({referrer:"https://chatgpt.com/",...data}),null);
  assert.equal(visitorSource({gclid:"paid",utmSource:"chatgpt"}).category,"google-ads");
});
test("counts distinct visitors and multiple leads without bot or date contamination", () => {
  const firstSeen=new Date("2026-10-01T12:00:00Z"),end=new Date("2026-10-10T12:00:00Z");
  const visitor=(id:string,more:Partial<AiVisitor>={}):AiVisitor=>({eliClickid:id,firstSeen,landingPath:"/lenders/fundo?email=private#x",referrer:"https://chatgpt.com/",deviceType:"desktop",userAgent:"Mozilla/5.0",...more});
  const visitors=[visitor("a"),visitor("a"),visitor("b",{utmSource:"perplexity"}),visitor("bot",{userAgent:"ChatGPT-User/1.0"}),visitor("admin",{landingPath:"/admin/articles"}),visitor("paid",{gclid:"123"}),visitor("future",{firstSeen:new Date("2026-10-11")})];
  const leads=[{eliClickid:"a",createdAt:new Date("2026-10-02")},{eliClickid:"a",createdAt:new Date("2026-10-03")},{eliClickid:"a",createdAt:new Date("2026-09-01")},{eliClickid:"b",createdAt:new Date("2026-10-11")},{eliClickid:"bot",createdAt:new Date("2026-10-03")}];
  const report=summarizeAiReferrals(visitors,leads,end);
  assert.equal(report.visitors,2);assert.equal(report.convertedVisitors,1);assert.equal(report.leads,2);
  assert.deepEqual(report.pages,[{name:"/lenders/fundo",visitors:2,convertedVisitors:1,leads:2}]);
});
test("empty reports do not invent traffic or conversions",()=>assert.deepEqual(summarizeAiReferrals([],[],new Date()),{visitors:0,convertedVisitors:0,leads:0,sources:[],pages:[]}));
test("IndexNow only submits deduplicated supported public URLs",()=>{
  assert.deepEqual(indexNowPayload(["/lenders","/lenders/fundo","/lenders"]).urlList,["https://businessdebtinsider.com/lenders","https://businessdebtinsider.com/lenders/fundo"]);
  for(const path of ["//evil.example","https://evil.example","/admin","/api/visitor","/lenders?email=private","/insights/../admin","/lenders/%2e%2e"]) assert.throws(()=>indexNowPayload([path]));
});
test("published APR examples agree with the validated calculator",()=>{
  for(const input of [{funded:100000,upfrontFees:0,payback:145000,payments:26,intervalDays:7 as const},{funded:50000,upfrontFees:0,payback:65000,payments:52,intervalDays:7 as const},{funded:100000,upfrontFees:3000,payback:145000,payments:26,intervalDays:7 as const}]) {
    const result=estimateMcaCost(input)!;
    assert.ok(revision.contentMd.includes(result.estimatedApr.toFixed(1)+"%"));
    assert.ok(revision.contentMd.includes(result.effectiveAnnualRate.toFixed(1)+"%"));
  }
});
