import { textColorMap } from "../utils";
import { MainNavBarItem } from "./MainNavBarItem";
import { useLogout } from "@/api/auth/authQueries";
import { useNavigate, useLocation } from "react-router-dom";
import { useTimer } from "@/contexts/TimerContext/useTimer";
import { useActivity } from "@/api/activity/activityQueries";

type SelectedTab = "home" | "record-activity" | "manage-activities" | "stats";

const SelectedTabNavigateDic: Record<SelectedTab, string> = {
  home: "/",
  "manage-activities": "/manage-activities",
  "record-activity": "/record-activity",
  stats: "/stats",
};

const getTabFromPath = (pathname: string): SelectedTab => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const entry = Object.entries(SelectedTabNavigateDic).find(([_, path]) => path === pathname);
  return (entry?.[0] as SelectedTab) || "home";
};

export const MainNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const selectedTab = getTabFromPath(location.pathname);
  const { activeActivityId } = useTimer();
  const { data: activeActivity } = useActivity(activeActivityId ?? "");

  const handleOnClick = (tab: SelectedTab) => {
    navigate(SelectedTabNavigateDic[tab]);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className={`text-3xl font-bold ${activeActivity ? textColorMap[activeActivity.color] : ""}`}>timesink</h1>
      <div className="flex gap-8">
        <MainNavBarItem onClick={() => handleOnClick("home")} active={selectedTab === "home"}>
          home
        </MainNavBarItem>
        <MainNavBarItem onClick={() => handleOnClick("record-activity")} active={selectedTab === "record-activity"}>
          record activity
        </MainNavBarItem>
        <MainNavBarItem onClick={() => handleOnClick("manage-activities")} active={selectedTab === "manage-activities"}>
          manage activities
        </MainNavBarItem>
        <MainNavBarItem onClick={() => handleOnClick("stats")} active={selectedTab === "stats"}>
          statistics
        </MainNavBarItem>
      </div>
      <button
        onClick={() => logout.mutate()}
        className="text-text text-2xl hover:text-danger transition-all duration-150"
      >
        log out
      </button>
    </div>
  );
};
