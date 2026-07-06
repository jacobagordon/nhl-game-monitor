import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { DashboardSummaryResponse } from "../interfaces/DashboardSummaryResponse";

interface DashboardState {
    summary: DashboardSummaryResponse | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    summary: null,
    isLoading: false,
    error: null,
};

export const fetchDashboardSummary = createAsyncThunk<
    DashboardSummaryResponse,
    void,
    { rejectValue: string }
>("dashboard/fetchDashboardSummary", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("/api/dashboard/summary");

        if (!response.ok) {
            return rejectWithValue(
                `Dashboard summary request failed with status ${response.status}`
            );
        }

        return (await response.json()) as DashboardSummaryResponse;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDashboardSummary.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
                state.isLoading = false;
                state.summary = action.payload;
            })
            .addCase(fetchDashboardSummary.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? "Failed to fetch dashboard summary";
            });
    },
});

export const dashboardReducer = dashboardSlice.reducer;
