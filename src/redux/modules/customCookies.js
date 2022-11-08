import { Cookies } from "react-cookie";

// 쿠키는 refresh token 저장에만 사용하면 될까?
const cookie = new Cookies();

//쿠키 가져오기
export const getCookie = (name) => {
  return cookie.get(name);
};
// 쿠키 삭제
export const deleteCookie = (name) => {
  document.cookie = name + "=; expires = Thu, 01 Jan 1999 00:00:10 GMT;";
};

export const setCookie = (name, value) => {
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toGMTString();

  document.cookie = name + "=" + value + expires + "; path=/";
};
