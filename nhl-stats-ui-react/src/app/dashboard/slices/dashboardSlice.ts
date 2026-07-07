import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { DashboardSummaryResponse } from "../interfaces/DashboardSummaryResponse";
import type { RecentGame } from "../interfaces/RecentGame";
import type { TopPerformer } from "../interfaces/TopPerformer";

interface DashboardState {
    summary: DashboardSummaryResponse | null;
    isLoading: boolean;
    error: string | null;
    recentGames: RecentGame[];
    isRecentGamesLoading: boolean;
    recentGamesError: string | null;
    topPerformers: TopPerformer[];
    isTopPerformersLoading: boolean;
    topPerformersError: string | null;
}

const initialState: DashboardState = {
    summary: null,
    isLoading: false,
    error: null,
    recentGames: [],
    isRecentGamesLoading: false,
    recentGamesError: null,
    topPerformers: [],
    isTopPerformersLoading: false,
    topPerformersError: null,
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

export const fetchRecentGames = createAsyncThunk<RecentGame[], void, { rejectValue: string }>(
    "dashboard/fetchRecentGames",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/dashboard/recent-games");

            if (!response.ok) {
                return rejectWithValue(
                    `Recent games request failed with status ${response.status}`
                );
            }

            return (await response.json()) as RecentGame[];
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    }
);

export const fetchTopPerformers = createAsyncThunk<
    TopPerformer[],
    void,
    { rejectValue: string }
>("dashboard/fetchTopPerformers", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("/api/dashboard/top-performers");

        if (!response.ok) {
            return rejectWithValue(
                `Top performers request failed with status ${response.status}`
            );
        }

        return (await response.json()) as TopPerformer[];
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
            })
            .addCase(fetchRecentGames.pending, state => {
                state.isRecentGamesLoading = true;
                state.recentGamesError = null;
            })
            .addCase(fetchRecentGames.fulfilled, (state, action) => {
                state.isRecentGamesLoading = false;
                state.recentGames = action.payload;
            })
            .addCase(fetchRecentGames.rejected, (state, action) => {
                state.isRecentGamesLoading = false;
                state.recentGamesError = action.payload ?? "Failed to fetch recent games";
            })
            .addCase(fetchTopPerformers.pending, state => {
                state.isTopPerformersLoading = true;
                state.topPerformersError = null;
            })
            .addCase(fetchTopPerformers.fulfilled, (state, action) => {
                state.isTopPerformersLoading = false;
                state.topPerformers = action.payload;
            })
            .addCase(fetchTopPerformers.rejected, (state, action) => {
                state.isTopPerformersLoading = false;
                state.topPerformersError = action.payload ?? "Failed to fetch top performers";
            });
    },
});

export const dashboardReducer = dashboardSlice.reducer;
