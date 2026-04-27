import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Panel, SkeletonBlock } from "@/dashboard/common";
import { TrafficPoint } from "@/dashboard/types";

type ViewsChartProps = {
  data: TrafficPoint[];
  loading: boolean;
};

const seriesMeta = {
  totalViews: { label: "Total Views", color: "#3B82F6" },
  uniqueVisitors: { label: "Unique Visitors", color: "#06B6D4" },
  newUsers: { label: "New Users", color: "#A855F7" },
  returningUsers: { label: "Returning Users", color: "#67E8F9" },
} as const;

type SeriesKey = keyof typeof seriesMeta;

export const ViewsChart = ({ data, loading }: ViewsChartProps) => {
  const [visible, setVisible] = useState<Record<SeriesKey, boolean>>({
    totalViews: true,
    uniqueVisitors: true,
    newUsers: true,
    returningUsers: false,
  });

  const toggles = useMemo(
    () => Object.entries(seriesMeta) as [SeriesKey, (typeof seriesMeta)[SeriesKey]][],
    [],
  );

  return (
    <Panel
      title="Views & Traffic Over Time"
      subtitle="Compare total streams, visitors, and user behavior over selected period"
      rightSlot={
        <div className="flex flex-wrap justify-end gap-2">
          {toggles.map(([key, meta]) => (
            <button
              key={key}
              type="button"
              onClick={() => setVisible((prev) => ({ ...prev, [key]: !prev[key] }))}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                visible[key]
                  ? "border-transparent text-white"
                  : "border-white/15 text-zinc-400 hover:text-zinc-200"
              }`}
              style={visible[key] ? { backgroundColor: `${meta.color}33` } : undefined}
            >
              {meta.label}
            </button>
          ))}
        </div>
      }
    >
      {loading ? (
        <SkeletonBlock className="h-[340px] w-full" />
      ) : (
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: 6, right: 12, top: 12, bottom: 0 }}>
              <defs>
                {toggles.map(([key, meta]) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={meta.color} stopOpacity={0.45} />
                    <stop offset="90%" stopColor={meta.color} stopOpacity={0.05} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid stroke="#2A2A36" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={56}
              />
              <Tooltip
                contentStyle={{
                  background: "#111219",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
              />
              <Legend />
              {toggles.map(([key, meta]) =>
                visible[key] ? (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={meta.color}
                    fill={`url(#grad-${key})`}
                    strokeWidth={2}
                    dot={false}
                  />
                ) : null,
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Panel>
  );
};
