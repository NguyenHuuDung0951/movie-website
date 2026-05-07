import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type TmdbSearchItem = {
  id: number;
  media_type: "movie" | "tv" | string;
  title?: string;
  original_title?: string;
  name?: string;
  original_name?: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  adult?: boolean;
  overview?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  status?: string;
};

type SearchComponentProps = {
  placeholder?: string;
  minLength?: number;
};

const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w154";

const buildPosterUrl = (path?: string | null) =>
  path ? `${TMDB_IMAGE_BASE}${path}` : "/home-background.jpg";

const getTitle = (item: TmdbSearchItem) =>
  item.media_type === "tv"
    ? item.name || item.original_name || "Không rõ"
    : item.title || item.original_title || "Không rõ";

const getSubtitle = (item: TmdbSearchItem) =>
  item.media_type === "tv"
    ? item.original_name || item.name || ""
    : item.original_title || item.title || "";

const getMetadata = (item: TmdbSearchItem) => {
  const year =
    item.media_type === "movie" ? item.release_date?.slice(0, 4) : item.first_air_date?.slice(0, 4);

  const ageRating = item.adult ? "18+" : "T16";

  if (item.media_type === "tv") {
    const seasons = item.number_of_seasons;
    const episodes = item.number_of_episodes;
    const status = item.status || "Phim bộ";
    const seasonLabel = seasons ? `Mùa ${seasons}` : "";
    const episodeLabel = episodes ? `${episodes} tập` : "";
    return [ageRating, year, [status, seasonLabel, episodeLabel].filter(Boolean).join(" • ")]
      .filter(Boolean)
      .join(" • ");
  }

  return [ageRating, year].filter(Boolean).join(" • ");
};

const searchMovies = async (query: string) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("Thiếu VITE_TMDB_API_KEY để tìm kiếm phim.");
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    query: query.trim(),
    include_adult: "false",
    language: "vi-VN",
    page: "1",
  });

  const response = await fetch(`${TMDB_API_URL}/search/multi?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Lỗi khi tìm kiếm dữ liệu từ TMDB.");
  }

  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
};

export const SearchComponent = ({
  placeholder = "Tìm kiếm phim...",
  minLength = 2,
}: SearchComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<TmdbSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const debounceTimer = useRef<number | null>(null);
  const navigate = useNavigate();

  const handleClear = () => {
    setSearchQuery("");
    setResults([]);
    setOpen(false);
    setError("");
  };

  const handleSelectResult = (item: TmdbSearchItem) => {
    const mediaType = item.media_type === "tv" ? "tv" : "movie";
    navigate(`/${mediaType}/${item.id}`);
    handleClear();
  };

  const handleSearch = useCallback(
    async (query: string) => {
      const trimmed = query.trim();
      if (!trimmed || trimmed.length < minLength) {
        setResults([]);
        setLoading(false);
        setError("");
        setOpen(Boolean(trimmed));
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await searchMovies(trimmed);
        setResults(data);
        setOpen(true);
        if (!data.length) {
          setError("Không tìm thấy kết quả");
        }
      } catch (err) {
        setResults([]);
        setError("Không thể tải kết quả. Vui lòng thử lại sau.");
        setOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [minLength],
  );

  useEffect(() => {
    if (debounceTimer.current) {
      window.clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = window.setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        window.clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery, handleSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl min-w-0">
      <div className="h-10 flex items-center rounded-2xl border border-zinc-800 bg-[#1a1d29]/95 px-4 shadow-sm shadow-black/20 transition focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/20">
        <div className="flex min-w-0 items-center gap-3 w-full">
          <Search className="h-5 w-5 shrink-0 text-zinc-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={() => {
              if (searchQuery.trim()) setOpen(true);
            }}
            placeholder={placeholder}
            className="min-w-0 w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition hover:bg-white/10"
              aria-label="Xóa bỏ nội dung tìm kiếm"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      {open && (
        <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-3xl border border-white/10 bg-[#0f1220]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Danh sách phim
          </div>
          <div
            className="max-h-[500px] overflow-y-auto pr-2"
            style={{ scrollbarWidth: "thin", msOverflowStyle: "auto" }}
          >
            {loading ? (
              <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-6 text-center text-sm text-zinc-300">
                Loading...
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-6 text-center text-sm text-zinc-300">
                {error}
              </div>
            ) : (
              results.map((item) => (
                <div
                  key={`${item.media_type}-${item.id}`}
                  onClick={() => handleSelectResult(item)}
                  className="mb-2 flex cursor-pointer gap-3 rounded-3xl px-3 py-3 transition hover:bg-white/10"
                >
                  <div className="flex h-20 w-14 shrink-0 overflow-hidden rounded-2xl bg-zinc-950">
                    <img
                      src={buildPosterUrl(item.poster_path)}
                      alt={getTitle(item)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-white">
                      {getTitle(item)}
                    </div>
                    <div className="mt-1 truncate text-xs text-gray-400">{getSubtitle(item)}</div>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-yellow-100/90">
                      <span>{getMetadata(item)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
