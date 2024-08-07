import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortText(text: string ): string {
  return text.charAt(0).toUpperCase() + text.charAt(text.length - 1).toUpperCase();
}