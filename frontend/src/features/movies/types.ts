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
