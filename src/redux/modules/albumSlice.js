import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAlbumApi,
  delAlbumApi,
  getAlbumDetailApi,
  getAlbumListApi,
  updateAlbumApi,
} from "./API/albumAPI";
import {
  addCommnetApi,
  delCommentApi,
  updateCommentApi,
} from "./API/commentAPI";

const initialState = {
  album: [],
  albumItem: [],
  commentList: [],
};

// 앨범
export const __getAlbumList = createAsyncThunk(
  "get/getAlbumList",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
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
      // console.log(data);
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
      // console.log(data);
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
    try {
      const data = await updateAlbumApi(payload);
      if (data.status === 200) {
        alert(`${data.data}`);
      }
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return console.log(err);
    }
  }
);

// 댓글

export const __addComment = createAsyncThunk(
  "post/addCommnet",
  async ({ id, comment }, thunkAPI) => {
    try {
      // console.log(id, comment);
      const data = await addCommnetApi({ id, comment });
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __delComment = createAsyncThunk(
  "delete/delComment",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      await delCommentApi(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return console.log(err);
    }
  }
);

export const __updateComment = createAsyncThunk(
  "patch/updateComment",
  async (payload, thunkAPI) => {
    try {
      const data = await updateCommentApi(payload);
      if (data.status === 200) {
        alert(`${data.data}`);
      }
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
    /// Album
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
        return item;
      });
    },
    // Comments
    //Add
    [__addComment.fulfilled]: (state, action) => {
      state.commentList.push(action.payload);
    },
    //Delete
    [__delComment.fulfilled]: (state, action) => {
      state.commentList = state.commentList.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});
//
export const { schedule } = albumSlice.actions;
export default albumSlice.reducer;
