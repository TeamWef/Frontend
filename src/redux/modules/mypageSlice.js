import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMypageApi, updateMypageApi } from "./API/mypageAPI";

// InitialState
const initialState = {
  myProfile: {},
};

export const __getMypage = createAsyncThunk(
  "get/getMypage",
  async (payload, thunkAPI) => {
    try {
      const data = await getMypageApi();
      // console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __updateMypage = createAsyncThunk(
  "patch/updateMypage",
  async (payload, thunkAPI) => {
    try {
      const data = await updateMypageApi(payload);
      if (data.status === 200) {
        alert("수정이 완료되었습니다");
      }
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const mypageSlice = createSlice({
  name: "mypage",
  initialState,
  reducers: {},
  extraReducers: {
    [__getMypage.fulfilled]: (state, action) => {
      state.myProfile = action.payload;
    },
    [__updateMypage.fulfilled]: (state, action) => {
      state.myProfile = action.payload;
    },
  },
});

export const {} = mypageSlice.actions;
export default mypageSlice.reducer;
