"use client";

import { Search, Star, Tag } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Finn og sammenlign",
    description: "Søk blant 336+ produkter fra 30+ norske butikker. Filtrer på pris, kategori og stil.",
  },
  {
    icon: Star,
    title: "Les anmeldelser",
    description: "Vi tester og anmelder møbler med fokus på kvalitet, komfort og verdi for pengene.",
  },
  {
    icon: Tag,
    title: "Spar med rabattkoder",
    description: "Bruk våre eksklusive rabattkoder og få de beste prisene hos butikkene.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-4">
          Slik bruker du designinteriør.no
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Vi gjør det enkelt å finne de beste møblene til riktig pris
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="text-center">
                <div className="relative mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-primary" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
