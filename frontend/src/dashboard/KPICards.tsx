import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { KpiItem } from "@/dashboard/types";
import { Panel, SkeletonBlock } from "@/dashboard/common";

type KPICardsProps = {
  items: KpiItem[];
  loading: boolean;
};

export const KPICards = ({ items, loading }: KPICardsProps) => {
  if (loading) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Panel key={index} className="p-4">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="mt-4 h-8 w-28" />
            <SkeletonBlock className="mt-4 h-10 w-full" />
          </Panel>
        ))}
      </section>
    );
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {items.map((item) => {
        const positive = item.changePct >= 0;

        return (
          <Panel
            key={item.id}
            className="p-4 transition hover:-translate-y-0.5 hover:border-[#3B82F6]/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-zinc-100">{item.value}</p>
              </div>
              <span className="text-xl">{item.icon}</span>
            </div>

            <div className="mt-3 flex items-center gap-1 text-xs">
              <span
                className={`inline-flex items-center ${positive ? "text-emerald-400" : "text-rose-400"}`}
              >
                {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(item.changePct).toFixed(1)}%
              </span>
              <span className="text-zinc-500">vs previous period</span>
            </div>

            <div className="mt-3 h-12 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={item.trend}>
                  <defs>
                    <linearGradient id={`spark-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={positive ? "#3B82F6" : "#A855F7"}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={positive ? "#3B82F6" : "#A855F7"}
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={positive ? "#3B82F6" : "#A855F7"}
                    fill={`url(#spark-${item.id})`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        );
      })}
    </section>
  );
};
