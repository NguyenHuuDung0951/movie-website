import { MovieCard } from "./movie-card";

export type CarouselMovie = {
  id: string | number;
  title: string;
  subtitle: string;
  imageSrc: string;
  badge?: string;
};

type Props = {
  title: string;
  movies: CarouselMovie[];
};

export const MovieCarousel = ({ title, movies }: Props) => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-2xl font-black text-zinc-100 sm:text-3xl">
          {title}
          <span className="text-lg text-zinc-400"></span>
        </h2>
        <button
          type="button"
          className="text-sm font-semibold text-zinc-400 underline-offset-2 transition hover:text-zinc-100 hover:underline"
        >
          Xem tất cả
        </button>
      </div>

      <div className="scrollbar-hide overflow-x-auto">
        <div className="flex gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              subtitle={movie.subtitle}
              imageSrc={movie.imageSrc}
              badge={movie.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
