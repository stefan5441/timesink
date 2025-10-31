import { LoadingOrError } from "@/components/LoadingOrError";
import { formatDate, formatTotalTime } from "./utils";
import { useActivityRecordsByActivityId } from "@/api/activityRecord/activityRecordQueries";

type Props = {
  activityId: string;
};

export const ActivityRecordHistoryList = ({ activityId }: Props) => {
  const { data: activityRecordData, isLoading, isError } = useActivityRecordsByActivityId(activityId);

  if (isLoading || isError) {
    return <LoadingOrError isError={isError} isLoading={isLoading} />;
  }

  return (
    <div className="flex flex-col gap-2 items-center overflow-y-auto">
      {activityRecordData?.map((item) => (
        <div key={item.id} className="text-xl">{`${formatTotalTime(item.lengthInSeconds)} sunk on ${formatDate(
          item.createdAt
        )}`}</div>
      ))}
    </div>
  );
};
