import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/claude";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "AI-tjenesten er ikke konfigurert. Kontakt administrator." },
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

    const { image, imageBase64 } = body as Record<string, unknown>;
    const base64Data = (image ?? imageBase64) as string | undefined;

    if (!base64Data || typeof base64Data !== "string") {
      return NextResponse.json(
        { error: "Bilde er påkrevd for romanalyse." },
        { status: 400 }
      );
    }

    // Strip data URL prefix if present
    const rawBase64 = base64Data.includes(",")
      ? base64Data.split(",")[1]
      : base64Data;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: rawBase64,
              },
            },
            {
              type: "text",
              text: `Analyser dette rombildet og returner KUN gyldig JSON med følgende felter:
{
  "romtype": "stue/soverom/kjøkken/bad/kontor/etc",
  "estimertStorrelse": "estimert størrelse i kvadratmeter, f.eks. '15-20 kvm'",
  "stil": "nåværende interiørstil",
  "veggerFarge": "farge på veggene",
  "gulvType": "type gulv (parkett/fliser/teppe/etc)",
  "eksisterendeMobler": ["liste over møbler som er synlige"],
  "lysforhold": "beskrivelse av lysforholdene",
  "lysretning": "estimert lysretning basert på vinduene",
  "forbedringsforslag": ["liste med konkrete forbedringsforslag"],
  "anbefalteStiler": ["liste med anbefalte interiørstiler som passer rommet"],
  "anbefalteHovedfarger": ["liste med anbefalte hovedfarger"]
}`,
            },
          ],
        },
      ],
      system:
        "Du er en profesjonell norsk interiørdesigner. Analyser dette rombildet og returner KUN gyldig JSON (ingen markdown, ingen forklaring).",
    });

    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json(
        { error: "Kunne ikke analysere rommet. Prøv igjen." },
        { status: 500 }
      );
    }

    let roomAnalysis;
    try {
      // Strip markdown code fences if the model wrapped the JSON
      let jsonText = textContent.text.trim();
      if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
      }
      roomAnalysis = JSON.parse(jsonText);
    } catch {
      console.error("Kunne ikke parse romanalyse-JSON:", textContent.text);
      return NextResponse.json(
        { error: "Kunne ikke tolke analyseresultatet. Prøv igjen." },
        { status: 500 }
      );
    }

    return NextResponse.json(roomAnalysis);
  } catch (error) {
    console.error("Feil ved romanalyse:", error);

    const message =
      error instanceof Error && error.message.includes("authentication")
        ? "AI-tjenesten kunne ikke autentiseres. Sjekk API-nøkkelen."
        : "Noe gikk galt under analysen av rommet. Vennligst prøv igjen.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
