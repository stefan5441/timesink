import { useNavigate } from "react-router-dom";
import { MainNavBarItem } from "./MainNavBarItem";
import { useLogout } from "@/api/auth/authQueries";
import { useActivity } from "@/api/activity/activityQueries";
import { useTimer } from "@/contexts/TimerContext/useTimer";
import { textColorMap } from "../utils";

export const MainNavBar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const { activeActivityId } = useTimer();
  const { data: activeActivity } = useActivity(activeActivityId ?? "");

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className={`text-3xl font-bold ${activeActivity ? textColorMap[activeActivity.color] : ""}`}>timesink</h1>
      <div className="flex gap-8">
        <MainNavBarItem onClick={() => navigate("/")}>home</MainNavBarItem>
        <MainNavBarItem onClick={() => navigate("/record-activity")}>record activity</MainNavBarItem>
        <MainNavBarItem onClick={() => navigate("/manage-activities")}>manage activities</MainNavBarItem>
        <MainNavBarItem onClick={() => navigate("/stats")}>statistics</MainNavBarItem>
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
