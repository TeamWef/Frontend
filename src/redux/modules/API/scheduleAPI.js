import axios from "axios";
import { ServerUrl } from "../../../server/index";

//일정 만들기
export const addScheduleApi = async (id, payload) => {
  //   console.log("payload =>", payload);
  await axios.post(`${ServerUrl}/${id}/schedules`, payload, {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
};

//일정 불러오기
export const getScheduleApi = async (payload) => {
  await axios.get(`${ServerUrl}/schedules`, {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
};
