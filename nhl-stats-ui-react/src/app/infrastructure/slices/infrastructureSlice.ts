import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InfrastructureHealthResponse } from "../interfaces/InfrastructureHealthResponse";

interface InfrastructureState {
    health: InfrastructureHealthResponse | null;
    isLoading: boolean;
    error: string | null;
    isScheduleDateLoading: boolean;
    scheduleDateActionError: string | null;
}

const initialState: InfrastructureState = {
    health: null,
    isLoading: false,
    error: null,
    isScheduleDateLoading: false,
    scheduleDateActionError: null,
};

export const fetchInfrastructureHealth = createAsyncThunk<
    InfrastructureHealthResponse,
    void,
    { rejectValue: string }
>("infrastructure/fetchHealth", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("/api/health");

        if (!response.ok) {
            return rejectWithValue(`Health request failed with status ${response.status}`);
        }

        return (await response.json()) as InfrastructureHealthResponse;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

export const triggerScheduleDateProcessing = createAsyncThunk<
    unknown,
    string,
    { rejectValue: string }
>("infrastructure/triggerScheduleDateProcessing", async (date, { rejectWithValue }) => {
    try {
        const response = await fetch(`/api/schedule-date/${date}`, {
            method: "PUT",
        });

        if (!response.ok) {
            return rejectWithValue(`Schedule date request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
});

const infrastructureSlice = createSlice({
    name: "infrastructure",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchInfrastructureHealth.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchInfrastructureHealth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.health = action.payload;
            })
            .addCase(fetchInfrastructureHealth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? "Failed to fetch infrastructure health";
            })
            .addCase(triggerScheduleDateProcessing.pending, state => {
                state.isScheduleDateLoading = true;
                state.scheduleDateActionError = null;
            })
            .addCase(triggerScheduleDateProcessing.fulfilled, state => {
                state.isScheduleDateLoading = false;
            })
            .addCase(triggerScheduleDateProcessing.rejected, (state, action) => {
                state.isScheduleDateLoading = false;
                state.scheduleDateActionError =
                    action.payload ?? "Failed to trigger schedule date processing";
            });
    },
});

export const infrastructureReducer = infrastructureSlice.reducer;
