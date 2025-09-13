import { EPISODE_COLOR_PREFIX, LIST_CATEGORY_MOVIE } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategoryColor(slug: string) {
  const category = LIST_CATEGORY_MOVIE.find((c) => c.slug === slug);
  return category?.color;
}

export function getEpisodeColor(episode_current: string): string | undefined {
  const rules: { prefix: string; color: string }[] = EPISODE_COLOR_PREFIX;

  const rule = rules.find((r) => episode_current.startsWith(r.prefix));
  return rule?.color;
}

export function toYoutubeEmbedUrl(url: string): string {
  return url.replace("watch?v=", "embed/");
}
