import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Panel, SkeletonBlock } from "@/dashboard/common";
import { DevicePoint } from "@/dashboard/types";

type DeviceChartProps = {
  data: DevicePoint[];
  loading: boolean;
};

const colors = ["#3B82F6", "#06B6D4", "#A855F7", "#60A5FA", "#22D3EE"];

export const DeviceChart = ({ data, loading }: DeviceChartProps) => {
  const total = data.reduce((sum, item) => sum + item.sessions, 0);

  return (
    <Panel title="Device Breakdown" subtitle="Sessions by consumption device">
      {loading ? (
        <SkeletonBlock className="h-[290px] w-full" />
      ) : (
        <div className="grid h-[290px] items-center gap-2 md:grid-cols-[1fr_1fr]">
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="sessions"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={86}
                  paddingAngle={3}
                >
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value.toLocaleString()} sessions`}
                  contentStyle={{
                    background: "#111219",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-2 text-sm">
            {data.map((item, index) => (
              <li key={item.name} className="flex items-center justify-between text-zinc-300">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  {item.name}
                </span>
                <span>
                  {((item.sessions / total) * 100).toFixed(1)}% ({item.sessions.toLocaleString()})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Panel>
  );
};
