/**
 * Generates hero + category images for the landing page using Replicate FLUX 1.1 Pro Ultra.
 * Downloads images to public/images/ for self-hosting.
 *
 * Usage: REPLICATE_API_TOKEN=xxx node scripts/generate-site-images.mjs
 * Estimated cost: ~$0.66 (11 images × ~$0.06)
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "images");
const API_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!API_TOKEN) {
  console.error("Missing REPLICATE_API_TOKEN env var");
  process.exit(1);
}

// Ensure output directory
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const images = [
  {
    name: "hero",
    aspect: "16:9",
    prompt: "A beautifully styled Scandinavian living room interior, warm afternoon sunlight streaming through large windows, cream and beige color palette with warm wood accents, a plush sofa with textured cushions, a round wooden coffee table, dried eucalyptus in a ceramic vase, soft wool throw blanket, minimalist bookshelf with curated objects, oak hardwood floors with a natural jute rug, editorial interior design photography, shot on Phase One IQ4, natural light, warm tones, hygge atmosphere, 8k ultra detailed",
  },
  {
    name: "cat-sofa",
    aspect: "4:3",
    prompt: "A stunning modern Scandinavian sofa in a bright living room, cream colored upholstery, wooden legs, styled with throw pillows and a wool blanket, warm natural light, oak floor, minimalist decor, interior design magazine photo, warm beige and cream tones, editorial photography, 8k",
  },
  {
    name: "cat-stol",
    aspect: "4:3",
    prompt: "An elegant Scandinavian dining chair in warm oak wood, placed at a beautifully set dining table, soft natural light, linen napkins, ceramic plates, warm earthy tones, minimalist interior, editorial interior photography, 8k",
  },
  {
    name: "cat-seng",
    aspect: "4:3",
    prompt: "A cozy Scandinavian bedroom with a luxurious bed, white linen bedding, warm wood headboard, soft morning light through sheer curtains, bedside table with a ceramic lamp, dried flowers, warm cream and beige palette, hygge atmosphere, editorial interior photography, 8k",
  },
  {
    name: "cat-bord",
    aspect: "4:3",
    prompt: "A beautiful Scandinavian oak dining table in a bright room, styled with a ceramic vase and candles, warm natural wood grain, surrounded by modern chairs, large windows with natural light, warm earth tones, editorial interior photography, 8k",
  },
  {
    name: "cat-lampe",
    aspect: "4:3",
    prompt: "A collection of beautiful Scandinavian pendant lamps and table lamps in a warm living space, brass and matte black finishes, warm glowing light, linen lamp shades, cozy evening atmosphere, warm beige walls, editorial interior photography, 8k",
  },
  {
    name: "cat-teppe",
    aspect: "4:3",
    prompt: "A luxurious handwoven wool rug on a light oak hardwood floor, Scandinavian living room, natural textures, warm earthy tones, cream and terracotta colors, a leather armchair partially visible, soft natural light, editorial interior photography, 8k",
  },
  {
    name: "cat-hylle",
    aspect: "4:3",
    prompt: "A beautifully styled Scandinavian bookshelf in warm oak wood, curated with books, ceramics, small plants, and design objects, warm neutral wall behind, soft natural light from the side, organized but lived-in feel, editorial interior photography, 8k",
  },
  {
    name: "cat-kommode",
    aspect: "4:3",
    prompt: "An elegant Scandinavian dresser in light oak, styled with a round mirror above, ceramic tray with candles, a small plant, warm bedroom setting, soft morning light, cream and warm wood tones, editorial interior photography, 8k",
  },
  {
    name: "cat-dekor",
    aspect: "4:3",
    prompt: "A styled vignette of Scandinavian home decor objects on a wooden shelf, ceramic vases in earthy tones, dried flowers, brass candle holders, a small sculpture, warm natural light, cream wall background, editorial still life photography, 8k",
  },
  {
    name: "cat-pute",
    aspect: "4:3",
    prompt: "A collection of beautiful Scandinavian throw pillows on a cream sofa, textured fabrics in warm earth tones - linen, boucle, wool, cream, terracotta and sage colors, cozy hygge atmosphere, soft natural light, editorial interior photography, 8k",
  },
];

async function createAndWait(prompt, aspect, maxRetries = 4) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const createRes = await fetch(
        "https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro-ultra/predictions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: {
              prompt,
              aspect_ratio: aspect,
              output_format: "jpg",
              output_quality: 90,
              safety_tolerance: 2,
            },
          }),
        }
      );

      if (createRes.status === 429) {
        const wait = attempt * 5000;
        console.log(`    Rate limited, waiting ${wait / 1000}s...`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }

      const pred = await createRes.json();
      if (!pred.id) {
        console.error(`    No prediction ID:`, JSON.stringify(pred).slice(0, 200));
        await new Promise((r) => setTimeout(r, 3000));
        continue;
      }

      console.log(`    Prediction ${pred.id} created, polling...`);

      for (let i = 0; i < 60; i++) {
        await new Promise((r) => setTimeout(r, 3000));
        const pollRes = await fetch(
          `https://api.replicate.com/v1/predictions/${pred.id}`,
          { headers: { Authorization: `Bearer ${API_TOKEN}` } }
        );
        const data = await pollRes.json();

        if (data.status === "succeeded" && data.output) {
          const url = typeof data.output === "string" ? data.output : data.output[0] || data.output;
          return url;
        }
        if (data.status === "failed" || data.status === "canceled") {
          console.error(`    ${data.status}:`, data.error?.slice?.(0, 100));
          break;
        }
      }
    } catch (err) {
      console.error(`    Error:`, err.message);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
  return null;
}

async function downloadImage(url, filepath) {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(filepath, buffer);
  return buffer.length;
}

async function main() {
  console.log(`Generating ${images.length} images with FLUX 1.1 Pro Ultra`);
  console.log(`Estimated cost: ~$${(images.length * 0.06).toFixed(2)}\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const outPath = join(OUT_DIR, `${img.name}.jpg`);

    // Skip if already exists
    if (existsSync(outPath)) {
      console.log(`[${i + 1}/${images.length}] ${img.name} — already exists, skipping`);
      success++;
      continue;
    }

    console.log(`[${i + 1}/${images.length}] ${img.name} (${img.aspect})`);

    const url = await createAndWait(img.prompt, img.aspect);

    if (url) {
      const bytes = await downloadImage(url, outPath);
      const kb = (bytes / 1024).toFixed(0);
      console.log(`    Saved ${kb}KB → ${outPath}`);
      success++;
    } else {
      console.log(`    FAILED`);
      failed++;
    }

    // Small delay between requests
    if (i < images.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log(`\nDone! Success: ${success}, Failed: ${failed}`);
}

main().catch(console.error);
