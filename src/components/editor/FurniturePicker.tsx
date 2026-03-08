"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Sofa, Table, Armchair, Lamp, Circle, Square, Flower2, BookOpen, Bed, Archive, Loader2 } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { products as hardcodedProducts } from "@/data/products";
import { supabase } from "@/lib/supabase";
import { formatNOK, cn } from "@/lib/utils";
import type { Product } from "@/types";

const categories = [
  { value: "alle", label: "Alle", icon: Square },
  { value: "sofa", label: "Sofa", icon: Sofa },
  { value: "bord", label: "Bord", icon: Table },
  { value: "stol", label: "Stol", icon: Armchair },
  { value: "lampe", label: "Lampe", icon: Lamp },
  { value: "teppe", label: "Teppe", icon: Circle },
  { value: "pute", label: "Pute", icon: Square },
  { value: "dekor", label: "Dekor", icon: Flower2 },
  { value: "hylle", label: "Hylle", icon: BookOpen },
  { value: "seng", label: "Seng", icon: Bed },
  { value: "kommode", label: "Kommode", icon: Archive },
  { value: "gardin", label: "Gardin", icon: Square },
  { value: "speil", label: "Speil", icon: Circle },
];

const styles = [
  "Skandinavisk",
  "Moderne",
  "Industriell",
  "Boho",
  "Minimalistisk",
];

const categoryColors: Record<string, string> = {
  sofa: "bg-blue-100 dark:bg-blue-900/30",
  bord: "bg-amber-100 dark:bg-amber-900/30",
  stol: "bg-green-100 dark:bg-green-900/30",
  lampe: "bg-yellow-100 dark:bg-yellow-900/30",
  teppe: "bg-purple-100 dark:bg-purple-900/30",
  pute: "bg-pink-100 dark:bg-pink-900/30",
  dekor: "bg-rose-100 dark:bg-rose-900/30",
  hylle: "bg-orange-100 dark:bg-orange-900/30",
  seng: "bg-indigo-100 dark:bg-indigo-900/30",
  kommode: "bg-teal-100 dark:bg-teal-900/30",
  gardin: "bg-cyan-100 dark:bg-cyan-900/30",
  speil: "bg-sky-100 dark:bg-sky-900/30",
};

function getCategoryIcon(category: string) {
  const cat = categories.find((c) => c.value === category);
  if (!cat) return Square;
  return cat.icon;
}

interface FurniturePickerProps {
  onAddProduct: (product: Product) => void;
}

export default function FurniturePicker({ onAddProduct }: FurniturePickerProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("alle");
  const [activeStyles, setActiveStyles] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<number[]>([0, 100000]);
  const [allProducts, setAllProducts] = useState<Product[]>(hardcodedProducts);
  const [isLoading, setIsLoading] = useState(true);

  // Load products from Supabase on mount, fallback to hardcoded
  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("brand")
          .order("name");

        if (!error && data && data.length > 0) {
          setAllProducts(data as Product[]);
        }
      } catch {
        // Keep hardcoded products on error
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const toggleStyle = (style: string) => {
    setActiveStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (activeCategory !== "alle" && p.category !== activeCategory) return false;

      if (search) {
        const q = search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.brand.toLowerCase().includes(q) &&
          !p.category.toLowerCase().includes(q)
        )
          return false;
      }

      if (activeStyles.length > 0) {
        const productStyles = p.style_tags.map((s) => s.toLowerCase());
        if (!activeStyles.some((s) => productStyles.includes(s.toLowerCase())))
          return false;
      }

      if (p.price < budgetRange[0] || p.price > budgetRange[1]) return false;

      return true;
    });
  }, [search, activeCategory, activeStyles, budgetRange, allProducts]);

  return (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="p-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Søk etter møbler..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 pb-2">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="flex h-auto flex-wrap gap-1 bg-transparent p-0">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                className="h-7 rounded-full px-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Separator />

      {/* Style filters */}
      <div className="px-4 py-3">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Stil</p>
        <div className="flex flex-wrap gap-1.5">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => toggleStyle(style)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                activeStyles.includes(style)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              )}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Budget slider */}
      <div className="px-4 pb-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">Budsjett</p>
          <p className="text-xs text-muted-foreground">
            {formatNOK(budgetRange[0])} &ndash; {formatNOK(budgetRange[1])}
          </p>
        </div>
        <Slider
          min={0}
          max={100000}
          step={1000}
          value={budgetRange}
          onValueChange={setBudgetRange}
        />
      </div>

      <Separator />

      {/* Product count */}
      <div className="px-4 py-2">
        <p className="text-xs text-muted-foreground">
          {isLoading ? "Laster produkter..." : `Viser ${filteredProducts.length} produkter`}
        </p>
      </div>

      {/* Product grid */}
      <ScrollArea className="flex-1 px-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="mb-2 h-6 w-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Laster produkter...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 pb-4">
              {filteredProducts.map((product) => {
                const Icon = getCategoryIcon(product.category);
                return (
                  <button
                    key={product.id}
                    onClick={() => onAddProduct(product)}
                    className="group flex flex-col overflow-hidden rounded-lg border bg-card text-left transition-all hover:shadow-md hover:border-primary/50"
                  >
                    <ProductImage
                      category={product.category}
                      brand={product.brand}
                      imageUrl={product.image_url}
                      className="aspect-square"
                      iconSize="sm"
                    />
                    <div className="flex flex-1 flex-col gap-1 p-2">
                      <p className="text-xs font-medium leading-tight line-clamp-2">
                        {product.name}
                      </p>
                      <Badge variant="secondary" className="w-fit text-[10px] px-1.5 py-0">
                        {product.brand}
                      </Badge>
                      <p className="mt-auto font-mono text-xs font-semibold text-primary">
                        {formatNOK(product.price)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="mb-2 h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">Ingen produkter funnet</p>
                <p className="text-xs text-muted-foreground/60">
                  Prøv å endre filtrene dine
                </p>
              </div>
            )}
          </>
        )}
      </ScrollArea>
    </div>
  );
}
