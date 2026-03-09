"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Palette,
  Store,
  Calculator,
  MessageSquare,
  Image,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-romanalyse",
    description:
      "Last opp et bilde, og AI-en forteller deg romtype, stil og hva som mangler",
  },
  {
    icon: Palette,
    title: "Farger og stiler",
    description:
      "Velg mellom skandinavisk, moderne, industriell og boho \u2013 AI-en tilpasser forslagene",
  },
  {
    icon: Store,
    title: "Norske butikker",
    description:
      "Møbler fra IKEA, Bohus, Bolia, Jysk og Kid \u2013 med ekte priser",
  },
  {
    icon: Calculator,
    title: "Live kostnadsoversikt",
    description:
      "Se totalprisen oppdateres i sanntid mens du innreder",
  },
  {
    icon: MessageSquare,
    title: "AI-designassistent",
    description:
      "Spør om fargevalg, stil eller budsjett \u2013 på norsk",
  },
  {
    icon: Image,
    title: "Visualiser resultatet",
    description:
      "Se en AI-generert visualisering av det ferdige rommet",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wider">
            Funksjoner
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Alt du trenger for å innrede
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-border/40 bg-card/80 backdrop-blur-sm hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-default group"
              >
                <CardContent className="p-7">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent/25 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
