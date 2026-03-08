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
  gardin: "#D8B4FE",
  speil: "#67E8F9",
};

// Hook to load a product image via proxy, with fallback to colored rect
function useProductImage(imageUrl: string | undefined) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!imageUrl || !imageUrl.startsWith("http")) {
      setFailed(true);
      return;
    }
    setFailed(false);
    setImage(null);
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    // Use our proxy to avoid CORS issues with store CDNs
    img.src = `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
    img.onload = () => setImage(img);
    img.onerror = () => setFailed(true);
  }, [imageUrl]);

  return { image, failed };
}

// Individual product on canvas - renders image or fallback rect
function CanvasProduct({
  sp,
  isSelected,
  onSelect,
  onDragEnd,
}: {
  sp: SessionProduct;
  isSelected: boolean;
  onSelect: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDragEnd: (e: any) => void;
}) {
  const { image, failed } = useProductImage(sp.product.image_url);
  const color = categoryColors[sp.product.category] ?? "#D1D5DB";

  // Size: use product dimensions, clamped to reasonable canvas size
  const w = Math.max(60, Math.min(sp.product.dimensions.width * 1.2, 160));
  const h = Math.max(60, Math.min(sp.product.dimensions.depth * 1.2, 140));

  return (
    <Group
      x={sp.position.x}
      y={sp.position.y}
      rotation={sp.position.rotation}
      scaleX={sp.position.scale}
      scaleY={sp.position.scale}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={onDragEnd}
    >
      {/* Selection highlight glow */}
      {isSelected && (
        <Rect
          x={-4}
          y={-4}
          width={w + 8}
          height={h + 8}
          fill="transparent"
          stroke="#3B82F6"
          strokeWidth={3}
          cornerRadius={10}
          shadowColor="rgba(59,130,246,0.5)"
          shadowBlur={12}
          dash={[6, 3]}
        />
      )}

      {/* Product image or colored fallback */}
      {image && !failed ? (
        <KonvaImage
          image={image}
          width={w}
          height={h}
          cornerRadius={6}
          shadowColor="rgba(0,0,0,0.3)"
          shadowBlur={isSelected ? 10 : 6}
          shadowOffset={{ x: 2, y: 3 }}
        />
      ) : (
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
      )}

      {/* Label below the product */}
      <Rect
        x={0}
        y={h + 2}
        width={w}
        height={18}
        fill="rgba(0,0,0,0.7)"
        cornerRadius={[0, 0, 4, 4]}
      />
      <Text
        text={sp.product.name}
        width={w}
        align="center"
        y={h + 4}
        fontSize={10}
        fill="#FFFFFF"
        fontStyle="600"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
}

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
          {products.map((sp) => (
            <CanvasProduct
              key={sp.id}
              sp={sp}
              isSelected={sp.id === selectedProductId}
              onSelect={() => onSelectProduct(sp.id)}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onDragEnd={(e: any) => {
                onUpdateProduct(sp.id, {
                  x: e.target.x(),
                  y: e.target.y(),
                  rotation: sp.position.rotation,
                  scale: sp.position.scale,
                });
              }}
            />
          ))}
        </Layer>
      </Stage>

      <div className="absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-1 text-xs font-mono text-muted-foreground backdrop-blur-sm border">
        {Math.round(scale * 100)}%
      </div>
    </div>
  );
}
