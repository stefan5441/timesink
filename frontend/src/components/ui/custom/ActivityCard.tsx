import type { Color } from "@prisma/client";
import { bgColorMap } from "./utils";

type ActivityCardProps = {
  activityName: string;
  activityLengthInSeconds: number;
  activityColor: Color;
};

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export const ActivityCard = ({ activityName, activityColor, activityLengthInSeconds }: ActivityCardProps) => {
  return (
    <div className="p-2 bg-background border rounded inline-block flex-shrink-0">
      <div className="flex items-top h-20">
        <div className={`w-1.5 h-full rounded ${bgColorMap[activityColor]}`} />

        <div className="pl-2 pr-6">
          <h4 className="text-sm font-semibold">{activityName}</h4>
          <p className="text-xs">{formatDuration(activityLengthInSeconds)}</p>
        </div>
      </div>
    </div>
  );
};
