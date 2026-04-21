import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { HomePage } from "@/pages/home-page";
import { LoginPage } from "@/pages/login-page";
import { RegisterPage } from "@/pages/register-page";
import { AdminPage } from "@/pages/admin-page";
import { MovieDetailPage } from "@/pages/MovieDetailPage";
import { MoviesPage } from "@/pages/MoviesPage";
import { WatchPage } from "@/pages/WatchPage";
import { ProfilePage } from "@/pages/profile-page";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const GuestRoute = ({ children }: ProtectedRouteProps) => {
  const { authState } = useAuth();
  const token = authState.token || localStorage.getItem("token");

  if (token && authState.user) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authState, meQuery } = useAuth();
  const token = authState.token || localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (meQuery.isLoading || meQuery.isFetching) {
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
      <Route path="/watch/:type/:id" element={<WatchPage />} />
      <Route path="/:mediaType/:id" element={<MovieDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
