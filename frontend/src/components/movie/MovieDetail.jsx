import React from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EpisodeList } from "./EpisodeList";
import { MovieHero } from "./MovieHero";
import { MovieMeta } from "./MovieMeta";

const TABS = ["Tập phim", "Gallery", "OST", "Diễn viên", "Đề xuất"];
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const ACTOR_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const getImageUrl = (path, base = IMAGE_BASE) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${base}/${String(path).replace(/^\/+/, "")}`;
};

export const MovieDetail = ({ movie, genres = [], credits, videos, similar, mediaType }) => {
  const [activeTab, setActiveTab] = useState("Tập phim");
  const isTv = mediaType === "tv";
  const episodeTotal = Number(movie?.number_of_episodes || 0);

  const actors = useMemo(() => credits?.cast?.slice(0, 12) || [], [credits]);
  const ostVideos = useMemo(
    () => (videos?.results || []).filter((video) => video.site === "YouTube").slice(0, 8),
    [videos],
  );
  const similarItems = useMemo(() => similar?.results?.slice(0, 12) || [], [similar]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <MovieHero movie={movie} mediaType={mediaType} />
      <MovieMeta movie={movie} genres={genres} />

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-6">
        <div className="scrollbar-hide flex gap-5 overflow-x-auto border-b border-zinc-800 pb-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 border-b-2 pb-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "border-yellow-400 text-yellow-300"
                  : "border-transparent text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {activeTab === "Tập phim" && (isTv ? <EpisodeList totalEpisodes={episodeTotal} /> : null)}

          {activeTab === "Gallery" && (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {[movie?.backdrop_path, movie?.poster_path, movie?.backdrop_path]
                .filter(Boolean)
                .map((path, index) => (
                  <img
                    key={`${path}-${index}`}
                    src={getImageUrl(path)}
                    alt="Gallery"
                    className="h-36 w-full rounded-lg border border-zinc-800 object-cover sm:h-44"
                  />
                ))}
            </div>
          )}

          {activeTab === "OST" && (
            <div className="space-y-2">
              {ostVideos.length ? (
                ostVideos.map((video) => (
                  <a
                    key={video.id}
                    href={`https://www.youtube.com/watch?v=${video.key}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg border border-zinc-700 bg-zinc-800/70 px-4 py-3 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-700/70"
                  >
                    {video.name}
                  </a>
                ))
              ) : (
                <p className="text-sm text-zinc-400">Chưa có danh sách OST.</p>
              )}
            </div>
          )}

          {activeTab === "Diễn viên" && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {actors.map((actor) => (
                <article
                  key={actor.id}
                  className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800/60"
                >
                  <img
                    src={
                      actor.profile_path
                        ? getImageUrl(actor.profile_path, ACTOR_IMAGE_BASE)
                        : "https://placehold.co/400x600/1f2937/e5e7eb?text=No+Image"
                    }
                    alt={actor.name}
                    className="aspect-2/3 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="space-y-1 p-3">
                    <p className="line-clamp-1 text-sm font-semibold text-zinc-100">{actor.name}</p>
                    <p className="line-clamp-1 text-xs text-zinc-400">{actor.character}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === "Đề xuất" && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {similarItems.map((item) => {
                const targetType = mediaType === "tv" ? "tv" : "movie";
                const itemTitle = item.title || item.name || "Untitled";
                return (
                  <Link
                    key={item.id}
                    to={`/${targetType}/${item.id}`}
                    className="group overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900/60 transition hover:-translate-y-0.5 hover:border-zinc-500"
                  >
                    <img
                      src={getImageUrl(item.poster_path)}
                      alt={itemTitle}
                      className="aspect-2/3 w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <p className="line-clamp-1 p-2 text-xs font-medium text-zinc-100 sm:text-sm">
                      {itemTitle}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
