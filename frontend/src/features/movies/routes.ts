export const getMovieDetailPath = (mediaType: "movie" | "tv", id: string | number) =>
  `/${mediaType}/${id}`;

export const getWatchPath = (mediaType: "movie" | "tv", id: string | number) =>
  `/watch/${mediaType}/${id}`;
