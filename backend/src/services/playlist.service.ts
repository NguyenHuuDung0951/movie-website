import { Playlist, IPlaylistMovie } from "../models/Playlist";
import { HttpError } from "../utils/http-error";

/**
 * Verify that the requesting user owns the playlist (or is admin).
 */
const assertOwnership = async (playlistId: string, userId: string, userRole: string) => {
  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new HttpError(404, "Playlist not found");
  }

  // Admins can bypass ownership checks.
  if (userRole !== "admin" && playlist.userId.toString() !== userId) {
    throw new HttpError(403, "Forbidden: you do not own this playlist");
  }

  return playlist;
};

/**
 * Get all playlists belonging to a user.
 */
export const getUserPlaylists = async (userId: string) => {
  const playlists = await Playlist.find({ userId }).sort({ createdAt: -1 });
  return { playlists };
};

/**
 * Get a single playlist by ID (with ownership check).
 */
export const getPlaylistById = async (playlistId: string, userId: string, userRole: string) => {
  const playlist = await assertOwnership(playlistId, userId, userRole);
  return { playlist };
};

/**
 * Create a new empty playlist for a user.
 */
export const createPlaylist = async (
  userId: string,
  data: { name: string; description?: string },
) => {
  const playlist = await Playlist.create({
    userId,
    name: data.name,
    description: data.description || "",
    movies: [],
    isPublic: false,
  });

  return {
    message: "Playlist created",
    playlist,
  };
};

/**
 * Delete an entire playlist (with ownership check).
 */
export const deletePlaylist = async (playlistId: string, userId: string, userRole: string) => {
  const playlist = await assertOwnership(playlistId, userId, userRole);
  await playlist.deleteOne();

  return { message: "Playlist deleted" };
};

/**
 * Add a movie to a playlist (with ownership check + duplicate prevention).
 */
export const addMovieToPlaylist = async (
  playlistId: string,
  userId: string,
  userRole: string,
  movieData: IPlaylistMovie,
) => {
  const playlist = await assertOwnership(playlistId, userId, userRole);

  // Prevent duplicate movies in the same playlist.
  const alreadyExists = playlist.movies.some(
    (m) => m.tmdbId === movieData.tmdbId && m.mediaType === movieData.mediaType,
  );

  if (alreadyExists) {
    throw new HttpError(409, "Movie already exists in this playlist");
  }

  playlist.movies.push(movieData);
  await playlist.save();

  return {
    message: "Movie added to playlist",
    playlist,
  };
};

/**
 * Remove a movie from a playlist by tmdbId (with ownership check).
 */
export const removeMovieFromPlaylist = async (
  playlistId: string,
  userId: string,
  userRole: string,
  tmdbId: number,
) => {
  const playlist = await assertOwnership(playlistId, userId, userRole);

  const initialLength = playlist.movies.length;
  playlist.movies = playlist.movies.filter((m) => m.tmdbId !== tmdbId);

  if (playlist.movies.length === initialLength) {
    throw new HttpError(404, "Movie not found in this playlist");
  }

  await playlist.save();

  return {
    message: "Movie removed from playlist",
    playlist,
  };
};
