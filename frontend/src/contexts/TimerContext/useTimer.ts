import { useContext } from "react";
import type { TimerContextType } from "./types";
import { TimerContext } from "./TimerContext";

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimer must be used within TimerProvider");
  return context;
};
