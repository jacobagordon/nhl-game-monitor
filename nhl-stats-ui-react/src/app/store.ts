import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigation/slices/navigationSlice";
import { infrastructureReducer } from "./infrastructure/slices/infrastructureSlice";

export const store = configureStore({
    reducer: {
        infrastructure: infrastructureReducer,
        navigation: navigationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
