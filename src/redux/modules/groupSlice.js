import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { groupApis } from "./API/groupAPI";
import { inviteApis } from "./API/inviteAPI";

const initialState = {
  group: [],
  isLoading: false,
  error: null,
};

export const __addGroup = createAsyncThunk(
  "post/addGroup",
  async (payload, thunkAPI) => {
    try {
      const res = await groupApis.addGroup(payload);
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
      const res = await groupApis.getGroup();
      return thunkAPI.fulfillWithValue(res?.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __delGroup = createAsyncThunk(
  "delete/delGroup",
  async (payload, thunkAPI) => {
    try {
      await groupApis.delGroup(payload);
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
    try {
      await groupApis.putGroup(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log("error ::::::", err.response);
      return thunkAPI.rejectWithValue("<<", err);
    }
  }
);

export const __getOutGroup = createAsyncThunk(
  "del/getOutGroup",
  async (payload, thunkAPI) => {
    try {
      await groupApis.getOutGroup(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log("error : ", err.response);
      return thunkAPI.rejectWithValue("<<", err);
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
      state.group.push(action.payload);
    },
    [__addGroup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__postInvite.pending]: (state) => {
      state.isLoading = true;
    },
    [__postInvite.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.group.push(action.payload);
    },
    [__postInvite.rejected]: (state, action) => {
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
      state.group = state.group.filter(
        (item) => item.partyId !== action.payload
      );
    },
    [__delGroup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getOutGroup.pending]: (state) => {
      state.isLoading = true;
    },
    [__getOutGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.group = state.group.filter(
        (item) => item.partyId !== action.payload
      );
    },
    [__getOutGroup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //업데이트
    [__updateGroup.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.group = state.group.map((item) => {
        if (item.partyId === action.payload.id) {
          return {
            ...item,
            partyName: action.payload.partyName,
            partyIntroduction: action.payload.partyIntroduction,
          };
        }
        return item;
      });
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
