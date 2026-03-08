"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Stage, Layer, Rect, Group, Text, Image as KonvaImage } from "react-konva";
import type { SessionProduct } from "@/types";

const categoryColors: Record<string, string> = {
  sofa: "#93C5FD",
  bord: "#FCD34D",
  stol: "#86EFAC",
  lampe: "#FDE68A",
  teppe: "#C4B5FD",
  pute: "#F9A8D4",
  dekor: "#FCA5A5",
  hylle: "#FDBA74",
  seng: "#A5B4FC",
  kommode: "#5EEAD4",
};

interface KonvaCanvasProps {
  backgroundImage: string | null;
  products: SessionProduct[];
  onUpdateProduct: (
    id: string,
    position: { x: number; y: number; rotation: number; scale: number }
  ) => void;
  onSelectProduct: (id: string | null) => void;
  selectedProductId: string | null;
}

export default function KonvaCanvas({
  backgroundImage,
  products,
  onUpdateProduct,
  onSelectProduct,
  selectedProductId,
}: KonvaCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [scale, setScale] = useState(1);
  const [bgImg, setBgImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!backgroundImage) {
      setBgImg(null);
      return;
    }
    const img = new window.Image();
    img.src = backgroundImage;
    img.onload = () => setBgImg(img);
  }, [backgroundImage]);

  const handleWheel = useCallback(
    (e: { evt: WheelEvent }) => {
      e.evt.preventDefault();
      const scaleBy = 1.05;
      const newScale = e.evt.deltaY < 0 ? scale * scaleBy : scale / scaleBy;
      setScale(Math.max(0.5, Math.min(2, newScale)));
    },
    [scale]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStageClick = useCallback(
    (e: any) => {
      if (e.target === e.target.getStage()) {
        onSelectProduct(null);
      }
    },
    [onSelectProduct]
  );

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-muted/20">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        scaleX={scale}
        scaleY={scale}
        onWheel={handleWheel}
        onClick={handleStageClick}
        onTap={handleStageClick}
      >
        <Layer>
          {bgImg && (
            <KonvaImage
              image={bgImg}
              width={dimensions.width / scale}
              height={dimensions.height / scale}
            />
          )}
        </Layer>

        <Layer>
          {products.map((sp) => {
            const color = categoryColors[sp.product.category] ?? "#D1D5DB";
            const isSelected = sp.id === selectedProductId;
            const w = Math.min(sp.product.dimensions.width, 120);
            const h = Math.min(sp.product.dimensions.depth, 90);

            return (
              <Group
                key={sp.id}
                x={sp.position.x}
                y={sp.position.y}
                rotation={sp.position.rotation}
                scaleX={sp.position.scale}
                scaleY={sp.position.scale}
                draggable
                onClick={() => onSelectProduct(sp.id)}
                onTap={() => onSelectProduct(sp.id)}
                onDragEnd={(e: any) => {
                  onUpdateProduct(sp.id, {
                    x: e.target.x(),
                    y: e.target.y(),
                    rotation: sp.position.rotation,
                    scale: sp.position.scale,
                  });
                }}
              >
                <Rect
                  width={w}
                  height={h}
                  fill={color}
                  opacity={0.85}
                  cornerRadius={6}
                  stroke={isSelected ? "#3B82F6" : "#00000020"}
                  strokeWidth={isSelected ? 2 : 1}
                  shadowColor="rgba(0,0,0,0.2)"
                  shadowBlur={isSelected ? 8 : 4}
                  shadowOffset={{ x: 2, y: 2 }}
                />
                <Text
                  text={sp.product.name}
                  width={w}
                  align="center"
                  y={h / 2 - 6}
                  fontSize={11}
                  fill="#1F2937"
                  fontStyle="bold"
                />
              </Group>
            );
          })}
        </Layer>
      </Stage>

      <div className="absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-1 text-xs font-mono text-muted-foreground backdrop-blur-sm border">
        {Math.round(scale * 100)}%
      </div>
    </div>
  );
}
