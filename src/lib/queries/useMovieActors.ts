import { useQuery } from "@tanstack/react-query";
import { fetchMovieActors } from "../api";

export function useMovieActors(slug: string) {
  return useQuery({
    queryKey: ["movie", "actors", slug],
    queryFn: () => fetchMovieActors(slug),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
