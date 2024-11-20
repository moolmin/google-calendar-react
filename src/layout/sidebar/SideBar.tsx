import { cn } from "@/lib/utils";
import CreateBtn from "./CreateBtn";
import SideBarCalendar from "./SideBarCalendar";
import SearchUsers from "./SearchUser";
import MyCalendars from "./MyCalendar";

export default function SideBar() {
  return (
    <aside
      className={cn(
        "w-92 hidden border-t px-2 py-3 transition-all duration-300 ease-in-out lg:block",
      )}
    >
      <CreateBtn />
      <SideBarCalendar />
      <SearchUsers />
      <MyCalendars />
    </aside>
  );
}
