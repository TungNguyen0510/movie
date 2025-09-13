"use client";

import { useMovieInfo } from "@/lib/queries/userMovieInfo";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Home, Loader2, Play, Star } from "lucide-react";
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
import { getEpisodeColor, hasEmbedLink, toYoutubeEmbedUrl } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MovieEmbed from "@/components/movie-embed";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMovieActors } from "@/lib/queries/useMovieActors";
import { useMovieImages } from "@/lib/queries/useMovieImages";
import { useMovieKeywords } from "@/lib/queries/useMovieKeywords";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MovieInfoPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: movieInfo, isLoading: isLoadingMovieInfo } = useMovieInfo(slug);
  const { data: movieActors, isLoading: isLoadingMovieActors } =
    useMovieActors(slug);
  const { data: movieImages, isLoading: isLoadingMovieImages } =
    useMovieImages(slug);
  const { data: movieKeywords, isLoading: isLoadingMovieKeywords } =
    useMovieKeywords(slug);
  const router = useRouter();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const movieInfoItem = useMemo(() => {
    return movieInfo?.data.item;
  }, [movieInfo?.data.item]);
  return (
    <div className="flex flex-col gap-8 w-full px-8 pb-6 mt-16">
      {isLoadingMovieInfo ? (
        <div className="text-zinc-600 dark:text-white flex justify-center items-center h-[calc(100vh-64px-100px-64px)]">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-8 min-h-[calc(100vh-64px-100px-64px)]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex gap-1">
                  <Home className="size-4" />
                  Trang chủ
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{movieInfoItem?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col xl:flex-row gap-4">
            <div className="relative aspect-[3/4] w-full min-w-[300px] max-h-[400px] xl:max-w-[400px] overflow-hidden rounded-md">
              {isImageLoading && <Skeleton className="absolute inset-0" />}
              <Image
                src={`${movieInfo?.data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movieInfoItem?.poster_url}`}
                alt={movieInfoItem?.name || ""}
                fill
                priority
                quality={100}
                className="object-cover"
                sizes="100vw"
                unoptimized={false}
                onLoad={() => setIsImageLoading(false)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2">
                {movieInfoItem?.status != "trailer" &&
                  hasEmbedLink(movieInfoItem?.episodes || []) && (
                    <Button
                      onClick={() => {
                        router.push(`/phim/${movieInfoItem?.slug}/xem-phim`);
                      }}
                      className="bg-green-500 text-white hover:bg-green-600 font-semibold hover:scale-105 transition-all cursor-pointer"
                    >
                      <Play className="size-4" />
                      Xem ngay
                    </Button>
                  )}

                {movieInfoItem?.trailer_url && (
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
                        {movieInfoItem?.name} Trailer
                      </DialogTitle>
                      <div className="relative aspect-[16/9] w-full overflow-hidden md:h-[40vh] xl:h-[60vh]">
                        <MovieEmbed
                          url={toYoutubeEmbedUrl(movieInfoItem?.trailer_url)}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <Label className="text-2xl/tight lg:text-4xl/tight font-semibold">
                  {movieInfoItem?.name}
                </Label>
                <Label className="text-lg/tight lg:text-xl/tight font-semibold mb-2 text-zinc-400">
                  {movieInfoItem?.origin_name}
                </Label>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  <Label className="px-2 py-1 bg-orange-500 font-semibold text-white rounded">
                    Năm
                  </Label>
                  <Label className="text-zinc-600 dark:text-white">
                    {movieInfoItem?.year}
                  </Label>
                </div>

                <Label className="px-2 py-1 bg-blue-500 font-semibold text-white rounded">
                  {movieInfoItem?.quality}
                </Label>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="size-4" />
                    <Label>{movieInfoItem?.imdb?.vote_average}</Label>
                  </div>
                  <Label>•</Label>
                  <Label>
                    {movieInfoItem?.country
                      .map((country) => country.name)
                      .join(", ")}
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Label>{movieInfoItem?.time}</Label>
                  <Label>•</Label>
                  <Label
                    style={{
                      backgroundColor: getEpisodeColor(
                        movieInfoItem?.episode_current || ""
                      ),
                    }}
                    className="py-1 px-2 font-semibold rounded"
                  >
                    {movieInfoItem?.episode_current}
                  </Label>
                  <Label>•</Label>
                  {movieInfoItem?.sub_docquyen ? (
                    <Label className="py-1 px-2 bg-amber-400 font-semibold rounded">
                      VietSub Độc Quyền
                    </Label>
                  ) : (
                    <Label className="py-1 px-2 bg-sky-300 font-semibold rounded">
                      {movieInfoItem?.lang}
                    </Label>
                  )}
                </div>

                <div className="flex gap-2">
                  <Label className="whitespace-nowrap text-zinc-400">
                    Đạo diễn:
                  </Label>
                  <Label className="text-zinc-600 dark:text-white">
                    {movieInfoItem?.director
                      .map((director) => director)
                      .join(", ") || "Không rõ"}
                  </Label>
                </div>

                {movieActors?.data.peoples &&
                  movieActors?.data.peoples.length > 0 && (
                    <Carousel
                      opts={{
                        align: "start",
                        loop: false,
                      }}
                      className="w-full xl:max-w-[calc(100vw-400px-128px)] 2xl:max-w-[calc(100vw-400px)] h-40"
                    >
                      <CarouselContent className="-ml-0">
                        {isLoadingMovieActors ? (
                          <div className="flex justify-center items-center w-full h-full">
                            <Loader2 className="size-8 animate-spin" />
                          </div>
                        ) : (
                          movieActors?.data.peoples.map((actor) => (
                            <CarouselItem
                              key={actor.tmdb_people_id}
                              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/5 2xl:basis-1/6 pl-2 select-none"
                            >
                              <Card className="p-2">
                                <CardContent className="flex flex-col gap-2 items-center">
                                  <Avatar className="size-16">
                                    <AvatarImage
                                      src={`${movieActors?.data.profile_sizes.original}${actor.profile_path}`}
                                      alt={actor.name}
                                    />
                                    <AvatarFallback className="flex items-center justify-center text-[0.5rem]">
                                      {actor.name}
                                    </AvatarFallback>
                                  </Avatar>
                                  <Label className="text-nowrap">
                                    {actor.name}
                                  </Label>
                                  <Label className="text-xs text-zinc-400 text-nowrap">
                                    {actor.original_name}
                                  </Label>
                                  <Label className="text-[0.6rem] text-zinc-400">
                                    {actor.known_for_department}
                                  </Label>
                                </CardContent>
                              </Card>
                            </CarouselItem>
                          ))
                        )}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-8 border-t-1 border-white">
            <div className="flex flex-col gap-4">
              <Label className="whitespace-nowrap text-2xl">
                Nội dung phim
              </Label>
              <Label
                className="tracking-wider leading-snug text-justify text-zinc-300"
                dangerouslySetInnerHTML={{
                  __html: movieInfoItem?.content ?? "",
                }}
              />
            </div>
            {!isLoadingMovieKeywords && (
              <div className="flex flex-col gap-4">
                <Label className="whitespace-nowrap text-2xl">
                  Từ khóa <Label>({movieKeywords?.data.keywords.length})</Label>
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {movieKeywords?.data.keywords.map((keyword) => (
                    <Card key={keyword.tmdb_keyword_id} className="p-2">
                      <CardContent>
                        <Label>{keyword.name_vn}</Label>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <Label className="whitespace-nowrap text-2xl">
                Hình ảnh{" "}
                <Label>
                  (
                  {movieImages?.data.images
                    ? movieImages?.data.images.length
                    : "0"}
                  )
                </Label>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row-dense gap-4">
                {isLoadingMovieImages ? (
                  <div className="flex justify-center items-center w-full h-full">
                    <Loader2 className="size-8 animate-spin" />
                  </div>
                ) : (
                  movieImages?.data.images &&
                  movieImages?.data.images.map((image) => (
                    <Image
                      key={image.file_path}
                      src={`${movieImages?.data.image_sizes.backdrop.w1280}/${image.file_path}`}
                      alt={image.file_path || ""}
                      width={780}
                      height={500}
                      priority
                      quality={100}
                      className="object-cover max-h-[500px]"
                      unoptimized={false}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
