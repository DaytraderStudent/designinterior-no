"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Shield, Tag, BarChart3 } from "lucide-react";

const trustBadges = [
  { icon: Shield, text: "Uavhengige anmeldelser" },
  { icon: Tag, text: "Eksklusive rabattkoder" },
  { icon: BarChart3, text: "Sammenlign priser" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent border border-accent/20 rounded-full px-3 py-1 text-xs font-medium mb-6">
              <Star className="w-3 h-3 fill-accent" />
              Norges interiørguide
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-5 leading-[1.1]">
              Finn de beste{" "}
              <span className="text-primary">møblene</span> til{" "}
              <span className="text-primary">riktig pris</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Vi sammenligner priser, tester produkter og skriver ærlige anmeldelser
              &ndash; slik at du kan innrede drømmehjemmet uten å bla deg i hjel.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.text} className="flex items-center gap-2 text-sm text-foreground/80">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    {badge.text}
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-7 text-base rounded-xl shadow-lg shadow-primary/15">
                <Link href="/produkter">
                  Utforsk produkter
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base rounded-xl">
                <Link href="/produkter?sort=rating-desc">
                  Topprankede
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Featured product cards collage */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-3">
              {/* Large card */}
              <div className="col-span-2 rounded-2xl overflow-hidden bg-card border border-border/50 shadow-lg">
                <div className="aspect-[2/1] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl mb-2">🛋️</p>
                    <p className="text-sm font-medium text-muted-foreground">336+ produkter</p>
                  </div>
                </div>
              </div>
              {/* Small cards */}
              <div className="rounded-xl overflow-hidden bg-card border border-border/50 shadow-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">4.8</span>
                </div>
                <p className="text-sm font-medium">Stressless Mayfair</p>
                <p className="text-xs text-muted-foreground">Ekornes</p>
                <p className="font-mono text-sm font-bold text-accent mt-1">24 990 kr</p>
              </div>
              <div className="rounded-xl overflow-hidden bg-card border border-border/50 shadow-md p-4">
                <div className="inline-block bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold px-2 py-0.5 rounded mb-2">
                  -15%
                </div>
                <p className="text-sm font-medium">EKTORP sofa</p>
                <p className="text-xs text-muted-foreground">IKEA</p>
                <p className="font-mono text-sm font-bold text-accent mt-1">4 995 kr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
