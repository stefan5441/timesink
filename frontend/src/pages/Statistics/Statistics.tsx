import { useEffect, useState } from "react";
import type { Activity } from "@prisma/client";
import { bgColorMap, textColorMap } from "@/components/ui/custom/utils";
import { useActivities } from "@/api/activity/activityQueries";
import { LayoutWithSidebar } from "@/components/functional/LayoutWithSidebar";
import { MainContentContainer } from "@/components/functional/MainContentContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetTotalTimeForActivity } from "@/api/activityRecord/activityRecordQueries";
import { formatTotalTime } from "./utils";
import { ActivityHeatmap } from "@/components/ui/custom/ActivityHeatmap/ActivityHeatmap";

export const Statistics = () => {
  const [activity, setActivity] = useState<Activity>();
  const { data: activitiesData } = useActivities();
  const { data: totalActivityTimeData } = useGetTotalTimeForActivity(activity?.id ?? "");

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
            <div className="flex flex-col justify-center h-full gap-4">
              <div className={`${activity?.color ? textColorMap[activity.color] : ""} font-semibold`}>
                Total time spent: {formatTotalTime(totalActivityTimeData)}
              </div>
              <div>
                <ActivityHeatmap activities={[]} />
              </div>
            </div>
          </div>
        </div>
      </MainContentContainer>
    </LayoutWithSidebar>
  );
};
