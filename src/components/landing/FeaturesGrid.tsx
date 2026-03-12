"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { products } from "@/data/products";
import { formatNOK } from "@/lib/utils";
import ProductImage from "@/components/ProductImage";
import { useRef, useState, useCallback } from "react";

function getDeals() {
  return products
    .filter((p) => p.discount_percent && p.discount_percent > 0 && p.image_url?.startsWith("http"))
    .sort((a, b) => (b.discount_percent || 0) - (a.discount_percent || 0))
    .slice(0, 8);
}

const deals = getDeals();

export default function FeaturesGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = useCallback((e: React.MouseEvent, productId: string, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedId(productId);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  if (deals.length === 0) return null;

  return (
    <section className="py-14 sm:py-16 px-5 sm:px-8 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-green-600/10 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              Spar penger
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Tilbud &amp; rabattkoder
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-border hover:border-foreground/20 hover:bg-card transition-all"
              aria-label="Forrige"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-border hover:border-foreground/20 hover:bg-card transition-all"
              aria-label="Neste"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible md:pb-0"
        >
          {deals.map((product) => (
            <Link
              key={product.id}
              href={`/produkter/${product.id}`}
              className="min-w-[220px] md:min-w-0 snap-start"
            >
              <div className="product-card bg-card rounded-2xl border border-border/50 overflow-hidden h-full group">
                <div className="relative overflow-hidden">
                  <ProductImage
                    category={product.category}
                    brand={product.brand}
                    imageUrl={product.image_url}
                    className="aspect-square group-hover:scale-[1.03] transition-transform duration-500"
                    iconSize="lg"
                  />
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    -{product.discount_percent}%
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                  <h3 className="font-medium text-sm line-clamp-1 mb-2">{product.name}</h3>

                  {product.discount_code && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="inline-block bg-secondary border border-dashed border-accent/40 rounded-md px-2.5 py-1">
                        <span className="text-[10px] text-muted-foreground mr-1">KODE</span>
                        <span className="text-xs font-mono font-bold text-accent">{product.discount_code}</span>
                      </span>
                      <button
                        onClick={(e) => copyCode(e, product.id, product.discount_code!)}
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                        aria-label={`Kopier kode ${product.discount_code}`}
                      >
                        {copiedId === product.id ? (
                          <>
                            <Check className="w-3 h-3" />
                            Kopiert!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Kopier
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-lg font-bold text-green-700">
                      {formatNOK(Math.round(product.price * (1 - (product.discount_percent || 0) / 100)))}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground line-through">
                      {formatNOK(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
