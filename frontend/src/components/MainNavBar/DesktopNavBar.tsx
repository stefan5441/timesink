import { textColorMap } from "../utils";
import type { SelectedTab } from "./types";
import { ThemeToggle } from "../ThemeToggle";
import type { Activity } from "@prisma/client";
import { useLogout } from "@/api/auth/authQueries";
import { DesktopNavBarItem } from "./DesktopNavBarItem";

type Props = {
  selectedTab: SelectedTab;
  handleOnClick: (tab: SelectedTab) => void;
  activeActivity?: Activity;
};

export const DesktopNavBar = ({ selectedTab, handleOnClick, activeActivity }: Props) => {
  const logout = useLogout();

  return (
    <nav className="flex justify-between items-center mb-4">
      <h1 className={`text-3xl font-bold ${activeActivity ? textColorMap[activeActivity.color] : ""}`}>timesink</h1>
      <div className="flex gap-8">
        <DesktopNavBarItem onClick={() => handleOnClick("home")} active={selectedTab === "home"}>
          home
        </DesktopNavBarItem>
        <DesktopNavBarItem onClick={() => handleOnClick("record-activity")} active={selectedTab === "record-activity"}>
          record activity
        </DesktopNavBarItem>
        <DesktopNavBarItem
          onClick={() => handleOnClick("manage-activities")}
          active={selectedTab === "manage-activities"}
        >
          manage activities
        </DesktopNavBarItem>
        <DesktopNavBarItem onClick={() => handleOnClick("stats")} active={selectedTab === "stats"}>
          statistics
        </DesktopNavBarItem>
      </div>

      <div className="flex gap-8">
        <ThemeToggle />
        <button
          onClick={() => logout.mutate()}
          className="text-text text-2xl hover:text-danger transition-all duration-150"
        >
          log out
        </button>
      </div>
    </nav>
  );
};
