import Link from "next/link";

const categories = [
  { label: "Sofaer", href: "/produkter?category=sofa" },
  { label: "Stoler", href: "/produkter?category=stol" },
  { label: "Senger", href: "/produkter?category=seng" },
  { label: "Bord", href: "/produkter?category=bord" },
  { label: "Lamper", href: "/produkter?category=lampe" },
  { label: "Tepper", href: "/produkter?category=teppe" },
];

const siteLinks = [
  { label: "Alle produkter", href: "/produkter" },
  { label: "Blogg", href: "/blogg" },
  { label: "Inspirasjon", href: "/inspirasjon" },
];

const brands = [
  { label: "IKEA", href: "/produkter?brand=IKEA" },
  { label: "Bohus", href: "/produkter?brand=Bohus" },
  { label: "Bolia", href: "/produkter?brand=Bolia" },
  { label: "Jysk", href: "/produkter?brand=Jysk" },
  { label: "Skeidar", href: "/produkter?brand=Skeidar" },
  { label: "Ekornes", href: "/produkter?brand=Ekornes" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2a2118] text-white/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block font-display text-xl font-bold text-white mb-3">
              designinteriør<span className="text-[#c4a87a]">.no</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Norges uavhengige interiørguide. Vi sammenligner priser og
              anmelder møbler fra 30+ butikker.
            </p>
          </div>

          {/* Kategorier */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">
              Kategorier
            </h4>
            <nav className="flex flex-col gap-2.5">
              {categories.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Butikker */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">
              Butikker
            </h4>
            <nav className="flex flex-col gap-2.5">
              {brands.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Nettsted */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">
              Nettsted
            </h4>
            <nav className="flex flex-col gap-2.5">
              {siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 p-3.5 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/35 leading-relaxed">
                Noen lenker er affiliate-lenker. Det betyr at vi kan motta en
                liten provisjon uten ekstra kostnad for deg.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/25">
            &copy; 2026 designinteriør.no
          </p>
          <p className="text-xs text-white/25">
            Laget i Norge
          </p>
        </div>
      </div>
    </footer>
  );
}
