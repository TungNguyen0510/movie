import { Category, CategoryResponse, NationResponse, Nation, ReleaseYear, ReleaseYearResponse, MovieListResponse, MovieListParams, MovieInfoResponse } from "@/types";

type HttpErrorResponse = {
  status: number;
  body: unknown;
};

class ApiError extends Error {
  response: HttpErrorResponse;
  constructor(message: string, response: HttpErrorResponse) {
    super(message);
    this.name = "ApiError";
    this.response = response;
  }
}

export async function apiGet<ResponseBody>(
  path: string,
  init?: RequestInit  
): Promise<ResponseBody> {
  const url = new URL(path.replace(/^\//, ""), process.env.NEXT_PUBLIC_BASE_URL).toString();

  const response = await fetch(url, {
    cache: "no-store",
    ...init,
    method: "GET",
  });

  if (!response.ok) {
    let errorBody: unknown = undefined;
    try {
      errorBody = await response.json();
    } catch { 
    }
    throw new ApiError(
      `GET ${path} failed: ${response.status} ${response.statusText}`,
      { status: response.status, body: errorBody }
    );
  }

  return (await response.json()) as ResponseBody;
}

export async function fetchCategories(): Promise<Category[]> {
  const json = await apiGet<CategoryResponse>("the-loai");
  return json?.data?.items ?? [];
}

export async function fetchNations(): Promise<Nation[]> {
  const json = await apiGet<NationResponse>("quoc-gia");
  return json?.data?.items ?? [];
}


export async function fetchReleaseYears(): Promise<ReleaseYear[]> {
  const json = await apiGet<ReleaseYearResponse>("nam-phat-hanh");
  return json?.data?.items ?? [];
}

export async function fetchMovieList(slug: string = "phim-moi", params: MovieListParams = {}): Promise<MovieListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  
  if (params.sort_field) searchParams.append('sort_field', params.sort_field);
  if (params.sort_type) searchParams.append('sort_type', params.sort_type);
  
  if (params.category && params.category.length > 0) {
    searchParams.append('category', params.category.join(','));
  }
  if (params.country && params.country.length > 0) {
    searchParams.append('country', params.country.join(','));
  }
  if (params.year) {
    searchParams.append('year', params.year.toString());
  }
  
  const queryString = searchParams.toString();
  const path = `danh-sach/${slug}${queryString ? `?${queryString}` : ''}`;
  
  return await apiGet<MovieListResponse>(path);
}

export async function fetchFilmInfo(slug: string): Promise<MovieInfoResponse> {
  const path = `phim/${slug}`;
  return await apiGet<MovieInfoResponse>(path);
}
