import Link from "next/link";

const brands = [
  "IKEA", "Bohus", "Bolia", "Jysk", "Kid", "Skeidar",
  "Ekornes", "Slettvoll", "HAY", "Fagmøbler", "Hødnebø",
  "Nordic Nest", "Møbelringen", "HTH", "Elkjøp", "Princess",
  "Clas Ohlson", "Plantasjen", "Home & Cottage", "Høie",
];

export default function BrandLogos() {
  return (
    <section className="py-14 sm:py-16 px-5 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Vi sammenligner 30+ butikker
        </h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-lg mx-auto">
          Fra IKEA til Slettvoll &mdash; vi henter priser og produkter fra
          Norges største interiørbutikker slik at du slipper
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-3 max-w-4xl mx-auto">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-display text-sm sm:text-base font-semibold text-muted-foreground/30 hover:text-foreground/40 px-3 py-1.5 rounded-full border border-transparent hover:border-border transition-all duration-300 cursor-default select-none whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/produkter"
            className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            Se alle produkter &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
