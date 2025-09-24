import type { ActivityRecord } from "@prisma/client";
import { client } from "../../auth/axiosClient";
import type { HeatmapActivity } from "@/components/custom/ActivityHeatmap/types";

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

export async function getTotalTimeForActivity(activityId: string) {
  const res = await client.get(`activity-record/${activityId}/total-time`);
  return res.data.totalTimeInSeconds;
}

export async function getTimeForActivityTimeframe(activityId: string, dateFrom: Date, dateTill: Date) {
  const res = await client.get(`activity-record/${activityId}/timeframe`, {
    params: {
      dateFrom: dateFrom.toISOString(),
      dateTill: dateTill.toISOString(),
    },
  });
  return res.data.totalTimeInSeconds;
}

export async function getActivityHeatmap(activityId: string): Promise<HeatmapActivity[]> {
  const res = await client.get(`activity-record/${activityId}/heatmap`);
  return res.data;
}
