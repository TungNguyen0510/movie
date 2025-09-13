"use client";

import MovieCard from "@/components/movie-card";
import { useMovieList } from "@/lib/queries/useMovieList";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SORT_FIELD, SORT_TYPE } from "@/types";
import { Home } from "lucide-react";

export default function ListMoviePage() {
  const { slug1, slug2 } = useParams<{ slug1: string; slug2: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page, 10));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);

  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!, 10)
    : 24;
  const sortField =
    (searchParams.get("sort_field") as SORT_FIELD) || "modified.time";
  const sortType = (searchParams.get("sort_type") as SORT_TYPE) || "desc";

  const { data: movieList } = useMovieList(slug1, slug2, {
    page: currentPage,
    limit,
    sort_field: sortField,
    sort_type: sortType,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    router.push(`/${slug1}/${slug2}?${newSearchParams.toString()}`);
  };

  const pagination = movieList?.data.params.pagination;

  const pageNumbers = useMemo(() => {
    if (!pagination) return [] as number[];
    const totalPages = Math.ceil(
      pagination.totalItems / pagination.totalItemsPerPage
    );
    const current = pagination.currentPage;
    const pages: number[] = [];

    pages.push(1);

    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);

    for (let p = start; p <= end; p++) pages.push(p);

    if (totalPages > 1) pages.push(totalPages);

    return Array.from(new Set(pages)).sort((a, b) => a - b);
  }, [pagination]);

  return (
    <div className="flex flex-col gap-4 w-full px-8 pb-6">
      <div className="flex justify-between">
        {movieList?.data.titlePage && currentPage && (
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
                <BreadcrumbPage>{movieList?.data.titlePage}</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Trang {currentPage}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {pagination?.totalItems && (
          <span className="text-sm text-muted-foreground">
            Có tất cả {pagination?.totalItems} phim
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
        {movieList?.data.items.map((movie) => (
          <MovieCard key={movie._id} {...movie} />
        ))}
      </div>

      {pagination && (
        <Pagination className="mt-2 justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage <= 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {pageNumbers[0] !== 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {pageNumbers.map((p, idx) => {
              const prev = pageNumbers[idx - 1];
              const showEllipsis = idx > 0 && p - (prev ?? p) > 1;
              return (
                <div key={p} className="flex items-center justify-center">
                  {showEllipsis && (
                    <PaginationItem key={`ellipsis-${p}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === pagination.currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(p);
                      }}
                      className="cursor-pointer"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                </div>
              );
            })}

            {pageNumbers[pageNumbers.length - 1] !==
              Math.ceil(
                pagination.totalItems / pagination.totalItemsPerPage
              ) && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    currentPage <
                    Math.ceil(
                      pagination.totalItems / pagination.totalItemsPerPage
                    )
                  )
                    handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage >=
                  Math.ceil(
                    pagination.totalItems / pagination.totalItemsPerPage
                  )
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
