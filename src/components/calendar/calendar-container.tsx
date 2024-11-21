import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MonthView from "@/components/calendar/month/month";
import WeekView from "@/components/calendar/week/week";
export default function CalendarContainer() {
  const { view } = useSelector((state: RootState) => state.calendar);

  return (
    <div className="flex w-full">
      <div className="flex-1">
        {view === "month" && <MonthView />}
        {view === "week" && <WeekView />}
      </div>
    </div>
  );
}
