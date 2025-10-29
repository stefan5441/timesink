export type TimerContextType = {
  secondsElapsed: number;
  startTimer: (activityId: string) => void;
  stopTimer: () => void;
  activeActivityId: string | null;
  timerRunning: boolean;
};
