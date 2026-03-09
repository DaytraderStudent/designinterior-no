"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/40" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        {/* Floating badges */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-medium gap-1.5">
            <Sparkles className="w-3 h-3 text-accent" />
            AI-drevet
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
            Norske priser
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
            250+ møbler
          </Badge>
        </div>

        {/* Heading */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
          Innred{" "}
          <span className="text-primary">drømme&shy;hjemmet</span>{" "}
          ditt
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Last opp et bilde av rommet ditt. Innred det med ekte møbler fra
          norske butikker. Se prisen &ndash; kjøp med ett klikk.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <Button asChild size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
            <Link href="/design">
              Start gratis
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Ingen registrering nødvendig
          </p>
        </div>

        {/* Before/After visual mockup */}
        <div className="mt-16 mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-primary/5 aspect-[16/9] bg-card">
            {/* "Before" side */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 bg-gradient-to-br from-muted/80 to-muted flex flex-col items-center justify-center gap-3 border-r border-dashed border-border/60">
                <div className="w-16 h-16 rounded-xl bg-border/60" />
                <div className="flex gap-2">
                  <div className="w-20 h-12 rounded-lg bg-border/50" />
                  <div className="w-14 h-12 rounded-lg bg-border/40" />
                </div>
                <div className="w-24 h-3 rounded-full bg-border/40" />
                <span className="text-xs font-medium text-muted-foreground mt-2 uppercase tracking-wider">
                  For
                </span>
              </div>

              {/* "After" side */}
              <div className="w-1/2 bg-gradient-to-br from-primary/5 to-accent/10 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-primary/20 border border-primary/30" />
                <div className="flex gap-2">
                  <div className="w-20 h-12 rounded-lg bg-accent/25 border border-accent/30" />
                  <div className="w-14 h-12 rounded-lg bg-primary/15 border border-primary/20" />
                </div>
                <div className="w-24 h-3 rounded-full bg-accent/30" />
                <span className="text-xs font-medium text-primary mt-2 uppercase tracking-wider">
                  Etter
                </span>
              </div>
            </div>

            {/* Center divider handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border-2 border-accent shadow-lg flex items-center justify-center z-10">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-4 bg-accent/60 rounded-full" />
                <div className="w-0.5 h-4 bg-accent/60 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          aria-label="Scroll ned"
        >
          <span className="text-xs uppercase tracking-widest">Utforsk</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
