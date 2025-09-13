import type { ActivityRecord } from "@prisma/client";
import { client } from "../../auth/axiosClient";

type CreateActivityRecordPayload = {
  activityId: string;
  lengthInSeconds: number;
};

export async function createActivityRecord({
  activityId,
  lengthInSeconds,
}: CreateActivityRecordPayload): Promise<ActivityRecord> {
  const res = await client.post("activity-record", { activityId, lengthInSeconds });
  return res.data;
}

export async function getActivityRecords(): Promise<ActivityRecord[]> {
  const res = await client.get("activity-record");
  return res.data;
}
