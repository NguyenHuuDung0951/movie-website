import React from "react";
import { Edit2, Trash2, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { allMovies } from "../data/mockData";

export const MoviesTable: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#151618] shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-900/50 text-xs uppercase text-zinc-500 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">Phim</th>
              <th className="px-6 py-4 font-medium">Thể loại</th>
              <th className="px-6 py-4 font-medium">Lượt xem</th>
              <th className="px-6 py-4 font-medium">Đánh giá</th>
              <th className="px-6 py-4 font-medium">Trạng thái</th>
              <th className="px-6 py-4 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {allMovies.map((movie) => (
              <tr key={movie.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="h-16 w-11 rounded object-cover shadow-sm"
                    />
                    <div>
                      <div className="font-semibold text-white">{movie.title}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{movie.releaseYear}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {movie.genres.map((genre, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">{movie.views}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-amber-500 font-medium">
                    <Star size={14} className={movie.rating > 0 ? "fill-current" : "text-zinc-600"} />
                    <span className={movie.rating > 0 ? "text-white" : "text-zinc-600"}>
                      {movie.rating > 0 ? movie.rating : "N/A"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {movie.status === "published" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Đã xuất bản
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      Bản nháp
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/admin/movies/${movie.id}`} className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-blue-500 transition-colors" title="Xem chi tiết">
                      <Eye size={18} />
                    </Link>
                    <Link to={`/admin/movies/${movie.id}`} className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-emerald-500 transition-colors" title="Chỉnh sửa">
                      <Edit2 size={18} />
                    </Link>
                    <button className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-rose-500 transition-colors" title="Xóa">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-zinc-800 p-4">
        <span className="text-sm text-zinc-500">
          Hiển thị <span className="font-medium text-white">1</span> đến <span className="font-medium text-white">8</span> trong số <span className="font-medium text-white">45</span> phim
        </span>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-zinc-700 bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 transition-colors disabled:opacity-50">
            Trước
          </button>
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 rounded-lg bg-blue-600 text-sm font-medium text-white">1</button>
            <button className="h-8 w-8 rounded-lg border border-transparent text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">2</button>
            <button className="h-8 w-8 rounded-lg border border-transparent text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">3</button>
            <span className="text-zinc-600">...</span>
            <button className="h-8 w-8 rounded-lg border border-transparent text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">6</button>
          </div>
          <button className="rounded-lg border border-zinc-700 bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-50">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};
