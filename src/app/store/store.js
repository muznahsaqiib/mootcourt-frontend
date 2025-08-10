import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './slices/loadingSlice';
import toastReducer from './slices/toastSlice'; 
import authReducer from './slices/authSlice'; 
import casesReducer from './slices/casesSlice';   
const store = configureStore({
    reducer: {
        loading: loadingReducer,
        toast: toastReducer,
        auth: authReducer, 
        cases: casesReducer,
    },
});

export default store;
