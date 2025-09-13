"use client";

import MovieEmbed from "@/components/movie-embed";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFilmInfo } from "@/lib/queries/useFilmInfo";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function MovieWatchPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: filmInfo, isLoading: isLoadingFilmInfo } = useFilmInfo(slug);
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);

  useEffect(() => {
    setSelectedServerIndex(0);
    setSelectedEpisodeIndex(0);
  }, [slug, filmInfo?.data.item.episodes]);

  const filmInfoItem = useMemo(() => {
    return filmInfo?.data.item;
  }, [filmInfo?.data.item]);

  const currentEmbedUrl = useMemo(() => {
    const servers = filmInfoItem?.episodes;
    if (!servers || servers.length === 0) return "";
    const server = servers[selectedServerIndex];
    const serverEpisodes = server?.server_data ?? [];
    const current = serverEpisodes[selectedEpisodeIndex];
    return current?.link_embed ?? "";
  }, [filmInfoItem?.episodes, selectedServerIndex, selectedEpisodeIndex]);

  return (
    <div className="flex flex-col gap-4 w-full px-8 pb-6">
      {isLoadingFilmInfo ? (
        <div className="text-zinc-600 dark:text-white flex justify-center items-center h-[calc(100vh-64px-100px)]">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/phim/${filmInfoItem?.slug}`}>
                  {filmInfoItem?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Xem phim</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="relative aspect-[16/9] w-full overflow-hidden h-[calc(100vh-64px-100px)]">
            <MovieEmbed url={currentEmbedUrl} />
          </div>
          <div className="flex gap-2 px-4 flex-wrap">
            {filmInfoItem?.episodes?.map((server, serverIdx) => {
              const isActive = serverIdx === selectedServerIndex;
              return (
                <Button
                  key={server.server_name}
                  onClick={() => {
                    setSelectedServerIndex(serverIdx);
                    setSelectedEpisodeIndex(0);
                  }}
                  className={
                    "font-semibold transition-all cursor-pointer " +
                    (isActive
                      ? "bg-green-600 text-white hover:bg-green-600"
                      : "bg-green-500 text-white hover:bg-green-500/90")
                  }
                >
                  <Label>{server.server_name}</Label>
                </Button>
              );
            })}
          </div>

          {(filmInfoItem?.episodes?.[selectedServerIndex]?.server_data
            ?.length ?? 2) > 1 && (
            <Label className="px-4">Danh sách tập:</Label>
          )}
          <div className="flex gap-2 px-4 flex-wrap">
            {(filmInfoItem?.episodes?.[selectedServerIndex]?.server_data
              ?.length ?? 2) > 1 &&
              filmInfoItem?.episodes?.[selectedServerIndex]?.server_data?.map(
                (ep, epIdx) => {
                  const isActive = epIdx === selectedEpisodeIndex;
                  return (
                    <Button
                      variant="outline"
                      key={`${ep.slug}-${epIdx}`}
                      onClick={() => setSelectedEpisodeIndex(epIdx)}
                      className={
                        "transition-all cursor-pointer px-3 " +
                        (isActive
                          ? "bg-blue-500 dark:bg-blue-500 text-white dark:text-white hover:scale-105"
                          : "hover:scale-105")
                      }
                      size="sm"
                    >
                      {ep.name}
                    </Button>
                  );
                }
              )}
          </div>
        </>
      )}
    </div>
  );
}
