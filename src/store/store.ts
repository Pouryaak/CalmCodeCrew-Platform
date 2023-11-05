import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Authentication/authSlice';
import workshopsReducer from '../features/Workshops/slice/workshop.slice';
import usersReducer from '../features/Users/slice/users.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workshops: workshopsReducer,
    users: usersReducer
    // ... other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
