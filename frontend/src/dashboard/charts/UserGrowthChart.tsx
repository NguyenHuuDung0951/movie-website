import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { userGrowthData } from "../data/mockData";

export const UserGrowthChart: React.FC = () => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">Tăng trưởng Người dùng</h2>
        <p className="text-sm text-zinc-500">Số lượng người đăng ký mới mỗi tháng</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={userGrowthData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
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
              cursor={{ fill: "#27272a", opacity: 0.4 }}
            />
            <Bar dataKey="users" radius={[4, 4, 0, 0]}>
              {userGrowthData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === userGrowthData.length - 1 ? "#10b981" : "#3f3f46"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
