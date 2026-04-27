import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Panel, SkeletonBlock } from "@/dashboard/common";
import { RevenuePlanPoint, RevenuePoint } from "@/dashboard/types";

type RevenueSectionProps = {
  byPeriod: RevenuePoint[];
  byPlan: RevenuePlanPoint[];
  totalMRR: number;
  loading: boolean;
};

const planColors = ["#6D28D9", "#A855F7", "#3B82F6", "#06B6D4"];

export const RevenueSection = ({ byPeriod, byPlan, totalMRR, loading }: RevenueSectionProps) => {
  return (
    <section className="grid gap-4 xl:grid-cols-2">
      <Panel title="Revenue by Period" subtitle="Stacked subscription and ad revenue">
        {loading ? (
          <SkeletonBlock className="h-[290px] w-full" />
        ) : (
          <div className="h-[290px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byPeriod} margin={{ left: 0, right: 12, top: 12, bottom: 0 }}>
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
                <Bar dataKey="subscription" stackId="rev" fill="#3B82F6" radius={[5, 5, 0, 0]} />
                <Bar dataKey="ads" stackId="rev" fill="#06B6D4" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Panel>

      <Panel title="Revenue by Plan" subtitle="Plan contribution to MRR">
        {loading ? (
          <SkeletonBlock className="h-[290px] w-full" />
        ) : (
          <div className="grid h-[290px] grid-cols-1 items-center gap-2 md:grid-cols-[1.2fr_1fr]">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={byPlan}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={52}
                    outerRadius={86}
                    paddingAngle={3}
                  >
                    {byPlan.map((entry, index) => (
                      <Cell key={entry.name} fill={planColors[index % planColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#111219",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Total MRR</p>
              <p className="mt-2 text-3xl font-semibold text-zinc-100">
                ${totalMRR.toLocaleString()}
              </p>
              <ul className="mt-4 space-y-2">
                {byPlan.map((item, index) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between text-sm text-zinc-300"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: planColors[index % planColors.length] }}
                      />
                      {item.name}
                    </span>
                    <span>{item.value.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Panel>
    </section>
  );
};
