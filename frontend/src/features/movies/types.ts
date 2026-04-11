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
