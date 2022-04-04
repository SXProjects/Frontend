import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/User/userSlice';
import indexReducer from './slices/Index/indexSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    index: indexReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
