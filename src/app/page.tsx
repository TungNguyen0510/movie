import HeroSection from "@/components/hero-section";
import MovieList from "@/components/movie-list";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 w-full px-8 pb-6">
      <HeroSection />

      <MovieList slug="phim-chieu-rap" label="Phim Chiếu Rạp" />
      <MovieList slug="phim-le" label="Phim Lẻ" />
      <MovieList slug="phim-bo" label="Phim Bộ" />
      <MovieList slug="hoat-hinh" label="Phim Hoạt Hình" />
    </div>
  );
}
