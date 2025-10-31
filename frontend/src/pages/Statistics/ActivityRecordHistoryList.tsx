import { formatDate, formatTotalTime } from "./utils";
import { useActivityRecordsByActivityId } from "@/api/activityRecord/activityRecordQueries";

type Props = {
  activityId: string;
};

export const ActivityRecordHistoryList = ({ activityId }: Props) => {
  const { data: activityRecordData } = useActivityRecordsByActivityId(activityId);

  return (
    <div className="flex flex-col gap-2 items-center">
      {activityRecordData?.map((item) => (
        <div key={item.id} className="text-xl">{`${formatTotalTime(item.lengthInSeconds)} sunk on ${formatDate(
          item.createdAt
        )}`}</div>
      ))}
    </div>
  );
};
