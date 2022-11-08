import axios from "axios";
import { ServerUrl } from "../../../server";

export const addGroupApi = async (payload) => {
  await axios.post(`${ServerUrl}/party`, payload, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      "Refresh-Token": localStorage.getItem("refreshToken"),
      "Content-Type": "application/json",
    },
  });
};

//일정 불러오기
export const getGroupApi = async (payload) => {
  await axios.get(`${ServerUrl}/party`, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      "Refresh-Token": localStorage.getItem("refreshToken"),
      "Content-Type": "application/json",
    },
  });
};
