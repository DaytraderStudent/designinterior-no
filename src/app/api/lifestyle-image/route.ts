import { NextRequest, NextResponse } from "next/server";

/**
 * Generates a lifestyle room image using Pollinations.ai gen API.
 * Requires POLLINATIONS_API_KEY env variable.
 * Proxies the image so the API key stays server-side.
 */
export async function GET(req: NextRequest) {
  const apiKey = process.env.POLLINATIONS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "POLLINATIONS_API_KEY not configured" }, { status: 500 });
  }

  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category") || "furniture";
  const style = searchParams.get("style") || "scandinavian";
  const room = searchParams.get("room") || "living room";
  const seed = searchParams.get("seed") || "42";

  const roomMap: Record<string, string> = {
    stue: "living room", soverom: "bedroom", kontor: "home office",
    kjøkken: "kitchen", bad: "bathroom", gang: "hallway",
    barnerom: "children room", entre: "entryway",
  };

  const categoryMap: Record<string, string> = {
    sofa: "sofa", bord: "table", stol: "chair", lampe: "lamp",
    teppe: "rug", pute: "cushions", dekor: "decor",
    hylle: "shelf", seng: "bed", kommode: "dresser",
    gardin: "curtains", speil: "mirror",
  };

  const engRoom = roomMap[room] || room;
  const engCat = categoryMap[category] || category;

  // Short prompt for better results
  const prompt = `${style} ${engRoom} with ${engCat}, interior design photo, natural light, 8k`;

  const imageUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?model=flux&width=512&height=512&seed=${encodeURIComponent(seed)}&nologo=true&key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(imageUrl, {
      signal: AbortSignal.timeout(50000),
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
