"use client";

import { useMemo } from "react";
import { ShoppingCart, X, ExternalLink, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatNOK } from "@/lib/utils";
import type { SessionProduct } from "@/types";

interface CostOverviewProps {
  products: SessionProduct[];
  onRemoveProduct: (id: string) => void;
}

export default function CostOverview({ products, onRemoveProduct }: CostOverviewProps) {
  const totalCost = useMemo(
    () => products.reduce((sum, sp) => sum + sp.product.price * sp.quantity, 0),
    [products]
  );

  const totalCount = useMemo(
    () => products.reduce((sum, sp) => sum + sp.quantity, 0),
    [products]
  );

  const groupedByRoom = useMemo(() => {
    const groups: Record<string, { products: SessionProduct[]; cost: number }> = {};
    for (const sp of products) {
      const room = sp.room_name || "Uten rom";
      if (!groups[room]) groups[room] = { products: [], cost: 0 };
      groups[room].products.push(sp);
      groups[room].cost += sp.product.price * sp.quantity;
    }
    return groups;
  }, [products]);

  if (products.length === 0) return null;

  return (
    <div className="border-t bg-card">
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Left: product count and room costs */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {totalCount} {totalCount === 1 ? "produkt" : "produkter"}
            </span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-3">
            {Object.entries(groupedByRoom).map(([room, data]) => (
              <span key={room} className="text-xs text-muted-foreground">
                {room}: <span className="font-mono font-medium">{formatNOK(data.cost)}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right: total + details button */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Totalt</p>
            <p className="font-mono text-base font-bold">{formatNOK(totalCost)}</p>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <ChevronUp className="h-3.5 w-3.5" />
                Se detaljer
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Produktoversikt</h3>
                    <p className="text-sm text-muted-foreground">
                      {totalCount} produkter i handlekurven
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total kostnad</p>
                    <p className="font-mono text-xl font-bold text-primary">
                      {formatNOK(totalCost)}
                    </p>
                  </div>
                </div>

                <Separator />

                <ScrollArea className="flex-1 py-4">
                  {Object.entries(groupedByRoom).map(([room, data]) => (
                    <div key={room} className="mb-6">
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-sm font-semibold">{room}</h4>
                        <span className="font-mono text-sm text-muted-foreground">
                          {formatNOK(data.cost)}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {data.products.map((sp) => (
                          <div
                            key={sp.id}
                            className="flex items-center gap-3 rounded-lg border p-3"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-medium">{sp.product.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                  {sp.product.brand}
                                </Badge>
                                {sp.quantity > 1 && (
                                  <span className="text-xs text-muted-foreground">
                                    x{sp.quantity}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="font-mono text-sm font-semibold">
                              {formatNOK(sp.product.price * sp.quantity)}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground opacity-60 hover:opacity-100"
                              disabled
                              title="Ga til butikk (kommer snart)"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:bg-destructive/10"
                              onClick={() => onRemoveProduct(sp.id)}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </ScrollArea>

                <Separator />

                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm font-medium">Totalsum</p>
                  <p className="font-mono text-lg font-bold">{formatNOK(totalCost)}</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
