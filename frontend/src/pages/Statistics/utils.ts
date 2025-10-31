export const formatTotalTime = (seconds: number | undefined) => {
  if (!seconds || seconds <= 0) return "0m";

  const totalMinutes = Math.ceil(seconds / 60);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);

  return parts.join(" ");
};
export const getStartOfWeek = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getEndOfWeek = (date = new Date()) => {
  const d = getStartOfWeek(date);
  d.setDate(d.getDate() + 7);
  return d;
};

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getStartOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);

export const getEndOfMonth = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

export const getStartOfYear = (date = new Date()) => new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);

export const getEndOfYear = (date = new Date()) => new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
