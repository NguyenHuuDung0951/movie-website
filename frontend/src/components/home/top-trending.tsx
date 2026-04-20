import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface TrendingMovie {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  overview: string;
}

interface TrendingResponse {
  results: TrendingMovie[];
}

const fetchTrendingMovies = async (): Promise<TrendingMovie[]> => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await axios.get<TrendingResponse>(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
  );
  return response.data.results.slice(0, 10);
};

const MovieCard = ({ movie, rank }: { movie: TrendingMovie; rank: number }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const title = movie.title || movie.name || "Unknown";
  const releaseDate = movie.release_date || movie.first_air_date || "N/A";
  const voteAverage = movie.vote_average.toFixed(1);

  return (
    <div className="group relative flex flex-col gap-3 overflow-hidden">
      {/* Poster Container */}
      <div className="relative overflow-hidden rounded-lg border border-white/20 shadow-lg transition-transform hover:scale-105">
        <img
          src={posterUrl}
          alt={title}
          className="aspect-[2/3] w-full object-cover"
          loading="lazy"
        />

        {/* Ranking Overlay */}
        <div className="absolute bottom-0 left-0 flex items-end justify-start p-3">
          <span className="font-black text-8xl leading-none text-yellow-300 drop-shadow-lg">
            {rank}
          </span>
        </div>

        {/* Vote Average Badge */}
        <div className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-bl-lg bg-yellow-300 shadow-md">
          <span className="font-bold text-black">{voteAverage}</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-100 group-hover:text-white">
          {title}
        </h3>
        <p className="line-clamp-1 text-xs text-zinc-400">{releaseDate}</p>
      </div>
    </div>
  );
};

export const TopTrending = () => {
  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trending", "movies"],
    queryFn: fetchTrendingMovies,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <h2 className="mb-6 text-2xl font-black text-zinc-100 sm:text-3xl">Top Trending Now</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] rounded-lg bg-zinc-800" />
              <div className="mt-3 h-4 rounded bg-zinc-700" />
              <div className="mt-2 h-3 w-2/3 rounded bg-zinc-700" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError || movies.length === 0) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <h2 className="mb-6 text-2xl font-black text-zinc-100 sm:text-3xl">Top Trending Now</h2>
        <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-6 text-center">
          <p className="text-zinc-400">
            {isError
              ? "Failed to load trending movies. Please try again later."
              : "No trending movies available at the moment."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
      <div className="mb-6 flex items-end justify-between gap-3 sm:mb-8">
        <h2 className="text-2xl font-black text-zinc-100 sm:text-3xl">Top Trending Now</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} rank={index + 1} />
        ))}
      </div>
    </section>
  );
};
