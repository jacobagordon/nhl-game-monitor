import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InfrastructureHealthResponse } from "../interfaces/InfrastructureHealthResponse";

interface InfrastructureState {
  health: InfrastructureHealthResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InfrastructureState = {
  health: null,
  isLoading: false,
  error: null,
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
      });
  },
});

export const infrastructureReducer = infrastructureSlice.reducer;
