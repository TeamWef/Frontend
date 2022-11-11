import axios from "axios";
import { ServerUrl } from "../../../server/index";

//일정 만들기
export const addScheduleApi = async (payload) => {
  console.log("payload =>", payload);
  await axios.post(`${ServerUrl}/${payload.id}/schedules`, payload, {
    headers: {
      Authorization: localStorage.getItem("token"),
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
