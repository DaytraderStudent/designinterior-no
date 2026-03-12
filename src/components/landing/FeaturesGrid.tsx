"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { formatNOK } from "@/lib/utils";
import ProductImage from "@/components/ProductImage";

// Get products with biggest discounts
function getDeals() {
  return products
    .filter((p) => p.discount_percent && p.discount_percent > 0 && p.image_url?.startsWith("http"))
    .sort((a, b) => (b.discount_percent || 0) - (a.discount_percent || 0))
    .slice(0, 6);
}

const deals = getDeals();

export default function FeaturesGrid() {
  if (deals.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Tilbud og rabattkoder
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Spar penger med våre eksklusive rabattkoder
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex gap-1">
            <Link href="/produkter">
              Se alle
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {deals.map((product) => (
            <Link key={product.id} href={`/produkter/${product.id}`}>
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-200 h-full border-border/50">
                <div className="relative">
                  <ProductImage
                    category={product.category}
                    brand={product.brand}
                    imageUrl={product.image_url}
                    className="aspect-square"
                    iconSize="md"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                    -{product.discount_percent}%
                  </div>
                  {product.discount_code && (
                    <Badge className="absolute bottom-2 left-2 bg-black/70 text-white border-0 text-[10px]">
                      Kode: {product.discount_code}
                    </Badge>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <h3 className="font-medium text-xs sm:text-sm line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="font-mono text-sm font-bold text-accent">
                      {formatNOK(Math.round(product.price * (1 - (product.discount_percent || 0) / 100)))}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground line-through">
                      {formatNOK(product.price)}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
