import axios from "axios";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "../redux/modules/customCookies";
import jwt_decode from "jwt-decode";

const token = getCookie("token");
const baseURL = process.env.REACT_APP_BASE_URL;
const instance = axios.create({ baseURL });

const errorHandler = (error) => {
  deleteCookie("token");
  deleteCookie("refreshToken");
  window.location.replace("/error");
};

const setToken = async (config) => {
  const accesstoken = getCookie("token");
  const expireTime = jwt_decode(accesstoken).exp;
  const date = new Date(expireTime * 1000);
  const now = new Date();
  const diffSec = date.getTime() - now.getTime();

  const refreshToken = getCookie("refresh-token");
  if (diffSec < 30000) {
    await axios
      .post(`${baseURL}/members/reissue`, {
        accessToken: accesstoken,
        refreshToken: refreshToken,
      })
      .then((res) => {
        // console.log(res);
        setCookie("token", res.headers.authorization);
        setCookie("refresh-token", res.headers["refresh-token"]);
      });
    config.headers["Authorization"] = getCookie("token");
    // console.log(config);
  } else {
    config.headers["Authorization"] = getCookie("token");
  }
  return config;
};

if (token) {
  instance.interceptors.request.use(setToken);
}

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.status === 404) {
      return window.location.replace("/notfound");
    }
    // if (error.status === 504) {
    //   return window.location.replace("/error");
    // }
    // if (error.status === 500) {
    //   return window.location.replace("/error");
    // }
    // if (error.status === 400) {
    //   return window.location.replace("/error");
    // }
    return console.log(error);
  }
);

export default instance;
