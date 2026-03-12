"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { formatNOK } from "@/lib/utils";
import ProductImage from "@/components/ProductImage";

function capitalize(str: string): string {
  return str.replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}

// Pick top-rated products with images, spread across categories
function getPopularProducts() {
  const withImages = products
    .filter((p) => p.image_url && p.image_url.startsWith("http"))
    .sort((a, b) => b.rating - a.rating);

  const seen = new Set<string>();
  const result: typeof products = [];

  for (const p of withImages) {
    if (result.length >= 10) break;
    const key = p.category;
    if (seen.size < 6 && seen.has(key)) continue;
    seen.add(key);
    result.push(p);
  }

  return result;
}

const popular = getPopularProducts();

export default function PopularProducts() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Populære produkter
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Høyest rangerte produkter fra våre anmeldelser
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex gap-1">
            <Link href="/produkter?sort=rating-desc">
              Se alle
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {popular.map((product) => (
            <Link key={product.id} href={`/produkter/${product.id}`}>
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-200 h-full border-border/50">
                <div className="relative">
                  <ProductImage
                    category={product.category}
                    brand={product.brand}
                    imageUrl={product.image_url}
                    className="aspect-square"
                    iconSize="lg"
                  />
                  {product.discount_percent && product.discount_percent > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                      -{product.discount_percent}%
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {product.brand}
                    </Badge>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="font-mono text-sm font-bold text-accent">
                    {formatNOK(product.price)}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {product.style_tags.slice(0, 1).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] py-0">
                        {capitalize(tag)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Button asChild variant="outline" className="gap-1">
            <Link href="/produkter?sort=rating-desc">
              Se alle produkter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
