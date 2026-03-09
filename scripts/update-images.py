import os
from dotenv import load_dotenv
load_dotenv(".env.local")

import json, urllib.request, sys

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

# Image URLs per category
images = {
    "sofa": [
        "https://plus.unsplash.com/premium_photo-1770086950760-937068f2c67a",
        "https://plus.unsplash.com/premium_photo-1770086950447-df2714940172",
        "https://images.unsplash.com/photo-1759722668087-efcc63c91ed2",
        "https://plus.unsplash.com/premium_photo-1770086951270-e9b6bc3b90e0",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        "https://images.unsplash.com/photo-1757081198068-cf8b9e52d7d3",
        "https://images.unsplash.com/photo-1753693292178-92d64a3fc87f",
    ],
    "stol": [
        "https://plus.unsplash.com/premium_photo-1770086948983-1601261c63f3",
        "https://images.unsplash.com/photo-1651075533363-a62617a2257b",
        "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7",
        "https://images.unsplash.com/photo-1748975026911-b4f5db432a54",
        "https://plus.unsplash.com/premium_photo-1770086950881-9123ea58f999",
        "https://images.unsplash.com/photo-1680712738532-3979762a18d0",
        "https://images.unsplash.com/photo-1761914572005-153d4f018290",
        "https://plus.unsplash.com/premium_photo-1768480531043-af03062b7875",
        "https://plus.unsplash.com/premium_photo-1770086951146-b69bb6d1e54f",
    ],
    "bord": [
        "https://images.unsplash.com/premium_photo-1681487588706-c883c47eb524",
        "https://images.unsplash.com/photo-1758977403865-f79e156415b3",
        "https://images.unsplash.com/photo-1758977404096-20d813c73329",
        "https://images.unsplash.com/photo-1656403002413-2ac6137237d6",
        "https://images.unsplash.com/premium_photo-1674165229261-4589d360bc2d",
        "https://images.unsplash.com/photo-1758977403341-0104135995af",
        "https://images.unsplash.com/photo-1758977404683-d04c315a005b",
        "https://images.unsplash.com/photo-1758977403559-9ac31f729128",
    ],
    "lampe": [
        "https://plus.unsplash.com/premium_photo-1704686580119-0ddc24e51b44",
        "https://images.unsplash.com/photo-1769658375183-50e998777ff2",
        "https://images.unsplash.com/photo-1759647020559-2f91a4290ae4",
        "https://images.unsplash.com/photo-1765181539706-361512106019",
        "https://plus.unsplash.com/premium_photo-1706072613979-e2bddb367f41",
        "https://images.unsplash.com/photo-1758380388531-3ce641e4b2d8",
        "https://plus.unsplash.com/premium_photo-1705169612315-43114c0a59ee",
        "https://images.unsplash.com/photo-1759722667550-81316a23d723",
        "https://images.unsplash.com/photo-1765608262875-2b97700ec852",
        "https://images.unsplash.com/photo-1759978257038-ff90be507a3d",
    ],
    "seng": [
        "https://plus.unsplash.com/premium_photo-1678297270015-226732d6aae4",
        "https://images.unsplash.com/photo-1672350563389-6e568bcf8496",
        "https://images.unsplash.com/photo-1672350562148-8bf371963340",
        "https://images.unsplash.com/photo-1643913590311-e92892c2f611",
        "https://images.unsplash.com/photo-1643913592251-3f256e90ec0b",
        "https://images.unsplash.com/photo-1729439886827-891da65069a9",
        "https://images.unsplash.com/photo-1678786591418-2b107bdda369",
        "https://plus.unsplash.com/premium_photo-1661925259824-e106bca657ae",
    ],
}

# Unsplash params for consistent sizing
PARAMS = "?w=400&h=400&fit=crop&auto=format&q=80"

def fetch_products(category):
    url = f"{SUPABASE_URL}/rest/v1/products?select=id,name,category&category=eq.{category}&order=brand,name"
    req = urllib.request.Request(url, headers={
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}",
    })
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())

def update_product(product_id, image_url):
    url = f"{SUPABASE_URL}/rest/v1/products?id=eq.{product_id}"
    data = json.dumps({"image_url": image_url}).encode()
    req = urllib.request.Request(url, data=data, method="PATCH", headers={
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    })
    with urllib.request.urlopen(req) as resp:
        pass

# Process each category
id_to_url = {}
for category, urls in images.items():
    products = fetch_products(category)
    print(f"\n{category}: {len(products)} products, {len(urls)} images")

    for i, product in enumerate(products):
        img_url = urls[i % len(urls)] + PARAMS
        update_product(product["id"], img_url)
        id_to_url[product["id"]] = img_url

    print(f"  Updated {len(products)} products")

# Output mapping for TypeScript update
print(f"\nTotal updated: {len(id_to_url)} products in Supabase")

# Save mapping for products.ts update
with open("scripts/image-mapping.json", "w") as f:
    json.dump(id_to_url, f, indent=2)
print("Saved mapping to scripts/image-mapping.json")
