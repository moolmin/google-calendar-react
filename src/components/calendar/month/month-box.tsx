import { useDispatch } from "react-redux";
import { openModal } from "@/redux/features/eventModalSlice";
import { useSelector } from "react-redux";
import MonthEvent from "./event";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { RootState } from "@/redux/store";

export default function MonthBox({
  day,
  rowIndex,
}: {
  day: dayjs.Dayjs | null;
  rowIndex: number;
}) {
  const dispatch = useDispatch();

  const events = useSelector((state: RootState) => state.events.events);

  if (!day) {
    return (
      <div className="h-12 w-full border md:h-28 md:w-full lg:h-full"></div>
    );
  }

  const isFirstDayOfMonth = day.date() === 1;
  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");

  const handleClick = () => {
    dispatch(openModal(day.format("YYYY-MM-DD")));
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center gap-y-2 border",
        "transition-all hover:bg-violet-50"
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        {rowIndex === 0 && (
          <h4 className="text-xs text-gray-500">
            {day.format("ddd").toUpperCase()}
          </h4>
        )}
        <h4
          className={cn(
            "text-center text-sm text-gray-500",
            isToday &&
              "flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"
          )}
        >
          {isFirstDayOfMonth ? day.format("M월 D일") : day.format("D")}
        </h4>
      </div>
      <MonthEvent events={events} targetDate={day} />
    </div>
  );
}
