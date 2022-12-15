import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { noticeApis } from "./API/noticeAPI";

const initialState = {
  newNoti: "",
  noticeList: [],
};

export const __getNoticeList = createAsyncThunk(
  "get/notice",
  async (payload, thunkAPI) => {
    try {
      const data = await noticeApis.noticeList();
      console.log(data);
      return thunkAPI.fulfillWithValue(data?.data);
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
      await noticeApis.deleteNotice(payload);
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
      await noticeApis.deleteNoticeAll();
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __getNoticeCount = createAsyncThunk(
  "get/noticeCount",
  async (payload, thunkAPI) => {
    try {
      const data = await noticeApis.newNotice();
      // console.log(data);
      return thunkAPI.fulfillWithValue(data?.data);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __updateNoticeCount = createAsyncThunk(
  "put/noticeCount",
  (payload, thunkAPI) => {
    return thunkAPI.fulfillWithValue(payload);
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
    [__getNoticeCount.fulfilled]: (state, action) => {
      state.newNoti = action.payload;
    },
    [__updateNoticeCount.fulfilled]: (state, action) => {
      if (action.payload === "-") {
        state.newNoti = state.newNoti - 1;
      } else {
        state.newNoti = state.newNoti + 1;
      }
    },
  },
});

export const {} = noticeSlice.actions;
export default noticeSlice.reducer;
