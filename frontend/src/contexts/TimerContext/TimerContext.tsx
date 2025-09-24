import { createContext } from "react";
import type { TimerContextType } from "./types";

export const TimerContext = createContext<TimerContextType | undefined>(undefined);
