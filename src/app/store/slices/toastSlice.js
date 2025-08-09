import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    severity: '',
    summary: '',
    detail: '',
    visible: false,
}
const toastSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        showToast: (state, action) => {
            const { severity, summary, detail } = action.payload;
            state.severity = severity;
            state.summary = summary;
            state.detail = detail;
            state.visible = true;
        },
        hideToast: (state) => {
            state.visible = false;
        }
    }
})

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
