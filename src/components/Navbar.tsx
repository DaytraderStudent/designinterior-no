"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/produkter", label: "Produkter" },
  { href: "/blogg", label: "Blogg" },
  { href: "/inspirasjon", label: "Inspirasjon" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-xl border-b border-border/50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-foreground"
        >
          <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 shrink-0" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="7" fill="#2a2118"/>
            <path d="M16 6L26 13V27H6V13L16 6Z" stroke="#c4a87a" strokeWidth="1.8" strokeLinejoin="round"/>
            <rect x="13" y="20" width="6" height="7" rx="0.5" stroke="#c4a87a" strokeWidth="1.4"/>
            <rect x="20" y="14" width="4" height="4" rx="0.5" stroke="#c4a87a" strokeWidth="1.2"/>
          </svg>
          designinteriør<span className="text-accent">.no</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button asChild size="sm" className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-9 px-5">
            <Link href="/produkter">Utforsk produkter</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary md:hidden"
          aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background px-5 pb-5 pt-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <Button asChild size="sm" className="w-full rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-10">
              <Link href="/produkter" onClick={() => setMobileOpen(false)}>
                Utforsk produkter
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
