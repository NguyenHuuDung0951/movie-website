export const getMovieDetailPath = (mediaType: "movie" | "tv", id: string | number) =>
  `/${mediaType}/${id}`;
