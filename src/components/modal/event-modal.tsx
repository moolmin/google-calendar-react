import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/features/eventModalSlice";
import { addEvent } from "@/redux/features/eventsSlice";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import dayjs from "dayjs";

const EventModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedDate } = useSelector(
    (state: RootState) => state.eventModal
  );

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(""); 
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  useEffect(() => {
    if (selectedDate) {
      const date = dayjs(selectedDate);
      setDate(date.format("YYYY-MM-DD"));
      setStartTime(date.format("HH:mm"));
      setEndTime(date.add(1, "hour").format("HH:mm")); 
    }
  }, [selectedDate]);

  const handleSave = () => {
    const newErrors = {
      title: !title ? "제목을 입력해주세요" : "",
      date: !date ? "날짜를 선택해주세요" : "",
      startTime: !startTime ? "시작 시간을 선택해주세요" : "",
      endTime: !endTime ? "종료 시간을 선택해주세요" : ""
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== "")) {
      return;
    }

    const newEvent = {
      id: new Date().toISOString(),
      title,
      date: `${date}T${startTime}`,
      endDate: `${date}T${endTime}`,
    };
    dispatch(addEvent(newEvent));
    dispatch(closeModal());
    setTitle("");
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
    setEndTime("");
  };

  if (!isOpen) return null; 

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeModal())}>
      <DialogContent>
        <DialogHeader>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="제목 추가"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Select value={startTime} onValueChange={handleStartTimeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="시작 시간" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem
                      key={i}
                      value={i.toString().padStart(2, "0") + ":00"}
                    >
                      {i.toString().padStart(2, "0")}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
            </div>

            <span className="text-muted-foreground">-</span>

            <div className="flex-1">
              <Select value={endTime} onValueChange={(value) => setEndTime(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="종료 시간" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, "0");
                    const timeValue = `${hour}:00`;

                    if (startTime && timeValue <= startTime) {
                      return null;
                    }
                    return (
                      <SelectItem key={i} value={timeValue}>
                        {hour}:00
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
