import { configureStore } from "@reduxjs/toolkit";
import boardListReducer from "./boardListSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    boards: boardListReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
