import {
  Sofa,
  Table,
  Armchair,
  Lamp,
  Circle,
  Square,
  Flower2,
  BookOpen,
  Bed,
  Archive,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categoryConfig: Record<
  string,
  { icon: React.ElementType; gradient: string; accent: string }
> = {
  sofa: {
    icon: Sofa,
    gradient: "from-blue-100 to-blue-50 dark:from-blue-950 dark:to-blue-900/50",
    accent: "text-blue-400 dark:text-blue-300",
  },
  bord: {
    icon: Table,
    gradient: "from-amber-100 to-amber-50 dark:from-amber-950 dark:to-amber-900/50",
    accent: "text-amber-400 dark:text-amber-300",
  },
  stol: {
    icon: Armchair,
    gradient: "from-green-100 to-green-50 dark:from-green-950 dark:to-green-900/50",
    accent: "text-green-400 dark:text-green-300",
  },
  lampe: {
    icon: Lamp,
    gradient: "from-yellow-100 to-yellow-50 dark:from-yellow-950 dark:to-yellow-900/50",
    accent: "text-yellow-500 dark:text-yellow-300",
  },
  teppe: {
    icon: Circle,
    gradient: "from-purple-100 to-purple-50 dark:from-purple-950 dark:to-purple-900/50",
    accent: "text-purple-400 dark:text-purple-300",
  },
  pute: {
    icon: Square,
    gradient: "from-pink-100 to-pink-50 dark:from-pink-950 dark:to-pink-900/50",
    accent: "text-pink-400 dark:text-pink-300",
  },
  dekor: {
    icon: Flower2,
    gradient: "from-rose-100 to-rose-50 dark:from-rose-950 dark:to-rose-900/50",
    accent: "text-rose-400 dark:text-rose-300",
  },
  hylle: {
    icon: BookOpen,
    gradient: "from-orange-100 to-orange-50 dark:from-orange-950 dark:to-orange-900/50",
    accent: "text-orange-400 dark:text-orange-300",
  },
  seng: {
    icon: Bed,
    gradient: "from-indigo-100 to-indigo-50 dark:from-indigo-950 dark:to-indigo-900/50",
    accent: "text-indigo-400 dark:text-indigo-300",
  },
  kommode: {
    icon: Archive,
    gradient: "from-teal-100 to-teal-50 dark:from-teal-950 dark:to-teal-900/50",
    accent: "text-teal-400 dark:text-teal-300",
  },
  gardin: {
    icon: Square,
    gradient: "from-cyan-100 to-cyan-50 dark:from-cyan-950 dark:to-cyan-900/50",
    accent: "text-cyan-400 dark:text-cyan-300",
  },
  speil: {
    icon: Circle,
    gradient: "from-sky-100 to-sky-50 dark:from-sky-950 dark:to-sky-900/50",
    accent: "text-sky-400 dark:text-sky-300",
  },
};

const defaultConfig = {
  icon: Square,
  gradient: "from-gray-100 to-gray-50 dark:from-gray-950 dark:to-gray-900/50",
  accent: "text-gray-400 dark:text-gray-300",
};

interface ProductImageProps {
  category: string;
  brand: string;
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

export default function ProductImage({
  category,
  brand,
  className,
  iconSize = "md",
}: ProductImageProps) {
  const config = categoryConfig[category] ?? defaultConfig;
  const Icon = config.icon;
  const brandInitial = brand.charAt(0).toUpperCase();

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        config.gradient,
        className
      )}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id={`grid-${category}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#grid-${category})`} />
        </svg>
      </div>

      {/* Brand initial badge */}
      <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/60 dark:bg-black/30 text-[10px] font-bold text-foreground/50">
        {brandInitial}
      </div>

      {/* Category icon */}
      <Icon
        className={cn(
          iconSizes[iconSize],
          config.accent,
          "opacity-60 transition-transform group-hover:scale-110"
        )}
        strokeWidth={1.5}
      />
    </div>
  );
}
