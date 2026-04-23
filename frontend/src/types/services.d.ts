declare module "@/services/tmdb" {
  export function mapTmdbMovieToCard(movie: unknown): {
    id: number;
    title: string;
    subtitle: string;
    imageSrc: string;
  };

  export function mapTmdbTvToCard(series: unknown): {
    id: number;
    title: string;
    subtitle: string;
    imageSrc: string;
  };

  export function fetchDiscoverMovies(params: {
    page?: number;
    year?: string;
    genre?: string;
    region?: string;
    language?: string;
  }): Promise<{ results?: unknown[]; total_pages?: number }>;

  export function fetchMovieGenres(language?: string): Promise<Array<{ id: number; name: string }>>;

  export function fetchDiscoverTv(params: {
    page?: number;
    year?: string;
    genre?: string;
    region?: string;
    language?: string;
  }): Promise<{ results?: unknown[]; total_pages?: number }>;

  export function fetchTvGenres(language?: string): Promise<Array<{ id: number; name: string }>>;
}

declare module "@/services/watch" {
  export function fetchWatchBundle(params: {
    type: "movie" | "tv";
    id?: string;
    language?: string;
    page?: number;
  }): Promise<{
    detail: Record<string, unknown>;
    videos: { results?: Array<Record<string, unknown>> };
    credits: { cast?: Array<Record<string, unknown>> };
    similar: { results?: Array<Record<string, unknown>> };
    trending: { results?: Array<Record<string, unknown>> };
  }>;

  export function pickYoutubeWatchKey(videos: unknown): string;
}
