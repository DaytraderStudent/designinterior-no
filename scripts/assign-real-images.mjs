/**
 * Assigns real store product images to all 507 products.
 * Uses actual product images from store websites where available,
 * falls back to confirmed Unsplash furniture images for the rest.
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── IKEA product images (from ikea.com/no/no) ─────────────────────
const ikeaImages = {
  "ikea-kivik": "https://www.ikea.com/no/no/images/products/kivik-3-seters-sofa-tresund-lys-beige__1124111_pe875024_s5.jpg",
  "ikea-lack": "https://www.ikea.com/no/no/images/products/lack-bord-hvit__0750652_pe746803_s5.jpg",
  "ikea-billy": "https://www.ikea.com/no/no/images/products/billy-bokhylle-hvit__0625599_pe692385_s5.jpg",
  "ikea-kallax": "https://www.ikea.com/no/no/images/products/kallax-hylle-hvit__0644757_pe702939_s5.jpg",
  "ikea-hemnes": "https://www.ikea.com/no/no/images/products/hemnes-seng-hvit-beis__0637516_pe698353_s5.jpg",
  "ikea-poang": "https://www.ikea.com/no/no/images/products/poaeng-lenestol-bjorkefiner-hillared-antrasitt__0497120_pe628947_s5.jpg",
  "ikea-stockholm": "https://www.ikea.com/no/no/images/products/stockholm-teppe-flatvevd-handlaget-stripet-svart-offwhite__56123_pe161531_s5.jpg",
  "ikea-hektar": "https://www.ikea.com/no/no/images/products/hektar-gulvlampe-mork-gra__0149974_pe308131_s5.jpg",
  "ikea-besta": "https://www.ikea.com/no/no/images/products/besta-tv-benk-hvit__0384984_pe557581_s5.jpg",
  "ikea-malm": "https://www.ikea.com/no/no/images/products/malm-kommode-med-3-skuffer-hvit__0484875_pe621342_s5.jpg",
  "ikea-ektorp": "https://www.ikea.com/no/no/images/products/ektorp-3-seters-sofa-tallmyra-beige__0779512_pe759553_s5.jpg",
  "ikea-stockholm2017": "https://www.ikea.com/no/no/images/products/stockholm-2017-teppe-flatvevd-handlaget-stripet-gra__0448991_pe598562_s5.jpg",
  "ikea-symfonisk": "https://www.ikea.com/no/no/images/products/symfonisk-lampefot-med-tradlos-hoyttaler-hvit-smart__0993364_pe820510_s5.jpg",
  "ikea-fejka": "https://www.ikea.com/no/no/images/products/fejka-kunstig-potteplante-inne-ute-eukalyptus__0674947_pe718059_s5.jpg",
  "ikea-lisabo": "https://www.ikea.com/no/no/images/products/lisabo-bord-askefiner__0737105_pe740883_s5.jpg",
  "ikea-lerberg": "https://www.ikea.com/no/no/images/products/lerberg-shelf-unit-dark-grey__69211_pe183961_s5.jpg",
  "ikea-mottaga": "https://www.ikea.com/no/no/images/products/mottaga-servietter-hvit__0773585_pe756338_s5.jpg",
  "ikea-havsten": "https://www.ikea.com/no/no/images/products/havsten-lenestol-utendors-beige__1138954_pe880159_s5.jpg",
  "ikea-stockholm-nest": "https://www.ikea.com/no/no/images/products/stockholm-settbord-sett-med-2-stk-valnottfiner__0735683_pe740088_s5.jpg",
  "ikea-nordli": "https://www.ikea.com/no/no/images/products/nordli-kommode-6-skuffer-hvit__0555314_pe660399_s5.jpg",
  "ikea-idanas": "https://www.ikea.com/no/no/images/products/idanaes-seng-med-skuffer-hvit-loenset__1151017_pe884724_s5.jpg",
  "ikea-vimle": "https://www.ikea.com/no/no/images/products/vimle-3-seters-sofa-med-sjeselong-gunnared-mellomgra__0514362_pe639437_s5.jpg",
  "ikea-ranarp": "https://www.ikea.com/no/no/images/products/ranarp-gulv-leselampe-svart__0606896_pe682604_s5.jpg",
  "ikea-ektorp-jennylund": "https://www.ikea.com/no/no/images/products/ektorp-lenestol-kilanda-lys-beige__1242736_pe920364_s5.jpg",
  "ikea-sinnerlig": "https://www.ikea.com/no/no/images/products/sinnerlig-gulvlampe-bambus-handlaget__1102331_pe866913_s5.jpg",
  "ikea-gladom": "https://www.ikea.com/no/no/images/products/gladom-brettbord-hvit__0470732_pe612912_s5.jpg",
  "ikea-sundvik": "https://www.ikea.com/no/no/images/products/sundvik-sprinkelseng-hvit__0637925_pe698610_s5.jpg",
  "ikea-landskrona": "https://www.ikea.com/no/no/images/products/landskrona-3-seters-sofa-grann-bomstad-gyllenbrun-metall__0602109_pe680178_s5.jpg",
  "ikea-strandmon": "https://www.ikea.com/no/no/images/products/strandmon-orelappstol-nordvalla-mork-gra__0325432_pe517964_s5.jpg",
  "ikea-tanum": "https://www.ikea.com/no/no/images/products/tanum-teppe-flatvevd-flere-farger__0949362_pe799670_s5.jpg",
};

// ─── Brand-level images (from store websites) ─────────────────────
// For brands where we have real store images, rotate per category
const brandImages = {
  "Jysk": {
    sofa: [
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7879452_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7260632_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/8367838_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/8026671_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7260627_m.jpg",
    ],
    stol: [
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7316651_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7316647_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/8616898_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7260623_m.jpg",
    ],
    bord: [
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/8616897_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7260603_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7619453_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/8162695_m.jpg",
    ],
    seng: [
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7260585_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7260587_m.jpg",
    ],
    kommode: [
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7260601_m.jpg",
    ],
    hylle: [
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7316644_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/8367841_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/8164178_m.jpg",
    ],
    pute: [
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7266172_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/8367858_m.jpg",
    ],
    lampe: [
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7930989_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7618068_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7316654_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7618078_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7618077_m.jpg",
    ],
    dekor: [
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/8367826_m.jpg",
      "https://s3.eu-west-2.amazonaws.com/imagerepositorypressloft/clients/36565/m/7608142_m.jpg",
    ],
  },
  "Kid": {
    pute: [
      "https://www.kid.no/globalassets/productimages/206562060200_.jpg?ref=8B529452BA&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/200099050157.jpg?ref=B242440397&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/208611060818.jpg?ref=8124520631&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/115206036.jpg?ref=0F1AC3E1E8&w=590&h=787&mode=pad",
    ],
    lampe: [
      "https://www.kid.no/globalassets/productimages/210958032210.jpg?ref=385BD28407&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/207942059900.jpg?ref=E4D1053512&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/203792158199.jpg?ref=BBB0D8F00F&w=590&h=787&mode=pad",
    ],
    teppe: [
      "https://www.kid.no/globalassets/productimages/213374150070.jpg?ref=4B77D2AFEE&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/209641200323.jpg?ref=FB5599A781&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/212190230888.jpg?ref=2F98611A73&w=590&h=787&mode=pad",
    ],
    gardin: [
      "https://www.kid.no/globalassets/productimages/206126220070.jpg?ref=6CD6ADC981&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/211325220929.jpg?ref=59BCD0C6D0&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/209156220070.jpg?ref=03B57A7D61&w=590&h=787&mode=pad",
    ],
    speil: [
      "https://www.kid.no/globalassets/productimages/20022605099.jpg?ref=9267E17B62&w=590&h=787&mode=pad",
    ],
    dekor: [
      "https://www.kid.no/globalassets/productimages/213076145000.jpg?ref=F29982B86B&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/205018021920.jpg?ref=EC43F9FEB2&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/262001299.jpg?ref=86A80AC43D&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/202730021191.jpg?ref=C6466EB75A&w=590&h=787&mode=pad",
      "https://www.kid.no/globalassets/productimages/212943016800.jpg?ref=1E456FE72F&w=590&h=787&mode=pad",
    ],
    hylle: [
      "https://www.kid.no/globalassets/productimages/206059035900_5.jpg?ref=DA31B7F98C&w=590&h=787&mode=pad",
    ],
  },
  "Chilli": {
    sofa: ["https://www.chilli.no/assets/blobs/m%C3%B8bler-sofaer-sovesofaer-sovesofa-eksjo-220-cm-gr%C3%A5/1010733(9)-406dad69e7.jpeg"],
    bord: ["https://www.chilli.no/assets/blobs/m%C3%B8bler-bord-avlastningsbord-lampebord-sidebord-falan-sidebord-40-cm-sekskant/923eeefd-6ee3-462e-a6c9-64f6bc8e653c-b9344e58cd.jpeg"],
    stol: ["https://www.chilli.no/assets/blobs/m%C3%B8bler-stoler-spisestol-sanroman-classic-brun-m%C3%B8rk-eik-brun-m%C3%B8rk-eik/c6420306-8376-4533-ab48-ab0438569f00-7fa566e330.jpeg"],
    lampe: [
      "https://www.chilli.no/assets/blobs/belysning-innend%C3%B8rsbelysning-lamper-gulvlampe-crestor-flerfarget-narwanike-farger-flerfarget-narwanike-farger/c75d2747-b487-436c-b052-311dead38529-ffd4ec5e53.jpeg",
      "https://www.chilli.no/assets/blobs/belysning-innend%C3%B8rsbelysning-lamper-soveromslampe-sengelamper-vegg-lampe-lesing-svart-svart/a298067a-b0bb-4cfc-90a5-11a500280d43-00f4629938.jpeg",
    ],
    hylle: ["https://www.chilli.no/assets/blobs/oppbevaring-hylle-bokhylle-calvia-hylle-89-cm-hvit/071d397f-ab06-4626-8895-6cb8b8fecf11-a328f61d6f.jpeg"],
  },
  "COOP Obs": {
    sofa: ["https://www.obs.no/cdn-cgi/image/width=640,format=auto/globalassets/productimages/1034376_7029289902402_1.jpg"],
    bord: [
      "https://www.obs.no/cdn-cgi/image/width=640,format=auto/globalassets/productimages/893414_5709386739447_1.jpg",
      "https://www.obs.no/cdn-cgi/image/width=640,format=auto/globalassets/productimages/976697_5709386726362_1.jpg",
    ],
    hylle: [
      "https://www.obs.no/cdn-cgi/image/width=640,format=auto/globalassets/productimages/721668_5709386726126_1.jpg",
      "https://www.obs.no/cdn-cgi/image/width=640,format=auto/globalassets/productimages/1104287_5714988035798_1.jpg",
    ],
    dekor: ["https://www.obs.no/cdn-cgi/image/width=640,format=auto/globalassets/productimages/721423_7071189295948_1.jpg"],
  },
  "Elkjøp": {
    lampe: [
      "https://next-media.elkjop.com/image/dv_web_D180001005124200/60589/krystall-lampe-magisk-glasskule.jpg?w=640&q=75",
      "https://next-media.elkjop.com/image/dv_web_D180001280327476/283375/led-mane-lampe-18-cm.jpg?w=640&q=75",
      "https://next-media.elkjop.com/image/dv_web_D18000130317980/883921/moderne-bordlampe-med-beroringsfunksjon-fra-articasa-metall-svart.jpg",
    ],
  },
  "Kremmerhuset": {
    dekor: [
      "https://kremmerhuset.no/sites/default/files/styles/product_zoom/public/product_images/1734722899-7071100791634.jpg",
      "https://kremmerhuset.no/sites/default/files/styles/product_zoom/public/product_images/1734723049-7071100792525.jpg",
    ],
    lampe: ["https://kremmerhuset.no/sites/default/files/product_images/1671557249-7071100774668.jpg"],
  },
  "Princess": {
    dekor: [
      "https://princessbutikken.b-cdn.net/images/thumbs/0025962_kikki-pyntepute-o40-lys-gronn_550.jpeg",
      "https://princessbutikken.b-cdn.net/images/thumbs/0033218_hailey-pledd-130x170-beige_550.jpeg",
      "https://princessbutikken.b-cdn.net/images/thumbs/0039411_andrina-lysestake-19-cm_550.jpeg",
    ],
  },
  "Fagmøbler": {
    bord: ["https://imagedelivery.net/LfHarEEHw85fo7v7-lUDxQ/c2d18264-7469-4022-1d94-4fd286336d00/public"],
    hylle: ["https://imagedelivery.net/LfHarEEHw85fo7v7-lUDxQ/62daa4e8-6f9f-49c0-d573-503298217b00/public"],
  },
  "Ekornes": {
    sofa: [
      "https://www.stressless.com/global/-/media/stresslesssite/products/sofas/anna/annapalomamushroom960x960.jpg",
      "https://www.stressless.com/en/-/media/stresslesssite/products/sofas/emily960x960.jpg",
      "https://www.stressless.com/en/-/media/stresslesssite/products/sofas/stellapalomanewcaramelmodels940x835.jpg",
    ],
  },
  "Slettvoll": {
    sofa: ["https://d1q8z1f8ga01g7.cloudfront.net/3humagpm6p?changed=2024-12-16"],
    lampe: [
      "https://d1q8z1f8ga01g7.cloudfront.net/873a2b5dhl?changed=2026-02-04",
      "https://d1q8z1f8ga01g7.cloudfront.net/5vfahnzjzq?changed=2026-02-04",
    ],
  },
  "HAY": {
    sofa: ["https://www.hay.com/globalassets/inriver/integration/service/mags-25-seater-combination-1_brandmodel.jpg"],
    stol: ["https://www.hay.com/img_20250424011708/globalassets/inriver/integration/service/aac-22_910x1100_brandmodel2.jpg"],
  },
  "Hødnebø": {
    sofa: [
      "https://hodnebo.no/wp-content/uploads/2019/08/Lillesand-15-seter-med-arm-venstre-og-pall-laguna-forest-2-copy-1.jpg",
      "https://hodnebo.no/wp-content/uploads/2018/08/hvaler-15s-al-black-2-e1535013646127.jpg",
    ],
    stol: [
      "https://hodnebo.no/wp-content/uploads/2017/01/langøy-spisestol.jpg",
    ],
  },
};

// ─── Fallback: confirmed Unsplash furniture images by category ────
const unsplashFallback = {
  sofa: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&auto=format",
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
  ],
  seng: [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format",
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

function getImageUrl(productId, brand, category) {
  // 1. Check for exact IKEA product match
  if (ikeaImages[productId]) {
    return ikeaImages[productId];
  }

  // 2. Check for brand + category match from store images
  if (brandImages[brand] && brandImages[brand][category]) {
    const images = brandImages[brand][category];
    if (!brandCounters[brand]) brandCounters[brand] = {};
    if (!brandCounters[brand][category]) brandCounters[brand][category] = 0;
    const idx = brandCounters[brand][category] % images.length;
    brandCounters[brand][category]++;
    return images[idx];
  }

  // 3. Fallback to Unsplash by category
  const images = unsplashFallback[category] || unsplashFallback.dekor;
  if (!fallbackCounters[category]) fallbackCounters[category] = 0;
  const idx = fallbackCounters[category] % images.length;
  fallbackCounters[category]++;
  return images[idx];
}

const brandCounters = {};
const fallbackCounters = {};

// ─── Process products.ts ──────────────────────────────────────────
const productsPath = join(__dirname, "..", "src", "data", "products.ts");
let content = readFileSync(productsPath, "utf-8");

const lines = content.split("\n");
const newLines = [];
let currentId = null;
let currentBrand = null;
let currentCategory = null;
let storeCount = 0;
let unsplashCount = 0;

for (const line of lines) {
  // Track product fields
  const idMatch = line.match(/id:\s*"([^"]+)"/);
  if (idMatch) currentId = idMatch[1];

  const brandMatch = line.match(/brand:\s*"([^"]+)"/);
  if (brandMatch) currentBrand = brandMatch[1];

  const catMatch = line.match(/category:\s*"([^"]+)"/);
  if (catMatch) currentCategory = catMatch[1];

  // Replace image_url
  const imgMatch = line.match(/^(\s*image_url:\s*)".*?"(,?\s*)$/);
  if (imgMatch && currentId && currentBrand && currentCategory) {
    const url = getImageUrl(currentId, currentBrand, currentCategory);
    if (url.includes("unsplash")) unsplashCount++;
    else storeCount++;
    newLines.push(`${imgMatch[1]}"${url}"${imgMatch[2]}`);
  } else {
    newLines.push(line);
  }
}

writeFileSync(productsPath, newLines.join("\n"), "utf-8");

console.log(`Updated products.ts:`);
console.log(`  Store images: ${storeCount}`);
console.log(`  Unsplash fallback: ${unsplashCount}`);
console.log(`  Total: ${storeCount + unsplashCount}`);

// ─── Process seed.mjs ─────────────────────────────────────────────
// Reset counters
for (const k in brandCounters) delete brandCounters[k];
for (const k in fallbackCounters) delete fallbackCounters[k];

const seedPath = join(__dirname, "seed.mjs");
let seedContent = readFileSync(seedPath, "utf-8");

const seedLines = seedContent.split("\n");
const newSeedLines = [];
let seedStore = 0;
let seedUnsplash = 0;

for (const line of seedLines) {
  const catMatch = line.match(/category:\s*"([^"]+)"/);
  if (catMatch) {
    const cat = catMatch[1];
    const nameMatch = line.match(/name:\s*"([^"]+)"/);
    const brandMatch = line.match(/brand:\s*"([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : "";
    const brand = brandMatch ? brandMatch[1] : "";

    // Try to find matching IKEA product ID
    let id = null;
    if (brand === "IKEA") {
      // Generate ID from name (same pattern as products.ts)
      const simpleName = name.toLowerCase()
        .replace(/[åä]/g, "a").replace(/[öø]/g, "o").replace(/[éè]/g, "e")
        .replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      // Try common patterns
      for (const key of Object.keys(ikeaImages)) {
        if (key.includes(simpleName.split("-")[0])) {
          id = key;
          break;
        }
      }
    }

    const url = getImageUrl(id, brand, cat);
    if (url.includes("unsplash")) seedUnsplash++;
    else seedStore++;

    const updated = line.replace(/image_url:\s*"[^"]*"/, `image_url: "${url}"`);
    newSeedLines.push(updated);
  } else {
    newSeedLines.push(line);
  }
}

writeFileSync(seedPath, newSeedLines.join("\n"), "utf-8");
console.log(`\nUpdated seed.mjs:`);
console.log(`  Store images: ${seedStore}`);
console.log(`  Unsplash fallback: ${seedUnsplash}`);
console.log(`  Total: ${seedStore + seedUnsplash}`);
