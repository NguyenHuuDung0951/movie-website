import React from "react";
export const EpisodeList = ({ totalEpisodes = 0 }) => {
  if (!totalEpisodes) {
    return null;
  }

  const episodes = Array.from({ length: totalEpisodes }, (_, index) => index + 1);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-6">
      <h3 className="mb-4 text-lg font-bold text-zinc-100 sm:text-xl">Danh sách tập</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {episodes.map((episode) => (
          <button
            key={episode}
            type="button"
            className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:scale-[1.03] hover:border-yellow-400 hover:text-white"
          >
            Tập {episode}
          </button>
        ))}
      </div>
    </section>
  );
};
