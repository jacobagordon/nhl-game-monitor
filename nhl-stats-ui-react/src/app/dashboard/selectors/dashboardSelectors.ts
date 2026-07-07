import type { RootState } from "../../store";

export const selectDashboardSummary = (state: RootState) => state.dashboard.summary;

export const selectDashboardIsLoading = (state: RootState) => state.dashboard.isLoading;

export const selectDashboardError = (state: RootState) => state.dashboard.error;

export const selectRecentGames = (state: RootState) => state.dashboard.recentGames;

export const selectRecentGamesIsLoading = (state: RootState) =>
    state.dashboard.isRecentGamesLoading;

export const selectRecentGamesError = (state: RootState) => state.dashboard.recentGamesError;
