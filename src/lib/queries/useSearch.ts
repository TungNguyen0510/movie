"use client";

import { useQuery } from "@tanstack/react-query";
import { searchKeyword } from "@/lib/api";
import { MovieListResponse, MovieListParams } from "@/types";

export function useSearch(keyword: string, params: MovieListParams = {}) {
  return useQuery<MovieListResponse, Error>({
    queryKey: ["movie", "tim-kiem", keyword, params],
    queryFn: () => searchKeyword(keyword, params),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
