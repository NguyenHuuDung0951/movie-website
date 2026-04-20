import React from "react";
import { Heart, MessageCircle, Play, Plus, Share2 } from "lucide-react";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${IMAGE_BASE}/${String(path).replace(/^\/+/, "")}`;
};

export const MovieHero = ({ movie }) => {
  const title = movie?.title || movie?.name || "Untitled";
  const subtitle = movie?.original_title || movie?.original_name || title;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-zinc-950">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie?.backdrop_path)}
          alt={title}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
      </div>

      <div className="relative z-10 grid min-h-[400px] grid-cols-1 px-4 pb-6 pt-8 sm:px-6 md:min-h-[500px] md:grid-cols-[1fr_260px] md:px-8 md:pt-10">
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="text-sm text-zinc-300 sm:text-base">{subtitle}</p>

            <span className="inline-flex rounded-full border border-yellow-400/60 bg-yellow-400/20 px-3 py-1 text-sm font-semibold text-yellow-200">
              ★ {Number(movie?.vote_average || 0).toFixed(1)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-zinc-900 transition hover:bg-yellow-300"
            >
              <Play className="h-4 w-4 fill-current" />
              Xem ngay
            </button>
            <ActionIconButton label="Yêu thích" icon={<Heart className="h-4 w-4" />} />
            <ActionIconButton label="Thêm vào" icon={<Plus className="h-4 w-4" />} />
            <ActionIconButton label="Chia sẻ" icon={<Share2 className="h-4 w-4" />} />
            <ActionIconButton label="Bình luận" icon={<MessageCircle className="h-4 w-4" />} />
          </div>
        </div>

        <div className="mt-6 hidden justify-end md:flex">
          <img
            src={getImageUrl(movie?.poster_path)}
            alt={title}
            className="h-[340px] w-[230px] rounded-xl border border-zinc-700/80 object-cover shadow-2xl shadow-black/70"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

const ActionIconButton = ({ label, icon }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-zinc-100 backdrop-blur transition hover:scale-105 hover:bg-white/20 sm:text-sm"
      aria-label={label}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
