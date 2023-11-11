import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { STORE_STATUS } from '../../../shared/models';
import { UserCertificate } from '../models';
import {
  getAllCertificates,
  getOneCertificate,
} from '../services/certificates.service';

export interface CertificateState {
  certificates: UserCertificate[];
  status: STORE_STATUS;
  error: string | null;
}

const initialState: CertificateState = {
  certificates: [],
  status: STORE_STATUS.IDLE,
  error: null,
};

export const fetchAllCertificates = createAsyncThunk(
  'certificate/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCertificates();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch certificates');
    }
  },
);

export const fetchCertificateById = createAsyncThunk(
  'certificate/fetchById',
  async (certificateId: string, { rejectWithValue }) => {
    try {
      return await getOneCertificate(certificateId);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch certificate');
    }
  },
);

// Helper functions
const setLoading = (state: any) => {
  state.status = STORE_STATUS.LOADING;
};

const setFailed = (state, action, defaultErrorMessage) => {
  state.status = STORE_STATUS.FAILED;
  state.error = action.error.message || defaultErrorMessage;
  toast.error(`${state.error}`);
};

const certificateSlice = createSlice({
  name: 'certificate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCertificates.pending, setLoading)
      .addCase(fetchAllCertificates.fulfilled, (state, action) => {
        state.status = STORE_STATUS.SUCCEEDED;
        state.certificates = action.payload;
      })
      .addCase(fetchAllCertificates.rejected, (state, action) =>
        setFailed(state, action, 'Failed to load certificates'),
      )
      .addCase(fetchCertificateById.pending, setLoading)
      .addCase(fetchCertificateById.fulfilled, (state, action) => {
        state.status = STORE_STATUS.SUCCEEDED;
        // Assuming certificates are not stored in an array like workshops
        // Update the state as per your state structure
        state.certificates = [action.payload];
      })
      .addCase(fetchCertificateById.rejected, (state, action) =>
        setFailed(state, action, 'Failed to load certificate'),
      );
  },
});

export default certificateSlice.reducer;
