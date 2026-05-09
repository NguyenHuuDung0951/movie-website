import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  colorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  colorClass = "text-blue-500",
}) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm transition-all hover:border-zinc-700 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className={`rounded-full p-3 ${colorClass} bg-opacity-10 bg-current`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span
            className={`font-medium ${
              trendUp ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {trend}
          </span>
          <span className="ml-2 text-zinc-500">so với tháng trước</span>
        </div>
      )}
    </div>
  );
};
