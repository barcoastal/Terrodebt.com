import json,re,subprocess,sys,concurrent.futures,xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from pathlib import Path
base=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:3188'
prod=base.startswith('https://')
states=[code.lower() for code in re.findall(r'code: "([A-Z]{2})"',Path('lib/states.ts').read_text())]
paths=['/programs/settlement','/programs/restructure','/programs/legal-defense','/editorial-policy','/trust','/about','/mca-defense']+['/mca-defense/'+s for s in states]
if prod: paths+=['/insights/'+s for s in json.loads(Path('validation/seo-high-priority/article-slugs.json').read_text())]
def fetch(path):
 raw=subprocess.check_output(['curl','-fsSL','--max-time','25',base+path],text=True)
 return path,BeautifulSoup(raw,'html.parser')
results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for path,s in pool.map(fetch,paths):
  assert len(s.select('h1'))==1,path+' h1'
  assert s.select_one('link[rel="canonical"]')['href']=='https://businessdebtinsider.com'+path,path+' canonical'
  robot=s.select_one('meta[name="robots"]'); noindex=robot and 'noindex' in robot.get('content','')
  assert bool(noindex)==(path.startswith('/mca-defense/') and path.rsplit('/',1)[-1] not in ['fl','ny','ca']),path+' robots'
  text=s.select_one('main').get_text(' ',strip=True)
  if path.startswith('/programs/'):
   assert 'Questions owners ask' in text and 'Sources' in text
   assert len(text.split())>600
   assert 'Recent example' not in text
  if path=='/trust': assert '47%' not in text and 'Joel R.' not in text
  if path.startswith('/insights/'):
   assert 'By TerraDebt Team' not in text
   assert 'Primary sources and further reading' in text
   ld=[json.loads(x.string or x.get_text()) for x in s.select('script[type="application/ld+json"]')]
   assert any(x.get('@type')=='Article' and x['author']['name']=='Business Debt Insider' for x in ld)
  results.append({'path':path,'words':len(text.split()),'noindex':bool(noindex)})
xml=subprocess.check_output(['curl','-fsSL','--max-time','25',base+'/sitemap.xml'],text=True)
urls=[x.text for x in ET.fromstring(xml).iter() if x.tag.endswith('}loc')]
assert set(u.rsplit('/',1)[-1] for u in urls if '/mca-defense/' in u)=={'fl','ny','ca'}
assert 'https://businessdebtinsider.com/editorial-policy' in urls
if prod:assert len([u for u in urls if '/insights/' in u])>=53
file=Path('validation/seo-high-priority')/('live-smoke.json' if prod else 'local-smoke.json')
file.write_text(json.dumps({'base':base,'sitemap_count':len(urls),'pages':results},indent=2))
print(f'Passed {len(results)} rendered pages; sitemap has {len(urls)} URLs and exactly 3 state guides.')
print(json.dumps([r for r in results if r['path'].startswith('/programs/')],indent=2))
