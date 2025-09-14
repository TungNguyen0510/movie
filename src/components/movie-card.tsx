import { Movie } from "@/types";
import Image from "next/image";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { getEpisodeColor } from "@/lib/utils";

export default function MovieCard(movie: Movie) {
  const router = useRouter();
  const [isImageLoading, setIsImageLoading] = useState(true);
  return (
    <div
      className="group cursor-pointer transition-transform hover:scale-x-105"
      onClick={() => {
        router.push(`/phim/${movie.slug}`);
      }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
        {isImageLoading && <Skeleton className="absolute inset-0" />}
        <Image
          src={`https://${process.env.NEXT_PUBLIC_IMAGE_HOSTNAME1}/uploads/movies/${movie.thumb_url}`}
          alt={movie.name}
          fill
          priority
          onLoad={() => setIsImageLoading(false)}
          className={`object-cover transition-transform group-hover:scale-110 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 12vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-2 text-white">
          <Label className="text-base font-medium line-clamp-3">
            {movie.name}
          </Label>
          <div className="flex flex-wrap items-center gap-0.5">
            <Label className="p-0.5 rounded text-[0.6rem] bg-zinc-400">
              {movie.time}
            </Label>
            <Label
              style={{
                backgroundColor: getEpisodeColor(movie.episode_current),
              }}
              className="p-0.5 rounded text-[0.6rem]"
            >
              {movie.episode_current}
            </Label>
            {movie.sub_docquyen ? (
              <Label className="p-0.5 bg-amber-400 rounded text-[0.6rem]">
                VietSub Độc Quyền
              </Label>
            ) : (
              <Label className="p-0.5 bg-sky-300 rounded text-[0.6rem]">
                {movie.lang}
              </Label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
