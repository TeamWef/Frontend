import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServerUrl } from "../../server";

// InitialState
const initialState = {
  users: [],
  isLogin: false,
  error: null,
};

// email 중복확인
export const __emailCheck = createAsyncThunk(
  "users/idcheck",
  async (email, thunkAPI) => {
    try {
      const data = await axios.get(`${ServerUrl}/members/check-email`, {
        email: email,
      });
      if (data.data.success === true) {
        alert("사용 가능한 Email입니다.");
      } else if (data.data.success === false) {
        alert("사용 중인 Email입니다.");
      }
      return console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }
);

// 회원가입
export const __signup = createAsyncThunk(
  "users/signup",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`${ServerUrl}/members/signup`, {
        email: payload.email,
        name: payload.name,
        password: payload.password,
      });
      if (data.data.success === true) {
        alert("회원가입을 축하드립니다.");
      }
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
    }
  }
);

// 로그인
export const __signin = createAsyncThunk(
  "users/signin",
  async (userInfo, thunkAPI) => {
    try {
      const data = await axios.post(`${ServerUrl}/members/signin`, userInfo);
      localStorage.setItem("token", data.headers.authorization);
      // setCookie("refreshToken", data.headers[`refresh-token`]);
      if (data.data.success === true) {
        alert(`환영합니다!`);
        // window.location.reload();
      }
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      alert("이메일 혹은 비밀번호를 확인해주세요");
      return console.log(error);
    }
  }
);

export const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: {
    [__signup.fulfilled]: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const {} = membersSlice.actions;
export default membersSlice.reducer;
