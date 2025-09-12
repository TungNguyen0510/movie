"use client";

import { useMovieList } from "@/lib/queries/useMovieList";
import MovieCard from "./movie-card";
import { Label } from "./ui/label";
import { ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { MovieListParams } from "@/types";

export default function MovieList({
  slug,
  label,
  params = {
    page: 1,
    limit: 24,
    sort_field: "modified.time",
    sort_type: "desc",
    year: new Date().getFullYear(),
  },
}: {
  slug: string;
  label?: string;
  params?: MovieListParams;
}) {
  const { data: movieList, isLoading } = useMovieList(slug, {
    ...params,
  });
  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {label && (
            <Link
              href={`/list/${slug}`}
              className="flex items-center justify-start hover:text-green-500 cursor-pointer hover:underline w-fit"
            >
              <Label className="text-2xl font-bold">{label}</Label>
              <ChevronRight className="size-6 mt-2" />
            </Link>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
            {movieList?.data.items.map((movie) => (
              <MovieCard key={movie._id} {...movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
