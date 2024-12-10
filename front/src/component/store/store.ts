import { configureStore } from "@reduxjs/toolkit";
import boardListReducer from "./boardListSlice";
import boardReducer from "./boardSlice";

const store = configureStore({
  reducer: {
    boards: boardListReducer,
    board : boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
