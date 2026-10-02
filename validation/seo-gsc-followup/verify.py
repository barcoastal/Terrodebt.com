import concurrent.futures,json,subprocess,sys,xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
base=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:3188'
redirects={
 '/insights/how-many-mcas-too-many-how-many-mcas-too-many':'/insights/how-many-mcas-too-many',
 '/insights/loans-to-restructure-business-debt-loans-to-restructure-business-debt':'/insights/loans-to-restructure-business-debt',
 '/insights/what-is-business-debt-resolution-what-is-business-debt-resolution':'/insights/what-is-business-debt-resolution',
 '/insights/rebuild-business-credit-after-settlement-rebuild-business-credit-after-settlement':'/insights/rebuild-business-credit-after-settlement',
 '/article/negotiating-with-irs':'/insights/irs-business-tax-debt-options',
 '/articles/negotiating-with-irs':'/insights/irs-business-tax-debt-options',
 '/insights/negotiating-with-irs':'/insights/irs-business-tax-debt-options',
}
def get(path):
 return subprocess.check_output(['curl','-fsS','--max-time','30',base+path],text=True)
for path,target in redirects.items():
 headers=subprocess.check_output(['curl','-sS','-D','-','-o','/dev/null','--max-time','30',base+path+'?tkclid=seo-regression'],text=True)
 assert ' 301 ' in headers, (path,headers)
 location=next(l.split(': ',1)[1].strip() for l in headers.splitlines() if l.lower().startswith('location:'))
 assert location.endswith(target+'?tkclid=seo-regression'),(path,location)
 if base.startswith('https://'): assert BeautifulSoup(get(target),'html.parser').select_one('h1')
print(f'Passed {len(redirects)} exact redirects with attribution query preserved')
slugs=['rise-alliance','second-wind-consultants','business-debt-insider','spergel']
for slug in slugs:
 s=BeautifulSoup(get('/reviews/'+slug),'html.parser')
 assert len(s.select('h1'))==1
 assert s.select_one('link[rel="canonical"]')['href']=='https://businessdebtinsider.com/reviews/'+slug
 ld=[json.loads(x.get_text()) for x in s.select('script[type="application/ld+json"]')]
 assert not any(x.get('@type')=='Review' or 'reviewRating' in x for x in ld)
 article=next(x for x in ld if x.get('@type')=='Article')
 assert article['author']['name']=='Business Debt Insider'
 text=s.select_one('main').get_text(' ',strip=True)
 assert 'Ranked #' not in text and 'commercial interest' in text
 if slug in slugs[:2]:
  assert 'Sources and review method' in text and '2026-10-02'==article['dateModified']
  assert len(article['citation'])==2
  assert s.select_one('time')['datetime']=='2026-10-02'
  other=slugs[1] if slug==slugs[0] else slugs[0]
  assert s.select_one('a[href="/reviews/'+other+'"]')
 print(slug, 'passed:',len(text.split()),'words')
s=BeautifulSoup(get('/reviews'),'html.parser')
assert 'Score / 5' not in s.get_text()
for slug in slugs[:2]: assert s.select_one('a[href="/reviews/'+slug+'"]')
xml=ET.fromstring(get('/sitemap.xml'));ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
for slug in slugs[:2]:
 row=next(x for x in xml if x.find('s:loc',ns).text.endswith('/reviews/'+slug))
 assert row.find('s:lastmod',ns).text.startswith('2026-10-02')
print('Passed review hub and sitemap update dates')
