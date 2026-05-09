import { CountryMovie, CountryMovieGroup, ShowcaseMovie, StandaloneMovie } from "./types";

type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
};

type TmdbListResponse = {
  results: TmdbMovie[];
};

const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_ORIGINAL = "https://image.tmdb.org/t/p/original";
const TMDB_IMAGE_POSTER = "https://image.tmdb.org/t/p/w342";

const normalizeEnvValue = (value: string | undefined) => {
  const normalized = String(value || "").trim();
  if (!normalized || normalized === "undefined" || normalized === "null") {
    return undefined;
  }

  return normalized;
};

const getTmdbAuth = () => {
  const readAccessToken = normalizeEnvValue(
    import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN as string | undefined,
  );
  const apiKey = normalizeEnvValue(import.meta.env.VITE_TMDB_API_KEY as string | undefined);

  if (!readAccessToken && !apiKey) {
    throw new Error("Thiếu VITE_TMDB_READ_ACCESS_TOKEN hoặc VITE_TMDB_API_KEY.");
  }

  return { readAccessToken, apiKey };
};

const createTmdbUrl = (path: string, searchParams: URLSearchParams, apiKey?: string) => {
  if (apiKey) {
    searchParams.set("api_key", apiKey);
  }

  return `${TMDB_API_URL}${path}?${searchParams.toString()}`;
};

const shuffleArray = <T>(items: T[]) => {
  const copied = [...items];

  for (let i = copied.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[randomIndex]] = [copied[randomIndex], copied[i]];
  }

  return copied;
};

const normalizeMovie = (movie: TmdbMovie): ShowcaseMovie | null => {
  if (!movie.backdrop_path || !movie.poster_path) {
    return null;
  }

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview || "Hiện chưa có mô tả cho bộ phim này.",
    voteAverage: movie.vote_average || 0,
    backdropPath: `${TMDB_IMAGE_ORIGINAL}${movie.backdrop_path}`,
    posterPath: `${TMDB_IMAGE_POSTER}${movie.poster_path}`,
  };
};

export const fetchShowcaseMovies = async (): Promise<ShowcaseMovie[]> => {
  const { readAccessToken, apiKey } = getTmdbAuth();
  const url = createTmdbUrl(
    "/trending/movie/week",
    new URLSearchParams({
      language: "vi-VN",
      page: "1",
    }),
    apiKey,
  );

  const response = await fetch(url, {
    headers: readAccessToken ? { Authorization: `Bearer ${readAccessToken}` } : undefined,
  });

  if (!response.ok) {
    throw new Error("Không thể tải danh sách phim từ TMDB.");
  }

  const data = (await response.json()) as TmdbListResponse;
  const movies = data.results
    .map(normalizeMovie)
    .filter((movie): movie is ShowcaseMovie => movie !== null)
    .slice(0, 10);

  if (!movies.length) {
    throw new Error("Không tìm thấy phim hợp lệ từ TMDB.");
  }

  return movies;
};

const normalizeCountryMovie = (movie: TmdbMovie): CountryMovie | null => {
  if (!movie.poster_path) {
    return null;
  }

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview || "Hiện chưa có mô tả cho bộ phim này.",
    voteAverage: movie.vote_average || 0,
    posterPath: `${TMDB_IMAGE_POSTER}${movie.poster_path}`,
  };
};

const fetchMoviesByOriginCountry = async (
  originCountry: string,
  readAccessToken?: string,
  apiKey?: string,
) => {
  const page = String(Math.floor(Math.random() * 5) + 1);
  const url = createTmdbUrl(
    "/discover/movie",
    new URLSearchParams({
      include_adult: "false",
      include_video: "false",
      language: "vi-VN",
      page,
      sort_by: "popularity.desc",
      with_origin_country: originCountry,
    }),
    apiKey,
  );

  const response = await fetch(url, {
    headers: readAccessToken ? { Authorization: `Bearer ${readAccessToken}` } : undefined,
  });

  if (!response.ok) {
    throw new Error(`Không thể tải phim quốc gia ${originCountry}.`);
  }

  const data = (await response.json()) as TmdbListResponse;
  return data.results
    .map(normalizeCountryMovie)
    .filter((movie): movie is CountryMovie => movie !== null);
};

export const fetchCountryMovieGroups = async (): Promise<CountryMovieGroup[]> => {
  const { readAccessToken, apiKey } = getTmdbAuth();

  const [krMoviesRaw, cnMoviesRaw, usMoviesRaw, ukMoviesRaw] = await Promise.all([
    fetchMoviesByOriginCountry("KR", readAccessToken, apiKey),
    fetchMoviesByOriginCountry("CN", readAccessToken, apiKey),
    fetchMoviesByOriginCountry("US", readAccessToken, apiKey),
    fetchMoviesByOriginCountry("GB", readAccessToken, apiKey),
  ]);

  const usUkCombined = [...usMoviesRaw, ...ukMoviesRaw].filter(
    (movie, index, allMovies) => allMovies.findIndex((item) => item.id === movie.id) === index,
  );

  return [
    {
      key: "kr",
      title: "Phim Hàn Quốc Mới",
      movies: shuffleArray(krMoviesRaw).slice(0, 10),
    },
    {
      key: "cn",
      title: "Phim Trung Quốc mới",
      movies: shuffleArray(cnMoviesRaw).slice(0, 10),
    },
    {
      key: "us-uk",
      title: "Phim US - UK mới",
      movies: shuffleArray(usUkCombined).slice(0, 10),
    },
  ];
};

const normalizeStandaloneMovie = (movie: TmdbMovie): StandaloneMovie | null => {
  if (!movie.poster_path) {
    return null;
  }

  return {
    id: movie.id,
    title: movie.title,
    englishTitle: movie.title,
    posterPath: `${TMDB_IMAGE_POSTER}${movie.poster_path}`,
    badge: "P.Đề",
  };
};

export const fetchStandaloneMovies = async (): Promise<StandaloneMovie[]> => {
  const { readAccessToken, apiKey } = getTmdbAuth();
  const page = String(Math.floor(Math.random() * 3) + 1);
  const url = createTmdbUrl(
    "/movie/top_rated",
    new URLSearchParams({
      language: "vi-VN",
      page,
    }),
    apiKey,
  );

  const response = await fetch(url, {
    headers: readAccessToken ? { Authorization: `Bearer ${readAccessToken}` } : undefined,
  });

  if (!response.ok) {
    throw new Error("Không thể tải danh sách phim lẻ từ TMDB.");
  }

  const data = (await response.json()) as TmdbListResponse;
  const movies = shuffleArray(
    data.results
      .map(normalizeStandaloneMovie)
      .filter((movie): movie is StandaloneMovie => movie !== null),
  ).slice(0, 8);

  if (!movies.length) {
    throw new Error("Không tìm thấy phim lẻ từ TMDB.");
  }

  return movies;
};
