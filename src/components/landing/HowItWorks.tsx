import { Search, Star, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Search,
    title: "Finn og sammenlign",
    description: "Søk blant 336+ produkter fra 30+ norske butikker. Filtrer på pris, kategori, stil og butikk.",
    color: "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Star,
    title: "Les anmeldelser",
    description: "Vi tester og anmelder møbler med fokus på kvalitet, komfort og verdi for pengene.",
    color: "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
  },
  {
    icon: Tag,
    title: "Spar med rabattkoder",
    description: "Bruk eksklusive rabattkoder og få de beste prisene direkte hos butikkene.",
    color: "bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-card border-y border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Slik fungerer det
          </h2>
          <p className="text-sm text-muted-foreground">
            Tre enkle steg til ditt nye interiør
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex gap-4 md:flex-col md:text-center md:items-center">
                <div className={`shrink-0 w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center relative`}>
                  <Icon className="w-6 h-6" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="rounded-lg h-11 px-8">
            <Link href="/produkter">
              Kom i gang
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
