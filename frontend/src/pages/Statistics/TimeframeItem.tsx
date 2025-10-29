import { formatTime } from "../utils";

type Props = {
  timeInSeconds: number;
  label: string;
};

export const TimeframeItem = ({ label, timeInSeconds }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl">{formatTime(timeInSeconds)}</div>
      <div className="text-xl">{label}</div>
    </div>
  );
};
