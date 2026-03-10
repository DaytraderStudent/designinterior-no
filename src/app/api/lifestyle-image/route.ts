import { NextRequest, NextResponse } from "next/server";

/**
 * Generates a lifestyle room image for a product using Pollinations.ai (free, no API key).
 * Returns a redirect to the generated image URL.
 *
 * Usage: /api/lifestyle-image?name=KIVIK+sofa&category=sofa&style=skandinavisk&room=stue&colors=grå,beige
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get("name") || "furniture";
  const category = searchParams.get("category") || "furniture";
  const style = searchParams.get("style") || "scandinavian";
  const room = searchParams.get("room") || "living room";
  const colors = searchParams.get("colors") || "neutral";
  const seed = searchParams.get("seed") || "42";

  const roomMap: Record<string, string> = {
    stue: "living room",
    soverom: "bedroom",
    kontor: "home office",
    kjøkken: "kitchen",
    bad: "bathroom",
    gang: "hallway",
    barnerom: "children's room",
    entre: "entryway",
  };

  const styleMap: Record<string, string> = {
    skandinavisk: "scandinavian",
    moderne: "modern",
    minimalistisk: "minimalist",
    industriell: "industrial",
    tradisjonell: "traditional",
    boho: "bohemian",
    klassisk: "classic",
    rustikk: "rustic",
  };

  const categoryMap: Record<string, string> = {
    sofa: "sofa",
    bord: "table",
    stol: "chair",
    lampe: "lamp",
    teppe: "area rug",
    pute: "decorative cushions",
    dekor: "decorative object",
    hylle: "bookshelf",
    seng: "bed",
    kommode: "dresser",
    gardin: "curtains",
    speil: "mirror",
  };

  const engRoom = roomMap[room] || room;
  const engStyle = styleMap[style] || style;
  const engCategory = categoryMap[category] || category;

  const prompt = [
    `Beautiful interior design photograph of a ${engStyle} ${engRoom}`,
    `featuring a ${name} ${engCategory} as the centerpiece`,
    `color palette: ${colors}`,
    `professional interior photography, natural daylight streaming through large windows`,
    `warm and inviting atmosphere, styled with plants and books`,
    `high-end real estate photography style, 8k, photorealistic`,
    `soft shadows, clean composition, magazine quality`,
  ].join(", ");

  const width = 768;
  const height = 512;

  // Pollinations.ai free image generation
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

  // Redirect to the image (browser/img tag will load it directly)
  return NextResponse.redirect(imageUrl, 302);
}
