"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, ShieldCheck, Tag, BarChart3 } from "lucide-react";

const services = [
  { icon: BarChart3, label: "Sammenlign priser", sub: "30+ butikker" },
  { icon: ShieldCheck, label: "Uavhengige tester", sub: "Ærlige anmeldelser" },
  { icon: Tag, label: "Rabattkoder", sub: "Spar opptil 20%" },
  { icon: Truck, label: "Direkte til butikk", sub: "Kjøp hos forhandler" },
];

export default function Hero() {
  return (
    <section className="relative">
      {/* Main hero */}
      <div className="hero-scene min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center">
        {/* Furniture silhouettes - decorative */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Sofa shape */}
          <div className="absolute bottom-[8%] right-[8%] w-[280px] h-[140px] rounded-[40px_40px_12px_12px] bg-white/[0.03] border border-white/[0.06] hidden lg:block" />
          <div className="absolute bottom-[8%] right-[calc(8%+60px)] w-[160px] h-[200px] rounded-[20px_20px_0_0] bg-white/[0.02] border border-white/[0.04] hidden lg:block" />
          {/* Lamp */}
          <div className="absolute top-[15%] right-[20%] hidden lg:flex flex-col items-center">
            <div className="w-1 h-24 bg-white/[0.06]" />
            <div className="w-20 h-12 rounded-b-full bg-white/[0.04] border border-white/[0.06] border-t-0" />
          </div>
          {/* Plant */}
          <div className="absolute bottom-[10%] left-[60%] w-10 h-32 hidden lg:block">
            <div className="w-8 h-10 mx-auto rounded-b-lg bg-white/[0.04] border border-white/[0.05]" />
          </div>
          {/* Horizontal light ray */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-20 lg:py-24">
          <div className="max-w-2xl">
            <p
              className="text-white/50 text-xs font-medium tracking-[0.2em] uppercase mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Norges interiørguide &mdash; siden 2026
            </p>

            <h1
              className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] font-bold text-white leading-[1.05] mb-6 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Innred hjemmet.
              <br />
              <span className="text-[#c4a87a]">Spar penger.</span>
            </h1>

            <p
              className="text-white/65 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              Vi sammenligner priser fra Norges største møbelbutikker og skriver
              uavhengige anmeldelser &mdash; slik at du finner kvalitet til riktig pris.
            </p>

            <div
              className="flex flex-wrap gap-3 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                asChild
                size="lg"
                className="h-13 px-8 text-base rounded-xl bg-[#c4a87a] text-[#2a2118] hover:bg-[#d4b88a] font-semibold shadow-lg shadow-black/20 border-0"
              >
                <Link href="/produkter">
                  Utforsk produkter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 px-8 text-base rounded-xl border-white/20 text-white hover:bg-white/10 font-medium"
              >
                <Link href="/produkter?sort=rating-desc">
                  Beste anmeldelser
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service strip */}
      <div className="bg-card border-b border-border/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.label}
                  className={`flex items-center gap-3.5 py-5 px-4 ${
                    i < 3 ? "lg:border-r border-border/40" : ""
                  } ${i < 2 ? "border-r border-border/40 lg:border-r" : ""} ${
                    i >= 2 ? "border-t lg:border-t-0 border-border/40" : ""
                  }`}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-[18px] h-[18px] text-accent" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{svc.label}</p>
                    <p className="text-xs text-muted-foreground truncate hidden sm:block">{svc.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
