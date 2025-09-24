import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createActivityRecord,
  getActivityHeatmap,
  getActivityRecords,
  getTimeForActivityTimeframe,
  getTotalTimeForActivity,
} from "./activityRecordServices";
import type { HeatmapActivity } from "@/components/custom/ActivityHeatmap/types";

export const activityRecordKeys = {
  all: ["activityRecords"] as const,
  totalTime: (activityId: string) => ["activityRecords", "totalTime", activityId] as const,
  timeframeTime: (activityId: string, dateFrom: Date, dateTill: Date) =>
    ["activityRecords", "timeframe", activityId, dateFrom.toISOString(), dateTill.toISOString()] as const,
  heatmap: (activityId: string) => ["activityRecords", "heatmap", activityId] as const,
};

export function useActivityRecords() {
  return useQuery({
    queryKey: activityRecordKeys.all,
    queryFn: getActivityRecords,
  });
}

export function useGetTotalTimeForActivity(activityId: string) {
  return useQuery({
    queryKey: activityRecordKeys.totalTime(activityId),
    queryFn: () => getTotalTimeForActivity(activityId),
    enabled: !!activityId,
  });
}

export function useGetActivityTimeframeTime(activityId: string, dateFrom: Date, dateTill: Date) {
  return useQuery({
    queryKey: activityRecordKeys.timeframeTime(activityId, dateFrom, dateTill),
    queryFn: () => getTimeForActivityTimeframe(activityId, dateFrom, dateTill),
    enabled: !!activityId && !!dateFrom && !!dateTill,
  });
}

export function useGetActivityHeatmap(activityId: string) {
  return useQuery<HeatmapActivity[]>({
    queryKey: activityRecordKeys.heatmap(activityId),
    queryFn: () => getActivityHeatmap(activityId),
    enabled: !!activityId,
  });
}

export function useCreateActivityRecord() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createActivityRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityRecordKeys.all });
    },
  });
}
