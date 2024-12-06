import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Board, BoardState } from "../interface";

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
};

export const axiosBoard = createAsyncThunk<Board[]>(
  "board/axiosBoard",
  async (): Promise<Board[]> => {
    try {
      const res = await axios.get<Board[]>("http://localhost:8080/getBoard");
      return res.data;
    } catch (e) {
      return e as Board[];
    }
  }
);

export const saveBoard = createAsyncThunk(
  "board/saveBoard",
  async (value: Board) => {
    try {
      const res = await axios.post("http://localhost:8080/save-content", value);
      return res.data;
    } catch (e) {
      return e;
    }
  }
);

const boardListSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // 필요한 경우 동기 액션을 추가할 수 있습니다.
  },
  extraReducers: (builder) => {
    builder
      // axios Thunk 처리
      .addCase(axiosBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        axiosBoard.fulfilled,
        (state, action: PayloadAction<Board[]>) => {
          state.loading = false;
          state.boards = action.payload;
        }
      )
      .addCase(axiosBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // saveBoard Thunk 처리
      .addCase(saveBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBoard.fulfilled, (state, action: PayloadAction<Board>) => {
        state.loading = false;
        state.boards.push(action.payload);
      })
      .addCase(saveBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default boardListSlice.reducer;
