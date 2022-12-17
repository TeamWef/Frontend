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

// email 보내기
export const __sendEmail = createAsyncThunk(
  "users/sendEmail",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const { email, setIsChecked, setOpenNumInput } = payload;
      const data = await axios.post(`${ServerUrl}/members/send-email`, {
        email: email,
      });
      // console.log(data);
      if (data.status === 200) {
        alert(`${data.data}`);
        setIsChecked(true);
        setOpenNumInput(true);
      }
      return null;
    } catch (error) {
      // console.log(error);
      alert(`${error.response.data}`);
    }
  }
);

// 인증번호 체크
export const __checkNumber = createAsyncThunk(
  "users/check-code",
  async (payload, thunkAPI) => {
    try {
      const { email, emailNumber, setIsCertified, setOpenNumInput, setRepeat } =
        payload;
      const data = await axios.get(`${ServerUrl}/members/authenticate-email`, {
        params: { email: email, code: emailNumber },
      });
      // console.log(data);
      if (data.status === 200) {
        alert("인증이 완료되었습니다");
        setIsCertified(true);
        setOpenNumInput(false);
        setRepeat(false);
      }
      return null;
    } catch (error) {
      // console.log(error);
      alert("인증코드가 일치하지 않습니다.");
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
      alert(`오류가 발생했습니다`);
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
      setCookie("refresh-token", data.headers[`refresh-token`]);
      if (data.status === 200) {
        window.location.reload();
      }
      // console.log(data);
      return thunkAPI.fulfillWithValue(userInfo);
    } catch (error) {
      alert("이메일 혹은 비밀번호를 확인해주세요");
      return console.log(error);
    }
  }
);
//카카오로그인
export const kakaoLogin = createAsyncThunk(
  "users/kakaoLogin",
  async ({ code, navigate }, thunkAPI) => {
    try {
      const data = await axios.get(
        `${ServerUrl}/members/kakao/callback?code=${code}`
      );
      // console.log(data);
      setCookie("token", data.headers.authorization);
      setCookie("refresh-token", data.headers[`refresh-token`]);
      navigate("/");
      window.location.reload();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      // console.log(error);
      alert(`${error.response.data}`);
      navigate("/");
    }
  }
);

//구글로그인
export const googleLogin = createAsyncThunk(
  "users/googleLogin",
  async ({ code, navigate }, thunkAPI) => {
    try {
      const data = await axios.get(
        `${ServerUrl}/members/google/callback?code=${code}`
      );
      // console.log(data);
      setCookie("token", data.headers.authorization);
      setCookie("refresh-token", data.headers[`refresh-token`]);
      navigate("/");
      window.location.reload();
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      // console.log(error);
      alert(`${error.response.data}`);
      navigate("/");
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
    [__login.fulfilled]: (state, action) => {
      state.isLogin = true;
    },
  },
});

export const {} = membersSlice.actions;
export default membersSlice.reducer;
