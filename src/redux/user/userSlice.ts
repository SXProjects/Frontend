import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

interface UserState {
  loggedIn: boolean;
  name?: string;
  permission?: string;
}

const initialState: UserState = {
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.loggedIn = action.payload.loggedIn;
      state.name = action.payload.name;
      state.name = action.payload.permission;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
