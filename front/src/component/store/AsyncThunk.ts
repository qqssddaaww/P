import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Board, chBoard, param } from "../interface";

// Board db 에서 size를 구하는 API
export const axiosBoard = createAsyncThunk<number, void, { rejectValue: Error }>("board/axiosBoard", async (_, thunkAPI) => {
  try {
    const res = await axios.get("http://localhost:8080/get-board");
    return res.data.length;
  } catch (e) {
    return thunkAPI.rejectWithValue(e as Error);
  }
});

//  페이지네이션 API
export const pageBoard = createAsyncThunk<Board[], param, { rejectValue: Error }>("board/pageBoard", async (value: param, thunkAPI) => {
  try {
    const res = await axios.get<Board[]>(`http://localhost:8080/page-board?page=${value.page - 1}&size=${value.size}`);
    console.dir(res.data);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e as Error);
  }
});

//   게시판 글 작성 API
export const saveBoard = createAsyncThunk<Board, Board, { rejectValue: Error }>("board/saveBoard", async (value: Board, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:8080/save-content", value);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e as Error);
  }
});

//   게시판 글 수정 API
export const changeBoard = createAsyncThunk<Board, chBoard, { rejectValue: Error }>("board/changeBoard", async (value: chBoard, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:8080/change-board", value);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e as Error);
  }
});

//   조회수 증가 API
export const increaseHits = createAsyncThunk<Board, number | undefined, { rejectValue: Error }>("board/increaseHits", async (id: number | undefined, thunkAPI) => {
  try {
    const res = await axios.get(`http://localhost:8080/increase-hits?id=${id}`);
    console.log("ok :" + res);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e as Error);
  }
});
