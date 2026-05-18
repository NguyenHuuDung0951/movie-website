import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GENRE_LIST } from "@/features/movies/genre-config";

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
      GENRE_LIST.reduce<Record<string, string>>((acc, genre) => {
        const randomIndex = Math.floor(Math.random() * genreCardBackgrounds.length);
        acc[genre.slug] = genreCardBackgrounds[randomIndex];
        return acc;
      }, {}),
    [],
  );
  // Tính toán danh sách thể loại hiển thị dựa trên trạng thái mở rộng
  const visibleGenres = useMemo(
    () => (isExpanded ? GENRE_LIST : GENRE_LIST.slice(0, VISIBLE_GENRES)),
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
          <Link
            key={genre.slug}
            to={`/genre/${genre.slug}`}
            className="flex items-center gap-3 rounded-2xl border border-white/20 px-4 py-5 text-left text-sm font-semibold
            text-zinc-100 shadow-sm transition hover:-translate-y-0.5 hover:border-white/35 hover:brightness-110"
            style={{ backgroundImage: genreBackgroundMap[genre.slug] }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg text-white shadow-inner">
              <genre.icon aria-hidden="true" />
            </span>
            <span className="leading-tight">{genre.name}</span>
          </Link>
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
