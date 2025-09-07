import { getMe } from "@/api/userServices";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useDarkMode } from "@/hooks/useDarkMode";
import { FaUser, FaMoon, FaSun } from "react-icons/fa";
import { ActivityCard } from "@/components/ui/custom/ActivityCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateActivityModal } from "@/components/functional/CreateActivityModal";

export const HomeLoggedIn = () => {
  const { data: userData } = useQuery({
    queryKey: ["HomeLoggedInUser"],
    queryFn: getMe,
  });

  const today = new Date();
  const weekday = today.toLocaleDateString("en-GB", { weekday: "long" });
  const dayMonth = today.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  const formattedDate = `${weekday}, ${dayMonth}`;

  const { isDark, toggleTheme } = useDarkMode();

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1>{`Hi, ${userData?.username}`}</h1>
          <p>{formattedDate}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="default" size="icon" onClick={toggleTheme}>
            {isDark ? <FaSun /> : <FaMoon />}
          </Button>

          <Button variant="default" size="icon">
            <FaUser />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activities</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-nowrap overflow-x-auto gap-4 pb-4">
          <ActivityCard activityName="Competitive Programming" activityLengthInSeconds={2000} activityColor="PURPLE" />
          <ActivityCard activityName="Running" activityLengthInSeconds={6283} activityColor="BLUE" />
          <ActivityCard activityName="Competitive Programming" activityLengthInSeconds={2322} activityColor="PURPLE" />
        </CardContent>
      </Card>

      <div className="flex justify-center gap-2">
        <Button variant="default" size="sm">
          Record an activity
        </Button>
        <CreateActivityModal />
      </div>
    </div>
  );
};
