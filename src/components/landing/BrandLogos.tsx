const brands = [
  "IKEA", "Bohus", "Bolia", "Jysk", "Kid", "Skeidar",
  "Ekornes", "Slettvoll", "HAY", "Fagmøbler", "Hødnebø",
  "Nordic Nest", "Møbelringen", "HTH", "Elkjøp", "Princess",
];

export default function BrandLogos() {
  return (
    <section className="py-12 px-4 sm:px-6 bg-background border-y border-border/40">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-wider text-muted-foreground text-center mb-6">
          Vi sammenligner priser fra 30+ butikker
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-display text-lg sm:text-xl font-bold text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors cursor-default select-none whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
