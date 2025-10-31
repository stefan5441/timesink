import type { Activity } from "@prisma/client";
import { useGetTimeframeData } from "./useGetTimeframeData";
import { TimeframeItem } from "./TimeframeItem";
import { ActivityHeatmap } from "@/components/ActivityHeatmap/ActivityHeatmap";
import { useGetActivityHeatmap } from "@/api/activityRecord/activityRecordQueries";
import { LoadingOrError } from "@/components/LoadingOrError";

type Props = {
  activity: Activity;
};

export const ActivityStatistics = ({ activity }: Props) => {
  const {
    totalActivityTime,
    totalMonthlyActivity,
    totalWeeklyActivity,
    totalYearlyActivity,
    isError: timeframeError,
    isLoading: timeframeLoading,
  } = useGetTimeframeData(activity.id);
  const { data: heatmapData, isLoading: heatmapLoading, isError: heatmapError } = useGetActivityHeatmap(activity.id);

  const isLoading = heatmapLoading || timeframeLoading;
  const isError = heatmapError || timeframeError;
  if (isLoading || isError) {
    return <LoadingOrError isError={isError} isLoading={isLoading} />;
  }

  return (
    <div className="h-full flex flex-col justify-center items-center gap-20">
      <div className="flex gap-10">
        <TimeframeItem timeInSeconds={totalActivityTime} label="all time" />
        <TimeframeItem timeInSeconds={totalYearlyActivity} label="this year" />
        <TimeframeItem timeInSeconds={totalMonthlyActivity} label="this month" />
        <TimeframeItem timeInSeconds={totalWeeklyActivity} label="this week" />
      </div>
      <div>
        <ActivityHeatmap activities={heatmapData ?? []} color={activity.color} />
      </div>
    </div>
  );
};
