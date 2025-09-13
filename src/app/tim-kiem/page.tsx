"use client";

import { useSearchParams } from "next/navigation";
import SearchMovieList from "@/components/search-movie-list";
import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  if (!keyword) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Tìm kiếm phim</h1>
          <p className="text-muted-foreground">
            Nhập từ khóa vào ô tìm kiếm để bắt đầu
          </p>
        </div>
      </div>
    );
  }

  return <SearchMovieList keyword={keyword} />;
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <SearchContent />
      </Suspense>
    </div>
  );
}
