import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Board, BoardState, chBoard, param } from "../interface";

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
  size: 0,
};

export const axiosBoard = createAsyncThunk<Board[]>(
  "board/axiosBoard",
  async (): Promise<Board[]> => {
    try {
      const res = await axios.get<Board[]>("http://localhost:8080/get-board");
      return res.data;
    } catch (e) {
      return e as Board[];
    }
  }
);

export const pageBoard = createAsyncThunk<Board[], param>(
  "board/pageBoard",
  async (params: param): Promise<Board[]> => {
    try {
      const res = await axios.get<Board[]>(
        `http://localhost:8080/page-board?page=${params.page - 1}&size=${
          params.size
        }`
      );
      console.dir(res.data);
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
export const changeBoard = createAsyncThunk(
  "board/changeBoard",
  async (value: chBoard) => {
    try {
      const res = await axios.post("http://localhost:8080/change-board", value);
      return res.data;
    } catch (e) {
      return e;
    }
  }
);

export const increaseHits = createAsyncThunk(
  "board/increaseHits",
  async (id: number | undefined): Promise<Board> => {
    try {
      const res = await axios.get(
        `http://localhost:8080/increase-hits?id=${id}`
      );
      console.log("ok :" + res);
      return res.data;
    } catch (e) {
      return e as Board;
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

      .addCase(pageBoard.fulfilled, (state, action: PayloadAction<Board[]>) => {
        state.loading = false;
        state.boards = action.payload;
      })
      // 제목 or 내용 변경 처리 
      .addCase(changeBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeBoard.fulfilled, (state,action: PayloadAction<Board>) => {
        state.loading = false;
        const updatedBoard = action.payload;
        // 상태 데이터에서 변경된 항목만 업데이트
        state.boards = state.boards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        );
      })
      .addCase(changeBoard.rejected, (state, action) => {
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
      })

      .addCase(increaseHits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseHits.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(increaseHits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default boardListSlice.reducer;
