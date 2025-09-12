import { useQuery } from "@tanstack/react-query";
import { fetchFilmInfo } from "../api";

export function useFilmInfo(slug: string) {
  return useQuery({
    queryKey: ["film", slug],
    queryFn: () => fetchFilmInfo(slug),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
