import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MovieDetail } from "@/components/movie/MovieDetail";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

type MovieDetailPayload = {
  movie: Record<string, unknown>;
  genres: Array<{ id?: number | string; name: string }>;
  credits: { cast?: Array<Record<string, unknown>> };
  videos: { results?: Array<Record<string, unknown>> };
  similar: { results?: Array<Record<string, unknown>> };
  mediaType: "movie" | "tv";
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

const MovieDetailSkeleton = () => (
  <main className="mx-auto w-full max-w-7xl animate-pulse space-y-6 px-4 py-6 sm:px-6 sm:py-8">
    <div className="h-105 rounded-2xl bg-zinc-800" />
    <div className="h-44 rounded-2xl bg-zinc-800" />
    <div className="h-72 rounded-2xl bg-zinc-800" />
  </main>
);

export const MovieDetailPage = () => {
  const { id, mediaType } = useParams();
  const [payload, setPayload] = useState<MovieDetailPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchDetailBundle = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      if (!apiKey) {
        setError("Thiếu VITE_TMDB_API_KEY để tải dữ liệu phim.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const type = mediaType === "tv" ? "tv" : "movie";

        const [movieRes, creditsRes, videosRes, similarRes] = await Promise.all([
          api.get(`/${type}/${id}`, { params: { api_key: apiKey, language: "vi-VN" } }),
          api.get(`/${type}/${id}/credits`, { params: { api_key: apiKey, language: "vi-VN" } }),
          api.get(`/${type}/${id}/videos`, { params: { api_key: apiKey, language: "vi-VN" } }),
          api.get(`/${type}/${id}/similar`, {
            params: { api_key: apiKey, language: "vi-VN", page: 1 },
          }),
        ]);

        if (!mounted) return;
        setPayload({
          movie: movieRes.data,
          genres: movieRes.data?.genres || [],
          credits: creditsRes.data,
          videos: videosRes.data,
          similar: similarRes.data,
          mediaType: type,
        });
      } catch (fetchError: unknown) {
        if (!mounted) return;
        setError(getErrorMessage(fetchError, "Không thể tải dữ liệu chi tiết phim."));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDetailBundle();
    return () => {
      mounted = false;
    };
  }, [id, mediaType]);

  return (
    <>
      <Header />
      {loading && <MovieDetailSkeleton />}
      {!loading && error && (
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
          <div className="rounded-2xl border border-red-500/30 bg-zinc-900 p-6 text-red-200">
            {error}
          </div>
        </section>
      )}
      {!loading && !error && payload && (
        <MovieDetail
          movie={payload.movie}
          genres={payload.genres}
          credits={payload.credits}
          videos={payload.videos}
          similar={payload.similar}
          mediaType={payload.mediaType}
        />
      )}
      <Footer />
    </>
  );
};
