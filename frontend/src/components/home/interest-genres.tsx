import { useMemo, useState } from "react";

type Genre = {
  id: string;
  name: string;
};

const genres: Genre[] = [
  { id: "action", name: "Hành động" },
  { id: "adventure", name: "Phiêu lưu" },
  { id: "animation", name: "Hoạt hình" },
  { id: "comedy", name: "Hài" },
  { id: "crime", name: "Tội phạm" },
  { id: "documentary", name: "Tài liệu" },
  { id: "drama", name: "Chính kịch" },
  { id: "family", name: "Gia đình" },
  { id: "fantasy", name: "Giả tưởng" },
  { id: "history", name: "Lịch sử" },
  { id: "horror", name: "Kinh dị" },
  { id: "music", name: "Âm nhạc" },
  { id: "mystery", name: "Bí ẩn" },
  { id: "romance", name: "Lãng mạn" },
  { id: "science-fiction", name: "Khoa học viễn tưởng" },
  { id: "thriller", name: "Giật gân" },
  { id: "war", name: "Chiến tranh" },
];

const VISIBLE_GENRES = 5;
const genreCardBackgrounds = [
  "linear-gradient(135deg, rgba(244, 63, 94, 0.35), rgba(127, 29, 29, 0.65))",
  "linear-gradient(135deg, rgba(249, 115, 22, 0.35), rgba(120, 53, 15, 0.65))",
  "linear-gradient(135deg, rgba(234, 179, 8, 0.3), rgba(113, 63, 18, 0.65))",
  "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(21, 128, 61, 0.65))",
  "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(14, 116, 144, 0.65))",
  "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(30, 64, 175, 0.65))",
  "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(67, 56, 202, 0.65))",
  "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(157, 23, 77, 0.65))",
  "linear-gradient(135deg, rgba(244, 114, 182, 0.3), rgba(131, 24, 67, 0.65))",
];

export const InterestGenres = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Tạo một map để gán ngẫu nhiên background cho mỗi thể loại
  const genreBackgroundMap = useMemo(
    () =>
      genres.reduce<Record<string, string>>((acc, genre) => {
        const randomIndex = Math.floor(Math.random() * genreCardBackgrounds.length);
        acc[genre.id] = genreCardBackgrounds[randomIndex];
        return acc;
      }, {}),
    [],
  );
  // Tính toán danh sách thể loại hiển thị dựa trên trạng thái mở rộng
  const visibleGenres = useMemo(
    () => (isExpanded ? genres : genres.slice(0, VISIBLE_GENRES)),
    [isExpanded],
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
      <div className="mb-6 flex items-end justify-between gap-3 sm:mb-8">
        <h2 className="text-2xl font-black text-zinc-100 sm:text-3xl">Bạn đang quan tâm gì?</h2>
        <p className="text-sm text-zinc-400">Chọn thể loại để khám phá nhanh.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {visibleGenres.map((genre) => (
          <button
            key={genre.id}
            type="button"
            className="rounded-2xl border border-white/20 px-4 py-5 text-left text-sm font-semibold
            text-zinc-100 shadow-sm transition hover:-translate-y-0.5 hover:border-white/35 hover:brightness-110"
            style={{ backgroundImage: genreBackgroundMap[genre.id] }}
          >
            {genre.name}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="rounded-2xl border border-zinc-500/90 bg-zinc-100 px-4 py-5
          text-left text-sm font-bold text-zinc-900 transition hover:-translate-y-0.5 hover:bg-white"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Thu gọn thể loại" : "Xem tất cả thể loại"}
        </button>
      </div>
    </section>
  );
};
