import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, BoardState } from "../interface";
import { axiosBoard, changeBoard, increaseHits, pageBoard, saveBoard } from "./AsyncThunk";

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
  size: 0,

};

const pending = (state: BoardState) => {
  state.loading = true;
  state.error = null;
};

const rejected = (state: BoardState, action: PayloadAction<Error | undefined>) => {
  state.loading = false;
  if (action.payload) {
    state.error = action.payload;
  } else {
    state.error = new Error("Unknown error");
  }
};

const boardListSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // 필요한 경우 동기 액션을 추가할 수 있습니다.
  },
  extraReducers: (builder) => {
    builder
      // 전체 DB 사이즈를 초기화
      .addCase(axiosBoard.pending, pending)
      .addCase(axiosBoard.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.size = action.payload;
      })
      .addCase(axiosBoard.rejected, rejected)

      // 페이지네이션 후 boards 초기화
      .addCase(pageBoard.pending, pending)
      .addCase(pageBoard.fulfilled, (state, action: PayloadAction<Board[]>) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(pageBoard.rejected, rejected)

      // 제목 or 내용 변경 처리
      .addCase(changeBoard.pending, pending)
      .addCase(changeBoard.fulfilled, (state, action: PayloadAction<Board>) => {
        state.loading = false;
        const updatedBoard = action.payload;
        // 상태 데이터에서 변경된 항목만 업데이트
        state.boards = state.boards.map((board) => (board.id === updatedBoard.id ? updatedBoard : board));
      })
      .addCase(changeBoard.rejected, rejected)

      // saveBoard Thunk 처리
      .addCase(saveBoard.pending, pending)
      .addCase(saveBoard.fulfilled, (state, action: PayloadAction<Board>) => {
        state.loading = false;
        state.boards.push(action.payload);
      })
      .addCase(saveBoard.rejected, rejected)

      // 조회수 증가 처리
      .addCase(increaseHits.pending, pending)
      .addCase(increaseHits.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(increaseHits.rejected, rejected)
  },
});

export default boardListSlice.reducer;
