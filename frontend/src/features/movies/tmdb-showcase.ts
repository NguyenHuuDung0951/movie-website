import { ShowcaseMovie } from "./types";

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

const normalizeMovie = (movie: TmdbMovie): ShowcaseMovie | null => {
  if (!movie.backdrop_path || !movie.poster_path) {
    return null;
  }

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview || "No overview available.",
    voteAverage: movie.vote_average || 0,
    backdropPath: `${TMDB_IMAGE_ORIGINAL}${movie.backdrop_path}`,
    posterPath: `${TMDB_IMAGE_POSTER}${movie.poster_path}`,
  };
};

export const fetchShowcaseMovies = async (): Promise<ShowcaseMovie[]> => {
  const readAccessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN as string | undefined;
  const apiKey = import.meta.env.VITE_TMDB_API_KEY as string | undefined;

  if (!readAccessToken && !apiKey) {
    throw new Error("Missing VITE_TMDB_READ_ACCESS_TOKEN or VITE_TMDB_API_KEY.");
  }

  const url = apiKey
    ? `${TMDB_API_URL}/trending/movie/week?language=en-US&page=1&api_key=${apiKey}`
    : `${TMDB_API_URL}/trending/movie/week?language=en-US&page=1`;

  const response = await fetch(url, {
    headers: readAccessToken ? { Authorization: `Bearer ${readAccessToken}` } : undefined,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movies from TMDB.");
  }

  const data = (await response.json()) as TmdbListResponse;
  const movies = data.results
    .map(normalizeMovie)
    .filter((movie): movie is ShowcaseMovie => movie !== null)
    .slice(0, 10);

  if (!movies.length) {
    throw new Error("No valid movies found from TMDB.");
  }

  return movies;
};
