import React from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { allMovies } from "../data/mockData";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, Eye, Star, Calendar, Play } from "lucide-react";

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Fallback to first movie if not found (just for UI preview)
  const movie = allMovies.find(m => m.id === Number(id)) || allMovies[0];

  return (
    <DashboardLayout>
      {/* Header / Nav */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/admin/movies"
          className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách
        </Link>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-colors">
            <Edit size={16} />
            Sửa
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-rose-600/10 px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-600/20 transition-colors border border-transparent hover:border-rose-500/50">
            <Trash2 size={16} />
            Xóa phim
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Poster */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-lg relative group">
            <img 
              src={movie.image} 
              alt={movie.title} 
              className="w-full h-auto object-cover aspect-[2/3]"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="rounded-full bg-blue-600 p-4 text-white shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform">
                <Play fill="currentColor" size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="lg:col-span-3 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
              {movie.status === "published" ? (
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500 border border-emerald-500/20">
                  Đã xuất bản
                </span>
              ) : (
                <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-500 border border-amber-500/20">
                  Bản nháp
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>Năm phát hành: {movie.releaseYear}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye size={16} />
                <span>Lượt xem: {movie.views}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-amber-500" />
                <span>Đánh giá: <strong className="text-white">{movie.rating}</strong>/5</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {movie.genres.map(genre => (
                <span key={genre} className="rounded-lg bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-white mb-4">Nội dung tóm tắt</h2>
            <p className="text-zinc-400 leading-relaxed">
              Đây là nội dung tóm tắt của phim. Hiện tại dữ liệu mock chưa có trường overview nên đây là text mặc định. Phim {movie.title} hứa hẹn mang đến những trải nghiệm tuyệt vời cho người xem với hình ảnh sắc nét và âm thanh sống động.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-white mb-4">Thống kê gần đây</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-zinc-900/50 p-4 border border-zinc-800/50">
                <div className="text-sm text-zinc-500 mb-1">Lượt xem tuần này</div>
                <div className="text-2xl font-bold text-white">12.5K</div>
                <div className="text-xs text-emerald-500 mt-1">+15% so với tuần trước</div>
              </div>
              <div className="rounded-xl bg-zinc-900/50 p-4 border border-zinc-800/50">
                <div className="text-sm text-zinc-500 mb-1">Lượt thích</div>
                <div className="text-2xl font-bold text-white">4.2K</div>
                <div className="text-xs text-emerald-500 mt-1">+8% so với tuần trước</div>
              </div>
              <div className="rounded-xl bg-zinc-900/50 p-4 border border-zinc-800/50">
                <div className="text-sm text-zinc-500 mb-1">Bình luận mới</div>
                <div className="text-2xl font-bold text-white">128</div>
                <div className="text-xs text-rose-500 mt-1">-2% so với tuần trước</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
