/**
 * Generates SEO-optimized descriptions for all products in products.ts.
 * Uses reverse-order insertion to avoid index shifting issues.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "..", "src", "data", "products.ts");

let content = readFileSync(filePath, "utf-8");

const categoryNouns = {
  sofa: "sofa", bord: "bord", stol: "stol", lampe: "lampe",
  teppe: "teppe", pute: "pute", dekor: "dekorasjon", hylle: "hylle",
  seng: "seng", kommode: "kommode", gardin: "gardin", speil: "speil",
};

const categoryPhrases = {
  sofa: [
    "som kombinerer komfort og stil for den moderne stuen",
    "designet for avslapping og sosialt samvær i hjemmet",
    "som gir rommet et innbydende og stilfullt uttrykk",
    "med gjennomtenkt design for maksimal komfort",
    "som tilbyr god sittekomfort til en fornuftig pris",
  ],
  bord: [
    "som kombinerer funksjonalitet med stilrent design",
    "perfekt som samlingspunkt i rommet",
    "med tidløst design som passer mange interiørstiler",
    "som gir rommet et elegant og praktisk møbel",
    "designet for hverdagens bruk med tanke på holdbarhet",
  ],
  stol: [
    "som gir god støtte og komfortabel sitteopplevelse",
    "med ergonomisk design for langvarig komfort",
    "perfekt for spisestuen, hjemmekontoret eller stuen",
    "som kombinerer komfort med attraktivt design",
    "designet for daglig bruk med fokus på holdbarhet og stil",
  ],
  lampe: [
    "som skaper varmt og innbydende lys i rommet",
    "designet for stemningsfull belysning i hjemmet",
    "som kombinerer funksjonell belysning med dekorativt design",
    "perfekt for å skape lag av lys og koselig atmosfære",
    "med gjennomtenkt lysdesign som løfter interiøret",
  ],
  teppe: [
    "som tilfører varme og tekstur til rommet",
    "perfekt for å definere soner og skape en varm atmosfære",
    "som gir gulvet et mykt og stilfullt løft",
    "designet for å binde sammen møblene i rommet",
    "som tilfører farge og komfort under føttene",
  ],
  pute: [
    "som tilfører farge og komfort til sofaen eller sengen",
    "perfekt for å friske opp interiøret med minimal innsats",
    "som gir et dekorativt løft og ekstra komfort",
    "designet for å skape et innbydende og personlig uttrykk",
    "som enkelt forandrer stilen i rommet",
  ],
  dekor: [
    "som tilfører personlighet og karakter til hjemmet",
    "perfekt for å gi rommet et gjennomtenkt og stilfullt preg",
    "som løfter interiøret med et dekorativt blikkfang",
    "designet for å skape stemning og visuell interesse",
    "som fullfører rommet med en stilig detalj",
  ],
  hylle: [
    "som gir smart oppbevaring og visuell orden i rommet",
    "perfekt for bøker, dekor og personlige gjenstander",
    "som kombinerer praktisk oppbevaring med stilrent uttrykk",
    "designet for å holde orden med et elegant uttrykk",
    "som utnytter plassen effektivt med moderne design",
  ],
  seng: [
    "designet for god søvnkvalitet og komfortabel hvile",
    "som gjør soverommet til et sted for ro og avslapning",
    "med solid konstruksjon for mange år med god søvn",
    "som kombinerer komfort og stil i soverommet",
    "perfekt for en innbydende og avslappende soveopplevelse",
  ],
  kommode: [
    "med god oppbevaringsplass og stilrent design",
    "som holder soverommet ryddig med eleganse",
    "perfekt for organisering av klær og tilbehør",
    "som kombinerer praktisk oppbevaring med dekorativ flate",
    "designet for å gi rommet en ryddig og pen atmosfære",
  ],
  gardin: [
    "som kontrollerer lyset og tilfører tekstur til vinduet",
    "perfekt for å regulere dagslys og skape privatliv",
    "som gir rommet et mykt og ferdig uttrykk",
    "designet for å ramme inn vinduet med stil",
    "som skaper behagelig atmosfære med kontrollert lysinnslipp",
  ],
  speil: [
    "som reflekterer lys og gir rommet en følelse av mer plass",
    "perfekt for å lyse opp mørke hjørner og skape dybde",
    "som fungerer både som praktisk speil og dekorativt element",
    "designet for å gi rommet et visuelt løft og mer romfølelse",
    "som åpner opp rommet og tilfører et elegant preg",
  ],
};

const roomNames = {
  stue: "stuen", soverom: "soverommet", kontor: "hjemmekontoret",
  "kjøkken": "kjøkkenet", bad: "badet", gang: "gangen",
  barnerom: "barnerommet", entre: "entreen",
};

const styleAdj = {
  skandinavisk: "skandinavisk", moderne: "moderne", minimalistisk: "minimalistisk",
  industriell: "industriell", tradisjonell: "klassisk", boho: "bohemsk",
  klassisk: "klassisk", "mid-century": "retro-inspirert", rustikk: "rustikk",
  japansk: "japansk-inspirert",
};

// First, remove any existing description lines (from previous partial run)
content = content.replace(/    description: ".*",\n/g, "");

// Find all product objects by splitting on the pattern
const lines = content.split("\n");
const insertions = []; // { lineIndex, description }

let currentProduct = null;
let productIndex = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detect product id
  const idMatch = line.match(/^\s+id:\s*"([^"]+)"/);
  if (idMatch) {
    currentProduct = { id: idMatch[1], lineIndex: i };
    continue;
  }

  if (!currentProduct) continue;

  // Get name
  const nameMatch = line.match(/^\s+name:\s*"([^"]+)"/);
  if (nameMatch) { currentProduct.name = nameMatch[1]; continue; }

  // Get brand
  const brandMatch = line.match(/^\s+brand:\s*"([^"]+)"/);
  if (brandMatch) { currentProduct.brand = brandMatch[1]; continue; }

  // Get category line — this is where we insert after
  const catMatch = line.match(/^\s+category:\s*"([^"]+)"/);
  if (catMatch) {
    currentProduct.category = catMatch[1];
    currentProduct.categoryLine = i;
    continue;
  }

  // Get style_tags
  const styleMatch = line.match(/^\s+style_tags:\s*\[([^\]]*)\]/);
  if (styleMatch) {
    currentProduct.styles = (styleMatch[1].match(/"([^"]+)"/g) || []).map(s => s.replace(/"/g, ""));
    continue;
  }

  // Get room_tags
  const roomMatch = line.match(/^\s+room_tags:\s*\[([^\]]*)\]/);
  if (roomMatch) {
    currentProduct.rooms = (roomMatch[1].match(/"([^"]+)"/g) || []).map(s => s.replace(/"/g, ""));
    continue;
  }

  // Get dimensions
  const dimMatch = line.match(/dimensions:\s*\{[^}]*width:\s*(\d+)[^}]*depth:\s*(\d+)[^}]*height:\s*(\d+)/);
  if (dimMatch) {
    currentProduct.width = dimMatch[1];
    currentProduct.depth = dimMatch[2];
    currentProduct.height = dimMatch[3];
    continue;
  }

  // Get in_stock (marks end of product)
  const stockMatch = line.match(/^\s+in_stock:/);
  if (stockMatch && currentProduct.name && currentProduct.categoryLine != null) {
    // Generate description
    const { name, brand, category, styles = [], rooms = [], width = "0", depth = "0", height = "0" } = currentProduct;
    const catPhrases = categoryPhrases[category] || categoryPhrases.dekor;
    const catPhrase = catPhrases[productIndex % catPhrases.length];
    const catNoun = categoryNouns[category] || "produkt";
    const styleStr = styles.length > 0 ? (styleAdj[styles[0]] || styles[0]) : "stilfull";
    const roomStr = rooms.length > 0 ? rooms.map(r => roomNames[r] || r).join(" og ") : "hjemmet";

    const patterns = [
      `${brand} ${name} er en ${styleStr} ${catNoun} ${catPhrase}. Med mål på ${width} × ${depth} × ${height} cm passer den godt i ${roomStr}. Kjøp ${name} fra ${brand} hos designinteriør.no — Norges interiørguide.`,
      `Oppdag ${brand} ${name} — en ${styleStr} ${catNoun} ${catPhrase}. Dimensjoner: ${width} × ${depth} × ${height} cm. Ideell for ${roomStr}. Finn de beste møblene og interiørproduktene på designinteriør.no.`,
      `${name} fra ${brand} er en populær ${catNoun} i ${styleStr} stil ${catPhrase}. Måler ${width} × ${depth} × ${height} cm og er et godt valg for ${roomStr}. Se hele utvalget på designinteriør.no.`,
      `Leter du etter en ${styleStr} ${catNoun}? ${brand} ${name} ${catPhrase}. Størrelse ${width} × ${depth} × ${height} cm — passer perfekt i ${roomStr}. Utforsk flere møbler og interiørtips på designinteriør.no.`,
      `${brand} ${name} er en ${catNoun} i ${styleStr} design ${catPhrase}. Med dimensjoner på ${width} × ${depth} × ${height} cm er den ideell for ${roomStr}. Sammenlign priser og finn inspirasjon på designinteriør.no.`,
    ];

    const description = patterns[productIndex % patterns.length];
    insertions.push({ lineIndex: currentProduct.categoryLine, description });

    currentProduct = null;
    productIndex++;
  }
}

console.log(`Found ${insertions.length} products. Inserting descriptions...`);

// Insert from bottom to top to preserve line indices
insertions.sort((a, b) => b.lineIndex - a.lineIndex);

for (const { lineIndex, description } of insertions) {
  const escaped = description.replace(/"/g, '\\"');
  lines.splice(lineIndex + 1, 0, `    description: "${escaped}",`);
}

writeFileSync(filePath, lines.join("\n"), "utf-8");
console.log(`Done! Added ${insertions.length} descriptions.`);
