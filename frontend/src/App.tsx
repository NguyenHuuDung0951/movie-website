import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { HomePage } from "@/pages/home-page";
import { LoginPage } from "@/pages/login-page";
import { RegisterPage } from "@/pages/register-page";
import { AdminPage } from "@/pages/admin-page";
import { MovieDetailPage } from "@/pages/MovieDetailPage";
import { MoviesPage } from "@/pages/MoviesPage";
import { TvSeriesPage } from "@/pages/TvSeriesPage";
import { WatchPage } from "@/pages/WatchPage";
import { ProfilePage } from "@/pages/profile-page";
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

  return <>{children}</>;
};

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
          <ProtectedRoute>
            <Navigate to="/admin/dashboard" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
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
