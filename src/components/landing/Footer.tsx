import Link from "next/link";

const productLinks = [
  { label: "Alle produkter", href: "/produkter" },
  { label: "Sofa", href: "/produkter?category=sofa" },
  { label: "Stol", href: "/produkter?category=stol" },
  { label: "Seng", href: "/produkter?category=seng" },
  { label: "Bord", href: "/produkter?category=bord" },
  { label: "Lampe", href: "/produkter?category=lampe" },
];

const siteLinks = [
  { label: "Anmeldelser", href: "/produkter" },
  { label: "Blogg", href: "/blogg" },
  { label: "Inspirasjon", href: "/inspirasjon" },
  { label: "Om oss", href: "/om" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-xl font-bold text-foreground hover:text-primary transition-colors">
              designinteriør<span className="text-accent">.no</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Norges uavhengige interiørguide. Vi sammenligner priser og anmelder møbler fra 30+ butikker.
            </p>
          </div>

          {/* Kategorier */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Kategorier</h4>
            <nav className="flex flex-col gap-2">
              {productLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Nettsted */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Nettsted</h4>
            <nav className="flex flex-col gap-2">
              {siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Info</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Affiliate-lenker gir oss en liten provisjon uten ekstra kostnad for deg.</p>
              <p>Alle priser er veiledende og kan endres.</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 designinteriør.no &mdash; Alle rettigheter reservert
          </p>
          <p className="text-xs text-muted-foreground">
            Laget med kjærlighet i Norge
          </p>
        </div>
      </div>
    </footer>
  );
}
