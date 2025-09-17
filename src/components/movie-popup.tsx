"use client";

import { SquareArrowOutUpLeft, X } from "lucide-react";
import { useMoviePopup } from "@/components/provider/movie-popup-provider";
import { useRouter } from "next/navigation";
import MovieEmbed from "./movie-embed";
import { Draggable } from "./draggable";
import { Resizable } from "re-resizable";

export default function MoviePopup() {
  const router = useRouter();

  const { isPopupVisible, movieInfo, hidePopup } = useMoviePopup();

  const handleMovieClick = () => {
    if (movieInfo) {
      sessionStorage.removeItem("currentMovieInfo");
      router.push(`/phim/${movieInfo.movieSlug}/xem-phim`);
    }
  };

  if (!isPopupVisible || !movieInfo) return null;

  return (
    <Draggable>
      <Resizable
        defaultSize={{
          width: 400,
          height: 288,
        }}
        minWidth={400}
        maxWidth={940}
        minHeight={288}
        maxHeight={677}
        snap={{
          x: [400, 460, 520, 580, 640, 700, 760, 820, 880, 940],
          y: [288, 331, 374, 418, 461, 504, 547, 590, 634, 677],
        }}
        resizeRatio={0.72}
        lockAspectRatio
        enable={{
          left: true,
        }}
        className="bg-black border border-gray-600 rounded-md shadow-2xl transition-all h-full w-full duration-300 py-2"
      >
        <div className="h-full w-full">
          <div
            data-no-drag="true"
            className="relative w-full h-[calc(100%-32px)] cursor-pointer group"
          >
            <div className="absolute top-1 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <SquareArrowOutUpLeft
                className="size-6"
                onClick={handleMovieClick}
              />
              <X onClick={hidePopup} className="size-6" />
            </div>
            <MovieEmbed url={movieInfo.url} />
          </div>
          <div className="flex items-center justify-between p-2 select-none">
            <div className="flex items-end gap-2 text-white text-sm truncate">
              <span className="font-medium truncate">{movieInfo.title}</span>
              <span className="text-gray-400 text-xs">
                {movieInfo.serverName} - {movieInfo.episodeName}
              </span>
            </div>
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
}
