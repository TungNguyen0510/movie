import { useQuery } from "@tanstack/react-query";
import { fetchMovieInfo } from "../api";

export function useMovieInfo(slug: string) {
  return useQuery({
    queryKey: ["movie", slug],
    queryFn: () => fetchMovieInfo(slug),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
