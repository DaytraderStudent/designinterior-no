import Link from "next/link";

const brandsRow1 = [
  "IKEA", "Bohus", "Bolia", "Jysk", "Kid", "Skeidar",
  "Ekornes", "Slettvoll", "HAY", "Fagmøbler",
];

const brandsRow2 = [
  "Hødnebø", "Nordic Nest", "Møbelringen", "HTH", "Elkjøp",
  "Princess", "Clas Ohlson", "Plantasjen", "Home & Cottage", "Høie",
];

function MarqueeRow({ brands, reverse = false }: { brands: string[]; reverse?: boolean }) {
  // Duplicate for seamless loop
  const items = [...brands, ...brands];
  return (
    <div className="relative overflow-hidden marquee-container">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div
        className={`flex gap-3 sm:gap-4 w-max ${reverse ? "marquee-reverse" : "marquee-forward"}`}
      >
        {items.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="font-display text-sm sm:text-base font-semibold text-muted-foreground/35 px-4 py-2 rounded-full border border-border/40 whitespace-nowrap select-none"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BrandLogos() {
  return (
    <section className="py-14 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto text-center px-5 sm:px-8 mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Vi sammenligner 30+ butikker
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Fra IKEA til Slettvoll &mdash; vi henter priser og produkter fra
          Norges største interiørbutikker slik at du slipper.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <MarqueeRow brands={brandsRow1} />
        <MarqueeRow brands={brandsRow2} reverse />
      </div>

      <div className="text-center mt-8 px-5">
        <Link
          href="/produkter"
          className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
        >
          Se alle produkter &rarr;
        </Link>
      </div>
    </section>
  );
}
