import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inviteApis } from "./API/inviteAPI";

const initialState = {
  invite: [],
  isLoading: false,
  error: null,
};

export const __getInviteCode = createAsyncThunk(
  "get/getInvite",
  async (payload, thunkAPI) => {
    try {
      const res = await inviteApis.getInviteCode();
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __postInvite = createAsyncThunk(
  "post/addInvite",
  async (payload, thunkAPI) => {
    try {
      const res = await inviteApis.addInvite(payload);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const inviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {},
  extraReducers: {
    [__getInviteCode.pending]: (state) => {
      state.isLoading = true;
    },
    [__getInviteCode.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.invite = action.payload;
    },
    [__getInviteCode.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__postInvite.pending]: (state) => {
      state.isLoading = true;
    },
    [__postInvite.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("action??", action);
      state.group.push(action.payload);
    },
    [__postInvite.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
//
export const { invite } = inviteSlice.actions;
export default inviteSlice.reducer;
