import express, { Response, NextFunction } from "express";
import { AuthenticatedRequest, isAuthenticated } from "../middleware";
import { createActivityRecord, getActivityRecordsByUser } from "./activityRecord.services";

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
