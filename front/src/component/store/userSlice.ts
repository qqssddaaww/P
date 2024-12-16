import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, user, userState } from "../interface";
import axios from "axios";

export const loginUser = createAsyncThunk<user, login, { rejectValue: Error }>("user/loginUser", async (value: login, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:8080/login", value, { withCredentials: true});
    console.dir(res);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e as Error);
  }
});

export const joinUser = createAsyncThunk<user, user, { rejectValue: Error }>("user/joinUser", async (value: user, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:8080/join", value);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e as Error);
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: Error }>("user/logoutUser", async (_, thunkAPI) => {
  try {
    await axios.get("http://localhost:8080/logout", { withCredentials: true });
    return;
  } catch (e) {
    return thunkAPI.rejectWithValue(e as Error);
  }
});

export const checkSession = createAsyncThunk<user, void, { rejectValue: Error }>("user/checkSession", async (_, thunkAPI) => {
  try {
    const res = await axios.get("http://localhost:8080/check-session", { withCredentials: true });
    console.dir(res.data)
    if (res.data === "") {
      return { id : "", name : ""}
    }
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e as Error);
  }
});

const initialState: userState = {
  user: {
    id: "",
    name: "",
  },
  error: null,
  loading: false,
};

const pending = (state: userState) => {
  state.loading = true;
  state.error = null;
};

const rejected = (state: userState, action: PayloadAction<Error | undefined>) => {
  state.loading = false;
  if (action.payload) {
    state.error = action.payload;
  } else {
    state.error = new Error("Unknown error");
  }
};

const userSilce = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<user>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, rejected)

      .addCase(joinUser.pending, pending)
      .addCase(joinUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(joinUser.rejected, rejected)

      .addCase(logoutUser.pending, pending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user.id = "";
        state.user.name = "";
        state.loading = false;
      })
      .addCase(logoutUser.rejected, rejected)

      .addCase(checkSession.pending, pending) 
      .addCase(checkSession.fulfilled, (state, action: PayloadAction<user>) => {
        console.log(action.payload);
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(checkSession.rejected, rejected);
  },
});

export const { setUser } = userSilce.actions;
export default userSilce.reducer;
