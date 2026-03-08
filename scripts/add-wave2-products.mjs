/**
 * Wave 2: Add more products found by research agent.
 * Focuses on IKEA speil, gardiner, tepper, puter, kommoder.
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

const newProducts = [
  // ══════════ SPEIL (more IKEA + Kid) ══════════
  {
    id: "ikea-blodlonn-speil", name: "BLODLØNN speil", brand: "IKEA", category: "speil", price: 129,
    image_url: "https://www.ikea.com/no/no/images/products/blodloenn-speil__0637766_pe698589_s5.jpg",
    style_tags: ["minimalistisk"], color_tags: ["sølv"], room_tags: ["bad", "gang"],
    dimensions: { width: 30, depth: 2, height: 30 },
  },
  {
    id: "ikea-lettan-speil", name: "LETTAN speil", brand: "IKEA", category: "speil", price: 299,
    image_url: "https://www.ikea.com/no/no/images/products/lettan-speil__0714759_pe756223_s5.jpg",
    style_tags: ["minimalistisk", "moderne"], color_tags: ["sølv"], room_tags: ["bad", "soverom"],
    dimensions: { width: 60, depth: 3, height: 95 },
  },
  {
    id: "ikea-lindbyn-speil-hvit", name: "LINDBYN speil hvit", brand: "IKEA", category: "speil", price: 549,
    image_url: "https://www.ikea.com/no/no/images/products/lindbyn-speil-hvit__0976410_pe813191_s5.jpg",
    style_tags: ["skandinavisk", "moderne"], color_tags: ["hvit"], room_tags: ["soverom", "gang"],
    dimensions: { width: 40, depth: 5, height: 130 },
  },
  {
    id: "ikea-dvargsyren-speil", name: "DVÄRGSYRÉN speil eik", brand: "IKEA", category: "speil", price: 399,
    image_url: "https://www.ikea.com/no/no/images/products/dvaergsyren-speil-eikefiner__1357526_pe953619_s5.jpg",
    style_tags: ["skandinavisk"], color_tags: ["eik", "tre"], room_tags: ["gang", "soverom"],
    dimensions: { width: 40, depth: 4, height: 50 },
  },
  {
    id: "ikea-liljetrad-speil", name: "LILJETRÄD speil", brand: "IKEA", category: "speil", price: 229,
    image_url: "https://www.ikea.com/no/no/images/products/liljetraed-speil-svart__1158735_pe888171_s5.jpg",
    style_tags: ["moderne", "industriell"], color_tags: ["svart"], room_tags: ["gang", "soverom"],
    dimensions: { width: 30, depth: 3, height: 115 },
  },
  {
    id: "ikea-nyponbuske-speil", name: "NYPONBUSKE speil", brand: "IKEA", category: "speil", price: 599,
    image_url: "https://www.ikea.com/no/no/images/products/nyponbuske-speil-svart__1419661_pe977063_s5.jpg",
    style_tags: ["moderne", "industriell"], color_tags: ["svart"], room_tags: ["soverom", "stue", "gang"],
    dimensions: { width: 65, depth: 4, height: 135 },
  },
  {
    id: "ikea-kandlenot-speil", name: "KÄNDLENÖT speil rotting", brand: "IKEA", category: "speil", price: 1195,
    image_url: "https://www.ikea.com/no/no/images/products/kandlenoet-speil-rotting__1460714_pe993991_s5.jpg",
    style_tags: ["boho", "skandinavisk"], color_tags: ["natur", "rotting"], room_tags: ["soverom", "stue"],
    dimensions: { width: 60, depth: 5, height: 140 },
  },
  {
    id: "ikea-ikornnes-bordspeil", name: "IKORNNES bordspeil", brand: "IKEA", category: "speil", price: 369,
    image_url: "https://www.ikea.com/no/no/images/products/ikornnes-bordspeil-ask__0637396_pe698269_s5.jpg",
    style_tags: ["skandinavisk"], color_tags: ["tre", "ask"], room_tags: ["soverom", "bad"],
    dimensions: { width: 27, depth: 15, height: 40 },
  },
  {
    id: "ikea-daggkaprifol-speil", name: "DAGGKAPRIFOL speil gul", brand: "IKEA", category: "speil", price: 449,
    image_url: "https://www.ikea.com/no/no/images/products/daggkaprifol-speil-mork-gul__1460710_pe993989_s5.jpg",
    style_tags: ["boho", "moderne"], color_tags: ["gul"], room_tags: ["gang", "stue"],
    dimensions: { width: 60, depth: 4, height: 100 },
  },
  {
    id: "kid-circum-speil", name: "Circum speil svart", brand: "Kid", category: "speil", price: 250,
    image_url: "https://www.kid.no/globalassets/productimages/20163804144.jpg?ref=8F36799D8A&w=590&h=787&mode=pad",
    style_tags: ["minimalistisk", "moderne"], color_tags: ["svart"], room_tags: ["gang", "bad"],
    dimensions: { width: 55, depth: 3, height: 55 },
  },
  {
    id: "kid-spirra-speil", name: "Spirra speil natur", brand: "Kid", category: "speil", price: 450,
    image_url: "https://www.kid.no/globalassets/productimages/209333080070.jpg?ref=AB4DA9DEA3&w=590&h=787&mode=pad",
    style_tags: ["boho", "skandinavisk"], color_tags: ["natur", "bambus"], room_tags: ["soverom", "stue"],
    dimensions: { width: 80, depth: 6, height: 80 },
  },
  {
    id: "kid-dominion-speil-svart", name: "Dominion speil svart", brand: "Kid", category: "speil", price: 500,
    image_url: "https://www.kid.no/globalassets/productimages/209836075900.jpg?ref=581E98EEC8&w=590&h=787&mode=pad",
    style_tags: ["moderne", "industriell"], color_tags: ["svart"], room_tags: ["gang", "soverom"],
    dimensions: { width: 50, depth: 3, height: 75 },
  },
  {
    id: "kid-dominion-speil-gull", name: "Dominion speil gull", brand: "Kid", category: "speil", price: 500,
    image_url: "https://www.kid.no/globalassets/productimages/209836075191.jpg?ref=223F97B81E&w=590&h=787&mode=pad",
    style_tags: ["moderne", "boho"], color_tags: ["gull", "messing"], room_tags: ["stue", "soverom"],
    dimensions: { width: 50, depth: 3, height: 75 },
  },

  // ══════════ GARDIN (more IKEA + Kid) ══════════
  {
    id: "ikea-bengta-gardin", name: "BENGTA lystett gardin", brand: "IKEA", category: "gardin", price: 159,
    image_url: "https://www.ikea.com/no/no/images/products/bengta-lystett-gardin-1-stk-beige-med-multiband__1341494_pe948758_s5.jpg",
    style_tags: ["minimalistisk", "moderne"], color_tags: ["beige"], room_tags: ["soverom"],
    dimensions: { width: 210, depth: 1, height: 250 },
  },
  {
    id: "ikea-hilja-gardin", name: "HILJA gardiner hvit", brand: "IKEA", category: "gardin", price: 129,
    image_url: "https://www.ikea.com/no/no/images/products/hilja-gardiner-1-par-hvit-med-multiband__0627420_pe693352_s5.jpg",
    style_tags: ["minimalistisk"], color_tags: ["hvit"], room_tags: ["stue", "soverom"],
    dimensions: { width: 145, depth: 1, height: 250 },
  },
  {
    id: "ikea-stockholm-2025-gardin", name: "STOCKHOLM 2025 gardin", brand: "IKEA", category: "gardin", price: 649,
    image_url: "https://www.ikea.com/no/no/images/products/stockholm-2025-flortynn-gardin-1-stk-offwhite-med-multiband__1353674_pe952281_s5.jpg",
    style_tags: ["skandinavisk", "moderne"], color_tags: ["offwhite"], room_tags: ["stue"],
    dimensions: { width: 300, depth: 1, height: 250 },
  },
  {
    id: "ikea-sanela-gardin", name: "SANELA gardiner mørk blå", brand: "IKEA", category: "gardin", price: 799,
    image_url: "https://www.ikea.com/no/no/images/products/sanela-gardiner-1-par-mork-bla-med-multiband__1280114_pe931662_s5.jpg",
    style_tags: ["moderne"], color_tags: ["blå", "mørk"], room_tags: ["stue", "soverom"],
    dimensions: { width: 140, depth: 1, height: 250 },
  },
  {
    id: "ikea-vilborg-gardin", name: "VILBORG lysdempende gardiner", brand: "IKEA", category: "gardin", price: 699,
    image_url: "https://www.ikea.com/no/no/images/products/vilborg-lysdempende-gardiner-gra-med-multiband__0594844_pe675879_s5.jpg",
    style_tags: ["moderne", "skandinavisk"], color_tags: ["grå"], room_tags: ["stue", "soverom"],
    dimensions: { width: 145, depth: 1, height: 250 },
  },
  {
    id: "ikea-annakajsa-gardin", name: "ANNAKAJSA lysdempende", brand: "IKEA", category: "gardin", price: 899,
    image_url: "https://www.ikea.com/no/no/images/products/annakajsa-lysdempende-gardiner-antrasitt-med-multiband__1250499_pe923779_s5.jpg",
    style_tags: ["moderne", "industriell"], color_tags: ["antrasitt", "mørk"], room_tags: ["stue", "soverom"],
    dimensions: { width: 145, depth: 1, height: 250 },
  },
  {
    id: "ikea-lill-gardin", name: "LILL lette gardiner", brand: "IKEA", category: "gardin", price: 65,
    image_url: "https://www.ikea.com/no/no/images/products/lill-lette-gardiner-1-par-hvit-med-stanglomme__0099863_pe242253_s5.jpg",
    style_tags: ["minimalistisk"], color_tags: ["hvit"], room_tags: ["stue", "soverom", "kjøkken"],
    dimensions: { width: 280, depth: 1, height: 250 },
  },
  {
    id: "kid-gisle-gardin", name: "Gisle gardin hvit", brand: "Kid", category: "gardin", price: 175,
    image_url: "https://www.kid.no/globalassets/productimages/781122052.jpg?ref=DB8EB9849E&w=590&h=787&mode=pad",
    style_tags: ["minimalistisk", "skandinavisk"], color_tags: ["hvit"], room_tags: ["stue", "soverom"],
    dimensions: { width: 140, depth: 1, height: 220 },
  },
  {
    id: "kid-signe-gardin", name: "Signe gardin blå", brand: "Kid", category: "gardin", price: 150,
    image_url: "https://www.kid.no/globalassets/productimages/20113022021.jpg?ref=72FC8936D1&w=590&h=787&mode=pad",
    style_tags: ["skandinavisk", "moderne"], color_tags: ["blå"], room_tags: ["soverom", "stue"],
    dimensions: { width: 140, depth: 1, height: 220 },
  },

  // ══════════ TEPPE (more IKEA) ══════════
  {
    id: "ikea-arende-teppe", name: "ÄRENDE teppe lang lugg", brand: "IKEA", category: "teppe", price: 679,
    image_url: "https://www.ikea.com/no/no/images/products/aerende-teppe-lang-lugg-offwhite__1416048_pe975419_s5.jpg",
    style_tags: ["skandinavisk", "boho"], color_tags: ["offwhite"], room_tags: ["stue", "soverom"],
    dimensions: { width: 230, depth: 160, height: 1 },
  },
  {
    id: "ikea-stoense-teppe-offwhite", name: "STOENSE teppe offwhite", brand: "IKEA", category: "teppe", price: 2195,
    image_url: "https://www.ikea.com/no/no/images/products/stoense-teppe-kort-lugg-offwhite__0624402_pe691814_s5.jpg",
    style_tags: ["minimalistisk", "skandinavisk"], color_tags: ["offwhite"], room_tags: ["stue", "soverom"],
    dimensions: { width: 300, depth: 200, height: 1 },
  },
  {
    id: "ikea-onsevig-teppe", name: "ÖNSEVIG teppe flerfarget", brand: "IKEA", category: "teppe", price: 1495,
    image_url: "https://www.ikea.com/no/no/images/products/onsevig-teppe-kort-lugg-flerfarget__0941458_pe795476_s5.jpg",
    style_tags: ["boho", "moderne"], color_tags: ["flerfarget"], room_tags: ["stue"],
    dimensions: { width: 235, depth: 160, height: 1 },
  },
  {
    id: "ikea-tiphede-teppe", name: "TIPHEDE teppe natur/svart", brand: "IKEA", category: "teppe", price: 139,
    image_url: "https://www.ikea.com/no/no/images/products/tiphede-teppe-flatvevd-natur-svart__0772066_pe755879_s5.jpg",
    style_tags: ["skandinavisk", "minimalistisk"], color_tags: ["natur", "svart"], room_tags: ["gang", "kjøkken"],
    dimensions: { width: 180, depth: 120, height: 1 },
  },
  {
    id: "ikea-lohals-teppe", name: "LOHALS juteteppe", brand: "IKEA", category: "teppe", price: 399,
    image_url: "https://www.ikea.com/no/no/images/products/lohals-teppe-flatvevd-natur__0428163_pe583379_s5.jpg",
    style_tags: ["boho", "skandinavisk"], color_tags: ["natur", "jute"], room_tags: ["stue", "gang"],
    dimensions: { width: 150, depth: 80, height: 1 },
  },
  {
    id: "ikea-vollerslev-teppe", name: "VOLLERSLEV teppe hvit", brand: "IKEA", category: "teppe", price: 3495,
    image_url: "https://www.ikea.com/no/no/images/products/vollerslev-teppe-lang-lugg-hvit__0933663_pe792171_s5.jpg",
    style_tags: ["skandinavisk", "moderne"], color_tags: ["hvit"], room_tags: ["stue", "soverom"],
    dimensions: { width: 300, depth: 200, height: 2 },
  },

  // ══════════ PUTE (more IKEA + Kid) ══════════
  {
    id: "ikea-gurli-putetrekk", name: "GURLI putetrekk", brand: "IKEA", category: "pute", price: 49,
    image_url: "https://www.ikea.com/no/no/images/products/gurli-putetrekk-ubleket__1409327_pe972205_s5.jpg",
    style_tags: ["minimalistisk", "skandinavisk"], color_tags: ["beige", "natur"], room_tags: ["stue", "soverom"],
    dimensions: { width: 50, depth: 50, height: 10 },
  },
  {
    id: "ikea-dytag-putetrekk", name: "DYTÅG putetrekk grønn", brand: "IKEA", category: "pute", price: 129,
    image_url: "https://www.ikea.com/no/no/images/products/dytag-putetrekk-gragronn__1157569_pe887764_s5.jpg",
    style_tags: ["skandinavisk", "boho"], color_tags: ["grønn"], room_tags: ["stue"],
    dimensions: { width: 50, depth: 50, height: 10 },
  },
  {
    id: "ikea-stockholm-2025-pute", name: "STOCKHOLM 2025 putetrekk", brand: "IKEA", category: "pute", price: 249,
    image_url: "https://www.ikea.com/no/no/images/products/stockholm-2025-putetrekk-rodbrun-rosa__1334067_pe946627_s5.jpg",
    style_tags: ["skandinavisk", "boho"], color_tags: ["rødbrun", "rosa"], room_tags: ["stue"],
    dimensions: { width: 58, depth: 40, height: 10 },
  },
  {
    id: "ikea-svartpoppel-pute", name: "SVARTPOPPEL putetrekk", brand: "IKEA", category: "pute", price: 59,
    image_url: "https://www.ikea.com/no/no/images/products/svartpoppel-putetrekk-antrasitt__1434081_pe983373_s5.jpg",
    style_tags: ["moderne", "minimalistisk"], color_tags: ["antrasitt", "mørk"], room_tags: ["stue", "soverom"],
    dimensions: { width: 50, depth: 50, height: 10 },
  },
  {
    id: "ikea-asjordfly-pute", name: "ÅSJORDFLY putetrekk", brand: "IKEA", category: "pute", price: 129,
    image_url: "https://www.ikea.com/no/no/images/products/asjordfly-putetrekk-offwhite__1321508_pe941633_s5.jpg",
    style_tags: ["skandinavisk", "boho"], color_tags: ["offwhite"], room_tags: ["stue", "soverom"],
    dimensions: { width: 50, depth: 50, height: 10 },
  },
  {
    id: "kid-goodvibes-pute", name: "Good Vibes pyntepute", brand: "Kid", category: "pute", price: 350,
    image_url: "https://www.kid.no/globalassets/productimages/10083303664888.jpg?ref=357B338CBF&w=590&h=787&mode=pad",
    style_tags: ["boho", "moderne"], color_tags: ["flerfarget"], room_tags: ["stue"],
    dimensions: { width: 50, depth: 35, height: 10 },
  },
  {
    id: "kid-betty-pute", name: "Betty pyntepute blå", brand: "Kid", category: "pute", price: 400,
    image_url: "https://www.kid.no/globalassets/productimages/10106903700601.jpg?ref=548A865E0B&w=590&h=787&mode=pad",
    style_tags: ["skandinavisk", "moderne"], color_tags: ["blå"], room_tags: ["stue", "soverom"],
    dimensions: { width: 45, depth: 45, height: 10 },
  },

  // ══════════ KOMMODE (more IKEA) ══════════
  {
    id: "ikea-malm-kommode-6-bred", name: "MALM kommode 6 skuffer bred", brand: "IKEA", category: "kommode", price: 1995,
    image_url: "https://www.ikea.com/no/no/images/products/malm-kommode-6-skuffer-hvit__0484884_pe621348_s5.jpg",
    style_tags: ["minimalistisk", "moderne"], color_tags: ["hvit"], room_tags: ["soverom"],
    dimensions: { width: 160, depth: 48, height: 78 },
  },
  {
    id: "ikea-kullen-kommode", name: "KULLEN kommode brunsvart", brand: "IKEA", category: "kommode", price: 1295,
    image_url: "https://www.ikea.com/no/no/images/products/kullen-kommode-6-skuffer-brunsvart__0651638_pe706983_s5.jpg",
    style_tags: ["moderne"], color_tags: ["brunsvart", "mørk"], room_tags: ["soverom"],
    dimensions: { width: 140, depth: 40, height: 72 },
  },
  {
    id: "ikea-hemnes-kommode-8", name: "HEMNES kommode 8 skuffer", brand: "IKEA", category: "kommode", price: 3695,
    image_url: "https://www.ikea.com/no/no/images/products/hemnes-kommode-med-8-skuffer-hvit-beis__0627346_pe693299_s5.jpg",
    style_tags: ["skandinavisk"], color_tags: ["hvit", "beige"], room_tags: ["soverom"],
    dimensions: { width: 160, depth: 50, height: 96 },
  },
  {
    id: "ikea-tonstad-kommode", name: "TONSTAD kommode eik", brand: "IKEA", category: "kommode", price: 2995,
    image_url: "https://www.ikea.com/no/no/images/products/tonstad-kommode-4-skuffer-eikefiner__1247225_pe922603_s5.jpg",
    style_tags: ["skandinavisk", "moderne"], color_tags: ["eik", "tre"], room_tags: ["soverom"],
    dimensions: { width: 82, depth: 47, height: 90 },
  },
  {
    id: "ikea-havsta-kommode", name: "HAVSTA kommode gråbeige", brand: "IKEA", category: "kommode", price: 3995,
    image_url: "https://www.ikea.com/no/no/images/products/havsta-kommode-6-skuffer-grabeige__1426886_pe980054_s5.jpg",
    style_tags: ["skandinavisk"], color_tags: ["gråbeige"], room_tags: ["stue", "soverom"],
    dimensions: { width: 121, depth: 47, height: 89 },
  },
  {
    id: "ikea-rast-kommode", name: "RAST kommode furu", brand: "IKEA", category: "kommode", price: 695,
    image_url: "https://www.ikea.com/no/no/images/products/rast-kommode-med-3-skuffer-furu__1456952_pe992539_s5.jpg",
    style_tags: ["skandinavisk", "minimalistisk"], color_tags: ["furu", "tre"], room_tags: ["soverom"],
    dimensions: { width: 60, depth: 35, height: 59 },
  },
];

// Add defaults
for (const p of newProducts) {
  p.affiliate_url = "#";
  p.in_stock = true;
}

console.log(`Adding ${newProducts.length} wave-2 products...`);

// ─── 1. Add to products.ts ───────────────────────────────────────
const productsPath = join(__dirname, "..", "src", "data", "products.ts");
let content = readFileSync(productsPath, "utf-8");
const lastBracket = content.lastIndexOf("]");

const entries = newProducts.map((p) => `  {
    id: "${p.id}",
    name: "${p.name}",
    brand: "${p.brand}",
    category: "${p.category}",
    price: ${p.price},
    image_url: "${p.image_url}",
    affiliate_url: "#",
    style_tags: ${JSON.stringify(p.style_tags)},
    color_tags: ${JSON.stringify(p.color_tags)},
    room_tags: ${JSON.stringify(p.room_tags)},
    dimensions: { width: ${p.dimensions.width}, depth: ${p.dimensions.depth}, height: ${p.dimensions.height} },
    in_stock: true,
  }`).join(",\n");

writeFileSync(productsPath, content.slice(0, lastBracket) + entries + ",\n];\n", "utf-8");
console.log(`products.ts updated`);

// ─── 2. Insert into Supabase ─────────────────────────────────────
let inserted = 0, errors = 0;
for (const p of newProducts) {
  const { error } = await supabase.from("products").insert({
    name: p.name, brand: p.brand, category: p.category, price: p.price,
    image_url: p.image_url, affiliate_url: "#",
    style_tags: p.style_tags, color_tags: p.color_tags, room_tags: p.room_tags,
    dimensions: p.dimensions, in_stock: true,
  });
  if (error) { errors++; if (errors <= 3) console.error(`  Error: ${p.name}: ${error.message}`); }
  else inserted++;
}

console.log(`Supabase: Inserted ${inserted} (${errors} errors)`);
const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
console.log(`Total products in Supabase: ${count}`);
