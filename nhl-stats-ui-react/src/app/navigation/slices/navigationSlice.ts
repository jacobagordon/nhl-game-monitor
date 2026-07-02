import { createSlice } from "@reduxjs/toolkit";

interface NavigationState {
  mobileMenuOpen: boolean;
}

const initialState: NavigationState = {
  mobileMenuOpen: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    openMobileMenu: state => {
      state.mobileMenuOpen = true;
    },
    closeMobileMenu: state => {
      state.mobileMenuOpen = false;
    },
    toggleMobileMenu: state => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
  },
});

export const {
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
} = navigationSlice.actions;

export default navigationSlice.reducer;