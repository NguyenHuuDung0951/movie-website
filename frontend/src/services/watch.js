import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const getApiKey = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("Thiếu VITE_TMDB_API_KEY để tải dữ liệu xem phim.");
  }

  return apiKey;
};

export const fetchWatchBundle = async ({ type, id, language = "vi-VN", page = 1 }) => {
  const apiKey = getApiKey();

  const [detailRes, videosRes, creditsRes, similarRes, trendingRes] = await Promise.all([
    api.get(`/${type}/${id}`, {
      params: { api_key: apiKey, language },
    }),
    api.get(`/${type}/${id}/videos`, {
      params: { api_key: apiKey, language },
    }),
    api.get(`/${type}/${id}/credits`, {
      params: { api_key: apiKey, language },
    }),
    api.get(`/${type}/${id}/similar`, {
      params: { api_key: apiKey, language, page },
    }),
    api.get(`/trending/${type}/week`, {
      params: { api_key: apiKey, language },
    }),
  ]);

  return {
    detail: detailRes.data,
    videos: videosRes.data,
    credits: creditsRes.data,
    similar: similarRes.data,
    trending: trendingRes.data,
  };
};

export const pickYoutubeWatchKey = (videos) => {
  const list = videos?.results || [];
  const youtubeList = list.filter((item) => item.site === "YouTube" && item.key);

  const pick = (type, officialOnly = false) =>
    youtubeList.find((item) => item.type === type && (!officialOnly || Boolean(item.official)))
      ?.key;

  return (
    pick("Trailer", true) ||
    pick("Trailer") ||
    pick("Teaser", true) ||
    pick("Teaser") ||
    youtubeList[0]?.key ||
    ""
  );
};
