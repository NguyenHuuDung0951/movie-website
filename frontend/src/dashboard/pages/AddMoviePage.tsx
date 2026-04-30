import React from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Save, X, Image as ImageIcon, Video } from "lucide-react";
import { Link } from "react-router-dom";

export const AddMoviePage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Thêm Phim Mới</h1>
          <p className="mt-1 text-zinc-500">
            Tạo một bộ phim mới trong hệ thống.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/movies"
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            <X size={18} />
            Hủy bỏ
          </Link>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
            <Save size={18} />
            Lưu phim
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cột trái: Nội dung chính */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-white mb-4">Thông tin cơ bản</h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">Tên phim</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-sm text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="Nhập tên phim..."
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">Mô tả (Overview)</label>
                <textarea
                  rows={5}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-sm text-white outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Nhập nội dung tóm tắt của phim..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-white mb-4">Media</h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-zinc-400">
                  <Video size={16} /> URL Video chính
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-sm text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-zinc-400">
                  <Video size={16} /> URL Trailer
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-sm text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Cài đặt và Hình ảnh */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-white mb-4">Xuất bản</h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">Trạng thái</label>
                <select className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-sm text-white outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer">
                  <option value="draft">Bản nháp</option>
                  <option value="published">Xuất bản</option>
                </select>
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">Năm phát hành</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-sm text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="Ví dụ: 2024"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">Thể loại</label>
                <div className="flex flex-wrap gap-2">
                  {["Hành động", "Viễn tưởng", "Kinh dị", "Hài kịch", "Tình cảm", "Hoạt hình"].map(genre => (
                    <label key={genre} className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 cursor-pointer hover:border-zinc-700 transition-colors">
                      <input type="checkbox" className="rounded border-zinc-700 text-blue-500 focus:ring-blue-500 bg-zinc-800" />
                      <span className="text-sm text-zinc-300">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-white mb-4">Ảnh đại diện (Poster)</h2>
            
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-zinc-700 px-6 py-10 hover:border-blue-500 hover:bg-blue-500/5 transition-colors cursor-pointer">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-zinc-500" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-zinc-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-blue-500 focus-within:outline-none hover:text-blue-400"
                  >
                    <span>Tải ảnh lên</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">hoặc kéo thả vào đây</p>
                </div>
                <p className="text-xs leading-5 text-zinc-500">PNG, JPG, WEBP tối đa 5MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
