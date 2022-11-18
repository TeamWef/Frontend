import axios from "axios";
import { ServerUrl } from "../../../server";
import { getCookie } from "../customCookies";

// 마이페이지 불러오기
export const getMypageApi = async () => {
  const data = await axios.get(`${ServerUrl}/members/mypage`, {
    headers: {
      Authorization: getCookie("token"),
      "Refresh-Token": getCookie("refreshToken"),
      "Content-Type": "application/json",
    },
  });
  return data.data;
};

// 마이페이지 수정
export const updateMypageApi = async (payload) => {
  // 폼데이터
  const form = new FormData();
  form.append("profileImageUrl", payload);

  console.log(payload);
  const data = await axios.patch(`${ServerUrl}/members/mypage`, form, {
    headers: {
      Authorization: getCookie("token"),
      "Refresh-Token": getCookie("refreshToken"),
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
