import {
  CalendarEventType,
  useDateStore,
  useEventStore,
  useViewStore,
} from "@/lib/store";
import MonthView from "./month/month";
// import WeekView from "./week-view";
// import DayView from "./day-view";
// import EventPopover from "./event-popover";
// import { EventSummaryPopover } from "./event-summary-popover";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function CalendarContainer({
  eventsData,
}: {
  eventsData: CalendarEventType[];
}) {
  const { selectedView } = useViewStore();

  const {
    isPopoverOpen,
    closePopover,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
    setEvents,
  } = useEventStore();

  const { userSelectedDate } = useDateStore();

  useEffect(() => {
    const mappedEvents: CalendarEventType[] = eventsData.map((event) => ({
      id: event.id,
      date: dayjs(event.date),
      title: event.title,
      description: event.description,
    }));

    setEvents(mappedEvents);
  }, [eventsData, setEvents]);

  return (
    <div className="flex w-full">
      <div className=" flex-1">
        {selectedView === "month" && <MonthView />}
        {/* {selectedView === "week" && <WeekView />}
        {selectedView === "day" && <DayView />} */}
      </div>
      {/* {isPopoverOpen && (
        <EventPopover
          isOpen={isPopoverOpen}
          onClose={closePopover}
          date={userSelectedDate.format("YYYY-MM-DD")}
        />
      )}

      {isEventSummaryOpen && selectedEvent && (
        <EventSummaryPopover
          isOpen={isEventSummaryOpen}
          onClose={closeEventSummary}
          event={selectedEvent}
        />
      )} */}
    </div>
  );
}
