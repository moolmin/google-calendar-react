import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useViewStore } from "@/lib/store";

export default function HeaderRight() {
  const { setView } = useViewStore();

  return (
    <div className="flex items-center space-x-4">
      <Select onValueChange={(v) => setView(v)}>
        <SelectTrigger className="w-16 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month">월</SelectItem>
          <SelectItem value="week">주</SelectItem>
          <SelectItem value="day">일</SelectItem>
        </SelectContent>
      </Select>

      <Avatar>
        <AvatarImage src="/img/inst2.png" />
        <AvatarFallback>SU</AvatarFallback>
      </Avatar>
    </div>
  );
}
