import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ko";

dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale("ko");
dayjs.tz.setDefault("Asia/Seoul");
dayjs.updateLocale("ko", {
  weekStart: 1,
});

export const isCurrentDay = (day: dayjs.Dayjs) => {
  return day.isSame(dayjs(), "day");
};

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs().set("month", month).startOf("month");
  const startOfCalendar = firstDayOfMonth.startOf("week");

  let dayCounter = 0;

  return Array.from({ length: 5 }, () =>
    Array.from({ length: 7 }, () => startOfCalendar.add(dayCounter++, "day"))
  );
};

export const getWeekDays = (date: dayjs.Dayjs) => {
  const startOfWeek = date.startOf("week");

  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = startOfWeek.add(i, "day");
    weekDates.push({
      currentDate,
      today:
        currentDate.toDate().toDateString() === dayjs().toDate().toDateString(),
      isCurrentDay,
    });
  }

  return weekDates;
};

export const getHours = [
  ...Array.from({ length: 12 }, (_, i) =>
    dayjs().startOf("day").add(i, "hour")
  ),
  ...Array.from({ length: 12 }, (_, i) =>
    dayjs()
      .startOf("day")
      .add(i + 12, "hour")
  ),
];

export const getWeeks = (monthIndex: number) => {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, monthIndex, 1));
  const lastDayOfMonth = dayjs(new Date(year, monthIndex + 1, 0));

  const weeks: number[] = [];

  let currentDay = firstDayOfMonth;
  while (
    currentDay.isBefore(lastDayOfMonth) ||
    currentDay.isSame(lastDayOfMonth)
  ) {
    const weekNumber = currentDay.week();
    if (!weeks.includes(weekNumber)) {
      weeks.push(weekNumber);
    }
    currentDay = currentDay.add(1, "day");
  }

  return weeks;
};

export const getWeekRange = (weekIndex: number) => {
  const startOfWeek = dayjs().week(weekIndex).startOf("week");
  const endOfWeek = dayjs().week(weekIndex).endOf("week");

  const startMonth = startOfWeek.month() + 1;
  const endMonth = endOfWeek.month() + 1;

  if (startMonth === endMonth) {
    return `${startOfWeek.format("YYYY년 MM월")}`;
  } else {
    return `${startOfWeek.format("YYYY년 MM월")} - ${endOfWeek.format("MM월")}`;
  }
};
