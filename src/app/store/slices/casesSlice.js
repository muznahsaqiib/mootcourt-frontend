import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CASES_URL } from '@/utils/api-url.constant';
import { startLoading, stopLoading } from './loadingSlice';

export const fetchCases = createAsyncThunk(
    'cases/fetchCases',
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            const res = await axios.get(CASES_URL, { withCredentials: true });
            if (Array.isArray(res.data)) {
                return res.data;
            } else if (Array.isArray(res.data?.cases)) {
                return res.data.cases;
            } else {
                return [];
            }
        } catch (err) {
            return rejectWithValue(err.response?.data?.detail || 'Failed to load cases');
        } finally {
            dispatch(stopLoading());
        }
    }
);

const casesSlice = createSlice({
    name: 'cases',
    initialState: {
        items: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCases.fulfilled, (state, action) => {
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchCases.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default casesSlice.reducer;
