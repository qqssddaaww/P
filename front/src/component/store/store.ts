import { configureStore } from "@reduxjs/toolkit";
import boardListReducer from "./boardListSlice"

const store = configureStore({
    reducer: {
        boards: boardListReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;