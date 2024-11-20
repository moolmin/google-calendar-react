import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface CalendarState {
  view: "month" | "week";
  monthIndex: number; 
  weekIndex: number; 
}

const initialState: CalendarState = {
  view: "month",
  monthIndex: new Date().getMonth(), 
  weekIndex: dayjs().week(),         
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<CalendarState["view"]>) => {
      state.view = action.payload;
    },
    setMonth: (state, action: PayloadAction<number>) => {
      state.monthIndex = action.payload;
    },
    setWeek: (state, action: PayloadAction<number>) => {
      state.weekIndex = action.payload;
    },
  },
});

export const { setView, setMonth, setWeek } = calendarSlice.actions;
export default calendarSlice.reducer;
