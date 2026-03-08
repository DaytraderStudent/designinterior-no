"use client";

import { cn } from "@/lib/utils";

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const colorPalettes = [
  {
    name: "Noytrale",
    colors: [
      { name: "Hvit", value: "#FFFFFF" },
      { name: "Off-white", value: "#F5F0EB" },
      { name: "Lys gra", value: "#E8E4E0" },
      { name: "Varm gra", value: "#C4BBAF" },
    ],
  },
  {
    name: "Varme",
    colors: [
      { name: "Beige", value: "#D4C5A9" },
      { name: "Sand", value: "#C8B68B" },
      { name: "Terrakotta", value: "#C27B5C" },
      { name: "Varm rosa", value: "#D4A0A0" },
    ],
  },
  {
    name: "Kjolige",
    colors: [
      { name: "Lyseblaa", value: "#B8CDD6" },
      { name: "Salvie", value: "#A8B5A0" },
      { name: "Stovet blaa", value: "#8FA8B5" },
      { name: "Mint", value: "#A0C4B8" },
    ],
  },
  {
    name: "Morke",
    colors: [
      { name: "Koksgraa", value: "#4A4A4A" },
      { name: "Midnattsbla", value: "#2C3E50" },
      { name: "Skoggronn", value: "#2D4A3E" },
      { name: "Antrasitt", value: "#333333" },
    ],
  },
];

export default function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h3 className="text-sm font-semibold mb-1">Fargevelger</h3>
        <p className="text-xs text-muted-foreground">
          Velg farge for vegger og gulv
        </p>
      </div>

      {/* Selected color preview */}
      <div className="flex items-center gap-3 rounded-lg border p-3">
        <div
          className="h-10 w-10 rounded-md border shadow-sm"
          style={{ backgroundColor: selectedColor }}
        />
        <div>
          <p className="text-xs text-muted-foreground">Valgt farge</p>
          <p className="font-mono text-sm font-medium">{selectedColor}</p>
        </div>
      </div>

      {/* Color preview strip */}
      <div
        className="h-8 w-full rounded-md border shadow-inner"
        style={{ backgroundColor: selectedColor }}
      />

      {/* Color palettes */}
      <div className="flex flex-col gap-4">
        {colorPalettes.map((palette) => (
          <div key={palette.name}>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              {palette.name}
            </p>
            <div className="flex gap-2">
              {palette.colors.map((color) => (
                <button
                  key={color.value}
                  title={color.name}
                  onClick={() => onColorChange(color.value)}
                  className={cn(
                    "h-9 w-9 rounded-full border-2 shadow-sm transition-all hover:scale-110",
                    selectedColor === color.value
                      ? "ring-2 ring-primary ring-offset-2 border-primary"
                      : "border-border hover:border-foreground/30"
                  )}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
