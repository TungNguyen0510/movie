"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieList } from "@/lib/api";
import { MovieListResponse, MovieListParams } from "@/types";

export function useMovieList(slug: string = "phim-moi", params: MovieListParams = {}) {
  return useQuery<MovieListResponse, Error>({
    queryKey: ["movie", "danh-sach", slug, params],
    queryFn: () => fetchMovieList(slug, params),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
