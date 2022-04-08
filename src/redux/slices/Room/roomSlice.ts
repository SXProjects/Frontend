import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomState {
  active: string;
}

const initialState: RoomState = {
  active: '',
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    selectRoom: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
  },
});

export const { selectRoom } = roomSlice.actions;
export default roomSlice.reducer;
