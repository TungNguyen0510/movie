"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api";
import { Category } from "@/types";

export function useCategory() {
  return useQuery<Category[], Error>({
    queryKey: ["movie", "the-loai"],
    queryFn: fetchCategories,
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}


