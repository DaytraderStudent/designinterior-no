"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { products } from "@/data/products";
import { formatNOK } from "@/lib/utils";
import { Search, SlidersHorizontal, Star, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";

const categories = [
  { label: "Alle", value: "" },
  { label: "Bord", value: "bord" },
  { label: "Dekor", value: "dekor" },
  { label: "Gardin", value: "gardin" },
  { label: "Hylle", value: "hylle" },
  { label: "Kommode", value: "kommode" },
  { label: "Lampe", value: "lampe" },
  { label: "Pute", value: "pute" },
  { label: "Seng", value: "seng" },
  { label: "Sofa", value: "sofa" },
  { label: "Speil", value: "speil" },
  { label: "Stol", value: "stol" },
  { label: "Teppe", value: "teppe" },
];

const brands = [
  "A-Møbler", "Bohus", "Bolia", "Chilli", "Christiania Glasmagasin",
  "Clas Ohlson", "COOP Obs", "Drømmerom", "Ekornes", "Elkjøp",
  "Fagmøbler", "Frederik Bagger", "HAY", "Home & Cottage", "HTH",
  "Hulténs", "Hødnebø", "Høie", "IKEA", "Introni",
  "Jysk", "Kid", "Kitch'n", "Kremmerhuset",
  "Lampemesteren", "Lunehjem.no", "Lånna Möbler",
  "Møbelringen", "Newport", "Nordic Nest",
  "Nordiska Galleriet", "Plantasjen", "Princess",
  "Skeidar", "Slettvoll", "Stille", "Tilbords",
  "Trademax", "Trendcarpet", "VidaXL",
];

type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc" | "rating-asc" | "name-asc";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Standard", value: "default" },
  { label: "Pris: Lav → Høy", value: "price-asc" },
  { label: "Pris: Høy → Lav", value: "price-desc" },
  { label: "Rating: Høy → Lav", value: "rating-desc" },
  { label: "Rating: Lav → Høy", value: "rating-asc" },
  { label: "Navn: A → Å", value: "name-asc" },
];

export default function ProdukterPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (p.price > maxPrice) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "rating-asc":
        result = [...result].sort((a, b) => a.rating - b.rating);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, "nb"));
        break;
    }

    return result;
  }, [search, category, brand, maxPrice, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Produktkatalog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Utforsk møbler og interiør fra Norges beste butikker. Alle priser er i norske kroner.
          </p>
        </div>

        {/* Savings banner */}
        <div className="mb-8 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-4 flex items-center gap-3 max-w-2xl mx-auto">
          <span className="text-2xl">💰</span>
          <div>
            <p className="text-sm font-semibold text-green-800 dark:text-green-300">
              Spar penger med våre eksklusive rabattkoder
            </p>
            <p className="text-xs text-green-700 dark:text-green-400 mt-0.5">
              Kjøp via designinteriør.no og få opptil 20% rabatt hos butikkene. Se etter produkter merket med rabattkode.
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Søk etter møbler..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </Button>
          </div>

          {showFilters && (
            <div className="p-4 bg-card rounded-lg border space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Kategori</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat.value}
                      variant={category === cat.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategory(cat.value)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Butikk</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={brand === "" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBrand("")}
                  >
                    Alle
                  </Button>
                  {brands.map((b) => (
                    <Button
                      key={b}
                      variant={brand === b ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBrand(b)}
                    >
                      {b}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">
                  Maks pris: <span className="font-mono">{formatNOK(maxPrice)}</span>
                </p>
                <Slider
                  value={[maxPrice]}
                  onValueChange={(v) => setMaxPrice(v[0])}
                  min={0}
                  max={100000}
                  step={1000}
                  className="max-w-md"
                />
              </div>
            </div>
          )}

          {/* Sort + count row */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Viser {filtered.length} av {products.length} produkter
            </p>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm bg-card border rounded-md px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((product) => {
            const hasDiscount = product.discount_percent && product.discount_percent > 0;
            const discountedPrice = hasDiscount
              ? Math.round(product.price * (1 - (product.discount_percent || 0) / 100))
              : product.price;
            const savings = product.price - discountedPrice;

            return (
              <Link key={product.id} href={`/produkter/${product.id}`}>
                <Card className="overflow-hidden group hover:shadow-md transition-all duration-200 h-full">
                  <div className="relative">
                    <ProductImage
                      category={product.category}
                      brand={product.brand}
                      imageUrl={product.image_url}
                      className="aspect-square"
                      iconSize="lg"
                    />
                    {hasDiscount && (
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">
                        -{product.discount_percent}%
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1.5">
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

                    {hasDiscount ? (
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-mono text-sm font-bold text-green-700">
                            {formatNOK(discountedPrice)}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground line-through">
                            {formatNOK(product.price)}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-green-600 mt-0.5">
                          Spar {formatNOK(savings)} via oss
                        </p>
                      </div>
                    ) : (
                      <p className="font-mono text-sm font-bold text-foreground">
                        {formatNOK(product.price)}
                      </p>
                    )}

                    {product.discount_code && (
                      <div className="mt-1.5">
                        <span className="inline-block bg-secondary border border-dashed border-accent/40 rounded px-2 py-0.5">
                          <span className="text-[10px] text-muted-foreground mr-1">KODE</span>
                          <span className="text-xs font-mono font-bold text-accent">{product.discount_code}</span>
                        </span>
                      </div>
                    )}

                    <div className="mt-2 text-xs text-muted-foreground">
                      {product.dimensions.width} × {product.dimensions.depth} ×{" "}
                      {product.dimensions.height} cm
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              Ingen produkter funnet med disse filtrene.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearch("");
                setCategory("");
                setBrand("");
                setMaxPrice(100000);
                setSortBy("default");
              }}
            >
              Nullstill filter
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
