import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieCard } from "@/components/home/movie-card";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getGenreBySlug, GENRE_LIST } from "@/features/movies/genre-config";
import { getMovieDetailPath } from "@/features/movies/routes";
import { fetchDiscoverMovies, mapTmdbMovieToCard } from "@/services/tmdb";

const SKELETON_COUNT = 14;

type MovieCardItem = {
  id: number;
  title: string;
  subtitle: string;
  imageSrc: string;
};

type PaginationItem = number | "...";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

const MoviesSkeleton = () => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7">
    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
      <div
        key={index}
        className="h-72 w-full animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/60"
      />
    ))}
  </div>
);

const buildPaginationItems = (currentPage: number, totalPages: number): PaginationItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([
    1,
    2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    totalPages - 1,
    totalPages,
  ]);

  const sortedPages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const result: PaginationItem[] = [];

  sortedPages.forEach((page, index) => {
    result.push(page);

    const nextPage = sortedPages[index + 1];
    if (nextPage && nextPage - page > 1) {
      result.push("...");
    }
  });

  return result;
};

/** Gradient backgrounds for the genre hero badge */
const GENRE_GRADIENTS: Record<string, string> = {
  action: "from-rose-600/80 to-red-900/80",
  adventure: "from-orange-500/80 to-amber-900/80",
  animation: "from-yellow-500/70 to-yellow-800/80",
  comedy: "from-emerald-500/70 to-green-900/80",
  crime: "from-slate-500/70 to-slate-900/80",
  documentary: "from-cyan-500/70 to-cyan-900/80",
  drama: "from-violet-500/70 to-violet-900/80",
  family: "from-pink-500/70 to-pink-900/80",
  fantasy: "from-amber-500/70 to-amber-900/80",
  history: "from-teal-500/70 to-teal-900/80",
  horror: "from-red-700/80 to-zinc-900/90",
  music: "from-fuchsia-500/70 to-fuchsia-900/80",
  mystery: "from-indigo-500/70 to-indigo-900/80",
  romance: "from-rose-400/70 to-rose-900/80",
  "science-fiction": "from-blue-500/70 to-blue-900/80",
  thriller: "from-zinc-500/70 to-zinc-900/80",
  war: "from-stone-500/70 to-stone-900/80",
};

export const GenreMoviesPage = () => {
  const { genreSlug } = useParams<{ genreSlug: string }>();
  const genreConfig = genreSlug ? getGenreBySlug(genreSlug) : undefined;

  const [movies, setMovies] = useState<MovieCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const paginationItems = useMemo(
    () => buildPaginationItems(currentPage, totalPages),
    [currentPage, totalPages],
  );

  // Reset page when genre changes
  useEffect(() => {
    setCurrentPage(1);
  }, [genreSlug]);

  useEffect(() => {
    if (!genreConfig) return;

    let active = true;

    const loadMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchDiscoverMovies({
          page: currentPage,
          genre: String(genreConfig.tmdbId),
          language: "vi-VN",
        });

        if (!active) return;

        setMovies((data.results || []).map(mapTmdbMovieToCard));
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (loadError: unknown) {
        if (!active) return;
        setError(getErrorMessage(loadError, "Đã xảy ra lỗi khi tải dữ liệu phim."));
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      active = false;
    };
  }, [currentPage, genreConfig]);

  const gradientClass = genreSlug
    ? GENRE_GRADIENTS[genreSlug] || "from-zinc-600/70 to-zinc-900/80"
    : "from-zinc-600/70 to-zinc-900/80";

  // Genre not found
  if (!genreConfig) {
    return (
      <>
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-10">
            <h1 className="text-4xl font-black text-zinc-100">404</h1>
            <p className="mt-3 text-lg font-semibold text-zinc-300">Không tìm thấy thể loại này</p>
            <p className="mt-2 text-sm text-zinc-400">
              Thể loại "{genreSlug}" không tồn tại. Vui lòng chọn từ danh sách bên dưới.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {GENRE_LIST.map((g) => (
                <Link
                  key={g.slug}
                  to={`/genre/${g.slug}`}
                  className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700 hover:text-white"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const GenreIcon = genreConfig.icon;

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Genre Hero Header */}
        <section
          className={`relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradientClass} p-6 sm:p-8`}
        >
          {/* Decorative blurred circles */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-3xl" />

          <div className="relative flex items-center gap-4 sm:gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl text-white shadow-lg backdrop-blur-sm sm:h-16 sm:w-16 sm:text-3xl">
              <GenreIcon aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                Phim {genreConfig.name}
              </h1>
              <p className="mt-1 text-sm text-white/70 sm:text-base">
                Khám phá bộ sưu tập phim {genreConfig.name.toLowerCase()} hấp dẫn nhất
              </p>
            </div>
          </div>

          {/* Genre quick navigation */}
          <div className="relative mt-5 flex flex-wrap gap-2">
            {GENRE_LIST.map((g) => {
              const isActive = g.slug === genreSlug;
              return (
                <Link
                  key={g.slug}
                  to={`/genre/${g.slug}`}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? "bg-white text-zinc-900 shadow-md"
                      : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {g.name}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Page info */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-400">
            Trang {currentPage} / {totalPages}
          </p>
        </div>

        {/* Movie grid */}
        <section className="transition-opacity duration-300">
          {loading && <MoviesSkeleton />}

          {!loading && error && (
            <div className="rounded-xl border border-red-500/30 bg-zinc-900 p-4 text-sm text-red-200">
              {error}
            </div>
          )}

          {!loading && !error && movies.length === 0 && (
            <div className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-5 text-sm text-zinc-300">
              Không tìm thấy phim nào thuộc thể loại {genreConfig.name}. Hãy thử trang khác.
            </div>
          )}

          {!loading && !error && movies.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  href={getMovieDetailPath("movie", movie.id)}
                  title={movie.title}
                  subtitle={movie.subtitle}
                  imageSrc={movie.imageSrc}
                />
              ))}
            </div>
          )}
        </section>

        {/* Pagination */}
        <section className="mt-8 overflow-x-auto pb-2">
          <div className="flex min-w-max items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={loading || currentPage === 1}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {paginationItems.map((item, index) => {
              if (item === "...") {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 text-zinc-400">
                    ...
                  </span>
                );
              }

              const isActive = item === currentPage;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCurrentPage(item)}
                  disabled={loading}
                  className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    isActive
                      ? "border-yellow-300 bg-yellow-300 text-black"
                      : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                  }`}
                >
                  {item}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={loading || currentPage >= totalPages}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
