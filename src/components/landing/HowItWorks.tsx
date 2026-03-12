import { Search, Star, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Finn og sammenlign",
    description: "Søk blant 336+ produkter fra 30+ norske butikker. Filtrer på pris, kategori, stil og butikk.",
  },
  {
    icon: Star,
    num: "02",
    title: "Les anmeldelser",
    description: "Vi tester og anmelder møbler med fokus på kvalitet, komfort og verdi for pengene.",
  },
  {
    icon: Tag,
    num: "03",
    title: "Spar med rabattkoder",
    description: "Bruk eksklusive rabattkoder og få de beste prisene direkte hos butikkene.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-14 sm:py-16 px-5 sm:px-8 bg-[#3d3428] text-white relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2Ij48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjgiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==')]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">
            Slik fungerer det
          </h2>
          <p className="text-white/50 text-sm">
            Tre steg til ditt nye interiør
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 sm:gap-12 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="text-center">
                <div className="relative mx-auto w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/10">
                  <Icon className="w-7 h-7 text-[#c4a87a]" strokeWidth={1.5} />
                  <span className="absolute -top-2 -right-2 text-xs font-mono font-bold text-[#c4a87a] bg-[#3d3428] border border-white/10 rounded-full w-7 h-7 flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 rounded-xl bg-[#c4a87a] text-[#2a2118] hover:bg-[#d4b88a] font-semibold border-0"
          >
            <Link href="/produkter">
              Kom i gang <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
