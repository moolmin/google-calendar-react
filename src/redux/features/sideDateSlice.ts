import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';
import { getMonth } from '@/lib/getTime';

interface DateState {
  userSelectedDate: Dayjs;
  twoDMonthArray: Dayjs[][];
  selectedMonthIndex: number;
}

const initialState: DateState = {
  userSelectedDate: dayjs(),
  twoDMonthArray: getMonth(),
  selectedMonthIndex: dayjs().month(),
};

const sideDateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<Dayjs>) {
      state.userSelectedDate = action.payload;
    },
    setMonth(state, action: PayloadAction<number>) {
      state.twoDMonthArray = getMonth(action.payload);
      state.selectedMonthIndex = action.payload;
    },
  },
});

export const { setDate, setMonth } = sideDateSlice.actions;

export default sideDateSlice.reducer;
