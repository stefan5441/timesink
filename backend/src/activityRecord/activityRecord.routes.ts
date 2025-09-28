import express from "express";

import { isAuthenticated } from "../middleware/auth";
import * as activityRecordController from "./activityRecord.controller";

const router = express.Router();

router.post("/", isAuthenticated, activityRecordController.create);
router.get("/", isAuthenticated, activityRecordController.getAll);
router.get("/:id", isAuthenticated, activityRecordController.getById);
router.put("/:id", isAuthenticated, activityRecordController.update);
router.delete("/:id", isAuthenticated, activityRecordController.remove);
router.get("/total/:activityId", isAuthenticated, activityRecordController.totalTime);
router.get("/heatmap/:activityId", isAuthenticated, activityRecordController.heatmap);

export default router;
