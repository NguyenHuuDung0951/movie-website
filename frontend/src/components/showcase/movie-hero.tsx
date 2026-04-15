import { useEffect, useState } from "react";
import { ShowcaseMovie } from "@/features/movies/types";
import { MovieInfo } from "./movie-info";
import { ThumbnailBar } from "./thumbnail-bar";

type Props = {
  movies: ShowcaseMovie[];
};

export const MovieHero = ({ movies }: Props) => {
  const [selectedMovie, setSelectedMovie] = useState<ShowcaseMovie>(movies[0]);

  useEffect(() => {
    setSelectedMovie(movies[0]);
  }, [movies]);

  return (
    <section className="relative isolate min-h-[calc(100vh-73px)] overflow-hidden">
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

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl flex-col justify-between px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14">
        <MovieInfo movie={selectedMovie} />

        <div className="flex justify-end">
          <ThumbnailBar
            movies={movies}
            selectedMovieId={selectedMovie.id}
            onSelectMovie={setSelectedMovie}
          />
        </div>
      </div>
    </section>
  );
};
