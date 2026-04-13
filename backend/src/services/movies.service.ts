import { env } from "../config/env";

export type ListMoviesQuery = {
  search?: string;
  genre?: string;
  year?: number;
  page: number;
  limit: number;
};

export type HomeMoviesQuery = {
  hotLimit: number;
  newLimit: number;
};

type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  genre_ids?: number[];
  release_date?: string;
  poster_path?: string | null;
};

type TmdbListResponse = {
  page: number;
  total_pages: number;
  total_results: number;
  results: TmdbMovie[];
};

type TmdbGenreResponse = {
  genres: Array<{ id: number; name: string }>;
};

type MovieItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  genre: string;
  releaseYear: number;
  posterUrl?: string;
};

const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";
let genreMapCache: Map<number, string> | null = null;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildTmdbUrl = (path: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams({
    api_key: env.tmdbApiKey,
    language: "en-US",
    ...params,
  });

  return `${env.tmdbBaseUrl}${path}?${searchParams.toString()}`;
};

const fetchTmdb = async <T>(path: string, params: Record<string, string> = {}) => {
  const url = buildTmdbUrl(path, params);
  const response = await fetch(url);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`TMDB request failed (${response.status}): ${message}`);
  }

  return (await response.json()) as T;
};

const getGenreMap = async () => {
  if (genreMapCache) {
    return genreMapCache;
  }

  const data = await fetchTmdb<TmdbGenreResponse>("/genre/movie/list");
  genreMapCache = new Map(data.genres.map((genre) => [genre.id, genre.name]));
  return genreMapCache;
};

const toMovieItem = (movie: TmdbMovie, genreMap: Map<number, string>): MovieItem => {
  const genres = (movie.genre_ids || []).map((id) => genreMap.get(id)).filter(Boolean);
  const releaseYear = movie.release_date ? Number(movie.release_date.slice(0, 4)) : 0;

  return {
    _id: String(movie.id),
    title: movie.title,
    slug: `${slugify(movie.title)}-${movie.id}`,
    description: movie.overview || "No description available.",
    genre: genres[0] || "Unknown",
    releaseYear,
    posterUrl: movie.poster_path ? `${tmdbImageBaseUrl}${movie.poster_path}` : undefined,
  };
};

export const listMovies = async ({ search, genre, year, page, limit }: ListMoviesQuery) => {
  const genreMap = await getGenreMap();
  const genreId = genre
    ? [...genreMap.entries()].find(([, name]) => name.toLowerCase() === genre.toLowerCase())?.[0]
    : undefined;

  const listResponse = search
    ? await fetchTmdb<TmdbListResponse>("/search/movie", {
        query: search,
        page: String(page),
        ...(year ? { year: String(year) } : {}),
      })
    : await fetchTmdb<TmdbListResponse>("/discover/movie", {
        sort_by: "popularity.desc",
        include_adult: "false",
        include_video: "false",
        page: String(page),
        ...(genreId ? { with_genres: String(genreId) } : {}),
        ...(year ? { primary_release_year: String(year) } : {}),
      });

  const mappedItems = listResponse.results.map((movie) => toMovieItem(movie, genreMap));
  const items = search
    ? mappedItems.filter((movie) => {
        const isGenreMatched = genre ? movie.genre.toLowerCase() === genre.toLowerCase() : true;
        const isYearMatched = year ? movie.releaseYear === year : true;
        return isGenreMatched && isYearMatched;
      })
    : mappedItems;

  const total = listResponse.total_results;

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: listResponse.total_pages || 1,
      hasNextPage: page < listResponse.total_pages,
      hasPrevPage: page > 1,
    },
  };
};

export const getHomeMovies = async ({ hotLimit, newLimit }: HomeMoviesQuery) => {
  const genreMap = await getGenreMap();
  const [trendingResponse, nowPlayingResponse] = await Promise.all([
    fetchTmdb<TmdbListResponse>("/trending/movie/day"),
    fetchTmdb<TmdbListResponse>("/movie/now_playing", { page: "1" }),
  ]);

  const hotMovies = trendingResponse.results
    .slice(0, hotLimit)
    .map((movie) => toMovieItem(movie, genreMap));
  const newMovies = nowPlayingResponse.results
    .slice(0, newLimit)
    .map((movie) => toMovieItem(movie, genreMap));

  return { hotMovies, newMovies };
};
