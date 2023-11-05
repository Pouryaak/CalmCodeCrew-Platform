import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Workshop } from '../models'; // Update with your actual path
import { getAllWorkshops, getOneWorkshop, addWorkshop, updateWorkshop, deleteWorkshop } from '../services/workshop.service'; // Update with your actual path
import toast from 'react-hot-toast';
import { STORE_STATUS } from '../../../shared/models';

export interface WorkshopState {
    workshops: Workshop[];
    status: STORE_STATUS;
    error: string | null;
}

const initialState: WorkshopState = {
    workshops: [],
    status: STORE_STATUS.IDLE,
    error: null,
};

export const fetchAllWorkshops = createAsyncThunk(
    'workshop/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await getAllWorkshops();
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch workshops');
        }
    }
);

export const fetchWorkshopById = createAsyncThunk(
    'workshop/fetchById',
    async (workshopId: string) => {
        return await getOneWorkshop(workshopId);
    }
);

export const addNewWorkshop = createAsyncThunk(
    'workshop/add',
    async (workshop: Workshop, { rejectWithValue }) => {
        try {
            const workshopId: string = await addWorkshop(workshop);
            return { ...workshop, uid: workshopId };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to add workshop');
        }
    }
);

export const modifyWorkshop = createAsyncThunk(
    'workshop/update',
    async ({ workshopUid, workshop }: { workshopUid: string; workshop: Workshop }, { rejectWithValue }) => {
        try {
            return await updateWorkshop(workshopUid, workshop);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update workshop');
        }
    }
);

export const removeWorkshop = createAsyncThunk(
    'workshop/delete',
    async (workshopUid: string, { rejectWithValue }) => {
        try {
            await deleteWorkshop(workshopUid);
            return workshopUid;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to delete workshop');
        }
    }
);

// Helper functions
const setLoading = (state) => {
    state.status = STORE_STATUS.LOADING;
};

const setFailed = (state, action, defaultErrorMessage) => {
    state.status = STORE_STATUS.FAILED;
    state.error = action.error.message || defaultErrorMessage;
    toast.error(`${state.error}`);
};

const workshopSlice = createSlice({
    name: 'workshop',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAllWorkshops.pending, setLoading)
            .addCase(fetchAllWorkshops.fulfilled, (state, action) => {
                state.status = STORE_STATUS.IDLE;
                state.workshops = action.payload;
                toast.success('Workshops loaded successfully!');
            })
            .addCase(fetchAllWorkshops.rejected, (state, action) => setFailed(state, action, 'Failed to load workshops'))
            .addCase(fetchWorkshopById.pending, setLoading)
            .addCase(fetchWorkshopById.fulfilled, (state, action) => {
                state.status = STORE_STATUS.IDLE;
                const index = state.workshops.findIndex(w => w.uid === action.payload.uid);
                if (index !== -1) {
                    state.workshops[index] = action.payload;
                    toast.success('Workshop fetched successfully!');
                } else {
                    state.workshops.push(action.payload);
                    toast.success('New workshop added to the list!');
                }
            })
            .addCase(fetchWorkshopById.rejected, (state, action) => setFailed(state, action, 'Failed to load workshop'))
            .addCase(addNewWorkshop.pending, setLoading)
            .addCase(addNewWorkshop.fulfilled, (state, action) => {
                state.status = STORE_STATUS.IDLE;
                state.workshops.push(action.payload);
                toast.success('Workshop added successfully!');
            })
            .addCase(addNewWorkshop.rejected, (state, action) => setFailed(state, action, 'Failed to add workshop'))
            .addCase(modifyWorkshop.pending, setLoading)
            .addCase(modifyWorkshop.fulfilled, (state, action) => {
                state.status = STORE_STATUS.IDLE;
                const index = state.workshops.findIndex(w => w.uid === action.payload.uid);
                if (index !== -1) {
                    state.workshops[index] = action.payload;
                    toast.success('Workshop updated successfully!');
                }
            })
            .addCase(modifyWorkshop.rejected, (state, action) => setFailed(state, action, 'Failed to update workshop'))
            .addCase(removeWorkshop.pending, setLoading)
            .addCase(removeWorkshop.fulfilled, (state, action) => {
                state.status = STORE_STATUS.IDLE;
                const index = state.workshops.findIndex(w => w.uid === action.payload);
                if (index !== -1) {
                    state.workshops.splice(index, 1);
                    toast.success('Workshop deleted successfully!');
                }
            })
            .addCase(removeWorkshop.rejected, (state, action) => setFailed(state, action, 'Failed to delete workshop'));
    },
});

export default workshopSlice.reducer;