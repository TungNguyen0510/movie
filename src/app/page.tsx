import HeroSection from "@/components/hero-section";
import MovieListSection from "@/components/movie-list-section";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 w-full">
      <HeroSection />

      <div className="flex flex-col gap-12 px-8 pb-6 -mt-40 z-10">
        <MovieListSection slug="phim-chieu-rap" label="Phim Chiếu Rạp" />
        <MovieListSection slug="phim-le" label="Phim Lẻ" />
        <MovieListSection slug="phim-bo" label="Phim Bộ" />
        <MovieListSection slug="hoat-hinh" label="Phim Hoạt Hình" />
        <MovieListSection slug="tv-shows" label="TV Shows" />
      </div>
    </div>
  );
}
