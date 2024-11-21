"use client";

import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setMonth, setWeek } from "@/redux/features/calendarSlice";
import dayjs from "dayjs";
import { getWeekRange } from "@/lib/getTime";

export default function HeaderLeft() {
  const dispatch = useDispatch();
  const { view, monthIndex, weekIndex } = useSelector(
    (state: RootState) => state.calendar
  );

  const handleToday = () => {
    if (view === "month") {
      dispatch(setMonth(dayjs().month()));
    } else {
      dispatch(setWeek(dayjs().week()));
    }
  };

  const handlePrevious = () => {
    if (view === "month") {
      dispatch(setMonth(monthIndex - 1));
    } else {
      dispatch(setWeek(weekIndex - 1));
    }
  };

  const handleNext = () => {
    if (view === "month") {
      dispatch(setMonth(monthIndex + 1));
    } else {
      dispatch(setWeek(weekIndex + 1));
    }
  };

  return (
    <div className="flex flex-row items-center gap-3">
      <div className="items-center gap-2 px-4 hidden md:flex">
        <img src={logo} alt="logo" width={40} height={40} />
        <h1 className="text-2xl">Calendar</h1>
      </div>

      <Button variant="outline" onClick={handleToday}>
        오늘
      </Button>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          className="rounded-full w-12 h-12"
          onClick={handlePrevious}
        >
          <MdKeyboardArrowLeft
            className="size-7 font-bold text-gray-700"
            style={{ color: "var(--dark-gray)" }}
          />
        </Button>

        <Button
          variant="ghost"
          className="rounded-full w-12 h-12"
          onClick={handleNext}
        >
          <MdKeyboardArrowRight className="size-7 font-bold text-gray-700" />
        </Button>

        <h4 className="text-xl font-normal font-sans text-gray-700">
          {view === "month"
            ? dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY년 MM월")
            : getWeekRange(weekIndex)}
        </h4>
      </div>
    </div>
  );
}
