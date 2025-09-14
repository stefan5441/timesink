import type { Color } from "@prisma/client";
import type { HeatmapActivity, HeatmapCell, HeatmapMonth } from "./types";

export function getMonthRanges(startDate: Date, endDate: Date): Array<HeatmapMonth> {
  if (startDate > endDate) {
    throw new Error("startDate must be before endDate");
  }

  const result: Array<HeatmapMonth> = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const year = current.getFullYear();
    const month = current.getMonth();
    const monthName = current.toLocaleString("default", { month: "long" });

    const rangeStart = result.length === 0 ? new Date(startDate) : new Date(year, month, 1);

    const isLastMonth = year === endDate.getFullYear() && month === endDate.getMonth();
    const rangeEnd = isLastMonth ? new Date(endDate) : new Date(year, month + 1, 0);

    result.push({
      name: monthName,
      start: rangeStart,
      end: rangeEnd,
    });

    current.setFullYear(year, month + 1, 1);
  }

  return result;
}

export function getHeatmapMonthData(
  activities: Array<HeatmapActivity>,
  startDate: Date,
  endDate: Date
): Array<HeatmapCell> {
  if (startDate.getFullYear() !== endDate.getFullYear() || startDate.getMonth() !== endDate.getMonth()) {
    throw new Error("startDate and endDate must be in the same month");
  }

  if (startDate > endDate) {
    throw new Error("startDate must be before endDate");
  }

  const result: Array<HeatmapCell> = [];

  const activityMap: Record<string, HeatmapActivity> = {};
  activities.forEach((a) => (activityMap[a.date] = a));

  function addInvisibleCells(count: number) {
    for (let i = 0; i < count; i++) {
      result.push("invisible");
    }
  }

  function formatKey(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function formatDisplay(date: Date): string {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const current = new Date(startDate);
  addInvisibleCells(current.getDay());

  while (current <= endDate) {
    const key = formatKey(current);
    const displayDate = formatDisplay(current);

    if (key in activityMap) {
      result.push({
        ...activityMap[key],
        date: displayDate,
      });
    } else {
      result.push({
        date: displayDate,
        count: 0,
        level: 0,
      });
    }

    current.setDate(current.getDate() + 1);
  }

  if (current.getDay() !== 0) {
    addInvisibleCells(7 - current.getDay());
  }

  return result;
}

export const cellColorsMap: Record<Color, string[]> = {
  RED: ["bg-slate-800", "bg-red-900", "bg-red-800", "bg-red-500", "bg-red-200"],
  ORANGE: ["bg-slate-800", "bg-orange-900", "bg-orange-800", "bg-orange-500", "bg-orange-200"],
  AMBER: ["bg-slate-800", "bg-amber-900", "bg-amber-800", "bg-amber-500", "bg-amber-200"],
  YELLOW: ["bg-slate-800", "bg-yellow-900", "bg-yellow-800", "bg-yellow-500", "bg-yellow-200"],
  LIME: ["bg-slate-800", "bg-lime-900", "bg-lime-800", "bg-lime-500", "bg-lime-200"],
  GREEN: ["bg-slate-800", "bg-green-900", "bg-green-800", "bg-green-500", "bg-green-200"],
  EMERALD: ["bg-slate-800", "bg-emerald-900", "bg-emerald-800", "bg-emerald-500", "bg-emerald-200"],
  TEAL: ["bg-slate-800", "bg-teal-900", "bg-teal-800", "bg-teal-500", "bg-teal-200"],
  CYAN: ["bg-slate-800", "bg-cyan-900", "bg-cyan-800", "bg-cyan-500", "bg-cyan-200"],
  SKY: ["bg-slate-800", "bg-sky-900", "bg-sky-800", "bg-sky-500", "bg-sky-200"],
  BLUE: ["bg-slate-800", "bg-blue-900", "bg-blue-800", "bg-blue-500", "bg-blue-200"],
  INDIGO: ["bg-slate-800", "bg-indigo-900", "bg-indigo-800", "bg-indigo-500", "bg-indigo-200"],
  VIOLET: ["bg-slate-800", "bg-violet-900", "bg-violet-800", "bg-violet-500", "bg-violet-200"],
  PURPLE: ["bg-slate-800", "bg-purple-900", "bg-purple-800", "bg-purple-500", "bg-purple-200"],
  FUCHSIA: ["bg-slate-800", "bg-fuchsia-900", "bg-fuchsia-800", "bg-fuchsia-500", "bg-fuchsia-200"],
  PINK: ["bg-slate-800", "bg-pink-900", "bg-pink-800", "bg-pink-500", "bg-pink-200"],
  ROSE: ["bg-slate-800", "bg-rose-900", "bg-rose-800", "bg-rose-500", "bg-rose-200"],
};
