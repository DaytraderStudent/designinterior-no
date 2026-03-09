import json, re

# Load the mapping
with open("scripts/image-mapping.json") as f:
    mapping = json.load(f)

print(f"Loaded {len(mapping)} image mappings")

# Read products.ts
with open("src/data/products.ts", encoding="utf-8") as f:
    content = f.read()

# For each product ID in the mapping, find the product block and update image_url
updated = 0
for product_id, image_url in mapping.items():
    # Find the pattern: id: "product-id", ... image_url: "...",
    # The id and image_url are in the same object block
    # Match the id line, then find the nearest image_url line after it

    # Escape the id for regex
    escaped_id = re.escape(product_id)

    # Find the product block by id
    pattern = f'id: "{escaped_id}"'
    pos = content.find(pattern)
    if pos == -1:
        continue

    # Find the image_url within the next ~500 chars (same object)
    search_region_start = pos
    search_region_end = min(pos + 800, len(content))
    region = content[search_region_start:search_region_end]

    # Replace image_url: "" or image_url: "anything"
    old_match = re.search(r'image_url:\s*"[^"]*"', region)
    if old_match:
        old_str = content[search_region_start + old_match.start():search_region_start + old_match.end()]
        new_str = f'image_url: "{image_url}"'
        content = content[:search_region_start + old_match.start()] + new_str + content[search_region_start + old_match.end():]
        updated += 1

print(f"Updated {updated} image_url entries in products.ts")

with open("src/data/products.ts", "w", encoding="utf-8") as f:
    f.write(content)
