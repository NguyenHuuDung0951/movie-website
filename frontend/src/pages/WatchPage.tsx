import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { EpisodeList } from "@/components/watch/EpisodeList";
import { MovieSidebar } from "@/components/watch/MovieSidebar";
import { VideoPlayer } from "@/components/watch/VideoPlayer";
import { fetchWatchBundle, pickPlayableWatchVideo } from "@/services/watch";

const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";

const WatchPageSkeleton = () => (
  <main className="mx-auto w-full max-w-7xl animate-pulse space-y-6 px-4 py-6 sm:px-6 sm:py-8">
    <div className="h-14 rounded-xl bg-zinc-800" />
    <div className="h-[52vw] max-h-140 rounded-2xl bg-zinc-800" />
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="h-72 rounded-2xl bg-zinc-800" />
      <div className="h-72 rounded-2xl bg-zinc-800" />
    </div>
  </main>
);

const formatYear = (dateStr) => {
  if (!dateStr) return "N/A";
  const year = new Date(dateStr).getFullYear();
  return Number.isNaN(year) ? "N/A" : String(year);
};

const truncateText = (value, max = 280) => {
  if (!value) return "Đang cập nhật nội dung phim.";
  return value.length > max ? `${value.slice(0, max)}...` : value;
};

export const WatchPage = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();

  const mediaType = type === "tv" ? "tv" : "movie";

  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    let active = true;

    const fetchWatchData = async () => {
      try {
        setLoading(true);
        setError("");

        const watchData = await fetchWatchBundle({
          type: mediaType,
          id,
          language: "vi-VN",
          page: 1,
        });

        if (!active) return;

        const detail = watchData.detail;
        const seasons = detail?.seasons || [];
        const firstSeason = seasons.find((season) => season.season_number > 0) || seasons[0];

        setSelectedSeason(firstSeason?.season_number || 1);
        setPayload({
          detail,
          videos: watchData.videos,
          credits: watchData.credits,
          similar: watchData.similar,
          trending: watchData.trending,
          seasons,
        });
      } catch (fetchError) {
        if (!active) return;
        setError(fetchError?.message || "Không thể tải dữ liệu watch page.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchWatchData();

    return () => {
      active = false;
    };
  }, [id, mediaType]);

  const title = payload?.detail?.title || payload?.detail?.name || "Đang tải...";
  const subtitle = payload?.detail?.original_title || payload?.detail?.original_name || title;
  const releaseDate = payload?.detail?.release_date || payload?.detail?.first_air_date;
  const year = formatYear(releaseDate);
  const selectedVideo = useMemo(() => {
    return pickPlayableWatchVideo(payload?.videos);
  }, [payload]);

  if (loading) {
    return (
      <>
        <Header />
        <WatchPageSkeleton />
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="rounded-2xl border border-red-500/30 bg-zinc-900 p-6 text-red-200">
            {error}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="mb-5 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/75 p-3 sm:p-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            Quay lại
          </button>
          <h1 className="line-clamp-1 text-lg font-bold text-zinc-100 sm:text-xl">{title}</h1>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <VideoPlayer
              selectedVideo={selectedVideo}
              title={title}
              backdropPath={
                payload?.detail?.backdrop_path
                  ? `${TMDB_IMAGE}${payload?.detail?.backdrop_path}`
                  : ""
              }
            />

            <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="h-40 w-28 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                  {payload?.detail?.poster_path ? (
                    <img
                      src={`${TMDB_IMAGE}${payload.detail.poster_path}`}
                      alt={title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-black text-zinc-100">{title}</h2>
                  <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-100">
                      {Number(payload?.detail?.vote_average || 0).toFixed(1)}
                    </span>
                    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-100">
                      {year}
                    </span>
                    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-100">
                      HD
                    </span>
                    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-100">
                      Full
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-300">
                    {(payload?.detail?.genres || []).map((genre) => (
                      <span key={genre.id} className="rounded-full bg-zinc-800 px-2.5 py-1">
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                    {truncateText(payload?.detail?.overview)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      to={`/${mediaType}/${id}`}
                      className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
                    >
                      Xem trang chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {mediaType === "tv" ? (
              <EpisodeList
                seasons={payload?.seasons || []}
                selectedSeason={selectedSeason}
                onSeasonChange={setSelectedSeason}
              />
            ) : null}

            <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 sm:p-5">
              <h2 className="text-lg font-bold text-zinc-100">Bình luận</h2>
              <p className="mt-1 text-sm text-zinc-400">Đăng nhập để bình luận về bộ phim này.</p>

              <textarea
                rows={4}
                placeholder="Viết bình luận của bạn..."
                className="mt-4 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-400"
              />

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">Login to comment</span>
                <button
                  type="button"
                  className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
                >
                  Gửi bình luận
                </button>
              </div>
            </section>
          </div>

          <MovieSidebar
            credits={payload?.credits}
            similar={payload?.similar}
            trending={payload?.trending}
            type={mediaType}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};
