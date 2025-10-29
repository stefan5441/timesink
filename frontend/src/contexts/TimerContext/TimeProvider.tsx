import { useState, useEffect, type ReactNode } from "react";
import { TimerContext } from "./TimerContext";

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [secondsElapsed, setSecondsElapsed] = useState<number>(() => {
    return Number(localStorage.getItem("activitySeconds")) || 0;
  });

  const [activeActivityId, setActiveActivityId] = useState<string | null>(() => {
    return localStorage.getItem("activeActivityId");
  });

  const [timerRunning, setTimerRunning] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("activeActivityId"));
  });

  useEffect(() => {
    if (!timerRunning) return;

    const interval = window.setInterval(() => {
      setSecondsElapsed((prev) => {
        localStorage.setItem("activitySeconds", String(prev + 1));
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const startTimer = (activityId: string) => {
    setActiveActivityId(activityId);
    setTimerRunning(true);
    localStorage.setItem("activeActivityId", activityId);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setActiveActivityId(null);
    setSecondsElapsed(0);
    localStorage.removeItem("activeActivityId");
    localStorage.removeItem("activitySeconds");
  };

  return (
    <TimerContext.Provider value={{ secondsElapsed, startTimer, stopTimer, activeActivityId, timerRunning }}>
      {children}
    </TimerContext.Provider>
  );
};
