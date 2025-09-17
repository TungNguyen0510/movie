"use client";

import { useMovieList } from "@/lib/queries/useMovieList";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Label } from "./ui/label";
import { getCategoryColor, getEpisodeColor } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2, Play } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const { data: movieList, isLoading } = useMovieList("danh-sach", "phim-moi", {
    page: 1,
    limit: 24,
    sort_field: "modified.time",
    sort_type: "desc",
  });

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="flex justify-center overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-screen">
              <Loader2 className="size-8 animate-spin" />
            </div>
          ) : (
            movieList?.data.items.map((movie) => (
              <CarouselItem key={movie._id} className="w-full pl-0 select-none">
                <div className="relative h-screen w-full overflow-hidden">
                  <Image
                    src={`${movieList.data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movie.poster_url}`}
                    alt={movie.name}
                    fill
                    priority
                    quality={100}
                    className="object-cover w-auto h-auto"
                    sizes="100vw"
                    unoptimized={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-black/100 via-transparent to-transparent" />

                  <div className="absolute top-1/4 left-20 right-4 text-white font-semibold flex flex-col gap-2">
                    <Label className="text-2xl/snug md:text-4xl/snug font-semibold line-clamp-3">
                      {movie.name}
                    </Label>
                    <Label className="text-base md:text-lg/snug font-light line-clamp-3 mb-2 text-amber-300">
                      {movie.origin_name}
                    </Label>
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-base">
                      <Label>{movie.year}</Label>
                      <Label>•</Label>
                      <Label>
                        {movie.country
                          .map((country) => country.name)
                          .join(", ")}
                      </Label>
                      <Label>•</Label>

                      <Label className="px-2 py-1 bg-blue-500 font-semibold text-white rounded">
                        {movie.quality}
                      </Label>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-base">
                      <Label>{movie.time}</Label>
                      <Label>•</Label>
                      <Label
                        style={{
                          backgroundColor: getEpisodeColor(
                            movie.episode_current
                          ),
                        }}
                        className="py-1 px-2 font-semibold rounded"
                      >
                        {movie.episode_current}
                      </Label>
                      <Label>•</Label>
                      {movie.sub_docquyen ? (
                        <Label className="py-1 px-2 bg-amber-400 font-semibold rounded">
                          VietSub Độc Quyền
                        </Label>
                      ) : (
                        <Label className="py-1 px-2 bg-sky-300 font-semibold rounded">
                          {movie.lang}
                        </Label>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {movie.category.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center gap-2"
                        >
                          <Label
                            className="w-fit text-xs bg-white/20 px-2 py-1 rounded"
                            style={{
                              backgroundColor: getCategoryColor(category.slug),
                            }}
                          >
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Link href={`/phim/${movie.slug}`}>
                        <Button className="size-20 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer">
                          <Play className="size-8 text-white" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
