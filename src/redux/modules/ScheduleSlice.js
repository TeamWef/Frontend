import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addScheduleApi, getScheduleApi } from "./API/scheduleAPI";

const initialState = {
  schedule: [],
  isLoading: false,
  error: null,
};

export const __addSchedule = createAsyncThunk(
  "post/addSchedule",
  async (payload, thunkAPI) => {
    console.log("postSchedule payload값", payload);
    try {
      await addScheduleApi(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log("error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getSchedule = createAsyncThunk(
  "get/getSchedule",
  async (payload, thunkAPI) => {
    try {
      const res = await getScheduleApi();
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      console.log("error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: {
    // create
    [__addSchedule.pending]: (state) => {
      state.isLoading = true;
    },
    [__addSchedule.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.schedule.data?.push(action.payload);
    },
    [__addSchedule.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getSchedule.pending]: (state) => {
      state.isLoading = true;
    },
    [__getSchedule.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.schedule = action.payload;
    },
    [__getSchedule.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
//
export const { schedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
