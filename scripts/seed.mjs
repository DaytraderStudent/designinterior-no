import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://vbcmeueohlmutmwsknna.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiY21ldWVvaGxtdXRtd3Nrbm5hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc5MjMzNSwiZXhwIjoyMDg4MzY4MzM1fQ.ydtUGs1mIvASa-YzE2-2A7M3EOScw6Htplil3uxW5oY"
);

const products = [
  // IKEA (15)
  { name: "KIVIK sofa", brand: "IKEA", category: "sofa", price: 5995, image_url: "/products/ikea-kivik.jpg", affiliate_url: "#", style_tags: ["skandinavisk","moderne"], color_tags: ["grå","beige"], room_tags: ["stue"], dimensions: {width:228,depth:95,height:83} },
  { name: "LACK salongbord", brand: "IKEA", category: "bord", price: 299, image_url: "/products/ikea-lack.jpg", affiliate_url: "#", style_tags: ["minimalistisk","moderne"], color_tags: ["hvit","svart"], room_tags: ["stue"], dimensions: {width:90,depth:55,height:45} },
  { name: "BILLY bokhylle", brand: "IKEA", category: "hylle", price: 699, image_url: "/products/ikea-billy.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["hvit","tre"], room_tags: ["stue","kontor"], dimensions: {width:80,depth:28,height:202} },
  { name: "KALLAX reolenhet", brand: "IKEA", category: "hylle", price: 999, image_url: "/products/ikea-kallax.jpg", affiliate_url: "#", style_tags: ["moderne"], color_tags: ["hvit","tre"], room_tags: ["stue","kontor"], dimensions: {width:77,depth:39,height:147} },
  { name: "HEMNES sengeramme", brand: "IKEA", category: "seng", price: 2495, image_url: "/products/ikea-hemnes.jpg", affiliate_url: "#", style_tags: ["tradisjonell"], color_tags: ["hvit","tre"], room_tags: ["soverom"], dimensions: {width:174,depth:211,height:66} },
  { name: "POÄNG lenestol", brand: "IKEA", category: "stol", price: 1495, image_url: "/products/ikea-poang.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["tre","beige"], room_tags: ["stue"], dimensions: {width:68,depth:82,height:100} },
  { name: "STOCKHOLM teppe", brand: "IKEA", category: "teppe", price: 2495, image_url: "/products/ikea-stockholm.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["grå","hvit"], room_tags: ["stue"], dimensions: {width:170,depth:240,height:1} },
  { name: "HEKTAR gulvlampe", brand: "IKEA", category: "lampe", price: 499, image_url: "/products/ikea-hektar.jpg", affiliate_url: "#", style_tags: ["industriell"], color_tags: ["svart"], room_tags: ["stue","soverom"], dimensions: {width:32,depth:32,height:181} },
  { name: "BESTÅ TV-benk", brand: "IKEA", category: "hylle", price: 1795, image_url: "/products/ikea-besta.jpg", affiliate_url: "#", style_tags: ["moderne"], color_tags: ["hvit","tre"], room_tags: ["stue"], dimensions: {width:180,depth:40,height:38} },
  { name: "MALM kommode", brand: "IKEA", category: "kommode", price: 1695, image_url: "/products/ikea-malm.jpg", affiliate_url: "#", style_tags: ["moderne"], color_tags: ["hvit","tre"], room_tags: ["soverom"], dimensions: {width:80,depth:48,height:100} },
  { name: "EKTORP sofa 3-seter", brand: "IKEA", category: "sofa", price: 7995, image_url: "/products/ikea-ektorp.jpg", affiliate_url: "#", style_tags: ["tradisjonell"], color_tags: ["hvit","beige"], room_tags: ["stue"], dimensions: {width:218,depth:88,height:88} },
  { name: "STOCKHOLM 2017 teppe", brand: "IKEA", category: "teppe", price: 3495, image_url: "/products/ikea-stockholm2017.jpg", affiliate_url: "#", style_tags: ["moderne"], color_tags: ["grå"], room_tags: ["stue"], dimensions: {width:200,depth:300,height:1} },
  { name: "SYMFONISK wifi-høyttaler", brand: "IKEA", category: "dekor", price: 1299, image_url: "/products/ikea-symfonisk.jpg", affiliate_url: "#", style_tags: ["moderne"], color_tags: ["hvit","svart"], room_tags: ["stue"], dimensions: {width:15,depth:10,height:31} },
  { name: "SMÖRBOLL pute", brand: "IKEA", category: "pute", price: 99, image_url: "/products/ikea-smorboll.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["hvit"], room_tags: ["stue","soverom"], dimensions: {width:50,depth:50,height:12} },
  { name: "FEJKA kunstig plante", brand: "IKEA", category: "dekor", price: 149, image_url: "/products/ikea-fejka.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["grønn"], room_tags: ["stue"], dimensions: {width:12,depth:12,height:28} },

  // Bohus (5)
  { name: "Westervik sofa", brand: "Bohus", category: "sofa", price: 12990, image_url: "/products/bohus-westervik.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["grå","blå"], room_tags: ["stue"], dimensions: {width:240,depth:92,height:85} },
  { name: "Amund spisebord", brand: "Bohus", category: "bord", price: 8490, image_url: "/products/bohus-amund.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["tre"], room_tags: ["kjøkken","stue"], dimensions: {width:180,depth:90,height:75} },
  { name: "Bergvik seng", brand: "Bohus", category: "seng", price: 6990, image_url: "/products/bohus-bergvik.jpg", affiliate_url: "#", style_tags: ["moderne"], color_tags: ["grå","tre"], room_tags: ["soverom"], dimensions: {width:180,depth:210,height:110} },
  { name: "Sandvika lenestol", brand: "Bohus", category: "stol", price: 4990, image_url: "/products/bohus-sandvika.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["grønn","tre"], room_tags: ["stue"], dimensions: {width:72,depth:80,height:95} },
  { name: "Tysvær lampe", brand: "Bohus", category: "lampe", price: 2490, image_url: "/products/bohus-tysvaer.jpg", affiliate_url: "#", style_tags: ["moderne"], color_tags: ["svart","gull"], room_tags: ["stue"], dimensions: {width:35,depth:35,height:160} },

  // Bolia (5)
  { name: "Scandinavia sofa", brand: "Bolia", category: "sofa", price: 19995, image_url: "/products/bolia-scandinavia.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["beige","grå"], room_tags: ["stue"], dimensions: {width:250,depth:96,height:80} },
  { name: "Como sofabord", brand: "Bolia", category: "bord", price: 4995, image_url: "/products/bolia-como.jpg", affiliate_url: "#", style_tags: ["minimalistisk"], color_tags: ["hvit","tre"], room_tags: ["stue"], dimensions: {width:120,depth:60,height:40} },
  { name: "Nomad stol", brand: "Bolia", category: "stol", price: 3495, image_url: "/products/bolia-nomad.jpg", affiliate_url: "#", style_tags: ["moderne"], color_tags: ["svart","tre"], room_tags: ["stue","kontor"], dimensions: {width:55,depth:56,height:80} },
  { name: "Alba sidebord", brand: "Bolia", category: "bord", price: 2995, image_url: "/products/bolia-alba.jpg", affiliate_url: "#", style_tags: ["minimalistisk"], color_tags: ["hvit","tre"], room_tags: ["stue"], dimensions: {width:45,depth:45,height:50} },
  { name: "Stay lampe", brand: "Bolia", category: "lampe", price: 3995, image_url: "/products/bolia-stay.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["hvit","messing"], room_tags: ["stue"], dimensions: {width:30,depth:30,height:145} },

  // Jysk (5)
  { name: "AARUP sofa", brand: "Jysk", category: "sofa", price: 3999, image_url: "/products/jysk-aarup.jpg", affiliate_url: "#", style_tags: ["moderne"], color_tags: ["grå"], room_tags: ["stue"], dimensions: {width:200,depth:85,height:78} },
  { name: "BANDHOLM seng", brand: "Jysk", category: "seng", price: 1999, image_url: "/products/jysk-bandholm.jpg", affiliate_url: "#", style_tags: ["moderne"], color_tags: ["hvit","tre"], room_tags: ["soverom"], dimensions: {width:160,depth:200,height:45} },
  { name: "ASKEBY teppe", brand: "Jysk", category: "teppe", price: 699, image_url: "/products/jysk-askeby.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["beige"], room_tags: ["stue"], dimensions: {width:160,depth:230,height:1} },
  { name: "VALLBY pute", brand: "Jysk", category: "pute", price: 149, image_url: "/products/jysk-vallby.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["beige","brun"], room_tags: ["stue","soverom"], dimensions: {width:45,depth:45,height:10} },
  { name: "JONSTRUP hylle", brand: "Jysk", category: "hylle", price: 399, image_url: "/products/jysk-jonstrup.jpg", affiliate_url: "#", style_tags: ["industriell"], color_tags: ["svart","tre"], room_tags: ["stue"], dimensions: {width:60,depth:24,height:85} },

  // Kid (5)
  { name: "Arild pute", brand: "Kid", category: "pute", price: 299, image_url: "/products/kid-arild.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["hvit","rosa"], room_tags: ["stue","soverom"], dimensions: {width:50,depth:50,height:12} },
  { name: "Sandnes pledd", brand: "Kid", category: "dekor", price: 699, image_url: "/products/kid-sandnes.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["grå"], room_tags: ["stue","soverom"], dimensions: {width:130,depth:170,height:1} },
  { name: "Frogner pute 2-pk", brand: "Kid", category: "pute", price: 249, image_url: "/products/kid-frogner.jpg", affiliate_url: "#", style_tags: ["moderne"], color_tags: ["blå","hvit"], room_tags: ["stue"], dimensions: {width:45,depth:45,height:12} },
  { name: "Stavern dekorpute", brand: "Kid", category: "pute", price: 399, image_url: "/products/kid-stavern.jpg", affiliate_url: "#", style_tags: ["boho"], color_tags: ["terrakotta"], room_tags: ["stue"], dimensions: {width:50,depth:50,height:14} },
  { name: "Arendal teppe", brand: "Kid", category: "teppe", price: 1499, image_url: "/products/kid-arendal.jpg", affiliate_url: "#", style_tags: ["skandinavisk"], color_tags: ["hvit","grå"], room_tags: ["stue"], dimensions: {width:160,depth:230,height:1} },
];

async function seed() {
  console.log(`Seeding ${products.length} products...`);

  const { data, error } = await supabase
    .from("products")
    .insert(products)
    .select("id, name");

  if (error) {
    console.error("Seed failed:", error.message);
  } else {
    console.log(`Seeded ${data.length} products successfully!`);
  }
}

seed();
