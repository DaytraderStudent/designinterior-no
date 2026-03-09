import os
from dotenv import load_dotenv
load_dotenv(".env.local")

import json, re, urllib.request

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

# Fetch all products with images from Supabase
url = f"{SUPABASE_URL}/rest/v1/products?select=name,brand,category,image_url&image_url=neq.&order=category,brand,name"
req = urllib.request.Request(url, headers={
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
})
with urllib.request.urlopen(req) as resp:
    products = json.loads(resp.read())

print(f"Loaded {len(products)} products with images from Supabase")

# Build lookup: (name_lower, brand_lower) -> image_url
lookup = {}
for p in products:
    if p["image_url"] and p["image_url"] != "":
        key = (p["name"].lower().strip(), p["brand"].lower().strip())
        lookup[key] = p["image_url"]

print(f"Built lookup with {len(lookup)} entries")

# Read products.ts
with open("src/data/products.ts", encoding="utf-8") as f:
    content = f.read()

# Strategy: find each product block by name+brand pattern and update image_url
updated = 0
for (name_lower, brand_lower), image_url in lookup.items():
    # Find name in the file (case-insensitive search)
    # Look for: name: "...<name>..."
    # This is tricky because names might have special chars

    # Simple approach: find exact name string
    name_patterns = [
        f'name: "{name_lower}"',  # exact lowercase (unlikely)
    ]

    # Try to find the name in the file (case sensitive - use original)
    # We need the original case name from the file
    # Search for the name string in quotes
    escaped_name = re.escape(name_lower)
    matches = list(re.finditer(r'name:\s*"(' + escaped_name + ')"', content, re.IGNORECASE))

    if not matches:
        continue

    for match in matches:
        pos = match.start()
        # Check if brand matches nearby (within same object block)
        region_start = max(0, pos - 200)
        region_end = min(len(content), pos + 600)
        region = content[region_start:region_end]

        # Check brand in this region
        brand_match = re.search(r'brand:\s*"([^"]*)"', region, re.IGNORECASE)
        if not brand_match or brand_match.group(1).lower().strip() != brand_lower:
            continue

        # Found matching product - update image_url
        img_match = re.search(r'image_url:\s*"[^"]*"', region)
        if img_match:
            abs_start = region_start + img_match.start()
            abs_end = region_start + img_match.end()
            old = content[abs_start:abs_end]
            new = f'image_url: "{image_url}"'
            if old != new:
                content = content[:abs_start] + new + content[abs_end:]
                updated += 1
            break  # Only update first match

print(f"Updated {updated} image_url entries in products.ts")

with open("src/data/products.ts", "w", encoding="utf-8") as f:
    f.write(content)
