import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { MovieHero } from "@/components/showcase/movie-hero";
import { fetchShowcaseMovies } from "@/features/movies/tmdb-showcase";
import { ShowcaseMovie } from "@/features/movies/types";

const fallbackShowcaseMovies: ShowcaseMovie[] = [
  {
    id: 1,
    title: "Movie Showcase",
    overview: "Please configure TMDB env keys to load live movies.",
    voteAverage: 8.5,
    backdropPath: "/home-background.jpg",
    posterPath: "/home-background.jpg",
  },
];

export const HomePage = () => {
  const { data } = useQuery({
    queryKey: ["showcase", "movies"],
    queryFn: fetchShowcaseMovies,
    retry: 1,
    initialData: fallbackShowcaseMovies,
  });

  return (
    <>
      <Header />
      <MovieHero movies={data} />
    </>
  );
};
