"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNations } from "@/lib/api";
import { Nation } from "@/types";

export function useNation() {
  return useQuery<Nation[], Error>({
    queryKey: ["movie", "quoc-gia"],
    queryFn: fetchNations,
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}


