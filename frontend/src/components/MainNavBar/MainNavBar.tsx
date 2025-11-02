import { useEffect, useState } from "react";
import type { SelectedTab } from "./types";
import { MobileNavBar } from "./MobileNavBar";
import { DesktopNavBar } from "./DesktopNavBar";
import { useTimer } from "@/contexts/TimerContext/useTimer";
import { useLocation, useNavigate } from "react-router-dom";
import { useActivity } from "@/api/activity/activityQueries";
import { getTabFromPath, SelectedTabNavigateDic } from "./utils";

export const MainNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedTab = getTabFromPath(location.pathname);
  const { activeActivityId } = useTimer();
  const { data: activeActivity } = useActivity(activeActivityId ?? "");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOnClick = (tab: SelectedTab) => {
    navigate(SelectedTabNavigateDic[tab]);
  };

  return isMobile ? (
    <MobileNavBar handleOnClick={handleOnClick} activeActivity={activeActivity} />
  ) : (
    <DesktopNavBar selectedTab={selectedTab} handleOnClick={handleOnClick} activeActivity={activeActivity} />
  );
};
