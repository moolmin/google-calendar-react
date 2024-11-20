import { getHours, getWeekDays } from "@/lib/getTime";
import { useEventStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventRenderer } from "@/components/event-renderer";
import { TimeIndicator } from "@/components/calendar/week/time-indicator";
import { useSelector } from "react-redux";
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
      <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] place-items-center px-4 py-2">
        <div className="w-16 border-r border-gray-300 text-gray-700">
          <div className="relative h-16">
            <div className="absolute top-10 text-xs text-gray-600">GMT +2</div>
          </div>
        </div>
        
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

      <ScrollArea className="h-[84.5vh] ">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] px-4 py-2">
          <div className="w-16 border-r border-gray-300">
            {getHours.map((hour, index) => (
              <div key={index} className="relative h-16">
                <div className="absolute top-14 text-xs text-gray-600">
                  {hour.format("A H시")}
                </div>
              </div>
            ))}
          </div>

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
                {today && <TimeIndicator currentTime={currentTime} />}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
