import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { viewershipData } from "../data/mockData";

export const ViewershipChart: React.FC = () => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Lưu lượng người xem</h2>
          <p className="text-sm text-zinc-500">Thống kê lượt xem trong tuần</p>
        </div>
        <select className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300 outline-none focus:border-blue-500">
          <option>Tuần này</option>
          <option>Tuần trước</option>
          <option>Tháng này</option>
        </select>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={viewershipData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                borderColor: "#27272a",
                borderRadius: "8px",
                color: "#e4e4e7",
              }}
              itemStyle={{ color: "#3b82f6" }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorViews)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
