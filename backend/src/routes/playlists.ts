import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import {
  getUserPlaylists,
  getPlaylistById,
  createPlaylist,
  deletePlaylist,
  addMovieToPlaylist,
  removeMovieFromPlaylist,
} from "../services/playlist.service";
import { HttpError } from "../utils/http-error";

const createPlaylistSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
});

const addMovieSchema = z.object({
  tmdbId: z.number().int().positive(),
  mediaType: z.enum(["movie", "tv"]),
  title: z.string().min(1),
  posterPath: z.string().min(1),
});

const removeMovieSchema = z.object({
  tmdbId: z.number().int().positive(),
});

export const playlistsRouter = Router();

// All playlist routes require authentication.
playlistsRouter.use(requireAuth);

// GET /api/playlists – Get all playlists of logged-in user.
playlistsRouter.get("/", async (req, res) => {
  try {
    const response = await getUserPlaylists(req.user!.id);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/playlists – Create a new playlist.
playlistsRouter.post("/", async (req, res) => {
  const parsed = createPlaylistSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", errors: parsed.error.flatten() });
  }

  try {
    const response = await createPlaylist(req.user!.id, parsed.data);
    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/playlists/:id – Get a single playlist by ID.
playlistsRouter.get("/:id", async (req, res) => {
  try {
    const response = await getPlaylistById(req.params.id, req.user!.id, req.user!.role);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH /api/playlists/:id/add-movie – Add a movie to a playlist.
playlistsRouter.patch("/:id/add-movie", async (req, res) => {
  const parsed = addMovieSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", errors: parsed.error.flatten() });
  }

  try {
    const response = await addMovieToPlaylist(
      req.params.id,
      req.user!.id,
      req.user!.role,
      parsed.data,
    );
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH /api/playlists/:id/remove-movie – Remove a movie from a playlist.
playlistsRouter.patch("/:id/remove-movie", async (req, res) => {
  const parsed = removeMovieSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", errors: parsed.error.flatten() });
  }

  try {
    const response = await removeMovieFromPlaylist(
      req.params.id,
      req.user!.id,
      req.user!.role,
      parsed.data.tmdbId,
    );
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/playlists/:id – Delete an entire playlist.
playlistsRouter.delete("/:id", async (req, res) => {
  try {
    const response = await deletePlaylist(req.params.id, req.user!.id, req.user!.role);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});
