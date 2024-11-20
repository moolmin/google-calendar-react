import { getWeeks } from "@/lib/getTime";
import { useDateStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import React, { Fragment } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

dayjs.extend(isoWeek);

export default function SideBarCalendar() {
  const { setMonth, selectedMonthIndex, twoDMonthArray } = useDateStore();

  // const weeksOfMonth = getWeeks(selectedMonthIndex);

  return (
    <div className="font-roboto my-6 p-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-normal">
          {dayjs(new Date(dayjs().year(), selectedMonthIndex)).format(
            "YYYY년 M월",
          )}
        </h4>
        <div className="flex items-center gap-3">
          <MdKeyboardArrowLeft
            className="size-5 cursor-pointer font-bold"
            onClick={() => setMonth(selectedMonthIndex - 1)}
          />
          <MdKeyboardArrowRight
            className="size-5 cursor-pointer font-bold"
            onClick={() => setMonth(selectedMonthIndex + 1)}
          />
        </div>
      </div>

      <div className="mt-2 grid grid-cols-7 text-xs">
        {["월", "화", "수", "목", "금", "토", "일"].map((day, i) => (
          <span key={i} className="py-1 text-center">
            {day}
          </span>
        ))}
      </div>

      {/* Main Content: Days */}
      <div className="mt-2 text-xs">
        <div className="grid grid-cols-7 grid-rows-6 gap-3 gap-y-3 rounded-sm p-1 text-xs">
          {twoDMonthArray.map((row, i) => (
            <Fragment key={i}>
              {row.map((day, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full",
                    day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") &&
                      "bg-blue-600 text-white",
                    day.month() !== selectedMonthIndex && "text-gray-400",
                  )}
                >
                  <span>{day.format("D")}</span>
                </button>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
