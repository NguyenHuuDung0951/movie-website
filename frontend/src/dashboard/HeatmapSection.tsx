import { Panel, SkeletonBlock } from "@/dashboard/common";
import { HeatmapRow } from "@/dashboard/types";

type HeatmapSectionProps = {
  data: HeatmapRow[];
  loading: boolean;
};

const intensityClass = (value: number) => {
  if (value < 25) return "bg-[#1e2030]";
  if (value < 45) return "bg-[#24344f]";
  if (value < 65) return "bg-[#245f86]";
  if (value < 85) return "bg-[#1f7fc5]";
  return "bg-[#a855f7]";
};

export const HeatmapSection = ({ data, loading }: HeatmapSectionProps) => {
  return (
    <Panel title="Watch Session Heatmap" subtitle="Active session density by day and hour">
      {loading ? (
        <SkeletonBlock className="h-[290px] w-full" />
      ) : (
        <div className="overflow-x-auto">
          <div className="grid min-w-[760px] grid-cols-[82px_repeat(24,minmax(18px,1fr))] items-center gap-1">
            <span className="text-xs text-zinc-500">Day / Hour</span>
            {Array.from({ length: 24 }, (_, hour) => (
              <span key={hour} className="text-center text-[10px] text-zinc-500">
                {hour}
              </span>
            ))}
            {data.map((row) => (
              <>
                <span key={`${row.day}-label`} className="text-xs font-medium text-zinc-300">
                  {row.day}
                </span>
                {row.hours.map((value, hour) => (
                  <div
                    key={`${row.day}-${hour}`}
                    className={`h-5 rounded-sm transition hover:scale-110 ${intensityClass(value)}`}
                    title={`${row.day} ${hour}:00 - ${value} sessions`}
                  />
                ))}
              </>
            ))}
          </div>
        </div>
      )}
      <div className="mt-3 flex items-center justify-end gap-2 text-xs text-zinc-500">
        <span>Low</span>
        <span className="h-2 w-6 rounded bg-[#1e2030]" />
        <span className="h-2 w-6 rounded bg-[#245f86]" />
        <span className="h-2 w-6 rounded bg-[#a855f7]" />
        <span>High</span>
      </div>
    </Panel>
  );
};
