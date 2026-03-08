"use client";

import { useState, useRef, useCallback } from "react";
import { Camera, Upload, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RoomUploaderProps {
  onImageUpload: (imageBase64: string) => void;
  isAnalyzing: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function RoomUploader({ onImageUpload, isAnalyzing }: RoomUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Ugyldig filformat. Bruk JPG, PNG eller WEBP.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("Filen er for stor. Maks 10 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageUpload(base64);
      };
      reader.readAsDataURL(file);
    },
    [onImageUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const clearPreview = useCallback(() => {
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  // Loading state during analysis
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-center">
          <p className="text-sm font-medium">Analyserer rommet ditt...</p>
          <p className="text-xs text-muted-foreground">
            Dette kan ta noen sekunder
          </p>
        </div>
      </div>
    );
  }

  // Preview state
  if (preview) {
    return (
      <div className="relative overflow-hidden rounded-xl border">
        <img
          src={preview}
          alt="Forhåndsvisning av rom"
          className="h-48 w-full object-cover"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute right-2 top-2 h-7 w-7"
          onClick={clearPreview}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <p className="text-xs font-medium text-white">Bilde lastet opp</p>
        </div>
      </div>
    );
  }

  // Upload state
  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Camera className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Dra og slipp et bilde her</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            eller klikk for å velge fil
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Upload className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">
            JPG, PNG, WEBP (maks 10 MB)
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs text-destructive">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
