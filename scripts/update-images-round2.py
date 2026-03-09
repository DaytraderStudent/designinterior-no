import os
from dotenv import load_dotenv
load_dotenv(".env.local")

import json, urllib.request

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
PARAMS = "?w=400&h=400&fit=crop&auto=format&q=80"

# Deduplicated image URLs per category from researcher
images = {
    "dekor": [
        "https://images.unsplash.com/photo-1578500494198-246f612d03b3",
        "https://images.unsplash.com/photo-1578901494547-dc3283de5fbb",
        "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b",
        "https://images.unsplash.com/photo-1578500547566-aad67af90135",
    ],
    "hylle": [
        "https://images.unsplash.com/photo-1565538810633-30b0f8f4a6bb",
        "https://images.unsplash.com/photo-1578500494198-246f612d03b3",
        "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b",
        "https://images.unsplash.com/photo-1578500547566-aad67af90135",
    ],
    "teppe": [
        "https://images.unsplash.com/photo-1578500494198-246f612d03b3",
        "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b",
        "https://images.unsplash.com/photo-1578500547566-aad67af90135",
        "https://images.unsplash.com/photo-1565538810633-30b0f8f4a6bb",
        "https://images.unsplash.com/photo-1580136579312-94651dfd596d",
    ],
    "kommode": [
        "https://images.unsplash.com/photo-1578500494198-246f612d03b3",
        "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b",
        "https://images.unsplash.com/photo-1578500547566-aad67af90135",
        "https://images.unsplash.com/photo-1565538810633-30b0f8f4a6bb",
        "https://images.unsplash.com/photo-1580136579312-94651dfd596d",
    ],
    "pute": [
        "https://images.unsplash.com/photo-1578500494198-246f612d03b3",
        "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b",
        "https://images.unsplash.com/photo-1578500547566-aad67af90135",
        "https://images.unsplash.com/photo-1565538810633-30b0f8f4a6bb",
        "https://images.unsplash.com/photo-1580136579312-94651dfd596d",
    ],
    "gardin": [
        "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b",
        "https://images.unsplash.com/photo-1578500547566-aad67af90135",
        "https://images.unsplash.com/photo-1565538810633-30b0f8f4a6bb",
        "https://images.unsplash.com/photo-1580136579312-94651dfd596d",
    ],
    "speil": [
        "https://images.unsplash.com/photo-1578500494198-246f612d03b3",
        "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b",
        "https://images.unsplash.com/photo-1578500547566-aad67af90135",
    ],
}

def fetch_products(category):
    url = f"{SUPABASE_URL}/rest/v1/products?select=id,name,brand,category,image_url&category=eq.{category}&order=brand,name"
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

total = 0
for category, urls in images.items():
    products = fetch_products(category)
    # Only update products that don't already have an image
    needs_update = [p for p in products if not p.get("image_url") or p["image_url"] == ""]
    print(f"{category}: {len(products)} total, {len(needs_update)} need images, {len(urls)} unique URLs")

    for i, product in enumerate(needs_update):
        img_url = urls[i % len(urls)] + PARAMS
        update_product(product["id"], img_url)

    total += len(needs_update)
    print(f"  Updated {len(needs_update)} products")

print(f"\nTotal updated: {total} products in Supabase")
