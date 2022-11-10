import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAlbumApi,
  delAlbumApi,
  getAlbumListApi,
  updateAlbumApi,
} from "./API/albumAPI";

const initialState = {
  album: [],
};

export const __getAlbumList = createAsyncThunk(
  "get/getAlbumList",
  async (payload, thunkAPI) => {
    try {
      const data = await getAlbumListApi(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __addAlbumItem = createAsyncThunk(
  "post/addAlbumItem",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await addAlbumApi(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __delAlbumItem = createAsyncThunk(
  "delete/delAlbumItem",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      await delAlbumApi(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __updateAlbumItem = createAsyncThunk(
  "patch/updateAlbumItem",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await updateAlbumApi(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {},
  extraReducers: {
    // Get
    [__getAlbumList.fulfilled]: (state, action) => {
      state.schedule = action.payload;
    },
    // Add
    [__addAlbumItem.fulfilled]: (state, action) => {
      state.album.push(action.payload);
    },
    // Delete
    [__delAlbumItem.fulfilled]: (state, action) => {
      state.album = state.album.filter(
        (albumItem) => albumItem.id !== action.payload
      );
    },
    // Update
    [__updateAlbumItem.fulfilled]: (state, action) => {
      const target = state.album.findIndex(
        (albumItem) => albumItem.id === action.payload.id
      );
      state.album.splice(target, 1, action.payload);
    },
  },
});
//
export const { schedule } = albumSlice.actions;
export default albumSlice.reducer;
