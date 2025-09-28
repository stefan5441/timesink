import { Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import * as activityService from "./activity.services";
import { AuthenticatedRequest } from "../middleware/auth";

export const createActivity = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { name, color } = req.body;
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
  const activity = await activityService.createActivity({ name, color, userId: req.userId });
  res.status(201).json(activity);
});

export const getActivitiesByUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
  const activities = await activityService.getActivitiesByUser(req.userId);
  res.json(activities);
});

export const getActivityById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
  const activity = await activityService.getActivityById(req.params.id, req.userId);
  if (!activity) return res.status(404).json({ message: "Activity not found" });
  res.json(activity);
});

export const updateActivity = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
  const { name, color } = req.body;
  const activity = await activityService.updateActivity({ id: req.params.id, name, color }, req.userId);
  res.json(activity);
});

export const deleteActivity = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
  const activity = await activityService.deleteActivity(req.params.id, req.userId);
  res.json(activity);
});
