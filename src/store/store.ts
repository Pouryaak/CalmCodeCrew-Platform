import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Authentication/authSlice';
import certificatesReducer from '../features/Certificates/slice/certificates.slice';
import usersReducer from '../features/Users/slice/users.slice';
import workshopsReducer from '../features/Workshops/slice/workshop.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workshops: workshopsReducer,
    users: usersReducer,
    certificates: certificatesReducer,
    // ... other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
