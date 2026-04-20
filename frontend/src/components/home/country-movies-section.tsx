import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CountryMovie, CountryMovieGroup } from "@/features/movies/types";
import { getMovieDetailPath } from "../../features/movies/routes";

type Props = {
  groups: CountryMovieGroup[];
};

const VISIBLE_CARDS = 5;
const SLIDE_INTERVAL_MS = 6200;

const getVisibleMovies = (movies: CountryMovie[], startIndex: number) => {
  if (!movies.length) {
    return [] as CountryMovie[];
  }

  return Array.from({ length: Math.min(VISIBLE_CARDS, movies.length) }, (_, offset) => {
    const movieIndex = (startIndex + offset) % movies.length;
    return movies[movieIndex];
  });
};

export const CountryMoviesSection = ({ groups }: Props) => {
  const groupKeys = useMemo(() => groups.map((group) => group.key), [groups]);

  const [startIndexMap, setStartIndexMap] = useState<Record<string, number>>(() =>
    groups.reduce<Record<string, number>>((acc, group) => {
      acc[group.key] = 0;
      return acc;
    }, {}),
  );

  useEffect(() => {
    setStartIndexMap(
      groups.reduce<Record<string, number>>((acc, group) => {
        acc[group.key] = 0;
        return acc;
      }, {}),
    );
  }, [groupKeys.join("|")]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStartIndexMap((previous) => {
        const next: Record<string, number> = {};

        groups.forEach((group) => {
          const currentIndex = previous[group.key] ?? 0;
          const nextIndex = group.movies.length > 0 ? (currentIndex + 1) % group.movies.length : 0;
          next[group.key] = nextIndex;
        });

        return next;
      });
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [groups]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="mb-7">
        <h2 className="text-2xl font-black text-zinc-100 sm:text-3xl">
          Khám phá phim theo quốc gia
        </h2>
      </div>

      <div className="space-y-8">
        {groups.map((group) => {
          const visibleMovies = getVisibleMovies(group.movies, startIndexMap[group.key] ?? 0);

          return (
            <article key={group.key} className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-zinc-100 sm:text-xl">{group.title}</h3>
                <button
                  type="button"
                  className="text-sm font-semibold text-zinc-400 underline-offset-2 transition hover:text-zinc-100 hover:underline"
                >
                  Xem tất cả
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {visibleMovies.map((movie) => (
                  <Link
                    key={`${group.key}-${movie.id}`}
                    to={getMovieDetailPath("movie", movie.id)}
                    className="group relative h-full w-full overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/80 text-left sm:h-56"
                    aria-label={`Mở phim ${movie.title}`}
                  >
                    <img
                      src={movie.posterPath}
                      alt={movie.title}
                      className="absolute inset-0 block h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/35 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 space-y-1 p-3">
                      <p className="line-clamp-1 text-sm font-semibold text-white">{movie.title}</p>
                      <p className="text-xs text-zinc-200">
                        Đánh giá: {movie.voteAverage.toFixed(1)} / 10
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
