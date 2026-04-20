import { useQuery } from "@tanstack/react-query";
import { CountryMoviesSection } from "@/components/home/country-movies-section";
import { InterestGenres } from "@/components/home/interest-genres";
import { MovieCarousel, type CarouselMovie } from "@/components/home/movie-carousel";
import { TopTrending } from "@/components/home/top-trending";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MovieHero } from "@/components/showcase/movie-hero";
import {
  fetchCountryMovieGroups,
  fetchShowcaseMovies,
  fetchStandaloneMovies,
} from "@/features/movies/tmdb-showcase";
import { CountryMovieGroup, ShowcaseMovie, StandaloneMovie } from "@/features/movies/types";

const fallbackShowcaseMovies: ShowcaseMovie[] = [
  {
    id: 1,
    title: "Rạp phim trực tuyến",
    overview: "Vui lòng cấu hình khóa môi trường TMDB để tải danh sách phim trực tiếp.",
    voteAverage: 8.5,
    backdropPath: "/home-background.jpg",
    posterPath: "/home-background.jpg",
  },
];

const fallbackCountryMovieGroups: CountryMovieGroup[] = [
  {
    key: "kr",
    title: "Phim Hàn Quốc Mới",
    movies: Array.from({ length: 10 }, (_, index) => ({
      id: 1000 + index,
      title: `Phim Hàn ${index + 1}`,
      overview: "",
      voteAverage: 8.2,
      posterPath: "/home-background.jpg",
    })),
  },
  {
    key: "cn",
    title: "Phim Trung Quốc mới",
    movies: Array.from({ length: 10 }, (_, index) => ({
      id: 2000 + index,
      title: `Phim Trung ${index + 1}`,
      overview: "",
      voteAverage: 8.1,
      posterPath: "/home-background.jpg",
    })),
  },
  {
    key: "us-uk",
    title: "Phim US - UK mới",
    movies: Array.from({ length: 10 }, (_, index) => ({
      id: 3000 + index,
      title: `Phim US - UK ${index + 1}`,
      overview: "",
      voteAverage: 8,
      posterPath: "/home-background.jpg",
    })),
  },
];

const fallbackStandaloneMovies: StandaloneMovie[] = Array.from({ length: 8 }, (_, index) => ({
  id: 5000 + index,
  title: `Phim Lẻ ${index + 1}`,
  englishTitle: `Standalone Movie ${index + 1}`,
  posterPath: "/home-background.jpg",
  badge: "P.Đề",
}));

const convertStandaloneToCarousel = (movies: StandaloneMovie[]): CarouselMovie[] =>
  movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    subtitle: movie.englishTitle,
    imageSrc: movie.posterPath,
    badge: movie.badge,
  }));

export const HomePage = () => {
  const { data } = useQuery({
    queryKey: ["showcase", "movies"],
    queryFn: fetchShowcaseMovies,
    retry: 1,
    initialData: fallbackShowcaseMovies,
  });

  const { data: countryMovieGroups } = useQuery({
    queryKey: ["country", "movies"],
    queryFn: fetchCountryMovieGroups,
    retry: 1,
    initialData: fallbackCountryMovieGroups,
  });

  const { data: standaloneMovies } = useQuery({
    queryKey: ["standalone", "movies"],
    queryFn: fetchStandaloneMovies,
    retry: 1,
    initialData: fallbackStandaloneMovies,
  });

  return (
    <>
      <Header />
      <MovieHero movies={data} />
      <InterestGenres />
      <TopTrending />
      <CountryMoviesSection groups={countryMovieGroups} />
      <MovieCarousel title="Phim Lẻ Mới" movies={convertStandaloneToCarousel(standaloneMovies)} />
      <Footer />
    </>
  );
};
