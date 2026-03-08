"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { Upload } from "lucide-react";
import type { SessionProduct } from "@/types";

const KonvaCanvas = dynamic(() => import("./KonvaCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted/30">
      <p className="text-sm text-muted-foreground">Laster editor...</p>
    </div>
  ),
});

interface CanvasEditorProps {
  backgroundImage: string | null;
  products: SessionProduct[];
  onUpdateProduct: (
    id: string,
    position: { x: number; y: number; rotation: number; scale: number }
  ) => void;
  onSelectProduct: (id: string | null) => void;
  selectedProductId: string | null;
}

export default function CanvasEditor({
  backgroundImage,
  products,
  onUpdateProduct,
  onSelectProduct,
  selectedProductId,
}: CanvasEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!backgroundImage) {
    return (
      <div
        ref={containerRef}
        className="flex h-full w-full items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 p-12 text-center">
          <Upload className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-medium text-muted-foreground">
            Last opp et bilde av rommet ditt
          </p>
          <p className="mt-1 text-sm text-muted-foreground/60">
            Bruk opplastingsfeltet for å komme i gang
          </p>
        </div>
      </div>
    );
  }

  return (
    <KonvaCanvas
      backgroundImage={backgroundImage}
      products={products}
      onUpdateProduct={onUpdateProduct}
      onSelectProduct={onSelectProduct}
      selectedProductId={selectedProductId}
    />
  );
}
