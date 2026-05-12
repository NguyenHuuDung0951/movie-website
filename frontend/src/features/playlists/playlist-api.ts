import { api } from "@/lib/api";

// Types matching backend Playlist model
export type PlaylistMovie = {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath: string;
};

export type Playlist = {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  movies: PlaylistMovie[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};

// GET /api/playlists – Get all playlists of logged-in user
export const fetchPlaylists = async (): Promise<Playlist[]> => {
  const response = await api.get<{ playlists: Playlist[] }>("/playlists");
  return response.data.playlists;
};

// POST /api/playlists – Create a new playlist
export const createPlaylistApi = async (data: {
  name: string;
  description?: string;
}): Promise<Playlist> => {
  const response = await api.post<{ playlist: Playlist; message: string }>("/playlists", data);
  return response.data.playlist;
};

// GET /api/playlists/:id – Get a single playlist
export const fetchPlaylistById = async (playlistId: string): Promise<Playlist> => {
  const response = await api.get<{ playlist: Playlist }>(`/playlists/${playlistId}`);
  return response.data.playlist;
};

// PATCH /api/playlists/:id/add-movie – Add a movie to a playlist
export const addMovieToPlaylistApi = async (
  playlistId: string,
  movie: PlaylistMovie,
): Promise<Playlist> => {
  const response = await api.patch<{ playlist: Playlist; message: string }>(
    `/playlists/${playlistId}/add-movie`,
    movie,
  );
  return response.data.playlist;
};

// PATCH /api/playlists/:id/remove-movie – Remove a movie from a playlist
export const removeMovieFromPlaylistApi = async (
  playlistId: string,
  tmdbId: number,
): Promise<Playlist> => {
  const response = await api.patch<{ playlist: Playlist; message: string }>(
    `/playlists/${playlistId}/remove-movie`,
    { tmdbId },
  );
  return response.data.playlist;
};

// DELETE /api/playlists/:id – Delete a playlist
export const deletePlaylistApi = async (playlistId: string): Promise<void> => {
  await api.delete(`/playlists/${playlistId}`);
};
