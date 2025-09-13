"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieList } from "@/lib/api";
import { MovieListResponse, MovieListParams } from "@/types";

export function useMovieList(
  slug1: string,
  slug2: string = "phim-moi",
  params: MovieListParams = {}
) {
  return useQuery<MovieListResponse, Error>({
    queryKey: ["movie", slug1, slug2, params],
    queryFn: () => fetchMovieList(slug1, slug2, params),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
