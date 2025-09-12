"use client";

import { useFilmInfo } from "@/lib/queries/useFilmInfo";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Loader2, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function MovieInfoPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: filmInfo, isLoading: isLoadingFilmInfo } = useFilmInfo(slug);
  const router = useRouter();
  const [isImageLoading, setIsImageLoading] = useState(true);
  return (
    <div className="flex flex-col gap-4 w-full px-8 pb-6">
      {isLoadingFilmInfo ? (
        <div className="text-zinc-600 dark:text-white flex justify-center items-center h-[calc(100vh-64px-100px-64px)]">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 h-[calc(100vh-64px-100px-64px)]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{filmInfo?.data.item.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-4">
            <div className="text-zinc-600 dark:text-white flex flex-col gap-2 w-[40%] p-8">
              <Label className="text-4xl/snug font-semibold mb-2">
                {filmInfo?.data.item.name}
              </Label>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    <div className="px-1 py-0.5 bg-orange-500 font-semibold text-white">
                      Năm
                    </div>
                    <Label className="text-zinc-600 dark:text-white">
                      {filmInfo?.data.item.year}
                    </Label>
                  </div>

                  <div className="px-1 py-0.5 bg-green-500 font-semibold text-white">
                    {filmInfo?.data.item.quality}
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="size-4" />
                    <Label>{filmInfo?.data.item.imdb?.vote_average}</Label>
                  </div>
                  <Label>
                    {filmInfo?.data.item.country
                      .map((country) => country.name)
                      .join(", ")}
                  </Label>
                  <Label>•</Label>
                  <Label>{filmInfo?.data.item.lang}</Label>
                </div>
                <div className="flex gap-2">
                  <Label className="whitespace-nowrap text-zinc-400">
                    Đạo diễn:
                  </Label>
                  <Label className="text-zinc-600 dark:text-white">
                    {filmInfo?.data.item.director
                      .map((director) => director)
                      .join(", ")}
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Label className="whitespace-nowrap text-zinc-400">
                    Diễn viên:
                  </Label>
                  <Label className="text-zinc-600 dark:text-white">
                    {filmInfo?.data.item.actor.map((actor) => actor).join(", ")}
                  </Label>
                </div>

                <div className="flex gap-2 items-start">
                  <Label className="whitespace-nowrap text-zinc-400">
                    Nội dung:
                  </Label>
                  <Label
                    className="tracking-wider leading-snug text-justify text-zinc-600 dark:text-white"
                    dangerouslySetInnerHTML={{
                      __html: filmInfo?.data.item.content ?? "",
                    }}
                  />
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={() => {
                    router.push(`/movie/${filmInfo?.data.item.slug}/view`);
                  }}
                  className="bg-green-500 text-white hover:bg-green-500 font-semibold hover:scale-105 transition-all cursor-pointer"
                >
                  <Play className="size-4" />
                  Xem phim
                </Button>
              </div>
            </div>
            <div className="relative aspect-[16/9] w-[60%] overflow-hidden h-[calc(100vh-64px-100px)] rounded-md">
              {isImageLoading && <Skeleton className="absolute inset-0" />}
              <Image
                src={`${filmInfo?.data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${filmInfo?.data.item.poster_url}`}
                alt={filmInfo?.data.item.name ?? ""}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                onLoad={() => setIsImageLoading(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
