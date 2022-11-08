import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addGroupApi, getGroupApi } from "./API/groupAPI";

const initialState = {
  group: [],
  isLoading: false,
  error: null,
};

export const __addGroup = createAsyncThunk(
  "post/addGroup",
  async (payload, thunkAPI) => {
    console.log("group payload값", payload);
    try {
      await addGroupApi(payload);
      console.log("외않되", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log("잡았다 요놈!", err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getGroup = createAsyncThunk(
  "get/getGroup",
  async (payload, thunkAPI) => {
    try {
      const res = await getGroupApi();
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log("error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: {
    // create
    [__addGroup.pending]: (state) => {
      state.isLoading = true;
    },
    [__addGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("액션 페이로드=>", action.payload);
      state.group.data.push(action.payload);
    },
    [__addGroup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getGroup.pending]: (state) => {
      state.isLoading = true;
    },
    [__getGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.schedule = action.payload;
    },
    [__getGroup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
//
export const { group } = groupSlice.actions;
export default groupSlice.reducer;
