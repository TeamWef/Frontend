import instance from "../../../shared/axios";
import axios from "axios";
import { ServerUrl } from "../../../server/index";
import { getCookie } from "../customCookies";

// export const ScheduleApis = {
//   getSchedule: async ({ partyId }) =>
//     await instance.get(`/${partyId}/schedules`),
//   getScheduleDetail: async (scheduleId) =>
//     await instance.get(`/schedules/${scheduleId}`),
//   postSchedulejoin: async (payload) =>
//     await instance.post(`/${payload}/participations`, payload),
//   addSchedule: async ({ schedule, partyId }) =>
//     await instance.post(`/${partyId}/schedules`, schedule),
//   delSchedule: async (scheduleId) =>
//     await instance.delete(`/schedules/${scheduleId}`),
//   putSchedule: async (payload) =>
//     await instance.put(`/schedules/${payload.detailId}`, payload.editSchedule),
//   getSchedulePopular: async (payload) =>
//     await instance.get(`/${payload}/schedules/popular`),
// };

//일정 만들기
export const addScheduleApi = async ({ schedule, partyId }) => {
  console.log("API===>", schedule);
  const res = await axios.post(`${ServerUrl}/${partyId}/schedules`, schedule, {
    headers: {
      Authorization: getCookie("token"),
    },
  });
  return res.data;
};

//그룹의 전체 일정 불러오기
export const getScheduleApi = async ({ partyId }) => {
  // console.log("API===>", { partyId });
  const response = await axios.get(`${ServerUrl}/${partyId}/schedules`, {
    headers: {
      Authorization: getCookie("token"),
      "Content-Type": "application/json",
    },
  });
  return response;
};

//그룹의 일정 상세 조회
export const getScheduleDetailApi = async (scheduleId) => {
  const response = await axios.get(`${ServerUrl}/schedules/${scheduleId}`, {
    headers: {
      Authorization: getCookie("token"),
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
      Authorization: getCookie("token"),
    },
  });
};

// 가입된 전체 그룹의 일정 조회
export const getGroupScheduleApi = async (payload) => {
  const res = await axios.get(`${ServerUrl}/schedules`, {
    headers: {
      Authorization: getCookie("token"),
    },
  });
  return res;
};

//수정

export const putScheduleEditApi = async (payload) => {
  // console.log("API====>", payload);
  console.log("API edit====>", payload.editSchedule);
  await axios.put(
    `${ServerUrl}/schedules/${payload.detailId}`,
    payload.editSchedule,
    {
      headers: {
        Authorization: getCookie("token"),
      },
    }
  );
};

// 일정 참여 api
export const postSchedulejoinApi = async ({ detailId, participant }) => {
  const res = await axios.post(
    `${ServerUrl}/${detailId}/participations`,
    detailId,
    {
      headers: {
        Authorization: getCookie("token"),
      },
    }
  );
  return res;
};

export const getSchedulePopularApi = async (payload) => {
  const res = await axios.get(`${ServerUrl}/${payload}/schedules/popular`, {
    headers: { Authorization: getCookie("token") },
  });
  return res;
};
