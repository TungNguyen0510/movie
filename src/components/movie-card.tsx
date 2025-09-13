import { Movie } from "@/types";
import Image from "next/image";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

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
          className={`object-cover transition-transform group-hover:scale-x-110 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 12vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 left-2 right-2 text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
          <Label className="text-base font-medium line-clamp-2">
            {movie.name}
          </Label>
        </div>
      </div>
    </div>
  );
}
