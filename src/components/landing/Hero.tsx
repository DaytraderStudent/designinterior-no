"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full">
      {/* Full-width hero banner with gradient background simulating lifestyle image */}
      <div className="relative w-full min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] bg-gradient-to-r from-[#2a3a2a] via-[#3d4f3d] to-[#4a5d4a] overflow-hidden">
        {/* Decorative interior elements */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[60%] h-full bg-gradient-to-l from-black/10 to-transparent" />
          <div className="absolute top-[15%] right-[10%] w-40 h-56 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hidden lg:block" />
          <div className="absolute top-[25%] right-[25%] w-32 h-44 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hidden lg:block" />
          <div className="absolute bottom-[10%] right-[15%] w-48 h-24 rounded-lg bg-white/8 backdrop-blur-sm border border-white/10 hidden lg:block" />
          {/* Subtle plant decoration */}
          <div className="absolute bottom-0 left-[5%] text-white/10 text-[120px] leading-none hidden md:block select-none">&#x1F33F;</div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex items-center min-h-[420px] sm:min-h-[500px] lg:min-h-[560px]">
          <div className="max-w-xl py-16">
            <p className="text-white/70 text-sm font-medium tracking-wider uppercase mb-4">
              Norges interiørguide
            </p>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-5">
              Drømme&shy;hjemmet starter her
            </h1>
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-md">
              Sammenlign priser fra 30+ butikker. Les uavhengige anmeldelser.
              Spar penger med eksklusive rabattkoder.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-7 text-base rounded-lg bg-white text-[#2a3a2a] hover:bg-white/90 font-semibold shadow-lg">
                <Link href="/produkter">
                  Se alle produkter
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base rounded-lg border-white/30 text-white hover:bg-white/10 font-semibold">
                <Link href="/produkter?sort=rating-desc">
                  Bestselgere
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service strip - like Bohus */}
      <div className="w-full bg-card border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
            {[
              { icon: "🔍", title: "Sammenlign priser", sub: "Fra 30+ butikker" },
              { icon: "⭐", title: "Uavhengige anmeldelser", sub: "Ærlige tester" },
              { icon: "🏷️", title: "Rabattkoder", sub: "Spar opptil 20%" },
              { icon: "🚚", title: "Direkte til butikk", sub: "Kjøp hos forhandler" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 py-4 px-4 sm:px-6">
                <span className="text-xl sm:text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
