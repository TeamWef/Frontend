import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { noticeApis } from "./API/noticeAPI";

const initialState = {
  newList: [],
  noticeList: [],
};

export const __getNoticeList = createAsyncThunk(
  "get/notice",
  async (payload, thunkAPI) => {
    try {
      const data = await noticeApis.noticeList();
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __readNotice = createAsyncThunk(
  "put/notice",
  async (payload, thunkAPI) => {
    try {
      const data = await noticeApis.readNotice(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __delNotice = createAsyncThunk(
  "delete/notice",
  async (payload, thunkAPI) => {
    try {
      const data = await noticeApis.deleteNotice(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __delNoticeAll = createAsyncThunk(
  "delete/noticeAll",
  async (payload, thunkAPI) => {
    try {
      const data = await noticeApis.deleteNoticeAll();
      console.log(data);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      return console.log(err);
    }
  }
);

export const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getNoticeList.fulfilled]: (state, action) => {
      state.noticeList = action.payload;
    },
    [__readNotice.fulfilled]: (state, action) => {
      state.noticeList = state.noticeList.map((item) => {
        if (item.id === action.payload) {
          return { ...item, status: true };
        }
        return item;
      });
    },
    [__delNotice.fulfilled]: (state, action) => {
      state.noticeList = state.noticeList.filter(
        (item) => item.id !== action.payload
      );
    },
    [__delNoticeAll.fulfilled]: (state, action) => {
      state.noticeList = [];
    },
  },
});

export const {} = noticeSlice.actions;
export default noticeSlice.reducer;
