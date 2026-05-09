import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ShowcaseMovie } from "@/features/movies/types";
import { MovieInfo } from "./movie-info";
import { ThumbnailBar } from "./thumbnail-bar";

type Props = {
  movies: ShowcaseMovie[];
};

const SLIDE_INTERVAL = 2000;

export const MovieHero = ({ movies }: Props) => {
  const [selectedMovie, setSelectedMovie] = useState<ShowcaseMovie>(movies[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSelectedMovie(movies[0]);
    setCurrentIndex(0);
  }, [movies]);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
      setSelectedMovie(movies[(currentIndex + 1) % movies.length]);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [movies, currentIndex]);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + movies.length) % movies.length;
    setCurrentIndex(newIndex);
    setSelectedMovie(movies[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % movies.length;
    setCurrentIndex(newIndex);
    setSelectedMovie(movies[newIndex]);
  };

  return (
    <section className="relative isolate min-h-[calc(100vh-73px)] overflow-hidden group">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out ${
            selectedMovie.id === movie.id ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${movie.backdropPath})` }}
          aria-hidden
        />
      ))}

      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/40" /> */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition-all hover:bg-white/40 opacity-0 group-hover:opacity-100 sm:left-6"
        aria-label="Phim trước"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition-all hover:bg-white/40 opacity-0 group-hover:opacity-100 sm:right-6"
        aria-label="Phim tiếp theo"
      >
        <ChevronRight size={24} />
      </button>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl flex-col justify-between px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14">
        <MovieInfo movie={selectedMovie} />

        <div className="flex justify-end">
          <ThumbnailBar
            movies={movies}
            selectedMovieId={selectedMovie.id}
            onSelectMovie={(movie) => {
              const index = movies.findIndex((m) => m.id === movie.id);
              setCurrentIndex(index);
              setSelectedMovie(movie);
            }}
          />
        </div>
      </div>
    </section>
  );
};
