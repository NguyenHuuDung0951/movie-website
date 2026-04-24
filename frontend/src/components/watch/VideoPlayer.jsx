import React from "react";

const CONTROL_BUTTON =
  "inline-flex h-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/85 px-3 text-xs font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800";

export const VideoPlayer = ({ selectedVideo, title, backdropPath }) => {
  const embedUrl = selectedVideo?.embedUrl || "";
  const watchUrl = selectedVideo?.watchUrl || "";

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-black">
      <div className="aspect-video w-full bg-zinc-900">
        {embedUrl ? (
          <iframe
            title={`Video ${title}`}
            src={embedUrl}
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
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 px-4 text-center text-sm text-zinc-200">
              <span>Không có video nhúng phù hợp để phát trực tiếp.</span>
              {watchUrl ? (
                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-100 transition hover:border-zinc-400 hover:bg-zinc-800"
                >
                  Mở video ở tab mới
                </a>
              ) : null}
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
