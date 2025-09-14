import type { HeatmapActivity } from "./types";
import { ActivityHeatmapMonth } from "./ActivityHeatmapMonth";
import { getMonthRanges } from "./utils";
import type { Color } from "@prisma/client";

type Props = {
  activities: Array<HeatmapActivity>;
  color?: Color;
};

export const ActivityHeatmap: React.FC<Props> = ({ activities, color }) => {
  const monthRanges = getMonthRanges(new Date(2024, 6, 30), new Date(2025, 6, 30));

  return (
    <div className="h-44 md:h-50 lg:h-56 flex flex-col gap-1.5">
      <div className="overflow-x-auto pb-3">
        <div className="flex gap-2 justify-center w-fit mx-auto">
          <div className="flex gap-2">
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
      </div>
    </div>
  );
};
