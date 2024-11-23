import { Fragment, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MonthBox from "./month-box";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import dayjs from "dayjs";
import EventModal from "@/components/modal/event-modal";

export default function MonthView() {
  const { monthIndex } = useSelector((state: RootState) => state.calendar);
  const prevMonthIndexRef = useRef<number>(monthIndex);

  const direction = monthIndex > prevMonthIndexRef.current ? 1 : -1;

  useEffect(() => {
    prevMonthIndexRef.current = monthIndex;
  }, [monthIndex]);

  const startOfMonth = dayjs().month(monthIndex).startOf("month");
  const startDate = startOfMonth.startOf("week");
  const dates = Array.from({ length: 42 }, (_, i) =>
    startDate.add(i, "day")
  );

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={monthIndex}
        initial={{ x: direction === 1 ? 50 : -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction === 1 ? -50 : 50, opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="grid grid-cols-7 grid-rows-6 h-[calc(100vh-80px)]"
      >
        <EventModal />
        {dates.reduce((rows, date, i) => {
          if (i % 7 === 0) rows.push([]);
          rows[rows.length - 1].push(date);
          return rows;
        }, [] as dayjs.Dayjs[][]).map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((day, colIndex) => (
              <MonthBox
                key={`${rowIndex}-${colIndex}`}
                day={day}
                rowIndex={rowIndex}
              />
            ))}
          </Fragment>
        ))}
      </motion.section>
    </AnimatePresence>
  );
}
