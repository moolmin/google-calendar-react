import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MonthView from "@/components/calendar/month/month";
import WeekView from "@/components/calendar/week/week";
import { useEffect } from "react";
import dayjs from "dayjs";
import { CalendarEventType, useDateStore, useEventStore } from "@/lib/store";

export default function CalendarContainer({
  eventsData,
}: {
  eventsData: CalendarEventType[];
}) {
  const { view } = useSelector((state: RootState) => state.calendar); 

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
      <div className="flex-1">
        {/* Redux view 상태에 따라 MonthView 또는 WeekView 렌더링 */}
        {view === "month" && <MonthView />}
        {view === "week" && <WeekView />}
      </div>
      {/* Popovers, 이벤트 요약은 그대로 유지 */}
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
