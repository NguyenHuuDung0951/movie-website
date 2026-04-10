import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(env.mongoUri);
  // Basic connection log to ensure DB bootstrap success.
  console.log("Connected to MongoDB");
};
