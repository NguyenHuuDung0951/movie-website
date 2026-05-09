import React from "react";
import { Link } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

type CardItem = {
  id?: number | string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string | null;
};

type Props = {
  credits?: { cast?: Array<Record<string, unknown>> };
  similar?: { results?: CardItem[] };
  trending?: { results?: CardItem[] };
  type: "movie" | "tv";
};

export const MovieSidebar = ({ credits, similar, trending, type }: Props) => {
  const castList = credits?.cast?.slice(0, 8) || [];
  const similarList = similar?.results?.slice(0, 10) || [];
  const trendingList = trending?.results?.slice(0, 10) || [];

  return (
    <aside className="space-y-4">
      {/* <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 sm:p-5">
        <div className="flex gap-2.5">
          <button
            type="button"
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            Đánh giá
          </button>
          <button
            type="button"
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            Yêu thích
          </button>
        </div>
      </section> */}

      {/* <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 sm:p-5">
        <h3 className="mb-3 text-base font-bold text-zinc-100">Diễn viên</h3>
        <div className="space-y-2.5">
          {castList.length > 0 ? (
            castList.map((actor) => (
              <div
                key={actor.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-200"
              >
                <p className="font-medium text-zinc-100">{actor.name}</p>
                <p className="text-xs text-zinc-400">{actor.character || "Đang cập nhật vai diễn"}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-400">Chưa có dữ liệu diễn viên.</p>
          )}
        </div>
      </section> */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 sm:p-5">
        <h3 className="mb-3 text-base font-bold text-zinc-100">Phim tương tự</h3>
        <div className="space-y-2.5">
          {similarList.length > 0 ? (
            similarList.map((item) => {
              const movieTitle = item.title || item.name || "Untitled";
              const subtitle = item.release_date || item.first_air_date || "Đang cập nhật";
              const targetId = item.id ?? 0;

              return (
                <Link
                  key={`${type}-similar-${targetId}-${movieTitle}`}
                  to={`/watch/${type}/${targetId}`}
                  className="group flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 p-2 transition hover:border-zinc-600 hover:bg-zinc-800/80"
                >
                  <div className="h-16 w-12 shrink-0 overflow-hidden rounded-md bg-zinc-800">
                    {item.poster_path ? (
                      <img
                        src={`${IMAGE_BASE}${item.poster_path}`}
                        alt={movieTitle}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-zinc-100">{movieTitle}</p>
                    <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-sm text-zinc-400">Chưa có phim tương tự.</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 sm:p-5">
        <h3 className="mb-3 text-base font-bold text-zinc-100">Phim đang thịnh hành</h3>
        <div className="space-y-2.5">
          {trendingList.length > 0 ? (
            trendingList.map((item) => {
              const movieTitle = item.title || item.name || "Untitled";
              const subtitle = item.release_date || item.first_air_date || "Đang cập nhật";
              const targetId = item.id ?? 0;

              return (
                <Link
                  key={`${type}-trending-${targetId}-${movieTitle}`}
                  to={`/watch/${type}/${targetId}`}
                  className="group flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 p-2 transition hover:border-zinc-600 hover:bg-zinc-800/80"
                >
                  <div className="h-16 w-12 shrink-0 overflow-hidden rounded-md bg-zinc-800">
                    {item.poster_path ? (
                      <img
                        src={`${IMAGE_BASE}${item.poster_path}`}
                        alt={movieTitle}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-zinc-100">{movieTitle}</p>
                    <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-sm text-zinc-400">Chưa có phim đang thịnh hành.</p>
          )}
        </div>
      </section>
    </aside>
  );
};
