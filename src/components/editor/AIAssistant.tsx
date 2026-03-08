"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { RoomAnalysis, SessionProduct, ChatMessage } from "@/types";

interface AIAssistantProps {
  roomAnalysis: RoomAnalysis | null;
  selectedProducts: SessionProduct[];
  totalCost: number;
}

const exampleQuestions = [
  "Hva passer til dette rommet?",
  "Finn noe billigere",
  "Gi meg et skandinavisk uttrykk",
  "Hva mangler i rommet?",
];

export default function AIAssistant({
  roomAnalysis,
  selectedProducts,
  totalCost,
}: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      created_at: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          context: {
            roomAnalysis,
            selectedProducts: selectedProducts.map((sp) => ({
              name: sp.product.name,
              brand: sp.product.brand,
              category: sp.product.category,
              price: sp.product.price,
              quantity: sp.quantity,
            })),
            totalCost,
          },
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message ?? "Beklager, noe gikk galt. Prov igjen.",
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Beklager, jeg kunne ikke koble til. Prov igjen senere.",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">AI-assistent</h3>
          <p className="text-[11px] text-muted-foreground">
            Hjelper deg med interiortips
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="flex flex-col gap-3">
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bot className="mb-3 h-10 w-10 text-muted-foreground/30" />
              <p className="mb-1 text-sm font-medium text-muted-foreground">
                Hei! Jeg er din interiorradviger.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Still meg et sporsmaal om rommet ditt.
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-2",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {msg.role === "user" ? (
                  <User className="h-3.5 w-3.5" />
                ) : (
                  <Bot className="h-3.5 w-3.5" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border"
                )}
              >
                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="rounded-xl border bg-card px-3 py-2">
                <p className="text-sm text-muted-foreground">
                  Tenker
                  <span className="inline-flex w-6">
                    <span className="animate-[pulse_1.4s_ease-in-out_infinite]">.</span>
                    <span className="animate-[pulse_1.4s_ease-in-out_0.2s_infinite]">.</span>
                    <span className="animate-[pulse_1.4s_ease-in-out_0.4s_infinite]">.</span>
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Example questions (only when no messages) */}
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-1.5 border-t px-4 py-3">
          {exampleQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Skriv en melding..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
