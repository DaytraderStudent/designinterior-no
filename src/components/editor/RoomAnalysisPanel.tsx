"use client";

import { Lightbulb, Ruler, Home, Sun, Palette, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { RoomAnalysis } from "@/types";

interface RoomAnalysisPanelProps {
  analysis: RoomAnalysis | null;
  isLoading: boolean;
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  );
}

export default function RoomAnalysisPanel({
  analysis,
  isLoading,
}: RoomAnalysisPanelProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
        <Separator />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
        <Separator />
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Separator />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
        <Home className="h-8 w-8 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">Ingen romanalyse enna</p>
        <p className="text-xs text-muted-foreground/60">
          Last opp et bilde for aa analysere rommet
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h3 className="text-sm font-semibold">Romanalyse</h3>
        <p className="text-xs text-muted-foreground">
          AI-generert analyse av rommet ditt
        </p>
      </div>

      {/* Room type & size */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <div className="mb-1 flex items-center gap-1.5">
            <Home className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] text-muted-foreground">Romtype</p>
          </div>
          <Badge variant="secondary">{analysis.romtype}</Badge>
        </div>

        <div className="rounded-lg border p-3">
          <div className="mb-1 flex items-center gap-1.5">
            <Ruler className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] text-muted-foreground">Estimert storrelse</p>
          </div>
          <p className="text-sm font-medium">{analysis.estimertStorrelse}</p>
        </div>

        <div className="rounded-lg border p-3">
          <div className="mb-1 flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] text-muted-foreground">Stil</p>
          </div>
          <p className="text-sm font-medium">{analysis.stil}</p>
        </div>

        <div className="rounded-lg border p-3">
          <div className="mb-1 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] text-muted-foreground">Gulvtype</p>
          </div>
          <p className="text-sm font-medium">{analysis.gulvType}</p>
        </div>
      </div>

      {/* Lysforhold */}
      <div className="rounded-lg border p-3">
        <div className="mb-1 flex items-center gap-1.5">
          <Sun className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">Lysforhold</p>
        </div>
        <p className="text-sm font-medium">
          {analysis.lysforhold}
          {analysis.lysretning && (
            <span className="text-muted-foreground"> ({analysis.lysretning})</span>
          )}
        </p>
      </div>

      <Separator />

      {/* Veggfarger */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Veggfarger</p>
        <div className="flex gap-2">
          {analysis.veggerFarge.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="h-8 w-8 rounded-full border shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
              <span className="text-[10px] text-muted-foreground font-mono">{color}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Eksisterende mobler */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Eksisterende mobler
        </p>
        <div className="flex flex-wrap gap-1.5">
          {analysis.eksisterendeMobler.map((item, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {item}
            </Badge>
          ))}
          {analysis.eksisterendeMobler.length === 0 && (
            <p className="text-xs text-muted-foreground/60">Ingen mobler oppdaget</p>
          )}
        </div>
      </div>

      <Separator />

      {/* Forbedringsforslag */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Forbedringsforslag
        </p>
        <div className="flex flex-col gap-2">
          {analysis.forbedringsforslag.map((tip, i) => (
            <div key={i} className="flex gap-2">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-500" />
              <p className="text-xs leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Anbefalte stiler */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Anbefalte stiler
        </p>
        <div className="flex flex-wrap gap-1.5">
          {analysis.anbefalteStiler.map((style, i) => (
            <Badge key={i} className="text-xs">
              {style}
            </Badge>
          ))}
        </div>
      </div>

      {/* Anbefalte hovedfarger */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Anbefalte hovedfarger
        </p>
        <div className="flex gap-2">
          {analysis.anbefalteHovedfarger.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="h-8 w-8 rounded-full border shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
              <span className="text-[10px] text-muted-foreground font-mono">{color}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
