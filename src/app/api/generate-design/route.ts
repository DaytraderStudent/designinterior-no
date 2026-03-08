import { NextRequest, NextResponse } from "next/server";
import { replicate } from "@/lib/replicate";

const stylePrompts: Record<string, string> = {
  skandinavisk:
    "scandinavian interior design, light wood, white walls, minimalist, hygge, natural materials, clean lines",
  moderne:
    "modern interior design, sleek furniture, neutral palette, open space, contemporary, elegant",
  industriell:
    "industrial interior design, exposed brick, metal accents, raw materials, Edison bulbs, loft style",
  boho:
    "bohemian interior design, colorful textiles, plants, macrame, eclectic, warm tones, layered textures",
};

export async function POST(request: NextRequest) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Designgenerering er ikke konfigurert. Replicate API-nøkkel mangler." },
        { status: 503 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Ugyldig forespørsel. Forventet JSON." },
        { status: 400 }
      );
    }

    const { imageBase64, prompt, style } = body as Record<string, unknown>;

    if (!imageBase64 || typeof imageBase64 !== "string") {
      return NextResponse.json(
        { error: "Bilde er påkrevd for designgenerering." },
        { status: 400 }
      );
    }

    if (prompt !== undefined && typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Ugyldig prompt-format." },
        { status: 400 }
      );
    }

    const styleKey = typeof style === "string" ? style : "skandinavisk";
    const styleDescription = stylePrompts[styleKey] || stylePrompts.skandinavisk;
    const fullPrompt = `${styleDescription}, ${(prompt as string) || "beautifully redesigned room"}, professional interior photography, high quality, 8k`;

    const imageDataUrl = `data:image/jpeg;base64,${imageBase64}`;

    const output = await replicate.run(
      "stability-ai/sdxl:7762fd07cf82c948c1b228a8f33c4f2bdaa7bfb20603f0a8b3019783c1aab7bf",
      {
        input: {
          image: imageDataUrl,
          prompt: fullPrompt,
          negative_prompt:
            "blurry, low quality, distorted, ugly, cartoon, anime, drawing",
          num_inference_steps: 30,
          guidance_scale: 7.5,
          strength: 0.7,
        },
      }
    );

    const generatedImageUrl = Array.isArray(output) ? output[0] : output;

    return NextResponse.json({ generatedImageUrl });
  } catch (error) {
    console.error("Feil ved designgenerering:", error);

    const message =
      error instanceof Error && error.message.includes("authentication")
        ? "Replicate-tjenesten kunne ikke autentiseres. Sjekk API-nøkkelen."
        : "Noe gikk galt under genereringen av designforslaget. Vennligst prøv igjen.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
