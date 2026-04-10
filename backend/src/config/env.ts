import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
};

if (!env.mongoUri) {
  throw new Error("Missing MONGODB_URI in environment.");
}

if (!env.jwtSecret) {
  throw new Error("Missing JWT_SECRET in environment.");
}
