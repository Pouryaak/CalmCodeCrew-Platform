import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Authentication/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // ... other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
