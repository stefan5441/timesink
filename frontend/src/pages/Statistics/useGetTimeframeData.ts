import { useGetActivityTimeframeTime, useGetTotalTimeForActivity } from "@/api/activityRecord/activityRecordQueries";
import { getEndOfMonth, getEndOfWeek, getEndOfYear, getStartOfMonth, getStartOfWeek, getStartOfYear } from "./utils";

export const useGetTimeframeData = (activityId: string) => {
  const { data: totalActivityTimeData } = useGetTotalTimeForActivity(activityId);
  const { data: totalWeeklyActivityData } = useGetActivityTimeframeTime(
    activityId,
    getStartOfWeek().toISOString(),
    getEndOfWeek().toISOString()
  );
  const { data: totalMonthlyActivityData } = useGetActivityTimeframeTime(
    activityId,
    getStartOfMonth().toISOString(),
    getEndOfMonth().toISOString()
  );
  const { data: totalYearlyActivityData } = useGetActivityTimeframeTime(
    activityId,
    getStartOfYear().toISOString(),
    getEndOfYear().toISOString()
  );

  return {
    totalActivityTime: totalActivityTimeData,
    totalWeeklyActivity: totalWeeklyActivityData,
    totalMonthlyActivity: totalMonthlyActivityData,
    totalYearlyActivity: totalYearlyActivityData,
  };
};
