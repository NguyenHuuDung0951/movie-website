import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Panel, SkeletonBlock } from "@/dashboard/common";
import { TrendingItem } from "@/dashboard/types";

type FilterType = "all" | "movie" | "series";

type TrendingContentProps = {
  items: TrendingItem[];
  loading: boolean;
};

export const TrendingContent = ({ items, loading }: TrendingContentProps) => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = useMemo(() => {
    if (filter === "all") {
      return items;
    }
    return items.filter((item) => item.type === filter);
  }, [items, filter]);

  return (
    <Panel
      title="Top 10 Trending Movies/Series"
      subtitle="Live engagement movement compared with previous period"
      rightSlot={
        <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 p-1 text-xs">
          {(
            [
              ["all", "All"],
              ["movie", "Movies"],
              ["series", "Series"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-md px-2.5 py-1.5 transition ${
                filter === value ? "bg-[#3B82F6]/25 text-zinc-100" : "text-zinc-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item, index) => (
            <article
              key={item.id}
              className="grid grid-cols-[24px_40px_minmax(0,1fr)_78px_70px] items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-3 py-2 text-sm transition hover:border-[#3B82F6]/40"
            >
              <span className="text-zinc-500">#{index + 1}</span>
              <div className="h-10 w-8 rounded-md" style={{ backgroundColor: item.posterColor }} />
              <div className="min-w-0">
                <p className="truncate font-medium text-zinc-100">{item.title}</p>
                <p className="text-xs text-zinc-400">
                  <span className="rounded-full border border-white/10 px-2 py-0.5">
                    {item.genre}
                  </span>
                </p>
              </div>
              <p className="text-right text-zinc-200">{item.views}</p>
              <div className="text-right">
                <p className="inline-flex items-center justify-end gap-1 text-amber-300">
                  <Star size={13} fill="currentColor" /> {item.rating}
                </p>
                <p
                  className={`text-xs ${item.changePct >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {item.changePct >= 0 ? "+" : ""}
                  {item.changePct}%
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </Panel>
  );
};
