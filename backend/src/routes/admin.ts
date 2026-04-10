import { Router } from "express";
import { requireAdmin, requireAuth } from "../middleware/auth";

export const adminRouter = Router();

adminRouter.get("/dashboard", requireAuth, requireAdmin, (_req, res) => {
  return res.status(200).json({ message: "Admin route protected successfully" });
});
