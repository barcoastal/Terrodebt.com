const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = ts.transpileModule(fs.readFileSync('lib/integrations/zapier.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
let sent;
const settings = {zapier_webhook_default:'https://example.test/default', 'zapier_webhook_google-lp':'https://example.test/google'};
const context = {exports:{},process:{env:{}},require:()=>({db:{setting:{findUnique:async({where})=>settings[where.key] ? {value:settings[where.key]} : null}}}),fetch:async(url,options)=>{sent={url,payload:JSON.parse(options.body)};return {ok:true}}};
vm.runInNewContext(source,context);
(async()=>{
 for (const [source,route] of [['homepage','default'],['get-started','default'],['google-lp','google']]) {
  const result=await context.exports.postToZapier({id:'test-lead',source,tkclid:'test-trakkit-click'});
  assert.equal(result.ok,true);
  assert.equal(sent.url,`https://example.test/${route}`);
  assert.equal(sent.payload.tkclid,'test-trakkit-click');
 }
 console.log('Passed default and per-source webhook routing with tkclid (mocked requests only)');
})().catch(e=>{console.error(e);process.exitCode=1});
