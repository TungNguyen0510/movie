export default function MovieEmbed({ url }: { url?: string | null }) {
  if (!url) return null;
  return <iframe src={url} allowFullScreen className="w-full h-full"></iframe>;
}
