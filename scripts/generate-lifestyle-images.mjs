/**
 * Generates lifestyle interior images for all products using Replicate FLUX Kontext Pro.
 * Takes the actual product image and places it in a matching room scene.
 * Saves lifestyle_image_url into products.ts.
 *
 * Usage: node scripts/generate-lifestyle-images.mjs
 *
 * Runs ONE at a time with retry/rate-limit handling.
 * Saves progress after each image so you can resume if interrupted.
 * Estimated cost: ~$0.04 per image × 282 = ~$11.28 total.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_PATH = join(__dirname, "..", "src", "data", "products.ts");
const API_TOKEN = process.env.REPLICATE_API_TOKEN;
const DELAY_MS = 4000;

const roomMap = {
  stue: "living room", soverom: "bedroom", kontor: "home office",
  "kjøkken": "kitchen", bad: "bathroom", gang: "hallway",
  barnerom: "children's room", entre: "entryway",
};

const categoryMap = {
  sofa: "sofa", bord: "table", stol: "chair", lampe: "lamp",
  teppe: "area rug", pute: "decorative cushions", dekor: "decorative object",
  hylle: "bookshelf", seng: "bed", kommode: "dresser",
  gardin: "curtains", speil: "mirror",
};

const styleMap = {
  skandinavisk: "scandinavian", moderne: "modern", minimalistisk: "minimalist",
  industriell: "industrial", tradisjonell: "traditional", boho: "bohemian",
  klassisk: "classic", rustikk: "rustic",
};

function buildPrompt(product) {
  const room = roomMap[product.room] || product.room || "living room";
  const cat = categoryMap[product.category] || product.category;
  const style = styleMap[product.style] || product.style || "scandinavian";
  const colors = product.colors || "neutral tones";

  return `Place this ${cat} in a beautiful ${style} ${room} with ${colors} color palette. Natural daylight through large windows, warm inviting atmosphere, styled with plants and decor. Interior design magazine quality photo, 8k photorealistic.`;
}

function parseProducts(content) {
  const products = [];
  const regex = /id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?image_url:\s*"([^"]*)"[\s\S]*?style_tags:\s*\[([^\]]*)\][\s\S]*?color_tags:\s*\[([^\]]*)\][\s\S]*?room_tags:\s*\[([^\]]*)\]/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const styleTags = match[5].match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, "")) || [];
    const colorTags = match[6].match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, "")) || [];
    const roomTags = match[7].match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, "")) || [];

    products.push({
      id: match[1],
      name: match[2],
      category: match[3],
      imageUrl: match[4],
      style: styleTags[0] || "moderne",
      colors: colorTags.join(", ") || "neutral",
      room: roomTags[0] || "stue",
    });
  }
  return products;
}

async function createAndWait(prompt, imageUrl, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const createRes = await fetch("https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-pro/predictions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            prompt,
            input_image: imageUrl,
            aspect_ratio: "1:1",
            output_format: "jpg",
            safety_tolerance: 2,
          },
        }),
      });

      if (createRes.status === 429) {
        const wait = attempt * 5000;
        console.log(`    ⏳ Rate limited, waiting ${wait / 1000}s (attempt ${attempt})...`);
        await new Promise(r => setTimeout(r, wait));
        continue;
      }

      const pred = await createRes.json();
      if (!pred.id) {
        console.error(`    No prediction ID:`, JSON.stringify(pred).slice(0, 200));
        await new Promise(r => setTimeout(r, 3000));
        continue;
      }

      // Poll for result (max ~2 min)
      for (let i = 0; i < 40; i++) {
        await new Promise(r => setTimeout(r, 3000));
        const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${pred.id}`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        const pollData = await pollRes.json();

        if (pollData.status === "succeeded" && pollData.output) {
          return typeof pollData.output === "string" ? pollData.output : pollData.output[0] || pollData.output;
        }
        if (pollData.status === "failed" || pollData.status === "canceled") {
          console.error(`    Prediction ${pollData.status}:`, pollData.error?.slice?.(0, 100) || pollData.error);
          break;
        }
      }
    } catch (err) {
      console.error(`    Network error:`, err.message);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  return null;
}

function saveUrl(productId, imageUrl) {
  let content = readFileSync(PRODUCTS_PATH, "utf-8");
  const esc = productId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Check if lifestyle_image_url already exists for this product
  const existingPattern = new RegExp(
    `(id:\\s*"${esc}"[\\s\\S]*?)lifestyle_image_url:\\s*"[^"]*"`
  );

  if (existingPattern.test(content)) {
    content = content.replace(existingPattern, `$1lifestyle_image_url: "${imageUrl}"`);
  } else {
    // Insert after image_url line — handle both \r\n and \n line endings
    const insertPattern = new RegExp(
      `(id:\\s*"${esc}"[\\s\\S]*?image_url:\\s*"[^"]*",\\s*)(\\r?\\n)`
    );
    content = content.replace(insertPattern, `$1$2    lifestyle_image_url: "${imageUrl}",$2`);
  }

  writeFileSync(PRODUCTS_PATH, content, "utf-8");
}

async function main() {
  const content = readFileSync(PRODUCTS_PATH, "utf-8");
  const products = parseProducts(content);

  console.log(`Found ${products.length} products.`);

  // Check already done
  const alreadyDone = new Set();
  const existingRegex = /id:\s*"([^"]+)"[\s\S]*?lifestyle_image_url:\s*"(https:\/\/replicate\.delivery[^"]+)"/g;
  let em;
  while ((em = existingRegex.exec(content)) !== null) {
    alreadyDone.add(em[1]);
  }

  // Filter out products without a valid image_url
  const remaining = products.filter(p => !alreadyDone.has(p.id) && p.imageUrl && p.imageUrl.startsWith("http"));
  const skipped = products.filter(p => !p.imageUrl || !p.imageUrl.startsWith("http"));

  console.log(`Already done: ${alreadyDone.size}`);
  console.log(`Remaining: ${remaining.length}`);
  console.log(`Skipped (no image): ${skipped.length}`);
  console.log(`Estimated cost: ~$${(remaining.length * 0.04).toFixed(2)} (~${Math.round(remaining.length * 0.04 * 10.5)} NOK)\n`);

  if (remaining.length === 0) {
    console.log("All products already have lifestyle images!");
    return;
  }

  let success = 0;
  let failed = 0;
  const startTime = Date.now();

  for (let i = 0; i < remaining.length; i++) {
    const product = remaining[i];
    const prompt = buildPrompt(product);
    const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
    const eta = success > 0 ? (((Date.now() - startTime) / success) * (remaining.length - i) / 1000 / 60).toFixed(1) : "?";

    console.log(`[${i + 1}/${remaining.length}] ${product.id} (${elapsed}min elapsed, ~${eta}min remaining)`);

    const url = await createAndWait(prompt, product.imageUrl);

    if (url) {
      saveUrl(product.id, url);
      success++;
      console.log(`  ✓ saved`);
    } else {
      failed++;
      console.log(`  ✗ failed`);
    }

    // Delay between requests
    if (i < remaining.length - 1) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  const totalMin = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\nDone in ${totalMin} minutes! Success: ${success}, Failed: ${failed}`);
}

main().catch(console.error);
