import { Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { AuthenticatedRequest } from "../middleware/auth";
import * as activityRecordService from "./activityRecord.services";

export const create = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { activityId, lengthInSeconds } = req.body;
  const userId = (req as any).userId;
  const record = await activityRecordService.createActivityRecord({ activityId, lengthInSeconds, userId });
  res.status(201).json(record);
});

export const getAll = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as any).userId;
  const records = await activityRecordService.getActivityRecordsByUser(userId);
  res.json(records);
});

export const getById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as any).userId;
  const record = await activityRecordService.getActivityRecordById(req.params.id, userId);
  if (!record) return res.status(404).json({ message: "ActivityRecord not found" });
  res.json(record);
});

export const getByActivityId = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as any).userId;
  const records = await activityRecordService.getActivityRecordsByActivityId(req.params.activityId, userId);
  res.json(records);
});

export const update = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as any).userId;
  const { lengthInSeconds } = req.body;
  const record = await activityRecordService.updateActivityRecord({ id: req.params.id, lengthInSeconds }, userId);
  res.json(record);
});

export const remove = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as any).userId;
  await activityRecordService.deleteActivityRecord(req.params.id, userId);
  res.json({ message: "Deleted successfully" });
});

export const totalTime = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as any).userId;
  const total = await activityRecordService.getTotalTimeForActivity(req.params.activityId, userId);
  res.json({ total });
});

export const heatmap = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as any).userId;
  const heatmap = await activityRecordService.getActivityHeatmap(req.params.activityId, userId);
  res.json(heatmap);
});

export const timeframe = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = (req as any).userId;
  const { dateFrom, dateTill } = req.query;

  if (!dateFrom || !dateTill) {
    return res.status(400).json({ message: "dateFrom and dateTill are required" });
  }

  const total = await activityRecordService.getTimeForActivity(
    req.params.activityId,
    new Date(dateFrom as string),
    new Date(dateTill as string),
    userId
  );

  res.json({ total });
});
