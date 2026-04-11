import { Router } from "express";
import { z } from "zod";
import { getHomeMovies, listMovies } from "../services/movies.service";

const listMoviesQuerySchema = z.object({
  search: z.string().trim().optional(),
  genre: z.string().trim().optional(),
  year: z.coerce.number().int().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

const homeQuerySchema = z.object({
  hotLimit: z.coerce.number().int().min(1).max(20).default(4),
  newLimit: z.coerce.number().int().min(1).max(20).default(4),
});

export const moviesRouter = Router();

moviesRouter.get("/", async (req, res) => {
  const parsed = listMoviesQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid query", errors: parsed.error.flatten() });
  }

  const response = await listMovies(parsed.data);
  return res.status(200).json(response);
});

moviesRouter.get("/home", async (req, res) => {
  const parsed = homeQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid query", errors: parsed.error.flatten() });
  }

  const response = await getHomeMovies(parsed.data);
  return res.status(200).json(response);
});
