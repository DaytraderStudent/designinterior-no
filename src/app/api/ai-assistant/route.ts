import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/claude";

export async function POST(request: NextRequest) {
  try {
    const { messages, sessionContext } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Meldinger er påkrevd." },
        { status: 400 }
      );
    }

    const { roomAnalysis, selectedProducts, totalCost, userBudget } =
      sessionContext || {};

    let systemPrompt =
      "Du er en profesjonell norsk interiørdesigner og rådgiver. Svar alltid på norsk. Gi konkrete, praktiske råd om interiørdesign, fargevalg, møblering og romplanlegging.";

    if (roomAnalysis) {
      systemPrompt += `\n\nKontekst om rommet som analyseres:\n- Romtype: ${roomAnalysis.romtype || "Ukjent"}\n- Estimert størrelse: ${roomAnalysis.estimertStorrelse || "Ukjent"}\n- Nåværende stil: ${roomAnalysis.stil || "Ukjent"}\n- Veggfarge: ${roomAnalysis.veggerFarge || "Ukjent"}\n- Gulvtype: ${roomAnalysis.gulvType || "Ukjent"}\n- Lysforhold: ${roomAnalysis.lysforhold || "Ukjent"}`;
    }

    if (selectedProducts && selectedProducts.length > 0) {
      systemPrompt += `\n\nValgte produkter:\n${selectedProducts
        .map(
          (p: { name: string; price: number }) =>
            `- ${p.name} (${p.price} kr)`
        )
        .join("\n")}`;
    }

    if (totalCost !== undefined) {
      systemPrompt += `\nTotal kostnad: ${totalCost} kr`;
    }

    if (userBudget !== undefined) {
      systemPrompt += `\nBrukerens budsjett: ${userBudget} kr`;
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(
        (msg: { role: string; content: string }) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })
      ),
    });

    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json(
        { error: "Kunne ikke generere svar. Prøv igjen." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply: textContent.text });
  } catch (error) {
    console.error("Feil i AI-assistent:", error);
    return NextResponse.json(
      {
        error:
          "Noe gikk galt med AI-assistenten. Vennligst prøv igjen senere.",
      },
      { status: 500 }
    );
  }
}
