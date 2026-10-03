import json,subprocess,sys,xml.etree.ElementTree as ET,concurrent.futures
from bs4 import BeautifulSoup
base=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:3188'
slugs=['business-debt-insider','spergel','second-wind-consultants','national-credit-partners','eastern-financial-partners','rise-alliance','regroup-partners','delancey-street','corporate-turnaround','business-debt-law-group','corporate-rescue','national-debt-relief','business-debt-adjusters','stop-mca','mca-debt-advisors','mca-resolve']
def fetch(path):return subprocess.check_output(['curl','-fsS','--max-time','30',base+path],text=True)
def review(slug):
 s=BeautifulSoup(fetch('/reviews/'+slug),'html.parser');main=s.select_one('main');text=main.get_text(' ',strip=True)
 assert len(s.select('h1'))==1,slug
 assert s.select_one('link[rel="canonical"]')['href']=='https://businessdebtinsider.com/reviews/'+slug
 assert 'Sources and review method' in text and 'commercial interest' in text
 assert not any('/undefined' in a['href'] for a in s.select('a[href]'))
 ld=[json.loads(x.get_text()) for x in s.select('script[type="application/ld+json"]')];article=next(x for x in ld if x.get('@type')=='Article')
 assert not any(x.get('@type')=='Review' or 'reviewRating' in x for x in ld)
 assert article['author']['name']=='Business Debt Insider'
 assert article['citation'] and all(s.select_one('a[href="'+u+'"]') for u in article['citation'])
 expected='2026-10-02' if slug in ['rise-alliance','second-wind-consultants'] else '2026-10-03'
 assert article['dateModified']==expected and s.select_one('time')['datetime']==expected
 assert ('October 2, 2026' if expected.endswith('02') else 'October 3, 2026') in s.select_one('time').get_text()
 assert len(text.split())>400,(slug,'insufficient rendered content')
 return {'slug':slug,'words':len(text.split()),'sources':len(article['citation']),'date':expected}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:results=list(pool.map(review,slugs))
redirects={'/articles':'/insights','/industries/healthcare-practices':'/industries/healthcare','/article/understanding-ucc-liens':'/insights/ucc-liens-and-account-freezes','/articles/understanding-ucc-liens':'/insights/ucc-liens-and-account-freezes','/insights/understanding-ucc-liens':'/insights/ucc-liens-and-account-freezes','/opengraph-image':'/social-image'}
for path,target in redirects.items():
 h=subprocess.check_output(['curl','-sS','-D','-','-o','/dev/null','--max-time','30',base+path+'?tkclid=seo-check'],text=True)
 assert ' 301 ' in h,(path,h)
 assert any(l.lower().startswith('location:') and l.strip().endswith(target+'?tkclid=seo-check') for l in h.splitlines()),path
 if base.startswith('https://'):
  content=subprocess.check_output(['curl','-fsS','-o','/dev/null','-w','%{content_type}',base+target],text=True)
  assert ('image/' in content) if path=='/opengraph-image' else ('text/html' in content)
# Retired pages without equivalent content should remain genuine 404s.
for path in ['/article/personal-guarantees-bankruptcy','/article/best-bankruptcy-attorneys-california','/not-a-real-bdi-page-seo-check']:
 code=subprocess.check_output(['curl','-sSL','--max-time','30','-o','/dev/null','-w','%{http_code}',base+path],text=True)
 assert code=='404',(path,code)
s=BeautifulSoup(fetch('/reviews'),'html.parser')
assert 'awaiting the same source review' not in s.get_text() and 'Score / 5' not in s.get_text()
for slug in slugs:assert s.select_one('a[href="/reviews/'+slug+'"]')
xml=ET.fromstring(fetch('/sitemap.xml'));ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
for r in results:
 row=next(x for x in xml if x.find('s:loc',ns).text.endswith('/reviews/'+r['slug']))
 assert row.find('s:lastmod',ns).text.startswith(r['date'])
print(json.dumps(results,indent=2));print('Passed all 16 reviews, source/date/schema consistency, 6 new redirects preserving tkclid, 3 genuine 404s, review hub, and sitemap dates.')
