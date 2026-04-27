import { Panel, SkeletonBlock } from "@/dashboard/common";
import { LibraryStat } from "@/dashboard/types";

type LibraryStatsProps = {
  stats: LibraryStat[];
  loading: boolean;
};

export const LibraryStats = ({ stats, loading }: LibraryStatsProps) => {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Panel key={index} className="p-4">
              <SkeletonBlock className="h-5 w-40" />
              <SkeletonBlock className="mt-4 h-9 w-32" />
              <SkeletonBlock className="mt-4 h-24 w-full" />
            </Panel>
          ))
        : stats.map((stat) => (
            <Panel key={stat.label} title={stat.label} subtitle={stat.subtitle}>
              <p className="mb-4 text-3xl font-semibold text-zinc-100">{stat.value}</p>
              {stat.bars ? (
                <div className="space-y-2">
                  {stat.bars.map((bar) => (
                    <div key={bar.label} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>{bar.label}</span>
                        <span>{bar.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#181b29]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#A855F7] to-[#3B82F6]"
                          style={{ width: `${bar.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {stat.calendar ? (
                <div className="grid grid-cols-7 gap-1">
                  {stat.calendar.map((value, index) => (
                    <div
                      key={index}
                      className="h-5 rounded-sm"
                      style={{
                        backgroundColor:
                          value > 6
                            ? "#A855F7"
                            : value > 4
                              ? "#3B82F6"
                              : value > 2
                                ? "#06B6D4"
                                : "#1f2937",
                      }}
                      title={`Day ${index + 1}: ${value} uploads`}
                    />
                  ))}
                </div>
              ) : null}
            </Panel>
          ))}
    </section>
  );
};
