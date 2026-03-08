import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabase = createClient(
  "https://vbcmeueohlmutmwsknna.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiY21ldWVvaGxtdXRtd3Nrbm5hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc5MjMzNSwiZXhwIjoyMDg4MzY4MzM1fQ.ydtUGs1mIvASa-YzE2-2A7M3EOScw6Htplil3uxW5oY"
);

// Read products.ts to extract the image URLs we just assigned
const content = readFileSync(join(__dirname, "..", "src", "data", "products.ts"), "utf-8");

// Parse product name -> image_url mapping
const products = [];
const blocks = content.split(/\{[\s\r\n]+id:/);

for (let i = 1; i < blocks.length; i++) {
  const block = "{" + "id:" + blocks[i];
  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  const brandMatch = block.match(/brand:\s*"([^"]+)"/);
  const imgMatch = block.match(/image_url:\s*"([^"]+)"/);
  if (nameMatch && brandMatch && imgMatch) {
    products.push({
      name: nameMatch[1],
      brand: brandMatch[1],
      image_url: imgMatch[1],
    });
  }
}

console.log(`Parsed ${products.length} products from products.ts`);

// Update Supabase by matching name + brand
let updated = 0;
let errors = 0;

for (const p of products) {
  const { error } = await supabase
    .from("products")
    .update({ image_url: p.image_url })
    .eq("name", p.name)
    .eq("brand", p.brand);

  if (error) {
    errors++;
    if (errors <= 3) console.error(`Error: ${p.brand} ${p.name}: ${error.message}`);
  } else {
    updated++;
  }
}

console.log(`Updated ${updated} products in Supabase (${errors} errors)`);
