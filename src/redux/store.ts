// 여러 슬라이스는 configureStore 를 통해 하나의 store에 저장된다.

import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './features/calendarSlice';
import eventsReducer from './features/eventsSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;