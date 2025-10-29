import { getMe } from "@/api/user/userServices";
import { useQuery } from "@tanstack/react-query";
import { MainContainer } from "@/components/MainContainer";

export const HomeLoggedIn = () => {
  const { data: userData } = useQuery({
    queryKey: ["HomeLoggedInUser"],
    queryFn: getMe,
  });

  return (
    <MainContainer className="flex flex-col justify-between">
      <h2 className="text-3xl">Welcome, {userData?.username}</h2>

      <div className="flex flex-col gap-6 text-3xl font-bold">
        <p>
          The main functionality of this app is to record your time spent on a list of activities you select, and store
          that information for you to reference back to.
        </p>
        <p>
          You can create activities in the manage activities tab, and then record time spent on them in the record
          activity tab.
        </p>
        <p>The statistics tab shows time spent on your activities, and some dashboards to visualise them better.</p>
      </div>

      <p className="underline font-medium">
        *Note, while recording an activity you can refresh your browser and the activity recording won't stop, however
        it will stop if you close the browser. You must keep the browser (not the tab) open at all times. Have fun!
      </p>
    </MainContainer>
  );
};
