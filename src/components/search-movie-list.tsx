"use client";

import { useSearch } from "@/lib/queries/useSearch";
import MovieCard from "./movie-card";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { MovieListParams } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface SearchMovieListProps {
  keyword: string;
  params?: MovieListParams;
}

export default function SearchMovieList({
  keyword,
  params = {},
}: SearchMovieListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page, 10));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams, keyword]);

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearch(keyword, {
    page: currentPage,
    limit: 24,
    sort_field: "modified.time",
    sort_type: "desc",
    ...params,
  });

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    router.push(`/tim-kiem?${newSearchParams.toString()}`);
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    if (!searchResults?.data?.params?.pagination) return [];

    const { currentPage: page } = searchResults.data.params.pagination;
    const totalPages = Math.ceil(
      searchResults.data.params.pagination.totalItems /
        searchResults.data.params.pagination.totalItemsPerPage
    );
    const items = [];

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => page > 1 && handlePageChange(page - 1)}
          className={
            page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    // Page numbers
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={page === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={page === i}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={page === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => page < totalPages && handlePageChange(page + 1)}
          className={
            page >= totalPages
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <Label className="text-lg text-red-500">
            Không thể tải kết quả tìm kiếm
          </Label>
          <p className="text-sm text-muted-foreground mt-2">
            Vui lòng thử lại sau
          </p>
        </div>
      </div>
    );
  }

  if (!searchResults?.data?.items || searchResults.data.items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <Label className="text-lg">
            Không tìm thấy phim nào với từ khóa &quot;{keyword}&quot;
          </Label>
          <p className="text-sm text-muted-foreground mt-2">
            Hãy thử với từ khóa khác
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label className="text-2xl font-semibold">
          Kết quả tìm kiếm cho &quot;{keyword}&quot;
        </Label>
        <span className="text-sm text-muted-foreground">
          {searchResults.data.params.pagination.totalItems} phim
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
        {searchResults.data.items.map((movie) => (
          <MovieCard key={movie._id} {...movie} />
        ))}
      </div>

      {/* Pagination */}
      {Math.ceil(
        searchResults.data.params.pagination.totalItems /
          searchResults.data.params.pagination.totalItemsPerPage
      ) > 1 && (
        <Pagination className="w-full flex justify-end mt-8">
          <PaginationContent>{generatePaginationItems()}</PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
