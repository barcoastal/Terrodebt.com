import assert from 'node:assert/strict';
import { readClientMeta } from '../../lib/client-attribution';
const globals = globalThis as any;
function setup(search = '', cookie = '', stored: Record<string,string> = {}, api?: () => string | null) {
  globals.window = {location:{search},trakkit: api ? {getClickId:api} : undefined};
  globals.document = {cookie};
  globals.localStorage = {getItem:(key:string)=>stored[key] ?? null};
}
setup('?tkclid=new-click','tkclid=old-click');
assert.equal(readClientMeta().tkclid,'new-click');
setup('', '', {}, ()=>'tracker-memory');
assert.equal(readClientMeta().tkclid,'tracker-memory');
setup('', 'tkclid=cookie-click');
globals.localStorage.getItem=()=>{throw new Error('blocked')};
assert.equal(readClientMeta().tkclid,'cookie-click');
setup('', 'td_tkclid=server-cookie');
assert.equal(readClientMeta().tkclid,'server-cookie');
setup('', '', {td_tkclid:'saved-click',td_utm_source:'google'});
assert.equal(readClientMeta().tkclid,'saved-click');
assert.equal(readClientMeta().utmSource,'google');
setup('', 'tkclid=cookie-fallback', {}, ()=>{throw new Error('tracker failed')});
assert.equal(readClientMeta().tkclid,'cookie-fallback');
setup();
assert.equal(readClientMeta().tkclid,undefined);
console.log('Passed 8 attribution assertions');
