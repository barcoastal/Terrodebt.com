"""Screen public articles for claims that need editorial review; flags are not verdicts."""
import concurrent.futures, json, re, subprocess
from pathlib import Path
from html.parser import HTMLParser
BASE='https://businessdebtinsider.com'
OUT=Path('validation/ai-followup')
class Text(HTMLParser):
 def __init__(self):
  super().__init__();self.active=False;self.depth=0;self.skip=0;self.parts=[];self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='article': self.active=True
  if tag in ('script','style'):self.skip+=1
  if self.active and tag=='a' and a.get('href','').startswith('http'):self.links.append(a['href'])
 def handle_endtag(self,tag):
  if tag in ('script','style'):self.skip=max(0,self.skip-1)
  if tag=='article':self.active=False
  if tag in ('p','h1','h2','h3','li','tr'):self.parts.append('\n')
 def handle_data(self,data):
  if self.active and not self.skip:self.parts.append(data)
def get(url):
 return subprocess.check_output(['curl','-fsSL','--max-time','30',url],text=True)
patterns={
 'outcome_or_market_percentage':r'(?i)\b\d+(?:\.\d+)?\s*(?:to\s*\d+\s*)?(?:percent|%)',
 'unqualified_outcome':r'(?i)always|never|almost (?:always|never)|guaranteed|settle faster|one (?:time )?in fifty|we see|our experience|typically settles|usually settles',
 'legal_or_payment_action':r'(?i)revoke|block.{0,30}(?:ACH|debit)|stop.{0,20}pay|unenforceable|illegal|usury|obligated|confession of judgment',
 'apr_math':r'(?i)effective APR|annualized|amortiz',
}
def check(url):
 p=Text();p.feed(get(url));body=''.join(p.parts);lines=[re.sub(r'\s+',' ',s).strip() for s in body.splitlines() if s.strip()]
 slug=url.rsplit('/',1)[-1];(OUT/'article-text').mkdir(exist_ok=True)
 (OUT/'article-text'/f'{slug}.txt').write_text('\n'.join(lines))
 flags={name:[line[:750] for line in lines if re.search(pat,line)] for name,pat in patterns.items()}
 return {'url':url,'wordCount':len(body.split()),'externalLinks':sorted(set(p.links)),'flags':{k:v for k,v in flags.items() if v}}
urls=[u for u in re.findall(r'<loc>(.*?)</loc>',get(BASE+'/sitemap.xml')) if '/insights/' in u]
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:results=list(pool.map(check,urls))
(OUT/'article-audit.json').write_text(json.dumps(results,indent=2))
print(json.dumps({'screened':len(results),'flagged':sum(bool(r['flags']) for r in results),'categories':{k:sum(k in r['flags'] for r in results) for k in patterns}},indent=2))
