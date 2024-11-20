import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface TimeIndicatorProps {
  currentTime: dayjs.Dayjs;
}

export const TimeIndicator: React.FC<TimeIndicatorProps> = ({
  currentTime,
}) => {
  const topPosition =
    ((currentTime.hour() * 60 + currentTime.minute()) / (24 * 60)) * 100;

  return (
    <div>
      <div
        className="absolute w-3 h-3 bg-red-500 rounded-full"
        style={{
          top: `${topPosition}%`,
          left: "-7px", 
          transform: "translateY(-50%)", 
        }}
      ></div>

      <div
        className={cn("absolute h-0.5 w-full bg-red-500")}
        style={{
          top: `${topPosition}%`,
        }}
      ></div>
    </div>
  );
};
