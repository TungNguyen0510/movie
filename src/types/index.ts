export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export type Nation = Category;

export interface ReleaseYear {
  year: number;
}

export interface APIResponse<T> {
  status?: string;
  message?: string;
  data?: { items: T[] };
}

export type CategoryResponse = APIResponse<Category>;

export type NationResponse = APIResponse<Nation>;

export type ReleaseYearResponse = APIResponse<ReleaseYear>;

export type SORT_FIELD = "modified.time" | "year" | "_id";

export type SORT_TYPE = "asc" | "desc";

export interface TMDB {
  type: string;
  id: string;
  season: number | null;
  vote_average: number;
  vote_count: number;
}
export interface IMDB {
  id: string;
  vote_average: number;
  vote_count: number;
}

export interface BreadCrumb {
  name: string;
  slug: string;
  isCurrent: boolean;
  position: number;
}

export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

export type MOVIE_STATUS = "trailer" | "ongoing" | "completed";

export interface Movie {
  _id: string;
  status: MOVIE_STATUS;
  name: string;
  origin_name: string;
  type: string;
  thumb_url: string;
  poster_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  trailer_url: string;
  quality: string;
  lang: string;
  slug: string;
  year: number;
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  country: Nation[];
  modified: {
    time: string;
  };
  tmdb?: TMDB;
  imdb?: IMDB;
}

export interface MovieListParams {
  page?: number;
  limit?: number;
  sort_field?: SORT_FIELD;
  sort_type?: SORT_TYPE;
  category?: string[];
  country?: string[];
  year?: number;
}

export interface MovieListData {
  seoOnPage: {
    og_type: string;
    titleHead: string;
    descriptionHead: string;
    og_image: string[];
    og_url: string;
  };
  breadCrumb: BreadCrumb[];
  titlePage: string;
  items: Movie[];
  params: {
    type_slug: string;
    filterCategory: string[];
    filterCountry: string[];
    filterYear: number;
    filterType: string;
    sortField: SORT_FIELD;
    sortType: SORT_TYPE;
    pagination: Pagination;
  };
  type_list: string;
  APP_DOMAIN_FRONTEND: string;
  APP_DOMAIN_CDN_IMAGE: string;
}

export interface MovieListResponse {
  status: string;
  message: string;
  data: MovieListData;
}

export interface Episode {
  server_name: string;
  server_data: {
    name: string;
    slug: string;
    filename: string;
    link_embed: string;
    link_m3u8: string;
  }[];
}

export interface MovieInfoData {
  seoOnPage: {
    og_type: string;
    titleHead: string;
    seoSchema: {
      "@context": string;
      "@type": string;
      name: string;
      dateModified: string;
      dateCreated: string;
      url: string;
      datePublished: string;
      image: string;
      director: string;
    };
    descriptionHead: string;
    og_image: string[];
    updated_time: number;
    og_url: string;
  };
  breadCrumb: BreadCrumb[];
  params: {
    slug: string;
  };
  item: Movie & {
    actor: string[];
    director: string[];
    content: string;
    episodes?: Episode[];
  };
  APP_DOMAIN_CDN_IMAGE: string;
}

export interface MovieInfoResponse {
  status: string;
  message: string;
  data: MovieInfoData;
}
