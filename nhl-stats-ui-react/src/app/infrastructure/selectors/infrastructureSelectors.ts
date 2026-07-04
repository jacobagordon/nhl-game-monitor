import type { RootState } from "../../store";

export const selectInfrastructureHealth = (state: RootState) => state.infrastructure.health;

export const selectInfrastructureComponents = (state: RootState) =>
    state.infrastructure.health?.components ?? [];

export const selectInfrastructureStatus = (state: RootState) =>
    state.infrastructure.health?.status ?? "UNKNOWN";

export const selectInfrastructureCheckedAtUtc = (state: RootState) =>
    state.infrastructure.health?.checkedAtUtc ?? null;

export const selectInfrastructureIsLoading = (state: RootState) => state.infrastructure.isLoading;

export const selectInfrastructureError = (state: RootState) => state.infrastructure.error;
