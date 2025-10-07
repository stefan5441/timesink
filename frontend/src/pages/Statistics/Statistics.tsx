import { useEffect, useState } from "react";
import type { Activity } from "@prisma/client";
import { bgColorMap } from "@/components/custom/utils";
import { useActivities } from "@/api/activity/activityQueries";
import { LayoutWithSidebar } from "@/components/functional/LayoutWithSidebar";
import { MainContentContainer } from "@/components/functional/MainContentContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  useGetActivityHeatmap,
  useGetActivityTimeframeTime,
  useGetTotalTimeForActivity,
} from "@/api/activityRecord/activityRecordQueries";
import { ActivityHeatmap } from "@/components/custom/ActivityHeatmap/ActivityHeatmap";
import { getEndOfMonth, getEndOfWeek, getEndOfYear, getStartOfMonth, getStartOfWeek, getStartOfYear } from "./utils";
import { StatisticsTimeItem } from "./StatisticsTimeItem";

export const Statistics = () => {
  const [activity, setActivity] = useState<Activity>();
  const { data: activitiesData } = useActivities();
  const { data: totalActivityTimeData } = useGetTotalTimeForActivity(activity?.id ?? "");
  const { data: totalWeeklyActivityData } = useGetActivityTimeframeTime(
    activity?.id ?? "",
    getStartOfWeek(),
    getEndOfWeek()
  );
  const { data: totalMonthlyActivityData } = useGetActivityTimeframeTime(
    activity?.id ?? "",
    getStartOfMonth(),
    getEndOfMonth()
  );
  const { data: totalYearlyActivityData } = useGetActivityTimeframeTime(
    activity?.id ?? "",
    getStartOfYear(),
    getEndOfYear()
  );
  const { data: heatmapData } = useGetActivityHeatmap(activity?.id ?? "");

  useEffect(() => {
    if (activitiesData && activitiesData.length > 0 && !activity) {
      setActivity(activitiesData[0]);
    }
  }, [activitiesData, activity]);

  return (
    <LayoutWithSidebar>
      <MainContentContainer>
        <div className="flex flex-col h-full gap-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Statistics</h1>

            <Select
              value={activity?.id ?? ""}
              onValueChange={(value) => {
                const selectedActivity = activitiesData?.find((a) => a.id === value);
                setActivity(selectedActivity);
              }}
            >
              <SelectTrigger size="sm" className="w-50">
                <SelectValue placeholder="Select an actiity" />
              </SelectTrigger>
              <SelectContent>
                {activitiesData
                  ? activitiesData.map((a) => (
                      <SelectItem key={a.id} value={a.id} className="flex py-1 text-xs">
                        <span className={`w-3 h-3 rounded ${bgColorMap[a.color]}`}></span>
                        {a.name}
                      </SelectItem>
                    ))
                  : undefined}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <div className="flex flex-col justify-center h-full gap-10">
              <div className="flex gap-10">
                <StatisticsTimeItem
                  timeInSeconds={totalActivityTimeData}
                  activityColor={activity?.color ?? "GREEN"}
                  label="all time"
                />
                <StatisticsTimeItem
                  timeInSeconds={totalWeeklyActivityData}
                  activityColor={activity?.color ?? "GREEN"}
                  label="this week"
                />
                <StatisticsTimeItem
                  timeInSeconds={totalMonthlyActivityData}
                  activityColor={activity?.color ?? "GREEN"}
                  label="this month"
                />
                <StatisticsTimeItem
                  timeInSeconds={totalYearlyActivityData}
                  activityColor={activity?.color ?? "GREEN"}
                  label="this year"
                />
              </div>

              <div>
                <h2 className="mb-1">How this year is going:</h2>
                <ActivityHeatmap activities={heatmapData ?? []} color={activity?.color ?? "GREEN"} />
              </div>
            </div>
          </div>
        </div>
      </MainContentContainer>
    </LayoutWithSidebar>
  );
};
