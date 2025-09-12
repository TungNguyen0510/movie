"use client";

import { useMovieList } from "@/lib/queries/useMovieList";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Label } from "./ui/label";
import { getColor } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2, Play } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const { data: movieList, isLoading } = useMovieList("phim-chieu-rap", {
    page: 1,
    limit: 10,
    sort_field: "modified.time",
    sort_type: "desc",
  });

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full flex justify-center">
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
            <div className="flex justify-center items-center w-full h-[calc(100vh-64px)]">
              <Loader2 className="size-8 animate-spin" />
            </div>
          ) : (
            movieList?.data.items.map((movie) => (
              <CarouselItem key={movie._id} className="w-full pl-0 select-none">
                <div className="relative h-[calc(100vh-64px-64px)] w-full overflow-hidden">
                  <Image
                    src={`${movieList.data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movie.poster_url}`}
                    alt={movie.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-1/3 left-4 md:left-12 right-4 text-white font-bold flex flex-col gap-2">
                    <Label className="text-3xl/snug font-semibold line-clamp-3 mb-2">
                      {movie.name}
                    </Label>
                    <div className="flex items-center gap-2 text-sm">
                      <Label>{movie.year}</Label>
                      <Label>•</Label>
                      <Label>{movie.time}</Label>
                      <Label>•</Label>
                      <div className="px-1 py-0.5 bg-green-500 font-semibold text-white">
                        {movie.quality}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {movie.category.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center gap-2"
                        >
                          <Label
                            className="w-fit text-xs bg-white/20 px-2 py-1 rounded"
                            style={{ backgroundColor: getColor(category.slug) }}
                          >
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Link href={`/movie/${movie.slug}`}>
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
      </Carousel>
    </div>
  );
}
