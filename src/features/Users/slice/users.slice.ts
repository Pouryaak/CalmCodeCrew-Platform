import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, getOneUser, updateUser, deleteUser } from '../services/users.service'; // Update with your actual path
import toast from 'react-hot-toast';
import { User } from '../../Authentication/models';
import { STORE_STATUS } from '../../../shared/models';

export interface UserState {
    users: User[];
    status: STORE_STATUS
    error: string | null;
}

const initialState: UserState = {
    users: [],
    status: STORE_STATUS.IDLE,
    error: null,
};

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await getAllUsers();
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch users');
        }
    }
);

export const fetchUserById = createAsyncThunk(
    'user/fetchById',
    async (userId: string) => {
        return await getOneUser(userId);
    }
);

export const modifyUser = createAsyncThunk(
    'user/update',
    async ({ userId, user }: { userId: string; user: User }, { rejectWithValue }) => {
        try {
            return await updateUser(userId, user);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update user');
        }
    }
);

export const removeUser = createAsyncThunk(
    'user/delete',
    async (userId: string, { rejectWithValue }) => {
        try {
            await deleteUser(userId);
            return userId;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to delete user');
        }
    }
);

// Helper functions for the slice
const setLoading = (state) => {
    state.status = STORE_STATUS.LOADING;
};

const setFailed = (state, action, defaultErrorMessage) => {
    state.status = STORE_STATUS.FAILED;
    state.error = action.payload || defaultErrorMessage;
    toast.error(state.error);
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAllUsers.pending, setLoading)
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = STORE_STATUS.IDLE;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => setFailed(state, action, 'Failed to load users'))
            .addCase(fetchUserById.pending, setLoading)
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = STORE_STATUS.IDLE;
                const index = state.users.findIndex(u => u.uid === action.payload.uid);
                if (index !== -1) {
                    state.users[index] = action.payload;
                } else {
                    state.users.push(action.payload);
                }
                toast.success('User fetched successfully!');
            })
            .addCase(fetchUserById.rejected, (state, action) => setFailed(state, action, 'Failed to load user'))
            .addCase(modifyUser.pending, setLoading)
            .addCase(modifyUser.fulfilled, (state, action) => {
                state.status = STORE_STATUS.IDLE;
                const index = state.users.findIndex(u => u.uid === action.payload.uid);
                if (index !== -1) {
                    state.users[index] = action.payload;
                    toast.success('User updated successfully!');
                }
            })
            .addCase(modifyUser.rejected, (state, action) => setFailed(state, action, 'Failed to update user'))
            .addCase(removeUser.pending, setLoading)
            .addCase(removeUser.fulfilled, (state, action) => {
                state.status = STORE_STATUS.IDLE;
                const index = state.users.findIndex(u => u.uid === action.payload);
                if (index !== -1) {
                    state.users.splice(index, 1);
                    toast.success('User deleted successfully!');
                }
            })
            .addCase(removeUser.rejected, (state, action) => setFailed(state, action, 'Failed to delete user'));
    },
});

export default userSlice.reducer;