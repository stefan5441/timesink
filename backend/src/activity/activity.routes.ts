// routes/activity.routes.ts
import { isAuthenticated } from "../middleware";
import express, { Request, Response, NextFunction } from "express";
import {
  createActivity,
  getActivitiesByUser,
  getActivityById,
  updateActivity,
  deleteActivity,
} from "../activity/activity.services";

const router = express.Router();

router.post("/", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, color } = req.body;
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const activity = await createActivity({ name, color, userId });
    res.status(201).json(activity);
  } catch (err) {
    next(err);
  }
});

router.get("/", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const activities = await getActivitiesByUser(userId);
    res.json(activities);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const activity = await getActivityById(req.params.id, userId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const { name, color } = req.body;

    const activity = await updateActivity({ id: req.params.id, name, color }, userId);
    res.json(activity);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;

    await deleteActivity(req.params.id, userId);
    res.json({ message: "Activity deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
