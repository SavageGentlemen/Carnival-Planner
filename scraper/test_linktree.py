import urllib.request
import re

url = 'https://linktr.ee/ohzeenjm'
req = urllib.request.Request(
    url,
    headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
    }
)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        print(f"Fetch success, length: {len(html)}")
        
        # Look for NEXT_DATA or links
        if '__NEXT_DATA__' in html:
            print("Found __NEXT_DATA__ JSON block!")
            
        links = re.findall(r'href="(https?://[^"]+)"', html)
        print(f"Found {len(links)} links. First 10:")
        for l in links[:10]:
            print(" -", l)
            
        # Try to find link tree specific data
        links_with_titles = re.findall(r'<a.*?href="(https?://[^"]+)".*?>(.*?)</a>', html)
        print(f"\nFound {len(links_with_titles)} a tags:")
        for l, t in links_with_titles[:10]:
            clean_t = re.sub(r'<[^>]+>', '', t).strip()
            print(f" - [{clean_t}] -> {l}")
except Exception as e:
    print("Error:", e)
