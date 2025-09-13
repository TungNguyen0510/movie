import { useQuery } from "@tanstack/react-query";
import { fetchMovieImages } from "../api";

export function useMovieImages(slug: string) {
  return useQuery({
    queryKey: ["movie", "images", slug],
    queryFn: () => fetchMovieImages(slug),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
