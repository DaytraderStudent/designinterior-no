import Link from "next/link";

const links = [
  { label: "Inspirasjon", href: "/inspirasjon" },
  { label: "Produkter", href: "/produkter" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <Link href="/" className="font-display text-xl font-bold text-foreground hover:text-primary transition-colors">
              designinterior.no
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Laget med kjærlighet i Norge
            </p>
          </div>

          {/* Navigation links */}
          <nav className="flex items-center gap-6">
            {links.map((link) => (
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

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/40 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 designinterior.no. Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </footer>
  );
}
