import Link from "next/link";

const brands = [
  "IKEA", "Bohus", "Bolia", "Jysk", "Kid", "Skeidar",
  "Ekornes", "Slettvoll", "HAY", "Fagmøbler", "Hødnebø",
  "Nordic Nest", "Møbelringen", "HTH", "Elkjøp", "Princess",
  "Clas Ohlson", "Plantasjen", "Home & Cottage", "Høie",
];

export default function BrandLogos() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Butikker vi sammenligner
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          Vi henter priser og produkter fra Norges største interiørbutikker
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10 mb-8">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-display text-base sm:text-lg font-bold text-muted-foreground/25 hover:text-muted-foreground/50 transition-colors cursor-default select-none whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
        <Link
          href="/produkter"
          className="text-sm font-medium text-primary hover:underline"
        >
          Se alle 30+ butikker &rarr;
        </Link>
      </div>
    </section>
  );
}
