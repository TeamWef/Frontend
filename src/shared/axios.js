import axios from "axios";
import { getCookie, setCookie } from "../redux/modules/customCookies";
import jwt_decode from "jwt-decode";

const token = getCookie("token");
const baseURL = process.env.REACT_APP_BASE_URL;
const instance = axios.create({ baseURL });

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
        console.log(res);
        setCookie("token", res.headers.authorization);
        setCookie("refresh-token", res.headers["refresh-token"]);
      });
    config.headers["Authorization"] = getCookie("token");
    console.log(config);
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
    console.log(error);
  }
);

export default instance;
