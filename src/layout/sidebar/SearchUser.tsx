import { MdOutlinePeople } from "react-icons/md";
import { Input } from "@/components/ui/input";

export default function SearchUsers() {
  return (
    <div className="relative ">
      <MdOutlinePeople className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-600" />
      <Input
        type="search"
        placeholder="사용자 검색"
        className="w-full rounded-md pl-8 bg-gray-100 placeholder:text-slate-600 border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
      />
    </div>
  )
}
