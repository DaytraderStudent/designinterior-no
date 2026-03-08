import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/claude";

export async function POST(request: NextRequest) {
  try {
    const { imageBase64 } = await request.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Bilde er påkrevd for romanalyse." },
        { status: 400 }
      );
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250514",
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
                data: imageBase64,
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

    const roomAnalysis = JSON.parse(textContent.text);

    return NextResponse.json(roomAnalysis);
  } catch (error) {
    console.error("Feil ved romanalyse:", error);
    return NextResponse.json(
      { error: "Noe gikk galt under analysen av rommet. Vennligst prøv igjen." },
      { status: 500 }
    );
  }
}
