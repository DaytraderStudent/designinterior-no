import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const categoryImages = {
  sofa: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1628512743826-2c28a508ad5e?w=400&h=300&fit=crop&auto=format",
  ],
  stol: [
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=400&h=300&fit=crop&auto=format",
  ],
  bord: [
    "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1530603907829-659ab5ec057b?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=300&fit=crop&auto=format",
  ],
  lampe: [
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1530603907829-659ab5ec057b?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1534105615256-13940a56ff44?w=400&h=300&fit=crop&auto=format",
  ],
  hylle: [
    "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1593085260707-5377ba37f868?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=300&fit=crop&auto=format",
  ],
  dekor: [
    "https://images.unsplash.com/photo-1581912492723-688317ba2162?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1612620535624-f6695d4864bb?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1578500351865-d6c3706f46bc?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1595351475754-8a520e0bc3a3?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&h=300&fit=crop&auto=format",
  ],
  kommode: [
    "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?w=400&h=300&fit=crop&auto=format",
  ],
  seng: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=400&h=300&fit=crop&auto=format",
  ],
  teppe: [
    "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1595351475754-8a520e0bc3a3?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=400&h=300&fit=crop&auto=format",
  ],
  pute: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1578500351865-d6c3706f46bc?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1581912492723-688317ba2162?w=400&h=300&fit=crop&auto=format",
  ],
  gardin: [
    "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1612620535624-f6695d4864bb?w=400&h=300&fit=crop&auto=format",
  ],
  speil: [
    "https://images.unsplash.com/photo-1581912492723-688317ba2162?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&h=300&fit=crop&auto=format",
  ],
};

const seedPath = join(__dirname, "seed.mjs");
let content = readFileSync(seedPath, "utf-8");

const counters = {};

// seed.mjs has inline format: image_url: "/products/xxx.jpg"
// We need to match within single-line product objects
const lines = content.split("\n");
const newLines = [];

for (const line of lines) {
  // Extract category from the line (seed.mjs has all product fields on one line)
  const catMatch = line.match(/category:\s*"([^"]+)"/);
  if (catMatch) {
    const cat = catMatch[1];
    const images = categoryImages[cat] || categoryImages.dekor;
    if (!counters[cat]) counters[cat] = 0;
    const idx = counters[cat] % images.length;
    counters[cat]++;
    // Replace image_url value
    const updated = line.replace(/image_url:\s*"[^"]*"/, `image_url: "${images[idx]}"`);
    newLines.push(updated);
  } else {
    newLines.push(line);
  }
}

writeFileSync(seedPath, newLines.join("\n"), "utf-8");

console.log("Seed file updated:");
for (const [cat, count] of Object.entries(counters)) {
  console.log(`  ${cat}: ${count}`);
}
console.log(`Total: ${Object.values(counters).reduce((a, b) => a + b, 0)}`);
