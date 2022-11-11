import axios from "axios";
import { ServerUrl } from "../../../server/index";

//일정 만들기
export const addScheduleApi = async ({ schedule, partyId }) => {
  console.log("API payload =>", schedule);
  console.log("API payload =>", partyId);
  const res = await axios.post(`${ServerUrl}/${partyId}/schedules`, schedule, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return res.data;
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
