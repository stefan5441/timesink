import type { HeatmapActivity } from "./types";
import { ActivityHeatmapMonth } from "./ActivityHeatmapMonth";
import { getHalfMonthRangesLength, getMonthRanges } from "./utils";
import type { Color } from "@prisma/client";

type Props = {
  activities: Array<HeatmapActivity>;
  color?: Color;
};

export const ActivityHeatmap: React.FC<Props> = ({ activities, color }) => {
  const monthRanges = getMonthRanges(new Date(new Date().setDate(new Date().getDate() - 365)), new Date());
  const halfMonthLength = getHalfMonthRangesLength(monthRanges);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex gap-3">
          {monthRanges.slice(0, halfMonthLength).map((month) => (
            <ActivityHeatmapMonth
              activities={activities}
              monthStartDate={month.start}
              monthEndDate={month.end}
              monthName={month.name}
              color={color}
              key={month.name + month.start.toISOString()}
            />
          ))}
        </div>
        <div className="flex gap-3">
          {monthRanges.slice(halfMonthLength, monthRanges.length).map((month) => (
            <ActivityHeatmapMonth
              activities={activities}
              monthStartDate={month.start}
              monthEndDate={month.end}
              monthName={month.name}
              color={color}
              key={month.name + month.start.toISOString()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
