import type { HeatmapActivity, HeatmapCell, HeatmapMonth } from "./types";

export function getMonthRanges(startDate: Date, endDate: Date): Array<HeatmapMonth> {
  const normalizedStartDate = new Date(startDate);
  normalizedStartDate.setHours(0, 0, 0, 0);

  const normalizedEndDate = new Date(endDate);
  normalizedEndDate.setHours(23, 59, 59, 999);

  if (normalizedStartDate > normalizedEndDate) {
    throw new Error("startDate must be before endDate");
  }

  const result: Array<HeatmapMonth> = [];
  const current = new Date(normalizedStartDate);

  while (current <= normalizedEndDate) {
    const year = current.getFullYear();
    const month = current.getMonth();
    const monthName = current.toLocaleString("default", { month: "long" });

    const rangeStart = result.length === 0 ? new Date(normalizedStartDate) : new Date(year, month, 1);

    const isLastMonth = year === normalizedEndDate.getFullYear() && month === normalizedEndDate.getMonth();
    const rangeEnd = isLastMonth ? new Date(normalizedEndDate) : new Date(year, month + 1, 0);

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
  const normalizedStartDate = new Date(startDate);
  normalizedStartDate.setHours(0, 0, 0, 0);

  const normalizedEndDate = new Date(endDate);
  normalizedEndDate.setHours(23, 59, 59, 999);

  if (
    normalizedStartDate.getFullYear() !== normalizedEndDate.getFullYear() ||
    normalizedStartDate.getMonth() !== normalizedEndDate.getMonth()
  ) {
    throw new Error("startDate and endDate must be in the same month");
  }

  if (normalizedStartDate > normalizedEndDate) {
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

  const current = new Date(normalizedStartDate);
  addInvisibleCells(current.getDay());

  while (current <= normalizedEndDate) {
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

export const getHalfMonthRangesLength = (monthRanges: HeatmapMonth[]) => {
  if (monthRanges.length % 2 === 0) {
    return monthRanges.length / 2;
  }

  const getDaysInMonth = (start: Date, end: Date) => (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  const firstMonthDays = getDaysInMonth(monthRanges[0].start, monthRanges[0].end);
  const lastMonthDays = getDaysInMonth(
    monthRanges[monthRanges.length - 1].start,
    monthRanges[monthRanges.length - 1].end
  );

  const halfLength = Math.floor(monthRanges.length / 2);
  return firstMonthDays < lastMonthDays ? halfLength + 1 : halfLength;
};
