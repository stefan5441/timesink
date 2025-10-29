export type HeatmapActivity = {
  date: string;
  count: number;
  level: number;
};

export type HeatmapCell = HeatmapActivity | "invisible";

export type HeatmapMonth = {
  name: string;
  start: Date;
  end: Date;
};
