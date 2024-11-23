import { Button } from "@/components/ui/button";
import { useDateStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { Fragment } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/features/eventModalSlice"; 

dayjs.extend(isoWeek);

export default function SideBarCalendar() {
  const dispatch = useDispatch(); 
  const { setMonth, selectedMonthIndex, twoDMonthArray } = useDateStore();

  const handleDateClick = (date: dayjs.Dayjs) => {
    dispatch(openModal(date.format("YYYY-MM-DD"))); 
  };

  return (
    <div className="font-roboto my-6 p-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-normal px-2 text-gray-600">
          {dayjs(new Date(dayjs().year(), selectedMonthIndex)).format(
            "YYYY년 M월"
          )}
        </h4>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMonth(selectedMonthIndex - 1)}
          >
            <MdKeyboardArrowLeft className="size-5 cursor-pointer font-bold text-gray-700" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMonth(selectedMonthIndex + 1)}
          >
            <MdKeyboardArrowRight className="size-5 cursor-pointer font-bold text-gray-700" />
          </Button>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-7 text-xs">
        {["월", "화", "수", "목", "금", "토", "일"].map((day, i) => (
          <span key={i} className="py-1 text-center">
            {day}
          </span>
        ))}
      </div>
      
      <div className="mt-2 text-xs">
        <div className="grid grid-cols-7 grid-rows-6 gap-3 gap-y-3 rounded-sm p-1 text-xs text-gray-600">
          {twoDMonthArray.map((row, i) => (
            <Fragment key={i}>
              {row.map((day, index) => {
                const currentMonth = dayjs(new Date(dayjs().year(), selectedMonthIndex));
                const isDifferentMonth = !day.isSame(currentMonth, 'month');
                
                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)} 
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full",
                      day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") &&
                        "bg-blue-600 text-white",
                      isDifferentMonth && "text-gray-400"
                    )}
                  >
                    <span>{day.format("D")}</span>
                  </button>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
