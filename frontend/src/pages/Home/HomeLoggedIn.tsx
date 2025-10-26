import { getMe } from "@/api/user/userServices";
import { useQuery } from "@tanstack/react-query";
import { ActivityCard } from "@/components/custom/ActivityCard";
import { LayoutWithSidebar } from "@/components/functional/LayoutWithSidebar";
import { useActivityRecords } from "@/api/activityRecord/activityRecordQueries";
import { MainContentContainer } from "@/components/functional/MainContentContainer";
import { useActivities } from "@/api/activity/activityQueries";

export const HomeLoggedIn = () => {
  const { data: userData } = useQuery({
    queryKey: ["HomeLoggedInUser"],
    queryFn: getMe,
  });

  // TODO, find a better way to get activities through this
  const { data: activityRecordsData } = useActivityRecords();
  const { data: activitiesData } = useActivities();

  const today = new Date();
  const weekday = today.toLocaleDateString("en-GB", { weekday: "long" });
  const dayMonth = today.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  const formattedDate = `${weekday}, ${dayMonth}`;

  return (
    <LayoutWithSidebar>
      <MainContentContainer className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">{`Hi, ${userData?.username}`}</h1>
          <p className="text-lg">{formattedDate}</p>
        </div>

        {activitiesData && activitiesData.length ? (
          <div className="flex flex-col gap-1">
            <h3 className="text-lg">Recent activities</h3>
            <div className="flex flex-nowrap overflow-x-auto gap-2 pb-4">
              {activityRecordsData?.slice(0, 5).map((ar) => {
                const activity = activitiesData?.find((a) => a.id === ar.activityId);

                if (!activity) return null;

                return (
                  <ActivityCard
                    key={ar.id}
                    activityName={activity.name}
                    activityLengthInSeconds={ar.lengthInSeconds}
                    activityColor={activity.color}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="font-medium text-4xl">Step 1: Click on the activities tab in the sidebar</p>
            <p className="font-medium text-4xl">Step 2: Create an activity</p>
            <p className="font-medium text-4xl">Step 3: Start recording</p>
          </div>
        )}

        <footer className="text-lg">Great job buddy!</footer>
      </MainContentContainer>
    </LayoutWithSidebar>
  );
};
