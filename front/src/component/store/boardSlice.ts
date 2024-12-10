import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sizeBoard = createAsyncThunk("board/sizeBoard", async () => {
  const res = await axios.get("http://localhost:8080/get-board");
  console.log(res.data.length)
  return res.data.length;
});

const boardSlice = createSlice({
  name: "board",
  initialState: {
    size: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sizeBoard.fulfilled, (state, action) => {
        state.size = action.payload;
    });
  },
});

export default boardSlice.reducer;
