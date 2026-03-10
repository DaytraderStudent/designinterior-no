import { NextRequest, NextResponse } from "next/server";

/**
 * Generates a lifestyle room image for a product using Pollinations.ai (free, no API key).
 * Proxies the image back so it loads from our domain without CORS issues.
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
    stue: "living room", soverom: "bedroom", kontor: "home office",
    kjøkken: "kitchen", bad: "bathroom", gang: "hallway",
    barnerom: "children's room", entre: "entryway",
  };

  const styleMap: Record<string, string> = {
    skandinavisk: "scandinavian", moderne: "modern", minimalistisk: "minimalist",
    industriell: "industrial", tradisjonell: "traditional", boho: "bohemian",
    klassisk: "classic", rustikk: "rustic",
  };

  const categoryMap: Record<string, string> = {
    sofa: "sofa", bord: "table", stol: "chair", lampe: "lamp",
    teppe: "area rug", pute: "decorative cushions", dekor: "decorative object",
    hylle: "bookshelf", seng: "bed", kommode: "dresser",
    gardin: "curtains", speil: "wall mirror",
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
  const height = 768;

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${encodeURIComponent(seed)}&nologo=true`;

  try {
    const response = await fetch(imageUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to generate image" }, { status: 502 });
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=604800, s-maxage=2592000",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
  }
}
