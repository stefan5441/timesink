import prisma from "../utils/prisma";
import { ActivityRecord } from "@prisma/client";

type CreateActivityRecordPayload = {
  activityId: string;
  userId: string;
  lengthInSeconds: number;
};

type UpdateActivityRecordPayload = {
  id: string;
  lengthInSeconds?: number;
};

type HeatmapActivity = {
  date: string;
  count: number;
  level: number;
};

export async function createActivityRecord({ activityId, userId, lengthInSeconds }: CreateActivityRecordPayload) {
  const activity = await prisma.activity.findFirst({
    where: { id: activityId, userId },
  });

  if (!activity) throw new Error("Activity not found or you do not have permission.");

  return prisma.activityRecord.create({
    data: { activityId, lengthInSeconds, userId },
  });
}

export async function getActivityRecordsByUser(userId: string): Promise<ActivityRecord[]> {
  return prisma.activityRecord.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { activity: true },
  });
}

export async function getActivityRecordById(id: string, userId: string): Promise<ActivityRecord | null> {
  return prisma.activityRecord.findFirst({
    where: { id, userId },
    include: { activity: true },
  });
}

export async function updateActivityRecord(
  { id, lengthInSeconds }: UpdateActivityRecordPayload,
  userId: string
): Promise<ActivityRecord> {
  const result = await prisma.activityRecord.updateMany({
    where: { id, userId },
    data: { lengthInSeconds },
  });

  if (result.count === 0) throw new Error("ActivityRecord not found or no permission");

  return getActivityRecordById(id, userId) as Promise<ActivityRecord>;
}

export async function deleteActivityRecord(id: string, userId: string): Promise<void> {
  const result = await prisma.activityRecord.deleteMany({
    where: { id, userId },
  });

  if (result.count === 0) throw new Error("ActivityRecord not found or no permission to delete");
}

export async function getTotalTimeForActivity(activityId: string, userId: string): Promise<number> {
  const result = await prisma.activityRecord.aggregate({
    _sum: { lengthInSeconds: true },
    where: { activityId, userId },
  });

  return result._sum.lengthInSeconds ?? 0;
}

export async function getTimeForActivity(
  activityId: string,
  dateFrom: Date,
  dateTill: Date,
  userId: string
): Promise<number> {
  const result = await prisma.activityRecord.aggregate({
    _sum: { lengthInSeconds: true },
    where: { activityId, userId, createdAt: { gte: dateFrom, lte: dateTill } },
  });

  return result._sum.lengthInSeconds ?? 0;
}

export async function getActivityHeatmap(activityId: string, userId: string): Promise<HeatmapActivity[]> {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setDate(today.getDate() - 365);

  const records = await prisma.activityRecord.findMany({
    where: { activityId, userId, createdAt: { gte: oneYearAgo, lte: today } },
    select: { createdAt: true, lengthInSeconds: true },
  });

  const map = new Map<string, number>();
  records.forEach((r) => {
    const dateKey = r.createdAt.toISOString().split("T")[0];
    map.set(dateKey, (map.get(dateKey) || 0) + r.lengthInSeconds);
  });

  const result: HeatmapActivity[] = [];
  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const count = map.get(dateStr) || 0;
    let level = 0;
    if (count > 0 && count <= 30 * 60) level = 1;
    else if (count > 30 * 60 && count <= 60 * 60) level = 2;
    else if (count > 60 * 60 && count <= 2 * 60 * 60) level = 3;
    else if (count > 2 * 60 * 60) level = 4;
    result.push({ date: dateStr, count, level });
  }

  return result;
}
