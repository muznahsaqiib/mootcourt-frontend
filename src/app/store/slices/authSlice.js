// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_URL, REGISTER_URL, ME_URL, LOGOUT_URL } from "@/utils/api-url.constant";
import { showToast } from "./toastSlice";
import { startLoading, stopLoading } from "./loadingSlice";
import { HOME_ROUTE } from "@/utils/routes.constant";

// --- Login Thunk ---
export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ username, password, router }, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            const res = await fetch(LOGIN_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                dispatch(showToast({
                    severity: "error",
                    summary: "Login Failed",
                    detail: data.detail || "Invalid credentials",
                }));
                return rejectWithValue(data.detail);
            }

            localStorage.setItem("user", JSON.stringify(data.user));

            dispatch(showToast({
                severity: "success",
                summary: "Login Successful",
                detail: `Welcome ${data.user.username}`,
            }));

            router.push("/dashboard");

            return data.user;
        } catch (err) {
            dispatch(showToast({
                severity: "error",
                summary: "Network Error",
                detail: err.message || "Something went wrong",
            }));
            return rejectWithValue(err.message);
        } finally {
            dispatch(stopLoading());
        }
    }
);

// --- Register Thunk ---
export const registerUser = createAsyncThunk(
    "auth/register",
    async ({ username, email, password }, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            const res = await axios.post(REGISTER_URL, { username, email, password });

            dispatch(showToast({
                severity: "success",
                summary: "Registration Successful",
                detail: res.data.message || "User registered successfully",
            }));

            return res.data;
        } catch (err) {
            const errorMsg = err.response?.data?.detail || "Registration failed";
            dispatch(showToast({
                severity: "error",
                summary: "Registration Failed",
                detail: errorMsg,
            }));
            return rejectWithValue(errorMsg);
        } finally {
            dispatch(stopLoading());
        }
    }
);

// --- Fetch Current User Thunk ---
export const fetchCurrentUser = createAsyncThunk(
    "auth/me",
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(startLoading());
        try {
            const res = await axios.get(ME_URL, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch user");
        } finally {
            dispatch(stopLoading());
        }
    }
);

// --- Logout Thunk ---

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { dispatch }) => {
        try {
            await axios.post(LOGOUT_URL, {}, { withCredentials: true });
        } catch (err) {
            console.error("Logout failed:", err);
        }
        localStorage.removeItem("user");
        return null;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // LOGIN
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            });

        // REGISTER
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            });

        // FETCH CURRENT USER
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Could not fetch user";
            });

        // LOGOUT
        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Logout failed";
            });
    }

});

export default authSlice.reducer;
