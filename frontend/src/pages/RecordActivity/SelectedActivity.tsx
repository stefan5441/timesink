import { formatTime } from "../utils";
import type { Activity } from "@prisma/client";
import { useTimer } from "@/contexts/TimerContext/useTimer";
import { useActivity } from "@/api/activity/activityQueries";
import { hoverTextColorMap, textColorMap } from "@/components/utils";
import { useCreateActivityRecord } from "@/api/activityRecord/activityRecordQueries";
import { LoadingOrError } from "@/components/LoadingOrError";

type Props = {
  activity?: Activity;
};

export const SelectedActivity = ({ activity }: Props) => {
  const { secondsElapsed, startTimer, stopTimer, timerRunning, activeActivityId } = useTimer();
  const { data: activeActivity, isLoading, isError } = useActivity(activeActivityId ?? "");
  const createActivityRecordMutation = useCreateActivityRecord();

  const handleStopTimer = () => {
    if (!activeActivity?.id) return;

    createActivityRecordMutation.mutate({ activityId: activeActivity.id, lengthInSeconds: secondsElapsed });
    stopTimer();
  };

  if (isLoading || isError) {
    return <LoadingOrError isError={isError} isLoading={isLoading} />;
  }

  return (
    <div className="h-full flex flex-col justify-center items-center gap-6">
      {timerRunning && activeActivity ? (
        <>
          <div className={`text-7xl font-bold ${textColorMap[activeActivity.color]}`}>{formatTime(secondsElapsed)}</div>
          <button onClick={handleStopTimer} className={`text-5xl ${hoverTextColorMap[activeActivity.color]}`}>
            {`stop ${activeActivity.name}`}
          </button>
        </>
      ) : activity ? (
        <>
          <div className={`text-7xl font-bold ${textColorMap[activity.color]}`}>{activity.name}</div>
          <button onClick={() => startTimer(activity.id)} className={`text-5xl ${hoverTextColorMap[activity.color]}`}>
            start
          </button>
        </>
      ) : (
        <div className="text-5xl">select an activity</div>
      )}
    </div>
  );
};
