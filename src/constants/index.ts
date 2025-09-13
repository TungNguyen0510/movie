import type { Category } from "../types";

export const LIST_CATEGORY: Category[] = [
  { _id: "phim-moi", name: "Phim Mới", slug: "phim-moi" },
  { _id: "phim-bo", name: "Phim Bộ", slug: "phim-bo" },
  { _id: "phim-le", name: "Phim Lẻ", slug: "phim-le" },
  { _id: "tv-shows", name: "TV Shows", slug: "tv-shows" },
  { _id: "hoat-hinh", name: "Hoạt Hình", slug: "hoat-hinh" },
  { _id: "phim-vietsub", name: "Phim Vietsub", slug: "phim-vietsub" },
  {
    _id: "phim-thuyet-minh",
    name: "Phim Thuyết Minh",
    slug: "phim-thuyet-minh",
  },
  { _id: "phim-long-tieng", name: "Phim Lồng Tiếng", slug: "phim-long-tieng" },
  {
    _id: "phim-bo-dang-chieu",
    name: "Phim Bộ Đang Chiếu",
    slug: "phim-bo-dang-chieu",
  },
  {
    _id: "phim-bo-hoan-thanh",
    name: "Phim Bộ Hoàn Thành",
    slug: "phim-bo-hoan-thanh",
  },
  { _id: "phim-sap-chieu", name: "Phim Sắp Chiếu", slug: "phim-sap-chieu" },
  { _id: "subteam", name: "Subteam", slug: "subteam" },
  { _id: "phim-chieu-rap", name: "Phim Chiếu Rạp", slug: "phim-chieu-rap" },
];

export const LIST_CATEGORY_MOVIE: (Category & { color: string })[] = [
  {
    _id: "620a21b2e0fc277084dfd0c5",
    name: "Hành Động",
    slug: "hanh-dong",
    color: "#FF4500",
  },
  {
    _id: "620a220de0fc277084dfd16d",
    name: "Tình Cảm",
    slug: "tinh-cam",
    color: "#FF69B4",
  },
  {
    _id: "620a221de0fc277084dfd1c1",
    name: "Hài Hước",
    slug: "hai-huoc",
    color: "#FFD700",
  },
  {
    _id: "620a222fe0fc277084dfd23d",
    name: "Cổ Trang",
    slug: "co-trang",
    color: "#8B4513",
  },
  {
    _id: "620a2238e0fc277084dfd291",
    name: "Tâm Lý",
    slug: "tam-ly",
    color: "#4682B4",
  },
  {
    _id: "620a2249e0fc277084dfd2e5",
    name: "Hình Sự",
    slug: "hinh-su",
    color: "#2F4F4F",
  },
  {
    _id: "620a2253e0fc277084dfd339",
    name: "Chiến Tranh",
    slug: "chien-tranh",
    color: "#800000",
  },
  {
    _id: "620a225fe0fc277084dfd38d",
    name: "Thể Thao",
    slug: "the-thao",
    color: "#32CD32",
  },
  {
    _id: "620a2279e0fc277084dfd3e1",
    name: "Võ Thuật",
    slug: "vo-thuat",
    color: "#B22222",
  },
  {
    _id: "620a2282e0fc277084dfd435",
    name: "Viễn Tưởng",
    slug: "vien-tuong",
    color: "#7B68EE",
  },
  {
    _id: "620a2293e0fc277084dfd489",
    name: "Phiêu Lưu",
    slug: "phieu-luu",
    color: "#20B2AA",
  },
  {
    _id: "620a229be0fc277084dfd4dd",
    name: "Khoa Học",
    slug: "khoa-hoc",
    color: "#00CED1",
  },
  {
    _id: "620a22ace0fc277084dfd531",
    name: "Kinh Dị",
    slug: "kinh-di",
    color: "#000000",
  },
  {
    _id: "620a22bae0fc277084dfd585",
    name: "Âm Nhạc",
    slug: "am-nhac",
    color: "#FF8C00",
  },
  {
    _id: "620a22c8e0fc277084dfd5d9",
    name: "Thần Thoại",
    slug: "than-thoai",
    color: "#9370DB",
  },
  {
    _id: "620e0e64d9648f114cde7728",
    name: "Tài Liệu",
    slug: "tai-lieu",
    color: "#708090",
  },
  {
    _id: "620e4c0b6ba8271c5eef05a8",
    name: "Gia Đình",
    slug: "gia-dinh",
    color: "#FFB6C1",
  },
  {
    _id: "620f3d2b91fa4af90ab697fe",
    name: "Chính kịch",
    slug: "chinh-kich",
    color: "#556B2F",
  },
  {
    _id: "620f84d291fa4af90ab6b3f4",
    name: "Bí ẩn",
    slug: "bi-an",
    color: "#4B0082",
  },
  {
    _id: "62121e821f1609c9d934585c",
    name: "Học Đường",
    slug: "hoc-duong",
    color: "#1E90FF",
  },
  {
    _id: "6218eb66a2d0f024a9de48d4",
    name: "Kinh Điển",
    slug: "kinh-dien",
    color: "#DAA520",
  },
  {
    _id: "6242b89cc78eb57bbfe29f91",
    name: "Phim 18+",
    slug: "phim-18",
    color: "#C71585",
  },
];

export const EPISODE_COLOR_PREFIX = [
  { prefix: "Tập", color: "#c084fc" },
  { prefix: "Hoàn", color: "#34d399" },
  { prefix: "Full", color: "#34d399" },
  { prefix: "Trailer", color: "#fdba74" },
];
