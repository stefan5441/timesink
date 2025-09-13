import type { ActivityRecord } from "@prisma/client";
import { client } from "../../auth/axiosClient";

type CreateActivityRecordPayload = {
  activityId: string;
  lengthInSecnods: number;
};

export async function createActivityRecord({
  activityId,
  lengthInSecnods,
}: CreateActivityRecordPayload): Promise<ActivityRecord> {
  const res = await client.post("activity-record", { activityId, lengthInSecnods });
  return res.data;
}

export async function getActivityRecords(): Promise<ActivityRecord[]> {
  const res = await client.get("activity-record");
  return res.data;
}
