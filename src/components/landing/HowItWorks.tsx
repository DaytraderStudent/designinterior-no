"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Paintbrush, ShoppingBag } from "lucide-react";

const steps = [
  {
    icon: Camera,
    number: "1",
    title: "Last opp bilde",
    description:
      "Ta et bilde av rommet ditt eller last opp en plantegning",
  },
  {
    icon: Paintbrush,
    number: "2",
    title: "Innred rommet",
    description:
      "Dra og slipp møbler, velg farger og stil \u2013 som et spill",
  },
  {
    icon: ShoppingBag,
    number: "3",
    title: "Se prisen og kjøp",
    description:
      "Få en komplett handleliste med norske priser og kjøpslenker",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wider">
            Enkelt som 1-2-3
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Slik fungerer det
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.number}
                className="relative border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <CardContent className="p-8 text-center">
                  {/* Number badge */}
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground border-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold p-0">
                    {step.number}
                  </Badge>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
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
