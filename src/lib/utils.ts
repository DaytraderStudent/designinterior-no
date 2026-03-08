import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNOK(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " kr"
}
