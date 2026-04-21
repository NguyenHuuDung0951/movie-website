import React from "react";

const CONTROL_BUTTON =
  "inline-flex h-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/85 px-3 text-xs font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800";

export const VideoPlayer = ({ trailerKey, title, backdropPath }) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-black">
      <div className="aspect-video w-full bg-zinc-900">
        {trailerKey ? (
          <iframe
            title={`Trailer ${title}`}
            src={`https://www.youtube.com/embed/${trailerKey}?rel=0&modestbranding=1&autoplay=0`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="relative h-full w-full">
            {backdropPath ? (
              <img
                src={backdropPath}
                alt={title}
                loading="lazy"
                className="h-full w-full object-cover opacity-70"
              />
            ) : (
              <div className="h-full w-full bg-zinc-900" />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm text-zinc-200">
              Chưa có trailer phù hợp để phát.
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-zinc-800 bg-zinc-950/90 px-3 py-3 sm:px-4">
        <button type="button" className={CONTROL_BUTTON}>
          Play
        </button>
        <button type="button" className={CONTROL_BUTTON}>
          Tua 10s
        </button>
        <button type="button" className={CONTROL_BUTTON}>
          CC
        </button>
        <div className="ml-auto flex min-w-[140px] items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-zinc-800">
            <div className="h-full w-1/3 rounded-full bg-white" />
          </div>
          <span className="text-xs text-zinc-300">12:08</span>
        </div>
      </div>
    </section>
  );
};
