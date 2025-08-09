import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './slices/loadingSlice';
import toastReducer from './slices/toastSlice';     
const store = configureStore({
    reducer: {
        loading: loadingReducer,
        toast: toastReducer,
    },
});

export default store;
