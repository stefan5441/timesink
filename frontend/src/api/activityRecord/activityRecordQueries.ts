import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActivityRecord, getActivityRecords, getTotalTimeForActivity } from "./activityRecordServices";

export const activityRecordKeys = {
  all: ["activityRecords"] as const,
  totalTime: (activityId: string) => ["activityRecords", "totalTime", activityId] as const,
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

export function useCreateActivityRecord() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createActivityRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityRecordKeys.all });
    },
  });
}
