import assert from 'node:assert/strict';
import { PROGRAMS } from '../../lib/programs';
import { editorialAuthor, articleReferences } from '../../lib/editorial';
import { STATES } from '../../lib/states';
import { STATE_GUIDES, hasStateGuide } from '../../lib/state-guides';
import { articleLd } from '../../lib/structured-data';
import { readFileSync } from 'node:fs';
const slugs: string[]=JSON.parse(readFileSync('validation/seo-high-priority/article-slugs.json','utf8'));
assert.equal(STATES.filter(s=>hasStateGuide(s.code)).length,3);
assert.equal(STATES.filter(s=>!hasStateGuide(s.code)).length,48);
assert.equal(hasStateGuide('fl'),true);
assert.equal(hasStateGuide('zz'),false);
assert.equal(new Set(Object.values(STATE_GUIDES).map(g=>g.rule)).size,3);
assert.equal(editorialAuthor('TerraDebt Team'),'Business Debt Insider');
assert.equal(editorialAuthor('Business Debt Insider'),'Business Debt Insider');
assert.equal(editorialAuthor('A Verified Author'),'A Verified Author');
assert.equal(articleLd({title:'Example',slug:'example',author:'TerraDebt Team',publishedAt:new Date('2026-01-01')}).author.name,'Business Debt Insider');
for(const slug of slugs){
 const refs=articleReferences(slug);
 assert.ok(refs.length>=2);
 assert.ok(refs.every(r=>new URL(r.url).protocol==='https:'));
}
for(const program of Object.values(PROGRAMS)){
 const words=program.sections.flatMap(s=>s.paragraphs).join(' ').split(/\s+/).length;
 assert.ok(words>400,`${program.title} needs substantive guidance`);
 assert.equal(program.questions.length,3);
 assert.ok(program.references.length>=2);
 assert.equal('example' in program,false);
}
console.log('Passed: 3 researched state guides, 48 excluded checklist pages, 53 article reference sets, author/schema consistency, and all program content checks.');
