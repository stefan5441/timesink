import type { SelectedTab } from "./types";

export const SelectedTabNavigateDic: Record<SelectedTab, string> = {
  home: "/",
  "manage-activities": "/manage-activities",
  "record-activity": "/record-activity",
  stats: "/stats",
};

export const getTabFromPath = (pathname: string): SelectedTab => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const entry = Object.entries(SelectedTabNavigateDic).find(([_, path]) => path === pathname);
  return (entry?.[0] as SelectedTab) || "home";
};
