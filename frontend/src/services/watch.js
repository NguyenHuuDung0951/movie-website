import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const normalizeEnvValue = (value) => {
  const normalized = String(value || "").trim();
  if (!normalized || normalized === "undefined" || normalized === "null") {
    return "";
  }

  return normalized;
};

const getApiKey = () => {
  const apiKey = normalizeEnvValue(import.meta.env.VITE_TMDB_API_KEY);

  if (!apiKey) {
    throw new Error("Thiếu VITE_TMDB_API_KEY để tải dữ liệu xem phim.");
  }

  return apiKey;
};

const fetchVideosAnyLanguage = async ({ type, id, apiKey, language }) => {
  const candidateParams = [
    { api_key: apiKey, language },
    { api_key: apiKey },
    { api_key: apiKey, language: "en-US" },
  ];

  const tried = new Set();
  let fallbackData = { id: Number(id), results: [] };

  for (const params of candidateParams) {
    const signature = JSON.stringify(params);
    if (tried.has(signature)) {
      continue;
    }

    tried.add(signature);

    try {
      const response = await api.get(`/${type}/${id}/videos`, { params });
      const data = response?.data || fallbackData;
      const hasResults = Array.isArray(data?.results) && data.results.length > 0;

      if (hasResults) {
        return data;
      }

      fallbackData = data;
    } catch {
      // Ignore intermediate failures and try the next language fallback.
    }
  }

  return fallbackData;
};

export const fetchWatchBundle = async ({ type, id, language = "vi-VN", page = 1 }) => {
  const apiKey = getApiKey();

  const [detailRes, videosData, creditsRes, similarRes, trendingRes] = await Promise.all([
    api.get(`/${type}/${id}`, {
      params: { api_key: apiKey, language },
    }),
    fetchVideosAnyLanguage({ type, id, apiKey, language }),
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
    videos: videosData,
    credits: creditsRes.data,
    similar: similarRes.data,
    trending: trendingRes.data,
  };
};

const EMBED_SITE_PRIORITY = {
  youtube: 4,
  vimeo: 3,
  dailymotion: 2,
};

const VIDEO_TYPE_PRIORITY = {
  Trailer: 8,
  Teaser: 7,
  Clip: 6,
  Featurette: 5,
  "Opening Credits": 4,
  "Behind the Scenes": 3,
  Bloopers: 2,
};

const getSiteName = (site) =>
  String(site || "")
    .toLowerCase()
    .trim();

const buildEmbedUrl = ({ site, key }) => {
  const siteName = getSiteName(site);

  if (!key) return "";

  if (siteName === "youtube") {
    return `https://www.youtube.com/embed/${key}?rel=0&modestbranding=1&autoplay=0`;
  }

  if (siteName === "vimeo") {
    return `https://player.vimeo.com/video/${key}`;
  }

  if (siteName === "dailymotion") {
    return `https://www.dailymotion.com/embed/video/${key}`;
  }

  return "";
};

const buildWatchUrl = ({ site, key }) => {
  const siteName = getSiteName(site);

  if (!key) return "";

  if (siteName === "youtube") {
    return `https://www.youtube.com/watch?v=${key}`;
  }

  if (siteName === "vimeo") {
    return `https://vimeo.com/${key}`;
  }

  if (siteName === "dailymotion") {
    return `https://www.dailymotion.com/video/${key}`;
  }

  return "";
};

export const pickPlayableWatchVideo = (videos) => {
  const list = videos?.results || [];
  const playableList = list.filter((item) => item?.key && item?.site);

  if (!playableList.length) {
    return null;
  }

  const sorted = [...playableList].sort((a, b) => {
    const aSite = EMBED_SITE_PRIORITY[getSiteName(a.site)] || 0;
    const bSite = EMBED_SITE_PRIORITY[getSiteName(b.site)] || 0;

    if (aSite !== bSite) {
      return bSite - aSite;
    }

    const aType = VIDEO_TYPE_PRIORITY[a.type] || 1;
    const bType = VIDEO_TYPE_PRIORITY[b.type] || 1;

    if (aType !== bType) {
      return bType - aType;
    }

    return Number(Boolean(b.official)) - Number(Boolean(a.official));
  });

  const picked = sorted[0];
  const embedUrl = buildEmbedUrl(picked);
  const watchUrl = buildWatchUrl(picked);

  return {
    key: picked.key,
    site: picked.site,
    type: picked.type,
    name: picked.name,
    embedUrl,
    watchUrl,
  };
};
