import React from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomePage } from "@/pages/home-page";
import { LoginPage } from "@/pages/login-page";
import { RegisterPage } from "@/pages/register-page";
import { AdminPage } from "@/pages/admin-page";
import { MovieDetailPage } from "@/pages/MovieDetailPage";
import { MoviesPage } from "@/pages/MoviesPage";
import { TvSeriesPage } from "@/pages/TvSeriesPage";
import { WatchPage } from "@/pages/WatchPage";
import { ProfilePage } from "@/pages/profile-page";
import { AdminMoviesPage } from "@/pages/admin-movies-page";
import { AdminAddMoviePage } from "@/pages/admin-add-movie-page";
import { AdminMovieDetailsPage } from "@/pages/admin-movie-details-page";
import { SupportCenterPage } from "@/pages/support-center-page";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const GuestRoute = ({ children }: ProtectedRouteProps) => {
  const { authState } = useAuth();
  const token = authState.token || localStorage.getItem("token");

  if (token && authState.user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authState, meQuery } = useAuth();
  const token = authState.token || localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!authState.user && meQuery.isLoading) {
    return (
      <main className="mx-auto mt-16 w-full max-w-3xl rounded-2xl border border-zinc-800 bg-[#151618]/92 px-6 py-8 text-zinc-300">
        Đang tải thông tin người dùng...
      </main>
    );
  }

  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AdminRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { authState, meQuery } = useAuth();
  const token = authState.token || localStorage.getItem("token");
  const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === "true";

  // Allow opening admin UI without backend auth in local/dev mode.
  if (bypassAuth && location.pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!authState.user && meQuery.isLoading) {
    return (
      <main className="mx-auto mt-16 w-full max-w-3xl rounded-2xl border border-zinc-800 bg-[#151618]/92 px-6 py-8 text-zinc-300">
        Đang tải thông tin người dùng...
      </main>
    );
  }

  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based check: must be admin
  if (authState.user.role !== "admin") {
    return <ForbiddenPage />;
  }

  return <>{children}</>;
};

const ForbiddenPage = () => (
  <>
    <Header />
    <main className="mx-auto mt-16 w-full max-w-xl px-4 text-center">
      <div className="rounded-2xl border border-red-500/30 bg-zinc-900 p-8">
        <h1 className="text-4xl font-black text-red-400">403</h1>
        <p className="mt-3 text-lg font-semibold text-zinc-100">Truy cập bị từ chối</p>
        <p className="mt-2 text-sm text-zinc-400">
          Bạn không có quyền truy cập trang này. Chỉ tài khoản quản trị viên mới được phép.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg border border-zinc-700 bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700"
        >
          Về trang chủ
        </Link>
      </div>
    </main>
    <Footer />
  </>
);

export const App = () => {
  useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Navigate to="/admin/dashboard" replace />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/movies"
        element={
          <AdminRoute>
            <AdminMoviesPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/movies/new"
        element={
          <AdminRoute>
            <AdminAddMoviePage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/movies/:id"
        element={
          <AdminRoute>
            <AdminMovieDetailsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/moviecaroucelalone" element={<MoviesPage />} />
      <Route path="/tv-series" element={<TvSeriesPage />} />
      <Route path="/moviecaroucelseries" element={<TvSeriesPage />} />
      <Route path="/support-center" element={<SupportCenterPage />} />
      <Route path="/watch/:type/:id" element={<WatchPage />} />
      <Route path="/:mediaType/:id" element={<MovieDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
