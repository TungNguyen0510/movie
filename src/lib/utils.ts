import { LIST_CATEGORY_MOVIE } from "@/constants";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getColor(slug: string) {
  const category = LIST_CATEGORY_MOVIE.find((c) => c.slug === slug);
  return category?.color;
}