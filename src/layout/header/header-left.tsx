"use client";

import { Button } from "@/components/ui/button";
import { IoMdMenu } from "react-icons/io";
import logo from "@/assets/logo.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDateStore } from "@/lib/store";
import dayjs from "dayjs";
export default function HeaderLeft() {
  const { setMonth, selectedMonthIndex } = useDateStore();

  return (
    <div className="flex flex-row items-center gap-3">
      <div className="hidden items-center lg:flex">
        <Button variant="ghost" className="rounded-full w-12 h-12">
          <IoMdMenu size={48} />
        </Button>
      </div>

      <img src={logo} alt="logo" width={40} height={40} />
      <h1 className="text-xl font-normal font-bold">Calendar</h1>

      <Button variant="outline">오늘</Button>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          className="rounded-full w-12 h-12"
          onClick={() => setMonth(selectedMonthIndex - 1)}
        >
          <MdKeyboardArrowLeft
            className="size-5 cursor-pointer font-bold text-gray-700"
            style={{ color: "var(--dark-gray)" }}
          />
        </Button>

        <Button
          variant="ghost"
          className="rounded-full w-12 h-12"
          onClick={() => setMonth(selectedMonthIndex + 1)}
        >
          <MdKeyboardArrowRight className="size-5 cursor-pointer font-bold text-gray-700" />
        </Button>

        <h4 className="text-xl font-normal font-sans text-gray-700">
          {dayjs(new Date(dayjs().year(), selectedMonthIndex)).format(
            "YYYY년 M월"
          )}
        </h4>
      </div>
    </div>
  );
}
