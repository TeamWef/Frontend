import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  addGroupApi,
  delGroupApi,
  getGroupApi,
  putGroupApi,
} from "./API/groupAPI";

const initialState = {
  group: [],
  isLoading: false,
  error: null,
};

export const __addGroup = createAsyncThunk(
  "post/addGroup",
  async (payload, thunkAPI) => {
    try {
      const res = await addGroupApi(payload);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
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
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __delGroup = createAsyncThunk(
  "delete/delGroup",
  async (payload, thunkAPI) => {
    console.log("async=>", payload);
    try {
      await delGroupApi(payload);
      console.log("???????=>", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log("error ::::::", err.response);
      return thunkAPI.rejectWithValue("<<", err);
    }
  }
);

export const __updateGroup = createAsyncThunk(
  "put/updateGroup",
  async (payload, thunkAPI) => {
    console.log("put payload=>", payload);
    try {
      await putGroupApi(payload);
      console.log("put payload2222=>", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log("error ::::::", err.response);
      return thunkAPI.rejectWithValue("<<", err);
    }
  }
);

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: {
    //create
    [__addGroup.pending]: (state) => {
      state.isLoading = true;
    },
    [__addGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.group.data?.push(action.payload);
    },
    [__addGroup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //불러오기
    [__getGroup.pending]: (state) => {
      state.isLoading = true;
    },
    [__getGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.group = action.payload;
    },
    [__getGroup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //삭제하기
    [__delGroup.pending]: (state) => {
      state.isLoading = true;
    },
    [__delGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.group.data = state.group.data.filter(
        (item) => item.partyId !== action.payload
      );
    },
    [__delGroup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //업데이트
    [__updateGroup.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.group?.data.push(action.payload?.editGroup);
    },
    [__updateGroup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
//
export const { group } = groupSlice.actions;
export default groupSlice.reducer;
