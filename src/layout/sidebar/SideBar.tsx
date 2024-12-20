import { cn } from "@/lib/utils";
import CreateBtn from "./CreateBtn";
import SideBarCalendar from "./SideBarCalendar";
import EventModal from "@/components/modal/event-modal";
export default function SideBar() {
  return (
    <>
      <aside
        className={cn(
          "flex-shrink-0 w-92 hidden px-2 py-3 transition-all duration-300 ease-in-out lg:block flex flex-col"
        )}
      >
        <CreateBtn />
        <SideBarCalendar />
      </aside>
      <EventModal />
    </>
  );
}
