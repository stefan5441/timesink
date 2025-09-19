import { textColorMap } from "@/components/ui/custom/utils";
import { formatTotalTime } from "./utils";
import type { Color } from "@prisma/client";

type Props = {
  activityColor: Color;
  timeInSeconds: number;
  label: string;
};

export const StatisticsTimeItem = ({ activityColor, timeInSeconds, label }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`${textColorMap[activityColor]} text-2xl font-semibold`}>{formatTotalTime(timeInSeconds)}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
};
