import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAlbumApi,
  delAlbumApi,
  getAlbumDetailApi,
  getAlbumListApi,
  updateAlbumApi,
} from "./API/albumAPI";

const initialState = {
  album: [],
  albumItem: [],
};

export const __getAlbumList = createAsyncThunk(
  "get/getAlbumList",
  async (payload, thunkAPI) => {
    try {
      const data = await getAlbumListApi(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __getAlbumItem = createAsyncThunk(
  "get/getAlbumItem",
  async (payload, thunkAPI) => {
    try {
      const data = await getAlbumDetailApi(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __addAlbumItem = createAsyncThunk(
  "post/addAlbumItem",
  async (payload, thunkAPI) => {
    try {
      const data = await addAlbumApi(payload);
      console.log(data);
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
      if (data.status === 200) {
        alert(`${data.data}`);
      }
      console.log(payload);
      return thunkAPI.fulfillWithValue(payload);
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
      state.album = action.payload;
    },
    [__getAlbumItem.fulfilled]: (state, action) => {
      state.albumItem = action.payload;
    },
    // Add
    [__addAlbumItem.fulfilled]: (state, action) => {
      state.album.unshift(action.payload);
    },
    // Delete
    [__delAlbumItem.fulfilled]: (state, action) => {
      state.album = state.album.filter(
        (albumItem) => albumItem.id !== action.payload
      );
    },
    // Update
    [__updateAlbumItem.fulfilled]: (state, action) => {
      const editContent = action.payload.contentInput;
      state.albumItem = { ...state.albumItem, content: editContent };
      state.album = state.album.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, content: editContent };
        }
      });
    },
  },
});
//
export const { schedule } = albumSlice.actions;
export default albumSlice.reducer;
