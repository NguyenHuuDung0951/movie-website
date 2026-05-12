import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchPlaylists,
  createPlaylistApi,
  deletePlaylistApi,
  addMovieToPlaylistApi,
  removeMovieFromPlaylistApi,
  PlaylistMovie,
} from "@/features/playlists/playlist-api";

const PLAYLISTS_KEY = ["playlists"];

/**
 * Hook to manage playlists: fetch, create, delete, add/remove movies.
 */
export const usePlaylists = () => {
  const queryClient = useQueryClient();

  const playlistsQuery = useQuery({
    queryKey: PLAYLISTS_KEY,
    queryFn: fetchPlaylists,
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: (data: { name: string; description?: string }) => createPlaylistApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLAYLISTS_KEY });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (playlistId: string) => deletePlaylistApi(playlistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLAYLISTS_KEY });
    },
  });

  const addMovieMutation = useMutation({
    mutationFn: ({ playlistId, movie }: { playlistId: string; movie: PlaylistMovie }) =>
      addMovieToPlaylistApi(playlistId, movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLAYLISTS_KEY });
    },
  });

  const removeMovieMutation = useMutation({
    mutationFn: ({ playlistId, tmdbId }: { playlistId: string; tmdbId: number }) =>
      removeMovieFromPlaylistApi(playlistId, tmdbId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLAYLISTS_KEY });
    },
  });

  return {
    playlists: playlistsQuery.data || [],
    isLoading: playlistsQuery.isLoading,
    error: playlistsQuery.error,
    createPlaylist: createMutation,
    deletePlaylist: deleteMutation,
    addMovie: addMovieMutation,
    removeMovie: removeMovieMutation,
  };
};
