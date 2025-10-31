import { useGetActivityTimeframeTime, useGetTotalTimeForActivity } from "@/api/activityRecord/activityRecordQueries";
import { getEndOfMonth, getEndOfWeek, getEndOfYear, getStartOfMonth, getStartOfWeek, getStartOfYear } from "./utils";

export const useGetTimeframeData = (activityId: string) => {
  const {
    data: totalActivityTimeData,
    isLoading: isTotalLoading,
    isError: isTotalError,
  } = useGetTotalTimeForActivity(activityId);

  const {
    data: totalWeeklyActivityData,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
  } = useGetActivityTimeframeTime(activityId, getStartOfWeek().toISOString(), getEndOfWeek().toISOString());

  const {
    data: totalMonthlyActivityData,
    isLoading: isMonthlyLoading,
    isError: isMonthlyError,
  } = useGetActivityTimeframeTime(activityId, getStartOfMonth().toISOString(), getEndOfMonth().toISOString());

  const {
    data: totalYearlyActivityData,
    isLoading: isYearlyLoading,
    isError: isYearlyError,
  } = useGetActivityTimeframeTime(activityId, getStartOfYear().toISOString(), getEndOfYear().toISOString());

  const isLoading = isTotalLoading || isWeeklyLoading || isMonthlyLoading || isYearlyLoading;
  const isError = isTotalError || isWeeklyError || isMonthlyError || isYearlyError;

  return {
    totalActivityTime: totalActivityTimeData,
    totalWeeklyActivity: totalWeeklyActivityData,
    totalMonthlyActivity: totalMonthlyActivityData,
    totalYearlyActivity: totalYearlyActivityData,
    isLoading,
    isError,
  };
};
