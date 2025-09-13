"use client";

import { useSearchParams } from "next/navigation";
import SearchMovieList from "@/components/search-movie-list";
import { Suspense } from "react";
import { Home, Loader2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

  return (
    <div className="flex flex-col gap-4 mt-16">
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
            <BreadcrumbPage>Tìm kiếm</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>từ khóa &quot;{keyword}&quot;</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SearchMovieList keyword={keyword} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <Loader2 className="size-8 animate-spin" />
          </div>
        }
      >
        <SearchContent />
      </Suspense>
    </div>
  );
}
