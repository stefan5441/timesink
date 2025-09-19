import type { HeatmapActivity } from "./types";
import { ActivityHeatmapMonth } from "./ActivityHeatmapMonth";
import { getMonthRanges } from "./utils";
import type { Color } from "@prisma/client";

type Props = {
  activities: Array<HeatmapActivity>;
  color?: Color;
};

export const ActivityHeatmap: React.FC<Props> = ({ activities, color }) => {
  const monthRanges = getMonthRanges(new Date(new Date().setDate(new Date().getDate() - 365)), new Date());

  return (
    <div className="w-full">
      <div className="flex gap-2 ">
        {monthRanges.map((month) => (
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
  );
};
