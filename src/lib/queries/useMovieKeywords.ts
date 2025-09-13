import { useQuery } from "@tanstack/react-query";
import { fetchMovieKeywords } from "../api";

export function useMovieKeywords(slug: string) {
  return useQuery({
    queryKey: ["movie", "keywords", slug],
    queryFn: () => fetchMovieKeywords(slug),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
