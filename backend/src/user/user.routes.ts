import { findUserById } from "./user.services";
import express, { Request, Response, NextFunction } from "express";
import { isAuthenticated, AuthenticatedRequest } from "../middleware";

const router = express.Router();

router.get("/me", isAuthenticated, async (req: AuthenticatedRequest, res) => {
  const user = await findUserById(req.userId!);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ id: user.id, email: user.email, username: user.username });
});

export default router;
