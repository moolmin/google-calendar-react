
import { Fragment } from 'react'
import MonthBox from './month-box'
import { useDateStore } from '@/lib/store';

export default function MonthView() {

  const { twoDMonthArray } = useDateStore();
  return (
    <section className='grid grid-cols-7 grid-rows-5 h-[calc(100vh-72px)]'>
     {twoDMonthArray.map((row, i) => (
        <Fragment key={i}>
          {row.map((day, index) => (
            <MonthBox key={index} day={day} rowIndex={i} />
          ))}
        </Fragment>
      ))}
    </section>
  )
}
