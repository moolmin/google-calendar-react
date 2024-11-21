// 선택된 날짜 정보를 다른 컴포넌트에서도 쓸 수 있게 하기 위함
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventModalState {
  isOpen: boolean;
  selectedDate: string | null;
}

const initialState: EventModalState = {
  isOpen: false,
  selectedDate: null,
};

const eventModalSlice = createSlice({
  name: "eventModal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true; 
      state.selectedDate = action.payload; 
    },
    closeModal: (state) => {
      state.isOpen = false; 
      state.selectedDate = null; 
    },
  },
});

export const { openModal, closeModal } = eventModalSlice.actions;
export default eventModalSlice.reducer;
