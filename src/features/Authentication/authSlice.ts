import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Auth, AuthState } from './models';
import { signInUser, signUpUser } from './authService';
import toast from 'react-hot-toast';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: Auth, { rejectWithValue }) => {
    try {
      const userData = await signInUser(email, password);
      console.log(userData);
      return userData;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ name, email, password }: Auth, { rejectWithValue }) => {
    try {
      const userData = await signUpUser(name!, email, password);
      return userData;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
      // Handle other types of errors if needed
      return rejectWithValue('An unknown error occurred');
    }
  },
);

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  initializing: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setInitializing: (state, action) => {
      state.initializing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = 'An unknown error occurred';
        }
      })
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = 'An unknown error occurred';
        }
      });
  },
});

export const { clearError, setUser, setInitializing } = authSlice.actions;
export default authSlice.reducer;
