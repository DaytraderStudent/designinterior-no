"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

const inspirations = [
  {
    id: 1,
    title: "Skandinavisk stue med varme toner",
    style: "Skandinavisk",
    room: "Stue",
    budget: "15 000 kr",
    colors: ["#F5F0EB", "#C8B68B", "#A8B5A0"],
    description:
      "Lyse vegger, naturlige materialer og myke tekstiler skaper en varm og innbydende stue.",
  },
  {
    id: 2,
    title: "Minimalistisk soverom",
    style: "Minimalistisk",
    room: "Soverom",
    budget: "12 000 kr",
    colors: ["#FFFFFF", "#E8E4E0", "#C4BBAF"],
    description:
      "Rent og ryddig med fokus på kvalitetsmøbler og god belysning.",
  },
  {
    id: 3,
    title: "Industrielt hjemmekontor",
    style: "Industriell",
    room: "Kontor",
    budget: "8 000 kr",
    colors: ["#4A4A4A", "#C27B5C", "#333333"],
    description:
      "Mørke toner, metall og tre gir et kreativt og produktivt arbeidsrom.",
  },
  {
    id: 4,
    title: "Boho-inspirert stue",
    style: "Boho",
    room: "Stue",
    budget: "18 000 kr",
    colors: ["#C27B5C", "#D4C5A9", "#A0C4B8"],
    description:
      "Lag og teksturer, planter og varme farger for en avslappet atmosfære.",
  },
  {
    id: 5,
    title: "Moderne kjøkken med øy",
    style: "Moderne",
    room: "Kjøkken",
    budget: "25 000 kr",
    colors: ["#FFFFFF", "#2C3E50", "#C8A96E"],
    description:
      "Stramme linjer, kontrastfarger og funksjonell design for det moderne kjøkkenet.",
  },
  {
    id: 6,
    title: "Koselig barnerom",
    style: "Skandinavisk",
    room: "Soverom",
    budget: "10 000 kr",
    colors: ["#B8CDD6", "#F5F0EB", "#D4A0A0"],
    description:
      "Myke farger, kreative oppbevaringsløsninger og lekne detaljer.",
  },
];

export default function InspirasjonPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold text-primary">
            designinterior.no
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/produkter" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Produkter
            </Link>
            <Link href="/design">
              <Button size="sm">Start design</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-4">
            Inspirasjon
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Utforsk ulike stiler og rom for å finne din perfekte innredning.
            Klikk på et eksempel for å starte med lignende stil.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspirations.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-secondary relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-accent opacity-50" />
                </div>
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                    {item.style}
                  </Badge>
                  <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                    {item.room}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {item.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    ca. {item.budget}
                  </span>
                </div>
                <Link href="/design" className="mt-4 flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                  Prøv denne stilen <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
