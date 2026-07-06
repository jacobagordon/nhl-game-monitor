import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigation/slices/navigationSlice";
import { infrastructureReducer } from "./infrastructure/slices/infrastructureSlice";
import { dashboardReducer } from "./dashboard/slices/dashboardSlice";

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        infrastructure: infrastructureReducer,
        navigation: navigationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
