"use client";

import { Button } from "@/components/ui/button";
import { IoMdMenu } from "react-icons/io";
import logo from "@/assets/logo.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setMonth, setWeek } from "@/redux/features/calendarSlice";
import dayjs from "dayjs";

export default function HeaderLeft() {
  const dispatch = useDispatch();
  const { view, monthIndex, weekIndex } = useSelector((state: RootState) => state.calendar);

  const getWeekRange = (weekIndex: number) => {
    const startOfWeek = dayjs().week(weekIndex).startOf("week");
    const endOfWeek = dayjs().week(weekIndex).endOf("week");

    const startMonth = startOfWeek.month() + 1; 
    const endMonth = endOfWeek.month() + 1;

    if (startMonth === endMonth) {
      return `${startOfWeek.format("YYYY년 MM월")}`;
    } else {
      return `${startOfWeek.format("YYYY년 MM월")} - ${endOfWeek.format("MM월")}`;
    }
  };

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
      <div className="hidden items-center lg:flex">
        <Button variant="ghost" className="rounded-full w-12 h-12">
          <IoMdMenu size={48} />
        </Button>
      </div>

      <img src={logo} alt="logo" width={40} height={40} />
      <h1 className="text-xl font-normal font-bold">Calendar</h1>

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
            className="size-5 cursor-pointer font-bold text-gray-700"
            style={{ color: "var(--dark-gray)" }}
          />
        </Button>

        <Button
          variant="ghost"
          className="rounded-full w-12 h-12"
          onClick={handleNext}
        >
          <MdKeyboardArrowRight className="size-5 cursor-pointer font-bold text-gray-700" />
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
