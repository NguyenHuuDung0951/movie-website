import React, { useState } from "react";
import { X, Plus, Check } from "lucide-react";
import { usePlaylists } from "@/hooks/use-playlists";
import { PlaylistMovie } from "@/features/playlists/playlist-api";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  movie: PlaylistMovie;
};

export const AddToPlaylistModal = ({ isOpen, onClose, movie }: Props) => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { playlists, isLoading, createPlaylist, addMovie, removeMovie } = usePlaylists();
  const [newPlaylistName, setNewPlaylistName] = useState("");

  if (!isOpen) return null;

  if (!authState.user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
        <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-bold text-zinc-100">Đăng nhập để thêm phim</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Bạn cần đăng nhập để sử dụng tính năng Playlist.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white"
            >
              Hủy
            </button>
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-zinc-900 hover:bg-yellow-300"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCreatePlaylist = async () => {
    const trimmed = newPlaylistName.trim();
    if (!trimmed) return;
    try {
      const newPlaylist = await createPlaylist.mutateAsync({ name: trimmed });
      setNewPlaylistName("");
      // Optionally auto-add to the newly created playlist:
      await addMovie.mutateAsync({ playlistId: newPlaylist._id, movie });
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleMovie = async (playlistId: string, isAdded: boolean) => {
    try {
      if (isAdded) {
        await removeMovie.mutateAsync({ playlistId, tmdbId: movie.tmdbId });
      } else {
        await addMovie.mutateAsync({ playlistId, movie });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl relative flex flex-col max-h-[80vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold text-zinc-100">Lưu vào Playlist</h2>
        <p className="mt-1 text-sm text-zinc-400 mb-6">Chọn playlist để lưu "{movie.title}"</p>

        <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-6 scrollbar-hide">
          {isLoading ? (
            <div className="py-4 text-center text-sm text-zinc-500 animate-pulse">
              Đang tải playlists...
            </div>
          ) : playlists.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-500">Chưa có playlist nào.</div>
          ) : (
            playlists.map((playlist) => {
              const isAdded = playlist.movies.some((m) => m.tmdbId === movie.tmdbId);
              return (
                <button
                  key={playlist._id}
                  onClick={() => handleToggleMovie(playlist._id, isAdded)}
                  className="flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 hover:bg-zinc-800 transition"
                >
                  <span className="font-medium text-sm text-zinc-200">{playlist.name}</span>
                  {isAdded ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 text-zinc-400">
                      <Plus className="h-4 w-4" />
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div className="border-t border-zinc-800 pt-4 mt-auto">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Tên playlist mới..."
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-sm text-zinc-100 outline-none focus:border-yellow-400"
              onKeyDown={(e) => e.key === "Enter" && handleCreatePlaylist()}
            />
            <button
              onClick={handleCreatePlaylist}
              disabled={!newPlaylistName.trim() || createPlaylist.isPending}
              className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-white disabled:opacity-50"
            >
              {createPlaylist.isPending ? "Đang tạo..." : "Tạo mới"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
