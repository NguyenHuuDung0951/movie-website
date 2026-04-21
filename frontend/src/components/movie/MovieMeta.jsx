import React from "react";
const getYear = (movie) => {
  const date = movie?.release_date || movie?.first_air_date;
  return date ? String(date).slice(0, 4) : "N/A";
};

export const MovieMeta = ({ movie, genres = [] }) => {
  const title = movie?.title || movie?.name || "Untitled";
  const subtitle = movie?.original_title || movie?.original_name || title;

  return (
    <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-zinc-50 sm:text-3xl">{title}</h2>
        <p className="text-sm text-zinc-400 sm:text-base">{subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge>{getYear(movie)}</Badge>
        <Badge>HD</Badge>
        <Badge>T16+</Badge>
      </div>

      {!!genres.length && (
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <span
              key={genre.id || genre.name}
              className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-200"
            >
              {genre.name}
            </span>
          ))}
        </div>
      )}

      <p className="line-clamp-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
        {movie?.overview || "Hiện chưa có mô tả cho nội dung phim này."}
      </p>
    </section>
  );
};

const Badge = ({ children }) => (
  <span className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-100">
    {children}
  </span>
);
