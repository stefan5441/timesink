import express from "express";

import { isAuthenticated } from "../middleware/auth";
import * as activityController from "./activity.controller";

const router = express.Router();

router.post("/", isAuthenticated, activityController.createActivity);
router.get("/", isAuthenticated, activityController.getActivitiesByUser);
router.get("/:id", isAuthenticated, activityController.getActivityById);
router.put("/:id", isAuthenticated, activityController.updateActivity);
router.delete("/:id", isAuthenticated, activityController.deleteActivity);

export default router;
