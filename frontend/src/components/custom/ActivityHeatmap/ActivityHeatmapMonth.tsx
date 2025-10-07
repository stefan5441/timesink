import type { Color } from "@prisma/client";
import { getHeatmapMonthData } from "./utils";
import type { HeatmapActivity } from "./types";
import { ActivityHeatmapTooltip } from "./ActivityHeatmapTooltip";
import { formatTotalTime } from "@/pages/Statistics/utils";
import { cellColorsMap } from "../utils";

type Props = {
  monthName: string;
  activities: Array<HeatmapActivity>;
  monthStartDate: Date;
  monthEndDate: Date;
  color?: Color;
};

export const ActivityHeatmapMonth: React.FC<Props> = ({
  activities,
  monthStartDate,
  monthEndDate,
  monthName,
  color = "GREEN",
}) => {
  const heatmapMonthData = getHeatmapMonthData(activities, monthStartDate, monthEndDate);
  const columnCount = Math.ceil(heatmapMonthData.length / 7);
  const cellColors = cellColorsMap[color];

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="grid grid-rows-7 grid-flow-col gap-0.5">
        {heatmapMonthData.map((a, i) => {
          if (a === "invisible") {
            return <div key={i} className="w-2.5 h-2.5 bg-transparent rounded-xs" />;
          }
          return (
            <ActivityHeatmapTooltip key={i} content={`${formatTotalTime(a.count)} of time sunk on ${a.date}`}>
              <div
                key={i}
                className={`w-2.5 h-2.5 hover:border-2 hover:border-sky-100 rounded-xs ${cellColors[a.level]}`}
              />
            </ActivityHeatmapTooltip>
          );
        })}
      </div>
      {columnCount >= 3 && <div className="text-xs">{monthName.slice(0, 3)}</div>}
    </div>
  );
};
