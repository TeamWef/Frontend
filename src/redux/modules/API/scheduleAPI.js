import axios from "axios";
import { ServerUrl } from "../../../server/index";

//일정 만들기
export const addScheduleApi = async ({ schedule, partyId }) => {
  console.log("API===>", { schedule });
  const res = await axios.post(`${ServerUrl}/${partyId}/schedules`, schedule, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return res;
};

//그룹의 전체 일정 불러오기
export const getScheduleApi = async ({ partyId }) => {
  // console.log("API===>", { partyId });
  const response = await axios.get(`${ServerUrl}/${partyId}/schedules`, {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  return response;
};

//그룹의 일정 상세 조회
export const getScheduleDetailApi = async (scheduleId) => {
  const response = await axios.get(`${ServerUrl}/schedules/${scheduleId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  return response;
};

//삭제

export const delScheduleApi = async (scheduleId) => {
  // console.log("API", scheduleId);
  await axios.delete(`${ServerUrl}/schedules/${scheduleId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

// 가입된 전체 그룹의 일정 조회
export const getGroupScheduleApi = async (payload) => {
  const res = await axios.get(`${ServerUrl}/schedules`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return res;
};

//수정

export const putScheduleEditApi = async ({ detailId, editSchedules }) => {
  console.log(":::::", detailId);
  console.log("!!!!", editSchedules);
  await axios.put(`${ServerUrl}/schedules/${detailId}`, editSchedules, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
