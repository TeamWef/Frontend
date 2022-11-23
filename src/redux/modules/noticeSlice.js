import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/axios";
import { noticeApis } from "./API/noticeAPI";

const initialState = {
  noticeList: [],
};

// export const __getNoticeList = createAsyncThunk(
//   "get/noticeList",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await noticeApis.noticeList();
//       console.log(data);
//       return thunkAPI.fulfillWithValue(data);
//     } catch (err) {
//       return console.log(err);
//     }
//   }
// );

export const __getNoticeList = createAsyncThunk(
  "get/noticeList",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/notification`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
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
    // Get
    [__getNoticeList.fulfilled]: (state, action) => {
      state.notice = action.payload;
    },
  },
});
