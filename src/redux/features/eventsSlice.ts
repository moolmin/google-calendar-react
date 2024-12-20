import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '@/types/event';

interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload); 
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
  },
});



export const { addEvent, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
