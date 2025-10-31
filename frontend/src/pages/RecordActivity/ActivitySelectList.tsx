import type { Activity } from "@prisma/client";
import { hoverTextColorMap, textColorMap } from "@/components/utils";
import { useActivities } from "@/api/activity/activityQueries";
import { LoadingOrError } from "@/components/LoadingOrError";

type Props = {
  selectedActivity?: Activity;
  setSelectedActivity: React.Dispatch<React.SetStateAction<Activity | undefined>>;
};

export const ActivitySelectList = ({ selectedActivity, setSelectedActivity }: Props) => {
  const { data: activitiesData, isLoading, isError } = useActivities();

  if (isLoading || isError) {
    return <LoadingOrError isError={isError} isLoading={isLoading} />;
  }

  return (
    <div className="flex flex-col gap-6 overflow-y-auto">
      {activitiesData &&
        activitiesData.map((a) => (
          <button
            onClick={() => setSelectedActivity(a)}
            className={`text-4xl ${hoverTextColorMap[a.color]} ${
              selectedActivity?.id === a.id ? textColorMap[a.color] : ""
            }`}
            key={a.id}
          >
            {a.name}
          </button>
        ))}
    </div>
  );
};
