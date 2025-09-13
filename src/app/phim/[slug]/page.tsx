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
import { useMemo, useState } from "react";
import { getEpisodeColor, toYoutubeEmbedUrl } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import MovieEmbed from "@/components/movie-embed";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export default function MovieInfoPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: filmInfo, isLoading: isLoadingFilmInfo } = useFilmInfo(slug);
  const router = useRouter();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const filmInfoItem = useMemo(() => {
    return filmInfo?.data.item;
  }, [filmInfo?.data.item]);
  return (
    <div className="flex flex-col gap-4 w-full px-8 pb-6">
      {isLoadingFilmInfo ? (
        <div className="text-zinc-600 dark:text-white flex justify-center items-center h-[calc(100vh-64px-100px-64px)]">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 min-h-[calc(100vh-64px-100px-64px)]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{filmInfoItem?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="text-zinc-600 dark:text-white flex flex-col gap-2 w-full md:w-[40%] p-2 lg:p-8">
              <Label className="text-2xl/tight lg:text-4xl/tight font-semibold">
                {filmInfoItem?.name}
              </Label>
              <Label className="text-lg/tight lg:text-xl/tight font-semibold mb-2 text-zinc-400">
                {filmInfoItem?.origin_name}
              </Label>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    <Label className="px-2 py-1 bg-orange-500 font-semibold text-white rounded">
                      Năm
                    </Label>
                    <Label className="text-zinc-600 dark:text-white">
                      {filmInfoItem?.year}
                    </Label>
                  </div>

                  <Label className="px-2 py-1 bg-blue-500 font-semibold text-white rounded">
                    {filmInfoItem?.quality}
                  </Label>
                </div>

                <div className="flex gap-2">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="size-4" />
                    <Label>{filmInfoItem?.imdb?.vote_average}</Label>
                  </div>
                  <Label>•</Label>
                  <Label>
                    {filmInfoItem?.country
                      .map((country) => country.name)
                      .join(", ")}
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Label>{filmInfoItem?.time}</Label>
                  <Label>•</Label>
                  <Label
                    style={{
                      backgroundColor: getEpisodeColor(
                        filmInfoItem?.episode_current || ""
                      ),
                    }}
                    className="py-1 px-2 font-semibold rounded"
                  >
                    {filmInfoItem?.episode_current}
                  </Label>
                  <Label>•</Label>
                  {filmInfoItem?.sub_docquyen ? (
                    <Label className="py-1 px-2 bg-amber-400 font-semibold rounded">
                      VietSub Độc Quyền
                    </Label>
                  ) : (
                    <Label className="py-1 px-2 bg-sky-300 font-semibold rounded">
                      {filmInfoItem?.lang}
                    </Label>
                  )}
                </div>

                <div className="flex gap-2">
                  <Label className="whitespace-nowrap text-zinc-400">
                    Đạo diễn:
                  </Label>
                  <Label className="text-zinc-600 dark:text-white">
                    {filmInfoItem?.director
                      .map((director) => director)
                      .join(", ") || "Không rõ"}
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Label className="whitespace-nowrap text-zinc-400">
                    Diễn viên:
                  </Label>
                  <Label className="text-zinc-600 dark:text-white">
                    {filmInfoItem?.actor.map((actor) => actor).join(", ") ||
                      "Không rõ"}
                  </Label>
                </div>

                <div className="flex gap-2 items-start">
                  <Label className="whitespace-nowrap text-zinc-400">
                    Nội dung:
                  </Label>
                  <Label
                    className="tracking-wider leading-snug text-justify text-zinc-600 dark:text-white"
                    dangerouslySetInnerHTML={{
                      __html: filmInfoItem?.content ?? "",
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                {filmInfoItem?.status != "trailer" && (
                  <Button
                    onClick={() => {
                      router.push(`/phim/${filmInfoItem?.slug}/xem-phim`);
                    }}
                    className="bg-green-500 text-white hover:bg-green-600 font-semibold hover:scale-105 transition-all cursor-pointer"
                  >
                    <Play className="size-4" />
                    Xem phim ngay
                  </Button>
                )}

                {filmInfoItem?.trailer_url && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-400 text-white hover:bg-orange-500 font-semibold hover:scale-105 transition-all cursor-pointer">
                        <Play className="size-4" />
                        Xem trailer
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="p-4 md:w-[80vw] xl:w-[60vw] md:h-[50vh] xl:h-[70vh]"
                      showCloseButton={true}
                    >
                      <DialogTitle className="line-clamp-2">
                        {filmInfoItem?.name} Trailer
                      </DialogTitle>
                      <div className="relative aspect-[16/9] w-full overflow-hidden md:h-[40vh] xl:h-[60vh]">
                        <MovieEmbed
                          url={toYoutubeEmbedUrl(filmInfoItem?.trailer_url)}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
            <div className="relative aspect-[16/9] w-full md:w-[60%] overflow-hidden h-[calc(100vh-64px-100px)] rounded-md">
              {isImageLoading && <Skeleton className="absolute inset-0" />}
              <Image
                src={`${filmInfo?.data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${filmInfoItem?.poster_url}`}
                alt={filmInfoItem?.name ?? ""}
                fill
                priority
                quality={100}
                sizes="100vw"
                unoptimized={false}
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
