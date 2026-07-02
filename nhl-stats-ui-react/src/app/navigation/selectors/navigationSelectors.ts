import type { RootState } from "../../store";

export const selectMobileMenuOpen = (state: RootState) =>
  state.navigation.mobileMenuOpen;