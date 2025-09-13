"use client";

import MovieCard from "@/components/movie-card";
import { useMovieList } from "@/lib/queries/useMovieList";
import { useNation } from "@/lib/queries/useNation";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { Home, Funnel, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategory } from "@/lib/queries/useCategory";
import { getTitlePageWithSlug } from "@/lib/utils";

export default function ListMoviePage() {
  const { slug1, slug2 } = useParams<{ slug1: string; slug2: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [uiSortField, setUiSortField] = useState<SORT_FIELD>("modified.time");
  const [uiSortType, setUiSortType] = useState<SORT_TYPE>("desc");
  const [uiSelectedCategory, setUiSelectedCategory] = useState<string[]>([]);
  const [uiSelectedCountries, setUiSelectedCountries] = useState<string[]>([]);
  const [uiSelectedYears, setUiSelectedYears] = useState<number[]>([]);

  const [sortField, setSortField] = useState<SORT_FIELD>("modified.time");
  const [sortType, setSortType] = useState<SORT_TYPE>("desc");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

  const { data: nations } = useNation();
  const { data: categories } = useCategory();

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

  useEffect(() => {
    const urlSortField = searchParams.get("sort_field") as SORT_FIELD;
    const urlSortType = searchParams.get("sort_type") as SORT_TYPE;
    const urlCategory = searchParams.get("category")?.split(",") || [];
    const urlCountries = searchParams.get("country")?.split(",") || [];
    const urlYears =
      searchParams
        .get("year")
        ?.split(",")
        .map((y) => parseInt(y, 10)) || [];

    if (urlSortField) {
      setSortField(urlSortField);
      setUiSortField(urlSortField);
    }
    if (urlSortType) {
      setSortType(urlSortType);
      setUiSortType(urlSortType);
    }
    if (urlCategory.length > 0) {
      setSelectedCategory(urlCategory);
      setUiSelectedCategory(urlCategory);
    }
    if (urlCountries.length > 0) {
      setSelectedCountries(urlCountries);
      setUiSelectedCountries(urlCountries);
    }
    if (urlYears.length > 0) {
      setSelectedYears(urlYears);
      setUiSelectedYears(urlYears);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isDrawerOpen && !hasAppliedFilters) {
      setUiSortField(sortField);
      setUiSortType(sortType);
      setUiSelectedCategory(selectedCategory);
      setUiSelectedCountries(selectedCountries);
      setUiSelectedYears(selectedYears);
    }
    if (isDrawerOpen) {
      setHasAppliedFilters(false);
    }
  }, [
    isDrawerOpen,
    hasAppliedFilters,
    sortField,
    sortType,
    selectedCategory,
    selectedCountries,
    selectedYears,
  ]);

  const { data: movieList, isLoading: isMovieListLoading } = useMovieList(
    slug1,
    slug2,
    {
      page: currentPage,
      limit,
      sort_field: sortField,
      sort_type: sortType,
      category: selectedCategory.length > 0 ? selectedCategory : undefined,
      country: selectedCountries.length > 0 ? selectedCountries : undefined,
      year: selectedYears.length > 0 ? selectedYears : undefined,
    }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    router.push(`/${slug1}/${slug2}?${newSearchParams.toString()}`);
  };

  const handleCategoryToggle = (categorySlug: string) => {
    setUiSelectedCategory((prev) =>
      prev.includes(categorySlug)
        ? prev.filter((c) => c !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  const handleCountryToggle = (countrySlug: string) => {
    setUiSelectedCountries((prev) =>
      prev.includes(countrySlug)
        ? prev.filter((c) => c !== countrySlug)
        : [...prev, countrySlug]
    );
  };

  const handleYearToggle = (year: number) => {
    setUiSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const handleApplyFilters = () => {
    setSortField(uiSortField);
    setSortType(uiSortType);
    setSelectedCategory(uiSelectedCategory);
    setSelectedCountries(uiSelectedCountries);
    setSelectedYears(uiSelectedYears);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", "1");
    newSearchParams.set("sort_field", uiSortField);
    newSearchParams.set("sort_type", uiSortType);

    if (uiSelectedCategory.length > 0) {
      newSearchParams.set("category", uiSelectedCategory.join(","));
    } else {
      newSearchParams.delete("category");
    }

    if (uiSelectedCountries.length > 0) {
      newSearchParams.set("country", uiSelectedCountries.join(","));
    } else {
      newSearchParams.delete("country");
    }

    if (uiSelectedYears.length > 0) {
      newSearchParams.set("year", uiSelectedYears.join(","));
    } else {
      newSearchParams.delete("year");
    }

    setHasAppliedFilters(true);
    setIsDrawerOpen(false);

    router.push(`/${slug1}/${slug2}?${newSearchParams.toString()}`);
  };

  const handleClearFilters = () => {
    setUiSortField("modified.time");
    setUiSortType("desc");
    setUiSelectedCategory([]);
    setUiSelectedCountries([]);
    setUiSelectedYears([]);

    setSortField("modified.time");
    setSortType("desc");
    setSelectedCategory([]);
    setSelectedCountries([]);
    setSelectedYears([]);

    setHasAppliedFilters(true);
  };

  const currentYear = new Date().getFullYear() + 1;
  const yearOptions = Array.from(
    { length: currentYear - 2002 },
    (_, i) => currentYear - i
  );

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
    <div className="flex flex-col gap-4 w-full px-8 pb-6 mt-16">
      {isMovieListLoading ? (
        <div className="text-zinc-600 dark:text-white flex justify-center items-center h-[calc(100vh-64px-100px)]">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex justify-between flex-wrap gap-4">
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
                    <BreadcrumbPage>
                      {getTitlePageWithSlug(slug1)}
                    </BreadcrumbPage>
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
            <div className="flex gap-4 items-center">
              <Drawer
                direction="top"
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
              >
                <DrawerTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent h-10 px-4 py-2 cursor-pointer text-blue-500 hover:text-blue-300 dark:border-blue-500">
                  <Funnel className="size-5 mr-2" />
                  Lọc
                </DrawerTrigger>
                <DrawerContent className="h-fit overflow-y-auto">
                  <DrawerHeader>
                    <DrawerTitle className="flex justify-start">
                      Lọc phim {movieList?.data.titlePage}
                    </DrawerTitle>
                  </DrawerHeader>

                  <div className="px-4 pb-4 space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <Label className="text-base font-semibold text-nowrap">
                          Sắp xếp theo
                        </Label>

                        <RadioGroup
                          value={uiSortField}
                          onValueChange={(value: SORT_FIELD) =>
                            setUiSortField(value)
                          }
                          className="flex flex-col md:flex-row gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="modified.time"
                              id="time-update"
                              className="text-blue-500"
                            />
                            <Label htmlFor="time-update">
                              Thời gian cập nhật
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="_id"
                              id="time-post"
                              className="text-blue-500"
                            />
                            <Label htmlFor="time-post">Thời gian đăng</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="year"
                              id="production-year"
                              className="text-blue-500"
                            />
                            <Label htmlFor="production-year">
                              Năm phát hành
                            </Label>
                          </div>
                        </RadioGroup>
                        <Select
                          value={uiSortType}
                          onValueChange={(value: SORT_TYPE) =>
                            setUiSortType(value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="desc">Mới nhất</SelectItem>
                            <SelectItem value="asc">Cũ nhất</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {slug1 !== "the-loai" && (
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">
                          Thể loại
                        </Label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                          {categories?.map((category) => (
                            <Button
                              key={category._id}
                              variant={
                                uiSelectedCategory.includes(category.slug)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleCategoryToggle(category.slug)
                              }
                              className={`text-xs ${
                                uiSelectedCategory.includes(category.slug)
                                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                            >
                              {category.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {slug1 !== "quoc-gia" && (
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">
                          Quốc gia
                        </Label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                          {nations?.map((nation) => (
                            <Button
                              key={nation._id}
                              variant={
                                uiSelectedCountries.includes(nation.slug)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => handleCountryToggle(nation.slug)}
                              className={`text-xs ${
                                uiSelectedCountries.includes(nation.slug)
                                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                            >
                              {nation.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {slug1 !== "nam-phat-hanh" && (
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">
                          Năm phát hành
                        </Label>
                        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
                          {yearOptions.map((year) => (
                            <Button
                              key={year}
                              variant={
                                uiSelectedYears.includes(year)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => handleYearToggle(year)}
                              className={`text-xs ${
                                uiSelectedYears.includes(year)
                                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                            >
                              {year}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <DrawerFooter className="flex flex-row gap-4 justify-end">
                    <Button
                      variant="destructive"
                      onClick={handleClearFilters}
                      className="cursor-pointer"
                    >
                      Xóa bộ lọc
                    </Button>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                      onClick={handleApplyFilters}
                    >
                      Lọc
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsDrawerOpen(false)}
                      className="cursor-pointer"
                    >
                      Đóng
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              {pagination && pagination?.totalItems > 0 && (
                <span className="text-sm text-muted-foreground">
                  Có tất cả {pagination?.totalItems} phim
                </span>
              )}
            </div>
          </div>

          {movieList?.data.items && movieList.data.items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
              {movieList.data.items.map((movie) => (
                <MovieCard key={movie._id} {...movie} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Không tìm thấy phim nào
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Hãy thử thay đổi bộ lọc để tìm phim phù hợp
              </p>
              <Button
                variant="outline"
                onClick={() => setIsDrawerOpen(true)}
                className="text-blue-500 hover:text-blue-300 dark:border-blue-500"
              >
                <Funnel className="size-5 mr-2" />
                Thay đổi bộ lọc
              </Button>
            </div>
          )}

          {pagination &&
            movieList?.data.items &&
            movieList.data.items.length > 0 && (
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
        </>
      )}
    </div>
  );
}
