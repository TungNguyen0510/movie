"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchReleaseYears } from "@/lib/api";
import { ReleaseYear } from "@/types"; 

export function useReleaseYear() {
  return useQuery<ReleaseYear[], Error>({
    queryKey: ["movie", "nam-phat-hanh"],
    queryFn: fetchReleaseYears,
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
