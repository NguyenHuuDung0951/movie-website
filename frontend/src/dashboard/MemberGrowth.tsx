import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Panel, SkeletonBlock } from "@/dashboard/common";
import { MemberGrowthPoint } from "@/dashboard/types";

type MemberGrowthProps = {
  data: MemberGrowthPoint[];
  loading: boolean;
};

export const MemberGrowth = ({ data, loading }: MemberGrowthProps) => {
  return (
    <Panel title="Member Growth" subtitle="Cumulative members with period sign-up overlay">
      {loading ? (
        <SkeletonBlock className="h-[320px] w-full" />
      ) : (
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ left: 6, right: 12, top: 12, bottom: 4 }}>
              <defs>
                <linearGradient id="member-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#2A2A36" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={56}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <Tooltip
                contentStyle={{
                  background: "#111219",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="totalMembers"
                stroke="#06B6D4"
                fill="url(#member-area)"
              />
              <Bar
                yAxisId="right"
                dataKey="signups"
                fill="#A855F7"
                radius={[4, 4, 0, 0]}
                maxBarSize={22}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </Panel>
  );
};
