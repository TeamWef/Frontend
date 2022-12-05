import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatApis } from "./API/chatAPI";

const initialState = {
  chat: [],
  isLoading: false,
  error: null,
};

export const __getMessage = createAsyncThunk(
  "get/getMessage",
  async (payload, thunkAPI) => {
    try {
      const res = await chatApis.getMessage(payload);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: {
    [__getMessage.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMessage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
    },
    [__getMessage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
//
export const { chat } = chatSlice.actions;
export default chatSlice.reducer;
