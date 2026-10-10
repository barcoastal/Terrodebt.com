"""Check rendered SEO output after a preview or production deployment."""
import concurrent.futures
import json
from pathlib import Path
import re
import subprocess
import sys
from html.parser import HTMLParser

BASE = sys.argv[1].rstrip("/")
ROOT = Path(__file__).resolve().parents[2]
SLUGS = re.findall(r'slug: "([a-z-]+)"', (ROOT / "lib/lender-content.ts").read_text())
PATHS = ["/lenders", *[f"/lenders/{slug}" for slug in SLUGS], "/tools/apr-calculator", "/tools/stack-calculator", "/reviews/second-wind-consultants", "/reviews/rise-alliance"]

def fetch(path):
    result = subprocess.run(["curl", "-sS", "-L", "--max-time", "30", "-w", "\n%{http_code}", BASE + path], capture_output=True, text=True, check=True)
    body, status = result.stdout.rsplit("\n", 1)
    return body, int(status)

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.canonical = None
        self.robots = ""
        self.ids = set()
        self.anchors = []
        self.schemas = []
        self.script = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "h1": self.h1 += 1
        if tag == "link" and a.get("rel") == "canonical": self.canonical = a.get("href")
        if tag == "meta" and a.get("name") == "robots": self.robots = a.get("content", "")
        if a.get("id"): self.ids.add(a["id"])
        if tag == "a" and a.get("href", "").startswith("#source-"): self.anchors.append(a["href"][1:])
        if tag == "script" and a.get("type") == "application/ld+json": self.script = ""
    def handle_data(self, data):
        if self.script is not None: self.script += data
    def handle_endtag(self, tag):
        if tag == "script" and self.script is not None:
            self.schemas.append(json.loads(self.script))
            self.script = None

def check(path):
    body, status = fetch(path)
    page = Page()
    page.feed(body)
    assert status == 200, (path, status)
    assert page.h1 == 1, (path, "h1", page.h1)
    assert page.canonical == "https://businessdebtinsider.com" + path, (path, page.canonical)
    assert "noindex" not in page.robots, (path, page.robots)
    if path.startswith("/lenders/"):
        assert all(anchor in page.ids for anchor in page.anchors), (path, "missing source target")
        assert len(page.anchors) == 3, (path, "missing facts")
        assert any(s.get("@type") == "Article" and s.get("citation") for s in page.schemas), (path, "article schema")
        assert any(s.get("@type") == "FAQPage" and len(s.get("mainEntity", [])) == 2 for s in page.schemas), (path, "FAQ schema")
    return {"path": path, "status": status, "canonical": page.canonical, "schemas": len(page.schemas)}

with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    results = list(pool.map(check, PATHS))
body, status = fetch("/api/search-index")
assert status == 200
items = json.loads(body)["items"]
assert len([i for i in items if i["type"] == "lender"]) == 10
assert len([i for i in items if i["type"] == "review"]) == 16
assert fetch("/lenders/not-a-real-lender")[1] == 404
if BASE.startswith("https://businessdebtinsider.com"):
    sitemap, status = fetch("/sitemap.xml")
    assert status == 200
    for slug in SLUGS: assert f"/lenders/{slug}</loc>" in sitemap
    assert len(re.findall(r"<loc>", sitemap)) >= 118
    article, status = fetch("/insights/mca-settlement-success-rates")
    assert status == 200 and "How to Evaluate the Evidence" in article
    assert "75 to 90 percent" not in article
    assert "Editorial correction" in article
print(json.dumps({"passed": len(results), "searchLenders": 10, "searchReviews": 16, "unknownLender": 404, "pages": results}, indent=2))
