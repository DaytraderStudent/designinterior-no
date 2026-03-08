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

    const { messages, sessionContext, context } = body as Record<string, unknown>;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Meldinger er påkrevd." },
        { status: 400 }
      );
    }

    // Accept both "sessionContext" and "context" from client
    const ctx = (sessionContext ?? context ?? {}) as Record<string, unknown>;
    const { roomAnalysis, selectedProducts, totalCost, userBudget } = ctx;

    let systemPrompt =
      "Du er en profesjonell norsk interiørdesigner og rådgiver. Svar alltid på norsk. Gi konkrete, praktiske råd om interiørdesign, fargevalg, møblering og romplanlegging.";

    if (roomAnalysis && typeof roomAnalysis === "object") {
      const ra = roomAnalysis as Record<string, unknown>;
      systemPrompt += `\n\nKontekst om rommet som analyseres:\n- Romtype: ${ra.romtype || "Ukjent"}\n- Estimert størrelse: ${ra.estimertStorrelse || "Ukjent"}\n- Nåværende stil: ${ra.stil || "Ukjent"}\n- Veggfarge: ${ra.veggerFarge || "Ukjent"}\n- Gulvtype: ${ra.gulvType || "Ukjent"}\n- Lysforhold: ${ra.lysforhold || "Ukjent"}`;
    }

    if (Array.isArray(selectedProducts) && selectedProducts.length > 0) {
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
      model: "claude-sonnet-4-6",
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

    const message =
      error instanceof Error && error.message.includes("authentication")
        ? "AI-tjenesten kunne ikke autentiseres. Sjekk API-nøkkelen."
        : "Noe gikk galt med AI-assistenten. Vennligst prøv igjen senere.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
