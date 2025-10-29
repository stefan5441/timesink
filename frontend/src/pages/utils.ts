export const formatTime = (secs: number) => {
  const hours = Math.floor(secs / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((secs % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secs % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
