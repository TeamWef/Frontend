import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServerUrl } from "../../server";
import { setCookie, setRFCookie } from "./customCookies";

// InitialState
const initialState = {
  users: [],
  isLogin: false,
  error: null,
};

// email 중복확인
export const __emailCheck = createAsyncThunk(
  "users/idcheck",
  async (payload, thunkAPI) => {
    try {
      const email = payload;
      const data = await axios.get(`${ServerUrl}/members/check-email`, {
        params: { email },
      });
      if (data.status === 200) {
        alert(`${data.data}`);
      }
      return console.log(data);
    } catch (error) {
      console.log(error);
      alert(`${error.response.data}`);
    }
  }
);

// 회원가입
export const __signup = createAsyncThunk(
  "users/signup",
  async (payload, thunkAPI) => {
    // console.log(payload);
    try {
      const data = await axios.post(`${ServerUrl}/members/signup`, payload);
      if (data.status === 200) {
        alert(`${data.data}`);
      }
      // console.log(data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
    }
  }
);

// 로그인
export const __login = createAsyncThunk(
  "users/login",
  async (userInfo, thunkAPI) => {
    try {
      const data = await axios.post(`${ServerUrl}/members/login`, userInfo);
      setCookie("token", data.headers.authorization);
      setRFCookie("refresh-token", data.headers[`refresh-token`]);
      if (data.status === 200) {
        alert(`${data.data}`);
        window.location.reload();
      }
      console.log(data);
      return thunkAPI.fulfillWithValue(userInfo);
    } catch (error) {
      alert("이메일 혹은 비밀번호를 확인해주세요");
      return console.log(error);
    }
  }
);

export const kakaoLogin = createAsyncThunk(
  "users/kakaoLogin",
  async ({ code, navigate }, thunkAPI) => {
    const data = await axios.get(
      `${ServerUrl}/members/kakao/callback?code=${code}`
    );
    setCookie("token", data.headers.authorization);
    setRFCookie("refresh-token", data.headers[`refresh-token`]);
    navigate("/");
    return thunkAPI.fulfillWithValue(data);
  }
);
//  ).then((res) => {
//     console.log(res);
//   });
// };

export const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: {
    [__signup.fulfilled]: (state, action) => {
      state.users.push(action.payload);
    },
    [__login.fulfilled]: (state, action) => {
      state.isLogin = true;
    },
  },
});

export const {} = membersSlice.actions;
export default membersSlice.reducer;
