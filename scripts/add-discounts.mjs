/**
 * Adds discount_code and discount_percent to all products based on brand.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "..", "src", "data", "products.ts");

let content = readFileSync(filePath, "utf-8");

// Remove existing discount fields
content = content.replace(/\s+discount_code: ".*",\n/g, "\n");
content = content.replace(/\s+discount_percent: \d+,\n/g, "\n");
// Clean up any double newlines created
content = content.replace(/\n\n\n+/g, "\n\n");

const brandDiscounts = {
  "IKEA": { code: "DESIGN10", percent: 10 },
  "Bohus": { code: "INTERIOR15", percent: 15 },
  "Bolia": { code: "DESIGNINT10", percent: 10 },
  "Jysk": { code: "DESIGN15", percent: 15 },
  "Kid": { code: "INTERIOR10", percent: 10 },
  "Skeidar": { code: "DESIGN12", percent: 12 },
  "HAY": { code: "HAYDESIGN10", percent: 10 },
  "Møbelringen": { code: "INTERIOR15", percent: 15 },
  "Fagmøbler": { code: "DESIGN10", percent: 10 },
  "Princess": { code: "DESIGN15", percent: 15 },
  "Home & Cottage": { code: "INTERIOR12", percent: 12 },
  "Elkjøp": { code: "DESIGN10", percent: 10 },
  "Kremmerhuset": { code: "INTERIOR15", percent: 15 },
  "Ekornes": { code: "DESIGN8", percent: 8 },
  "Slettvoll": { code: "INTERIOR8", percent: 8 },
  "Hødnebø": { code: "DESIGN10", percent: 10 },
  "HTH": { code: "INTERIOR10", percent: 10 },
  "Høie": { code: "DESIGN12", percent: 12 },
  "Clas Ohlson": { code: "INTERIOR10", percent: 10 },
  "Plantasjen": { code: "DESIGN10", percent: 10 },
  "Tilbords": { code: "INTERIOR12", percent: 12 },
};

const defaultDiscount = { code: "DESIGN10", percent: 10 };

// Find all "in_stock:" lines and insert discount fields before them
// We need to find the brand for each product to assign the right code
const lines = content.split("\n");
const result = [];
let currentBrand = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Track current brand
  const brandMatch = line.match(/^\s+brand:\s*"([^"]+)"/);
  if (brandMatch) {
    currentBrand = brandMatch[1];
  }

  // Insert discount fields before in_stock
  const stockMatch = line.match(/^(\s*)in_stock:/);
  if (stockMatch && currentBrand) {
    const indent = stockMatch[1];
    const disc = brandDiscounts[currentBrand] || defaultDiscount;
    result.push(`${indent}discount_code: "${disc.code}",`);
    result.push(`${indent}discount_percent: ${disc.percent},`);
  }

  result.push(line);
}

writeFileSync(filePath, result.join("\n"), "utf-8");
console.log("Done! Added discount codes to all products.");
