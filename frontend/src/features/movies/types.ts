export type MovieItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  genre: string;
  releaseYear: number;
  posterUrl?: string;
};

export type HomeMoviesResponse = {
  hotMovies: MovieItem[];
  newMovies: MovieItem[];
};

export type ShowcaseMovie = {
  id: number;
  title: string;
  overview: string;
  voteAverage: number;
  backdropPath: string;
  posterPath: string;
};

export type CountryMovie = {
  id: number;
  title: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
};

export type CountryMovieGroup = {
  key: "kr" | "cn" | "us-uk";
  title: string;
  movies: CountryMovie[];
};

export type StandaloneMovie = {
  id: number;
  title: string;
  englishTitle: string;
  posterPath: string;
  badge?: string;
};
