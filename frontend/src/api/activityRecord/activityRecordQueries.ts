import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActivityRecord, getActivityRecords } from "./activityRecordServices";

export const activityRecordKeys = {
  all: ["activityRecords"] as const,
};

export function useActivityRecords() {
  return useQuery({
    queryKey: activityRecordKeys.all,
    queryFn: getActivityRecords,
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
