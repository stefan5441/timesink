import { useState } from "react";
import { textColorMap } from "../utils";
import type { SelectedTab } from "./types";
import { ThemeToggle } from "../ThemeToggle";
import type { Activity } from "@prisma/client";
import { useLogout } from "@/api/auth/authQueries";

type Props = {
  handleOnClick: (tab: SelectedTab) => void;
  activeActivity?: Activity;
};

export const MobileNavBar = ({ handleOnClick, activeActivity }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();

  const handleMenuClick = (tab: SelectedTab) => {
    handleOnClick(tab);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center mb-4">
        <h1 className={`text-3xl font-bold ${activeActivity ? textColorMap[activeActivity.color] : ""}`}>timesink</h1>

        <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col gap-1 w-6 z-50" aria-label="Toggle menu">
          <span className={`h-0.5 w-full bg-current ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`h-0.5 w-full bg-current ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`h-0.5 w-full bg-current ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 bg-background z-40">
          <div className="flex flex-col justify-center items-center h-full gap-8 text-2xl">
            <div onClick={() => handleMenuClick("home")} className="cursor-pointer">
              home
            </div>
            <div onClick={() => handleMenuClick("record-activity")} className="cursor-pointer">
              record activity
            </div>
            <div onClick={() => handleMenuClick("manage-activities")} className="cursor-pointer">
              manage activities
            </div>
            <div onClick={() => handleMenuClick("stats")} className="cursor-pointer">
              statistics
            </div>

            <div className="flex flex-col gap-6 items-center pt-8 border-t border-text">
              <ThemeToggle />
              <button onClick={() => logout.mutate()}>log out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
