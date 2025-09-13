import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActivity, deleteActivity, getActivities, getActivity, updateActivity } from "./activityServices";

export const activityKeys = {
  all: ["activities"] as const,
  detail: (id: string) => [...activityKeys.all, id] as const,
};

export function useActivities() {
  return useQuery({
    queryKey: activityKeys.all,
    queryFn: getActivities,
  });
}

export function useActivity(id: string) {
  return useQuery({
    queryKey: activityKeys.detail(id),
    queryFn: () => getActivity(id),
    enabled: !!id,
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.all });
    },
  });
}

export function useUpdateActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateActivity,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: activityKeys.all });
      if (variables.id) {
        queryClient.invalidateQueries({ queryKey: activityKeys.detail(variables.id) });
      }
    },
  });
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.all });
    },
  });
}
