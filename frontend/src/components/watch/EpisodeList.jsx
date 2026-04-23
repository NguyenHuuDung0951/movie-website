import React from "react";

export const EpisodeList = ({ seasons, selectedSeason, onSeasonChange }) => {
  if (!seasons?.length) {
    return null;
  }

  const activeSeason =
    seasons.find((season) => season.season_number === selectedSeason) || seasons[0];
  const episodeCount = Math.max(activeSeason?.episode_count || 0, 0);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-zinc-100">Danh sách tập</h2>

        <select
          value={selectedSeason}
          onChange={(event) => onSeasonChange(Number(event.target.value))}
          className="h-10 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-400"
        >
          {seasons.map((season) => (
            <option key={season.id || season.season_number} value={season.season_number}>
              {season.name || `Season ${season.season_number}`}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 xl:grid-cols-6">
        {episodeCount > 0 ? (
          Array.from({ length: episodeCount }, (_, index) => {
            const episodeNumber = index + 1;

            return (
              <button
                key={episodeNumber}
                type="button"
                className="rounded-xl border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800"
              >
                Tập {episodeNumber}
              </button>
            );
          })
        ) : (
          <p className="col-span-full text-sm text-zinc-400">Chưa có dữ liệu tập cho season này.</p>
        )}
      </div>
    </section>
  );
};
