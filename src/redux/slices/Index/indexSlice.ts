import { createSlice } from '@reduxjs/toolkit';
import { DIndex } from './indexDictionary';

interface IndexState {
  active: string;
}

const initialState: IndexState = {
  active: DIndex.index,
};

export const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    setIndex: (state) => {
      state.active = DIndex.index;
    },

    setRobot: (state) => {
      state.active = DIndex.robot;
    },
  },
});

export const { setIndex, setRobot } = indexSlice.actions;
export default indexSlice.reducer;
