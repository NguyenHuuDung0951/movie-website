import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/hooks/use-auth";
import { usePlaylists } from "@/hooks/use-playlists";

const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";

export const ProfilePage = () => {
  const { authState, meQuery } = useAuth();
  const {
    playlists,
    isLoading: playlistsLoading,
    createPlaylist,
    deletePlaylist,
    removeMovie,
  } = usePlaylists();
  const user = authState.user;

  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (!user && meQuery.isLoading) {
    return (
      <>
        <Header />
        <main className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-zinc-800 bg-[#151618]/92 px-6 py-8 text-zinc-300">
          Đang tải thông tin hồ sơ...
        </main>
      </>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleCreatePlaylist = async () => {
    const trimmed = newPlaylistName.trim();
    if (!trimmed) return;
    await createPlaylist.mutateAsync({ name: trimmed });
    setNewPlaylistName("");
    setShowCreateForm(false);
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    if (!confirm("Bạn có chắc muốn xóa playlist này?")) return;
    await deletePlaylist.mutateAsync(playlistId);
  };

  const handleRemoveMovie = async (playlistId: string, tmdbId: number) => {
    await removeMovie.mutateAsync({ playlistId, tmdbId });
  };

  return (
    <>
      <Header />
      <main className="mx-auto mt-10 w-full max-w-4xl space-y-8 px-4 pb-16 sm:px-6">
        {/* User Info */}
        <section className="rounded-2xl border border-zinc-800 bg-[#151618]/92 px-6 py-8">
          <h1 className="text-3xl font-bold text-zinc-100">Hồ sơ cá nhân</h1>
          <p className="mt-2 text-zinc-400">Thông tin tài khoản hiện tại của bạn.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <p className="text-sm text-zinc-400">Tên người dùng</p>
              <p className="mt-1 text-lg font-medium text-zinc-100">{user.username}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <p className="text-sm text-zinc-400">Email</p>
              <p className="mt-1 text-lg font-medium text-zinc-100">{user.email}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <p className="text-sm text-zinc-400">Vai trò</p>
              <p className="mt-1 text-lg font-medium capitalize text-zinc-100">{user.role}</p>
            </div>
          </div>
        </section>

        {/* Playlists */}
        <section className="rounded-2xl border border-zinc-800 bg-[#151618]/92 px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-zinc-100">Danh sách phim của tôi</h2>
              <p className="mt-1 text-sm text-zinc-400">
                {playlists.length} playlist{playlists.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
            >
              {showCreateForm ? "Hủy" : "+ Tạo playlist"}
            </button>
          </div>

          {/* Create Playlist Form */}
          {showCreateForm && (
            <div className="mt-4 flex gap-3">
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Tên playlist mới..."
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-400"
                onKeyDown={(e) => e.key === "Enter" && handleCreatePlaylist()}
              />
              <button
                type="button"
                onClick={handleCreatePlaylist}
                disabled={createPlaylist.isPending || !newPlaylistName.trim()}
                className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-white disabled:opacity-50"
              >
                {createPlaylist.isPending ? "Đang tạo..." : "Tạo"}
              </button>
            </div>
          )}

          {/* Loading state */}
          {playlistsLoading && (
            <div className="mt-6 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-xl bg-zinc-800" />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!playlistsLoading && playlists.length === 0 && (
            <div className="mt-6 rounded-xl border border-dashed border-zinc-700 p-8 text-center">
              <p className="text-zinc-400">Bạn chưa có playlist nào.</p>
              <p className="mt-1 text-sm text-zinc-500">
                Bấm "+ Tạo playlist" để bắt đầu lưu phim yêu thích!
              </p>
            </div>
          )}

          {/* Playlist List */}
          {!playlistsLoading && playlists.length > 0 && (
            <div className="mt-6 space-y-6">
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">{playlist.name}</h3>
                      {playlist.description && (
                        <p className="mt-1 text-sm text-zinc-400">{playlist.description}</p>
                      )}
                      <p className="mt-1 text-xs text-zinc-500">
                        {playlist.movies.length} phim · Tạo ngày{" "}
                        {new Date(playlist.createdAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeletePlaylist(playlist._id)}
                      disabled={deletePlaylist.isPending}
                      className="shrink-0 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                    >
                      Xóa
                    </button>
                  </div>

                  {/* Movies Grid */}
                  {playlist.movies.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                      {playlist.movies.map((movie) => (
                        <div key={movie.tmdbId} className="group relative">
                          <Link to={`/${movie.mediaType}/${movie.tmdbId}`}>
                            <div className="aspect-[2/3] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800">
                              <img
                                src={`${TMDB_IMAGE}${movie.posterPath}`}
                                alt={movie.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition group-hover:scale-105"
                              />
                            </div>
                            <p className="mt-1.5 line-clamp-2 text-xs font-medium text-zinc-300">
                              {movie.title}
                            </p>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleRemoveMovie(playlist._id, movie.tmdbId)}
                            className="absolute right-1 top-1 hidden rounded-full bg-black/70 p-1 text-xs text-red-400 transition hover:bg-black/90 group-hover:block"
                            title="Xóa phim"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {playlist.movies.length === 0 && (
                    <p className="mt-4 text-sm text-zinc-500">
                      Playlist trống. Vào trang chi tiết phim để thêm phim vào đây!
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};
