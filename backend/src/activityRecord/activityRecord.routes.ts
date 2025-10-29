import express from "express";

import { isAuthenticated } from "../middleware/auth";
import * as activityRecordController from "./activityRecord.controller";

const router = express.Router();

router.post("/", isAuthenticated, activityRecordController.create);
router.get("/", isAuthenticated, activityRecordController.getAll);
router.get("/:activityId/total-time", isAuthenticated, activityRecordController.totalTime);
router.get("/:activityId/heatmap", isAuthenticated, activityRecordController.heatmap);
router.get("/:activityId/timeframe", isAuthenticated, activityRecordController.timeframe);
router.get("/:id", isAuthenticated, activityRecordController.getById);
router.put("/:id", isAuthenticated, activityRecordController.update);
router.delete("/:id", isAuthenticated, activityRecordController.remove);

export default router;
