import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const env = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  tmdbApiKey: process.env.TMDB_API_KEY || "",
  tmdbBaseUrl: process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3",
};

if (!env.mongoUri) {
  throw new Error("Missing MONGODB_URI in environment.");
}

if (!env.jwtSecret) {
  throw new Error("Missing JWT_SECRET in environment.");
}

if (!env.tmdbApiKey) {
  throw new Error("Missing TMDB_API_KEY in environment.");
}
if (!env.tmdbBaseUrl) {
  throw new Error("Missing TMDB_BASE_URL in environment.");
}
