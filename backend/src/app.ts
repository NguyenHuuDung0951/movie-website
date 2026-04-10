import cors from "cors";
import express from "express";
import { adminRouter } from "./routes/admin";
import { authRouter } from "./routes/auth";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
