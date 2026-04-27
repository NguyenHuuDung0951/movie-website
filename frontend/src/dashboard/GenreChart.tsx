import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Panel, SkeletonBlock } from "@/dashboard/common";
import { GenrePoint } from "@/dashboard/types";

type GenreChartProps = {
  data: GenrePoint[];
  loading: boolean;
};

export const GenreChart = ({ data, loading }: GenreChartProps) => {
  return (
    <Panel title="Genre Distribution" subtitle="Total titles and audience view-share by genre">
      {loading ? (
        <SkeletonBlock className="h-[370px] w-full" />
      ) : (
        <div className="h-[370px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ left: 20, right: 12, top: 8, bottom: 8 }}
            >
              <CartesianGrid stroke="#2A2A36" strokeDasharray="4 4" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="genre"
                type="category"
                tick={{ fill: "#D4D4D8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={92}
              />
              <Tooltip
                formatter={(value: number, _name, payload) => [
                  `${value} titles`,
                  payload?.payload?.genre || "",
                ]}
                contentStyle={{
                  background: "#111219",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="totalTitles" fill="#A855F7" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {!loading ? (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-400 sm:grid-cols-5">
          {data.slice(0, 5).map((genre) => (
            <div
              key={genre.genre}
              className="rounded-lg border border-white/10 bg-black/20 px-2 py-1.5 text-center"
            >
              {genre.genre}: {genre.viewShare}%
            </div>
          ))}
        </div>
      ) : null}
    </Panel>
  );
};
