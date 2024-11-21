import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { removeEvent } from "@/redux/features/eventsSlice";
import { FaTrashCan } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Event {
  id: string;
  title: string;
  date: string;
  endDate: string;
}

interface WeekEventProps {
  events: Event[];
  targetDate: dayjs.Dayjs;
}

export default function WeekEvent({ events, targetDate }: WeekEventProps) {
  const dispatch = useDispatch();

  const filteredEvents = events.filter((event) =>
    dayjs(event.date).isSame(targetDate, "minute")
  );

  return (
    <>
      {filteredEvents.map((event) => {
        const startTime = dayjs(event.date);
        const endTime = dayjs(event.endDate);
        const durationInMinutes = endTime.diff(startTime, "minute");
        const height = (durationInMinutes / 60) * 4 * 16;

        const formattedStartTime = startTime.format("HH:mm");
        const formattedEndTime = endTime.format("HH:mm");

        return (
          <div
            key={event.id}
            className="absolute left-0 w-full bg-blue-600 text-white text-sm p-1 rounded flex flex-col justify-between items-left"
            style={{
              height: `${height}px`,
              top: 0,
            }}
          >
            <div className="flex items-center space-x-2 relative">
              <div>
                <div className="font-bold truncate max-w-[120px]">
                  {event.title}
                </div>
                <div className="text-xs">{`${formattedStartTime} ~ ${formattedEndTime}`}</div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="text-xs absolute top-1 right-1 text-white px-2 py-1 rounded hover:bg-red-600 transition md:block hidden"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        dispatch(removeEvent(event.id)); 
                      }}
                    >
                      <FaTrashCan />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>삭제</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        );
      })}
    </>
  );
}
