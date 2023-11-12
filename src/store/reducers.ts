import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/Authentication/authSlice';
import certificatesReducer from '../features/Certificates/slice/certificates.slice';
import usersReducer from '../features/Users/slice/users.slice';
import workshopsReducer from '../features/Workshops/slice/workshop.slice';

// Create the root reducer by combining slice reducers
export const rootReducer = combineReducers({
  auth: authReducer,
  workshops: workshopsReducer,
  users: usersReducer,
  certificates: certificatesReducer,
});
