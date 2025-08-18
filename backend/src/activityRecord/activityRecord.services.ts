import { ActivityRecord } from "../../generated/prisma";
import prisma from "../utils/prisma";

type CreateActivityRecordPayload = {
  activityId: string;
  userId: string;
  lengthInSeconds: number;
};

type UpdateActivityRecordPayload = {
  id: string;
  lengthInSeconds?: number;
};

export async function createActivityRecord({ activityId, userId, lengthInSeconds }: CreateActivityRecordPayload) {
  const activity = await prisma.activity.findFirst({
    where: { id: activityId, userId },
  });

  if (!activity) {
    throw new Error("Activity not found or you do not have permission.");
  }

  return prisma.activityRecord.create({
    data: {
      activityId,
      lengthInSeconds,
      userId,
    },
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

  if (result.count === 0) {
    throw new Error("ActivityRecord not found or no permission");
  }

  return getActivityRecordById(id, userId) as Promise<ActivityRecord>;
}

export async function deleteActivityRecord(id: string, userId: string): Promise<void> {
  const result = await prisma.activityRecord.deleteMany({
    where: { id, userId },
  });

  if (result.count === 0) {
    throw new Error("ActivityRecord not found or no permission to delete");
  }
}
