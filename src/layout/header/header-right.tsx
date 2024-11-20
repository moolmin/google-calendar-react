import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store"; 
import { setView } from "@/redux/features/calendarSlice";

export default function HeaderRight() {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.calendar.view);

  return (
    <div className="flex items-center space-x-4">
      <Select onValueChange={(v) => dispatch(setView(v as "month" | "week"))}>
        <SelectTrigger className="w-16 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
          <SelectValue placeholder={view === "month" ? "월" : "주"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month">월</SelectItem>
          <SelectItem value="week">주</SelectItem>
        </SelectContent>
      </Select>

      <Avatar>
        <AvatarImage src="/img/inst2.png" />
        <AvatarFallback>SU</AvatarFallback>
      </Avatar>
    </div>
  );
}
