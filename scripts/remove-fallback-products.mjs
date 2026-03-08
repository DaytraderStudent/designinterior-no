/**
 * Removes all products that have Unsplash fallback images (not real store images).
 * Updates products.ts, seed.mjs, and Supabase.
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabase = createClient(
  "https://vbcmeueohlmutmwsknna.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiY21ldWVvaGxtdXRtd3Nrbm5hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc5MjMzNSwiZXhwIjoyMDg4MzY4MzM1fQ.ydtUGs1mIvASa-YzE2-2A7M3EOScw6Htplil3uxW5oY"
);

// ─── 1. Process products.ts ───────────────────────────────────────
const productsPath = join(__dirname, "..", "src", "data", "products.ts");
const content = readFileSync(productsPath, "utf-8");

// Parse the products array - split by product objects
const headerMatch = content.match(/^([\s\S]*?export const products[^[]*\[)\s*\n/);
const header = headerMatch ? headerMatch[1] : 'export const products: Product[] = [';

// Extract individual product blocks
const productBlocks = [];
const blockRegex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
const arrayContent = content.slice(content.indexOf('[') + 1, content.lastIndexOf(']'));

let match;
while ((match = blockRegex.exec(arrayContent)) !== null) {
  const block = match[0];
  if (block.includes('id:') && block.includes('name:')) {
    productBlocks.push(block);
  }
}

const kept = [];
const removed = [];

for (const block of productBlocks) {
  const imgMatch = block.match(/image_url:\s*"([^"]+)"/);
  if (imgMatch && imgMatch[1].includes("unsplash.com")) {
    const nameMatch = block.match(/name:\s*"([^"]+)"/);
    const brandMatch = block.match(/brand:\s*"([^"]+)"/);
    removed.push({
      name: nameMatch ? nameMatch[1] : "unknown",
      brand: brandMatch ? brandMatch[1] : "unknown",
    });
  } else {
    kept.push(block);
  }
}

console.log(`products.ts: Keeping ${kept.length}, removing ${removed.length}`);

// Get the type definition and imports from the original file
const typeSection = content.substring(0, content.indexOf('export const products'));

// Rebuild products.ts
const newContent = typeSection +
  'export const products: Product[] = [\n' +
  kept.map(b => '  ' + b).join(',\n') +
  '\n];\n';

writeFileSync(productsPath, newContent, "utf-8");
console.log(`products.ts updated: ${kept.length} products remain`);

// ─── 2. Process seed.mjs ─────────────────────────────────────────
const seedPath = join(__dirname, "seed.mjs");
const seedContent = readFileSync(seedPath, "utf-8");
const seedLines = seedContent.split("\n");
const newSeedLines = [];
let seedRemoved = 0;

for (const line of seedLines) {
  // Check if this line is a product insert with unsplash image
  if (line.includes("image_url:") && line.includes("unsplash.com")) {
    seedRemoved++;
    continue; // Skip this line
  }
  newSeedLines.push(line);
}

writeFileSync(seedPath, newSeedLines.join("\n"), "utf-8");
console.log(`seed.mjs: Removed ${seedRemoved} products`);

// ─── 3. Delete from Supabase ─────────────────────────────────────
console.log(`\nDeleting ${removed.length} products from Supabase...`);
let deleted = 0;
let errors = 0;

for (const p of removed) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("name", p.name)
    .eq("brand", p.brand);

  if (error) {
    errors++;
    if (errors <= 5) console.error(`  Error deleting ${p.brand} - ${p.name}: ${error.message}`);
  } else {
    deleted++;
  }
}

console.log(`Supabase: Deleted ${deleted} products (${errors} errors)`);

// Verify remaining count
const { count } = await supabase
  .from("products")
  .select("*", { count: "exact", head: true });
console.log(`Supabase now has ${count} products`);
