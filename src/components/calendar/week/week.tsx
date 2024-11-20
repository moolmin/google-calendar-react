import { getHours, getWeekDays } from "@/lib/getTime";
import { useEventStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventRenderer } from "@/components/event-renderer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";

export default function WeekView() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const { openPopover, events } = useEventStore();

  const { weekIndex } = useSelector((state: RootState) => state.calendar);

  const startOfWeek = dayjs().week(weekIndex).startOf("week");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Week Header */}
      <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] place-items-center px-4 py-2">
        <div className="w-16 border-r border-gray-300 text-gray-700">
          <div className="relative h-16">
            <div className="absolute top-10 text-xs text-gray-600">GMT +2</div>
          </div>
        </div>

        {/* 요일 헤더 */}
        {getWeekDays(startOfWeek).map(({ currentDate, today }, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={cn("text-xs", today && "text-blue-600")}>
              {currentDate.format("ddd")}
            </div>
            <div
              className={cn(
                "h-12 w-12 rounded-full p-2 text-2xl flex items-center justify-center",
                today && "bg-blue-600 text-white"
              )}
            >
              {currentDate.format("DD")}
            </div>
          </div>
        ))}
      </div>

      {/* Time Column & Events */}
      <ScrollArea className="h-[85vh] overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] px-4 py-2">
          {/* 시간 열 */}
          <div className="w-16 border-r border-gray-300">
            {getHours.map((hour, index) => (
              <div key={index} className="relative h-16">
                <div className="absolute -top-2 text-xs text-gray-600">
                  {hour.format("A H시")}
                </div>
              </div>
            ))}
          </div>

          {/* 날짜별 이벤트 */}
          {getWeekDays(startOfWeek).map(({ currentDate, today }, index) => {
            const dayDate = startOfWeek.add(index, "day");

            return (
              <div key={index} className="relative border-r border-gray-300">
                {getHours.map((hour, i) => (
                  <div
                    key={i}
                    className="relative flex h-16 cursor-pointer flex-col items-center gap-y-2 border-b border-gray-300 hover:bg-gray-100"
                    onClick={() => {
                      openPopover();
                    }}
                  >
                    <EventRenderer
                      events={events}
                      date={dayDate.hour(hour.hour())}
                      view="week"
                    />
                  </div>
                ))}
                {/* 현재 시간 표시 */}
                {today && (
                  <div
                    className={cn("absolute h-0.5 w-full bg-red-500")}
                    style={{
                      top: `${
                        ((currentTime.hour() * 60 + currentTime.minute()) /
                          (24 * 60)) *
                        100
                      }%`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
