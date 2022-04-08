import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/User/userSlice';
import indexReducer from './slices/Index/indexSlice';
import roomReducer from './slices/Room/roomSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    index: indexReducer,
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
