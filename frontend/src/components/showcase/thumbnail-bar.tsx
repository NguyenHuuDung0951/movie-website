import { ShowcaseMovie } from "@/features/movies/types";

type Props = {
  movies: ShowcaseMovie[];
  selectedMovieId: number;
  onSelectMovie: (movie: ShowcaseMovie) => void;
};

export const ThumbnailBar = ({ movies, selectedMovieId, onSelectMovie }: Props) => {
  return (
    <div className="scrollbar-hide w-full max-w-[720px] overflow-x-auto rounded-2xl border border-zinc-700/80 bg-black/35 p-3 backdrop-blur-sm">
      <div className="flex min-w-max items-center gap-3">
        {movies.map((movie) => {
          const isSelected = movie.id === selectedMovieId;

          return (
            <button
              key={movie.id}
              type="button"
              onClick={() => onSelectMovie(movie)}
              className={`group relative h-24 w-16 shrink-0 overflow-hidden rounded-lg border transition sm:h-28 sm:w-20  scrollbar-hide ${
                isSelected
                  ? "border-white shadow-lg shadow-black/40"
                  : "border-zinc-700/80 opacity-75 hover:opacity-100"
              }`}
              aria-label={`Chọn ${movie.title}`}
            >
              <img
                src={movie.posterPath}
                alt={movie.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
