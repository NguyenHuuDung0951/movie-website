import { Link } from "react-router-dom";
import { MovieItem } from "@/features/movies/types";

const MovieCard = ({ movie }: { movie: MovieItem }) => {
  return (
    <article
      className="group rounded-2xl border border-zinc-800
     bg-[#151618]/95 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50"
    >
      <div
        className="mb-3 h-36 rounded-xl bg-linear-to-br
       from-zinc-900 via-zinc-800 to-zinc-950"
      />
      <h3 className="text-lg font-bold text-zinc-100">{movie.title}</h3>
      <p className="mt-1 text-sm text-zinc-400">
        {movie.genre} • {movie.releaseYear}
      </p>
      <p className="mt-3 line-clamp-2 text-sm text-zinc-300">{movie.description}</p>
      <button
        type="button"
        className="mt-4 rounded-full border
         border-zinc-700 px-3 py-2 text-sm font-medium
         text-zinc-200 transition
         group-hover:border-zinc-300 group-hover:text-white"
      >
        Xem chi tiết
      </button>
    </article>
  );
};

type Props = {
  hotMovies: MovieItem[];
  newMovies: MovieItem[];
};

export const HomeContent = ({ hotMovies, newMovies }: Props) => {
  return (
    <main
      className="relative overflow-hidden
     bg-[radial-gradient(circle_at_top_left,#2b2d31_0%,#17181b_30%,#0c0d0f_70%)]"
    >
      <section
        className="relative mx-auto grid w-full max-w-6xl gap-8 overflow-hidden rounded-3xl border border-zinc-800 bg-[linear-gradient(110deg,rgba(5,5,6,0.88)_30%,rgba(5,5,6,0.62)_65%),url('/home-background.jpg')] bg-cover bg-top bg-no-repeat px-4 pb-14 pt-12
       sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
      >
        <div>
          <p
            className="inline-flex rounded-full
           border border-zinc-500/50 bg-zinc-900/50 px-3 py-1 
           text-xs font-semibold uppercase tracking-wider text-zinc-200"
          >
            Movie Platform 2026
          </p>
          <h1
            className="mt-5 text-4xl font-black leading-tight
           text-white sm:text-5xl"
          >
            Khám phá thế giới phim theo cách của bạn
          </h1>
          <p className="mt-4 max-w-xl text-base text-zinc-200/90 sm:text-lg">
            Tìm phim hot, lọc theo thể loại, lưu danh sách yêu thích và theo dõi các review mới nhất
            trên một giao diện nhanh, gọn và dễ dùng.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-full bg-zinc-100
             px-5 py-3 text-sm font-semibold text-zinc-900"
            >
              Bắt đầu ngay
            </Link>
            <Link
              to="/register"
              className="rounded-full border border-zinc-400/70
               bg-zinc-900/35 px-5 py-3 text-sm font-semibold text-zinc-100 backdrop-blur-sm"
            >
              Tạo tài khoản
            </Link>
          </div>
        </div>

        <div
          className="rounded-3xl border
         border-zinc-800 bg-black/55 p-5 shadow-sm backdrop-blur-sm"
        >
          <p className="text-sm font-semibold text-zinc-200">Xu hướng hôm nay</p>
          <div className="mt-4 space-y-3">
            {hotMovies.slice(0, 3).map((movie, index) => (
              <div
                key={movie._id}
                className="flex items-center justify-between rounded-xl
               bg-zinc-900/85 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-bold text-zinc-100">
                    {index + 1}. {movie.title}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {movie.genre} • {movie.releaseYear}
                  </p>
                </div>
                <span className="rounded-full bg-zinc-200 px-2 py-1 text-xs font-semibold text-zinc-900">
                  HOT
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hot" className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-black text-zinc-100">Phim Hot</h2>
          <Link
            to="/"
            className="text-sm font-semibold text-zinc-400 underline-offset-2 hover:text-zinc-100 hover:underline"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hotMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>

      <section id="new" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-black text-zinc-100">Phim mới cập nhật</h2>
          <Link
            to="/"
            className="text-sm font-semibold
           text-zinc-400 underline-offset-2 hover:text-zinc-100 hover:underline"
          >
            Khám phá thêm
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {newMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
};
