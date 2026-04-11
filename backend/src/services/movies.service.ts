import { Movie } from "../models/Movie";

export type ListMoviesQuery = {
  search?: string;
  genre?: string;
  year?: number;
  page: number;
  limit: number;
};

export type HomeMoviesQuery = {
  hotLimit: number;
  newLimit: number;
};

export const listMovies = async ({ search, genre, year, page, limit }: ListMoviesQuery) => {
  const filter: Record<string, unknown> = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (genre) {
    filter.genre = { $regex: `^${genre}$`, $options: "i" };
  }

  if (year) {
    filter.releaseYear = year;
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Movie.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Movie.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      hasNextPage: skip + items.length < total,
      hasPrevPage: page > 1,
    },
  };
};

export const getHomeMovies = async ({ hotLimit, newLimit }: HomeMoviesQuery) => {
  const [hotMovies, newMovies] = await Promise.all([
    Movie.find({}).sort({ releaseYear: -1, createdAt: -1 }).limit(hotLimit).lean(),
    Movie.find({}).sort({ createdAt: -1 }).limit(newLimit).lean(),
  ]);

  return { hotMovies, newMovies };
};
