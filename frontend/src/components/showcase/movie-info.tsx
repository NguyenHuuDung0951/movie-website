import { useState } from "react";
import { ShowcaseMovie } from "@/features/movies/types";
import { getWatchPath } from "@/features/movies/routes";
import { Link } from "react-router-dom";
import { AddToPlaylistModal } from "@/components/movie/AddToPlaylistModal";
import type { PlaylistMovie } from "@/features/playlists/playlist-api";

type Props = {
  movie: ShowcaseMovie;
};

export const MovieInfo = ({ movie }: Props) => {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const playlistMovie: PlaylistMovie = {
    tmdbId: movie.id,
    mediaType: "movie",
    title: movie.title,
    posterPath: movie.posterPath,
  };

  return (
    <>
      <section className="max-w-2xl space-y-5">
        {/* <p className="inline-flex rounded-full border border-zinc-600/70 bg-zinc-900/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
        Movie Showcase
      </p> */}

        <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">{movie.title}</h1>

        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-600/70 bg-black/45 px-3 py-1">
          <span className="text-yellow-300">★</span>
          <span className="text-sm font-semibold text-zinc-100">
            {movie.voteAverage.toFixed(1)} / 10
          </span>
        </div>

        <p className="max-w-xl text-base leading-relaxed text-zinc-200 sm:text-lg">
          {movie.overview}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to={getWatchPath("movie", movie.id)}
            aria-label={`Xem phim ${movie.title}`}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Xem ngay
          </Link>
          <button
            type="button"
            onClick={() => setIsPlaylistOpen(true)}
            className="rounded-full border border-zinc-500 bg-zinc-900/40 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-zinc-300 hover:text-white"
          >
            Thêm vào danh sách
          </button>
        </div>
      </section>

      <AddToPlaylistModal
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        movie={playlistMovie}
      />
    </>
  );
};
