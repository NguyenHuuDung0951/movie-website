const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_POSTER_BASE = "https://image.tmdb.org/t/p/w500";

const getApiKey = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("Thiếu VITE_TMDB_API_KEY để tải dữ liệu phim.");
  }

  return apiKey;
};

export const mapTmdbMovieToCard = (movie) => ({
  id: movie.id,
  title: movie.title,
  subtitle: movie.original_title || movie.title,
  imageSrc: movie.poster_path ? `${TMDB_POSTER_BASE}${movie.poster_path}` : "/home-background.jpg",
});

export const fetchDiscoverMovies = async ({
  page = 1,
  year,
  genre,
  region,
  language = "vi-VN",
}) => {
  const apiKey = getApiKey();
  const params = new URLSearchParams({
    api_key: apiKey,
    sort_by: "popularity.desc",
    include_adult: "false",
    include_video: "false",
    language,
    page: String(page),
  });

  if (year) {
    params.set("primary_release_year", String(year));
  }

  if (genre) {
    params.set("with_genres", String(genre));
  }

  if (region) {
    // Use origin country for real country-based filtering.
    params.set("with_origin_country", region);
  }

  const response = await fetch(`${TMDB_API_URL}/discover/movie?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách phim lẻ.");
  }

  return response.json();
};
// Mặc định sẽ trả về tiếng việt
export const fetchMovieGenres = async (language = "vi-VN") => {
  const apiKey = getApiKey();
  const params = new URLSearchParams({ api_key: apiKey, language });
  // TMDB có endpoint riêng để lấy danh sách thể loại, không có sẵn trong payload của discover movies.
  const response = await fetch(`${TMDB_API_URL}/genre/movie/list?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách thể loại.");
  }

  const data = await response.json();
  return data.genres || [];
};
