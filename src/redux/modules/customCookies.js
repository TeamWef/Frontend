import { Cookies } from "react-cookie";

// 쿠키는 refresh token 저장에만 사용하면 될까?
const cookie = new Cookies();

//쿠키 가져오기
export const getCookie = (name) => {
  return cookie.get(name);
};

// // 키값 기준으로 쿠키에 저장된 값 가져오기?
// const getCookie = (name) => {
//   let value = "; " + document.cookie;
//   // 키 값을 기준으로 파싱
//   let parts = value.split("; " + name + "=");
//   // value를 return!
//   if (parts.length === 2) {
//     return parts.pop().split(";").shift();
//   }
// };

// 쿠키 삭제
export const deleteCookie = (name) => {
  document.cookie = name + "=; expires = Thu, 01 Jan 1999 00:00:10 GMT;";
};

// 쿠키 설정
export const setCookie = (name, value) => {
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toGMTString()};path=/`;
};
