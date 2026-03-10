/**
 * Sets affiliate_url for all products to point to the actual product
 * on the store's website (search page with product name).
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "..", "src", "data", "products.ts");

let content = readFileSync(filePath, "utf-8");

// Brand → search URL template. {q} will be replaced with URL-encoded product name.
const brandSearchUrls = {
  "IKEA": "https://www.ikea.com/no/no/search/?q={q}",
  "Bohus": "https://www.bohus.no/sok?q={q}",
  "Bolia": "https://www.bolia.com/no/søk/?q={q}",
  "Jysk": "https://www.jysk.no/search?query={q}",
  "Kid": "https://www.kid.no/search?q={q}",
  "Skeidar": "https://www.skeidar.no/sok?q={q}",
  "HAY": "https://hay.dk/no/search?q={q}",
  "Møbelringen": "https://www.mobelringen.no/sok?q={q}",
  "Fagmøbler": "https://www.fagmobler.no/sok?q={q}",
  "Princess": "https://www.princess.no/search?q={q}",
  "Home & Cottage": "https://www.homeandcottage.no/search?q={q}",
  "Elkjøp": "https://www.elkjop.no/search?q={q}",
  "Kremmerhuset": "https://www.kremmerhuset.no/search?q={q}",
  "Ekornes": "https://www.ekornes.com/no-no/search?q={q}",
  "Slettvoll": "https://www.slettvoll.no/search?q={q}",
  "Hødnebø": "https://www.hodnebo.no/search?q={q}",
  "HTH": "https://www.hth.no/search?q={q}",
  "Høie": "https://www.hoie.no/search?q={q}",
  "Clas Ohlson": "https://www.clasohlson.com/no/search?q={q}",
  "Plantasjen": "https://www.plantasjen.no/search?q={q}",
  "Tilbords": "https://www.tilbords.no/search?q={q}",
};

// For IKEA, we can build better URLs from the image URL
// Image: https://www.ikea.com/no/no/images/products/kivik-3-seters-sofa-tresund-lys-beige__1124111_pe875024_s5.jpg
// We extract the slug part before __
function getIkeaProductUrl(imageUrl, name) {
  if (imageUrl && imageUrl.includes("ikea.com/no/no/images/products/")) {
    const match = imageUrl.match(/products\/([^_]+)__/);
    if (match) {
      // IKEA product URLs: /no/no/p/{slug}-{articlenum}/
      // We don't have the article number, so use search as fallback
      // But the slug gives us a very targeted search
      const slug = match[1];
      return `https://www.ikea.com/no/no/search/?q=${encodeURIComponent(slug.replace(/-/g, " "))}`;
    }
  }
  return `https://www.ikea.com/no/no/search/?q=${encodeURIComponent(name)}`;
}

// Parse products and update affiliate_url
const productRegex = /(\s+id: "([^"]+)",\s*\n\s+name: "([^"]+)",\s*\n\s+brand: "([^"]+)",[\s\S]*?image_url: "([^"]*)",\s*\n\s+)affiliate_url: "[^"]*"/g;

let count = 0;
content = content.replace(productRegex, (match, prefix, id, name, brand, imageUrl) => {
  let url;

  if (brand === "IKEA") {
    url = getIkeaProductUrl(imageUrl, name);
  } else {
    const template = brandSearchUrls[brand];
    if (template) {
      url = template.replace("{q}", encodeURIComponent(name));
    } else {
      url = `https://www.google.com/search?q=${encodeURIComponent(name + " " + brand + " kjøp")}`;
    }
  }

  count++;
  return `${prefix}affiliate_url: "${url}"`;
});

writeFileSync(filePath, content, "utf-8");
console.log(`Updated ${count} affiliate URLs.`);
