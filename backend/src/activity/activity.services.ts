import prisma from "../utils/prisma";
import { Activity, Color } from "@prisma/client";

type CreateActivityPayload = {
  name: string;
  color: Color;
  userId: string;
};

type UpdateActivityPayload = {
  id: string;
  name?: string;
  color?: Color;
};

export async function createActivity({ name, color, userId }: CreateActivityPayload): Promise<Activity> {
  try {
    return await prisma.activity.create({
      data: { name, color, userId },
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new Error("You already have an activity with this name.");
    }
    throw err;
  }
}

export async function getActivitiesByUser(userId: string): Promise<Activity[]> {
  return prisma.activity.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getActivityById(id: string, userId: string): Promise<Activity | null> {
  return prisma.activity.findFirst({
    where: {
      id,
      userId,
    },
  });
}

export async function updateActivity({ id, name, color }: UpdateActivityPayload, userId: string): Promise<Activity> {
  const result = await prisma.activity.updateMany({
    where: { id, userId },
    data: { name, color },
  });

  if (result.count === 0) {
    throw new Error("Activity not found or no permission");
  }

  return getActivityById(id, userId) as Promise<Activity>;
}

export async function deleteActivity(id: string, userId: string): Promise<Activity> {
  const activity = await prisma.activity.findFirst({
    where: { id, userId },
  });

  if (!activity) {
    throw new Error("Activity not found or no permission to delete");
  }

  return prisma.activity.delete({
    where: { id },
  });
}
