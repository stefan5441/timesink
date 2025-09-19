import express, { Response, NextFunction } from "express";
import { AuthenticatedRequest, isAuthenticated } from "../middleware";
import {
  createActivityRecord,
  getActivityHeatmap,
  getActivityRecordsByUser,
  getTimeForActivity,
  getTotalTimeForActivity,
} from "./activityRecord.services";

const router = express.Router();

router.post("/", isAuthenticated, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { activityId, lengthInSeconds } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const record = await createActivityRecord({ activityId, lengthInSeconds, userId: userId });
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
});

router.get("/", isAuthenticated, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const records = await getActivityRecordsByUser(userId);
    res.json(records);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:activityId/total-time",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const { activityId } = req.params;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const totalTime = await getTotalTimeForActivity(activityId, userId);
      res.json({ activityId, totalTimeInSeconds: totalTime });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

router.get(
  "/:activityId/timeframe",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const { activityId } = req.params;
      const { dateFrom, dateTill } = req.query;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!dateFrom || !dateTill) {
        return res.status(400).json({ message: "Missing dateFrom or dateTill query params" });
      }

      const from = new Date(dateFrom as string);
      const till = new Date(dateTill as string);

      const totalTime = await getTimeForActivity(activityId, from, till, userId);
      res.json({
        activityId,
        dateFrom: from.toISOString(),
        dateTill: till.toISOString(),
        totalTimeInSeconds: totalTime,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:activityId/heatmap",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const { activityId } = req.params;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const heatmap = await getActivityHeatmap(activityId, userId);
      res.json(heatmap);
    } catch (err) {
      next(err);
    }
  }
);
