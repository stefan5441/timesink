import { formatTime } from "../utils";

type Props = {
  timeInSeconds: number;
  label: string;
};

export const TimeframeItem = ({ label, timeInSeconds }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="md:text-5xl">{formatTime(timeInSeconds)}</div>
      <div className="text-xs md:text-2xl">{label}</div>
    </div>
  );
};
