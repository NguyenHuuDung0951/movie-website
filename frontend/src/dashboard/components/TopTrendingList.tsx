import React from "react";
import { topTrendingMovies } from "../data/mockData";
import { TrendingUp, TrendingDown } from "lucide-react";

export const TopTrendingList: React.FC = () => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Top Phim Thịnh Hành</h2>
        <button className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors">
          Xem tất cả
        </button>
      </div>
      
      <div className="space-y-4">
        {topTrendingMovies.map((movie, index) => {
          const isUp = movie.trend.startsWith("+");
          return (
            <div
              key={movie.id}
              className="group flex items-center gap-4 rounded-xl border border-transparent p-2 hover:border-zinc-800 hover:bg-zinc-800/50 transition-all"
            >
              <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-0 left-0 flex h-5 w-5 items-center justify-center rounded-br-md bg-black/80 text-xs font-bold text-white">
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="truncate text-sm font-semibold text-zinc-200">
                  {movie.title}
                </h4>
                <p className="text-xs text-zinc-500">{movie.views} lượt xem</p>
              </div>
              
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  isUp ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {movie.trend}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
