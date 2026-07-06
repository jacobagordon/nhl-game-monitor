import type { RootState } from "../../store";

export const selectDashboardSummary = (state: RootState) => state.dashboard.summary;

export const selectDashboardIsLoading = (state: RootState) => state.dashboard.isLoading;

export const selectDashboardError = (state: RootState) => state.dashboard.error;
