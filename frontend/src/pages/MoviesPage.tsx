import React from "react";
import { useEffect, useMemo, useState } from "react";
import { MovieCard } from "@/components/home/movie-card";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FilterBar } from "@/components/movie/FilterBar";
import { getMovieDetailPath } from "@/features/movies/routes";
import { fetchDiscoverMovies, fetchMovieGenres, mapTmdbMovieToCard } from "@/services/tmdb";

const SKELETON_COUNT = 14;

type MovieCardItem = {
  id: number;
  title: string;
  subtitle: string;
  imageSrc: string;
};

type GenreItem = { id: number; name: string };
type PaginationItem = number | "...";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

const REGION_OPTIONS = [
  { value: "US", label: "United States (US)" },
  { value: "KR", label: "Korea (KR)" },
  { value: "JP", label: "Japan (JP)" },
  { value: "VN", label: "Vietnam (VN)" },
  { value: "GB", label: "United Kingdom (GB)" },
  { value: "FR", label: "France (FR)" },
  { value: "IN", label: "India (IN)" },
  { value: "TH", label: "Thailand (TH)" },
];

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

export const MoviesPage = () => {
  const [movies, setMovies] = useState<MovieCardItem[]>([]);
  const [genres, setGenres] = useState<GenreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const years = useMemo(() => {
    const now = new Date().getFullYear();
    return Array.from({ length: now - 1980 + 1 }, (_, index) => now - index);
  }, []);

  const paginationItems = useMemo(
    () => buildPaginationItems(currentPage, totalPages),
    [currentPage, totalPages],
  );

  useEffect(() => {
    let active = true;

    const loadGenres = async () => {
      try {
        const genreList = await fetchMovieGenres("vi-VN");
        if (active) {
          setGenres(genreList);
        }
      } catch {
        if (active) {
          setGenres([]);
        }
      }
    };

    loadGenres();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchDiscoverMovies({
          page: currentPage,
          year: selectedYear,
          genre: selectedGenre,
          region: selectedRegion,
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
  }, [currentPage, selectedYear, selectedGenre, selectedRegion]);

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    setCurrentPage(1);
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
    setCurrentPage(1);
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-black text-zinc-100 sm:text-4xl">Phim Lẻ</h1>
          <p className="text-sm text-zinc-400">
            Trang {currentPage} / {totalPages}
          </p>
        </div>

        <FilterBar
          selectedYear={selectedYear}
          selectedGenre={selectedGenre}
          selectedRegion={selectedRegion}
          years={years}
          genres={genres}
          regions={REGION_OPTIONS}
          onYearChange={handleYearChange}
          onGenreChange={handleGenreChange}
          onRegionChange={handleRegionChange}
          disabled={loading}
        />

        <section className="transition-opacity duration-300">
          {loading && <MoviesSkeleton />}

          {!loading && error && (
            <div className="rounded-xl border border-red-500/30 bg-zinc-900 p-4 text-sm text-red-200">
              {error}
            </div>
          )}

          {!loading && !error && movies.length === 0 && (
            <div className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-5 text-sm text-zinc-300">
              Không tìm thấy phim phù hợp với bộ lọc hiện tại. Hãy thử đổi năm, thể loại hoặc quốc
              gia.
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
