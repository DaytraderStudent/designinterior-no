"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { products } from "@/data/products";
import { formatNOK } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductImage from "@/components/ProductImage";

const categories = [
  { label: "Alle", value: "" },
  { label: "Sofa", value: "sofa" },
  { label: "Bord", value: "bord" },
  { label: "Stol", value: "stol" },
  { label: "Lampe", value: "lampe" },
  { label: "Teppe", value: "teppe" },
  { label: "Pute", value: "pute" },
  { label: "Dekor", value: "dekor" },
  { label: "Hylle", value: "hylle" },
  { label: "Seng", value: "seng" },
  { label: "Kommode", value: "kommode" },
  { label: "Gardin", value: "gardin" },
  { label: "Speil", value: "speil" },
];

const brands = [
  "IKEA", "Bohus", "Bolia", "Jysk", "Kid", "Skeidar", "HAY",
  "Møbelringen", "Fagmøbler", "Princess", "Home & Cottage",
  "Elkjøp", "Kremmerhuset", "Ekornes", "Slettvoll", "Hødnebø",
  "HTH", "Høie", "Clas Ohlson", "Plantasjen", "Tilbords",
];


export default function ProdukterPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (p.price > maxPrice) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, category, brand, maxPrice]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-4">
            Produktkatalog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Utforsk møbler og interiør fra Norges beste butikker. Alle priser er i norske kroner.
          </p>
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

          <p className="text-sm text-muted-foreground">
            Viser {filtered.length} av {products.length} produkter
          </p>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden group hover:shadow-md transition-all duration-200"
            >
              <ProductImage
                category={product.category}
                brand={product.brand}
                className="aspect-square"
                iconSize="lg"
              />
              <div className="p-3">
                <Badge variant="secondary" className="mb-1.5 text-xs">
                  {product.brand}
                </Badge>
                <h3 className="font-medium text-sm mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="font-mono text-sm font-bold text-accent">
                  {formatNOK(product.price)}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.style_tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {product.dimensions.width} × {product.dimensions.depth} ×{" "}
                  {product.dimensions.height} cm
                </div>
              </div>
            </Card>
          ))}
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
