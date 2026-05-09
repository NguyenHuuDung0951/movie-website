import React from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const MoviesFilter: React.FC = () => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-4">
        {/* Search */}
        <div className="relative max-w-sm flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-zinc-800 bg-[#151618] p-2.5 pl-10 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500 outline-none transition-colors"
            placeholder="Tìm kiếm phim..."
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-zinc-800 bg-[#151618] p-2.5 text-sm text-zinc-300 outline-none focus:border-blue-500 hover:border-zinc-700 transition-colors cursor-pointer appearance-none">
            <option value="">Tất cả thể loại</option>
            <option value="action">Hành động</option>
            <option value="comedy">Hài kịch</option>
            <option value="scifi">Viễn tưởng</option>
            <option value="animation">Hoạt hình</option>
          </select>
          
          <select className="rounded-lg border border-zinc-800 bg-[#151618] p-2.5 text-sm text-zinc-300 outline-none focus:border-blue-500 hover:border-zinc-700 transition-colors cursor-pointer appearance-none hidden sm:block">
            <option value="">Trạng thái</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Bản nháp</option>
          </select>
          
          <button className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-[#151618] p-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors sm:hidden">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <Link
        to="/admin/movies/new"
        className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
      >
        <Plus size={18} />
        Thêm phim mới
      </Link>
    </div>
  );
};
