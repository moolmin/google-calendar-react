import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { removeEvent } from "@/redux/features/eventsSlice";
import { FaTrashCan } from "react-icons/fa6";
import { Event } from "@/types/event";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MonthEventProps {
  events: Event[];
  targetDate: dayjs.Dayjs;
}

export default function MonthEvent({ events, targetDate }: MonthEventProps) {
  const dispatch = useDispatch();

  const filteredEvents = events.filter((event) =>
    dayjs(event.date).isSame(targetDate, "day")
  );

  const visibleEvents = filteredEvents.slice(0, 3);
  const hiddenEventCount = filteredEvents.length - visibleEvents.length;

  return (
    <div className="flex flex-col w-full space-y-1">
      {visibleEvents.map((event) => (
        <div
          key={event.id}
          className="flex justify-between items-center bg-blue-600 text-white text-xs p-1 rounded"
        >
          <span className="truncate">{event.title}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-xs text-white hover:text-red-500 transition mr-2"
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
      ))}
      {hiddenEventCount > 0 && (
        <div className="text-xs text-gray-600">+{hiddenEventCount} 더보기</div>
      )}
    </div>
  );
}
