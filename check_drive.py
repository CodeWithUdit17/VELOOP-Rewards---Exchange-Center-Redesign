import urllib.request
import re

url = 'https://drive.google.com/drive/folders/1ZA-ZR8Tu1aSM58_Na6nrP5tlvQ5tuiX?usp=sharing'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print('Length:', len(html))
        # Look for image names like png, jpg, webp
        names = set(re.findall(r'[\w\-\s]+\.(?:png|jpg|jpeg|svg|webp)', html, re.IGNORECASE))
        print('Image names found:', names)
except Exception as e:
    print('Error:', e)
