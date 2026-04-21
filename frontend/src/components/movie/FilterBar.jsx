import React from "react";

export const FilterBar = ({
  selectedYear,
  selectedGenre,
  selectedRegion,
  years,
  genres,
  regions,
  onYearChange,
  onGenreChange,
  onRegionChange,
  disabled,
}) => {
  const inputClassName =
    "h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="space-y-2 text-sm text-zinc-300">
          <span className="font-medium text-zinc-200">Năm phát hành</span>
          <select
            value={selectedYear}
            onChange={(event) => onYearChange(event.target.value)}
            className={inputClassName}
            disabled={disabled}
          >
            <option value="">Tất cả năm</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-zinc-300">
          <span className="font-medium text-zinc-200">Thể loại</span>
          <select
            value={selectedGenre}
            onChange={(event) => onGenreChange(event.target.value)}
            className={inputClassName}
            disabled={disabled}
          >
            <option value="">Tất cả thể loại</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-zinc-300 sm:col-span-2 lg:col-span-1">
          <span className="font-medium text-zinc-200">Quốc gia</span>
          <select
            value={selectedRegion}
            onChange={(event) => onRegionChange(event.target.value)}
            className={inputClassName}
            disabled={disabled}
          >
            <option value="">Tất cả quốc gia</option>
            {regions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
};
