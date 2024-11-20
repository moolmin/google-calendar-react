import { Fragment } from 'react'
import MonthBox from './month-box'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import dayjs from 'dayjs';

export default function MonthView() {
  const { monthIndex } = useSelector((state: RootState) => state.calendar);
  const startOfMonth = dayjs().month(monthIndex).startOf("month");
  const startDate = startOfMonth.startOf("week"); 
  const dates = Array.from({ length: 42 }, (_, i) =>
    startDate.add(i, "day")
  );

  return (
    <section className='grid grid-cols-7 grid-rows-6 h-[calc(100vh-80px)]'>
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
    </section>
  )
}
