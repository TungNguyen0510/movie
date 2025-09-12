"use client";

import MovieCard from "@/components/movie-card";
import { useMovieList } from "@/lib/queries/useMovieList";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
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

export default function ListMoviePage() {
  const { slug } = useParams<{ slug: string }>();

  const [page, setPage] = useState<number>(1);

  const { data: movieList } = useMovieList(slug, {
    page,
    limit: 24,
    sort_field: "modified.time",
    sort_type: "desc",
  });

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{movieList?.data.titlePage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
                  if (page > 1) setPage(page - 1);
                }}
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
                        setPage(p);
                      }}
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
                    page <
                    Math.ceil(
                      pagination.totalItems / pagination.totalItemsPerPage
                    )
                  )
                    setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
