import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { genreDistributionData } from "../data/mockData";

export const GenreDistributionChart: React.FC = () => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">Phân bổ Thể loại Phim</h2>
        <p className="text-sm text-zinc-500">Tỉ lệ các thể loại trên hệ thống</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={genreDistributionData}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {genreDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                borderColor: "#27272a",
                borderRadius: "8px",
                color: "#e4e4e7",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
              formatter={(value, entry: any) => (
                <span className="text-zinc-400">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
