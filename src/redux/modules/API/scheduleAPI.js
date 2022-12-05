import instance from "../../../shared/axios";

export const scheduleApis = {
  getSchedule: async ({ partyId }) =>
    await instance.get(`/${partyId}/schedules`),
  getScheduleDetail: async (scheduleId) =>
    await instance.get(`/schedules/${scheduleId}`),
  postSchedulejoin: async ({ detailId, participant }) =>
    await instance.post(`/${detailId}/participations`, detailId),
  addSchedule: async ({ schedule, partyId }) =>
    await instance.post(`/${partyId}/schedules`, schedule),
  delSchedule: async (scheduleId) =>
    await instance.delete(`/schedules/${scheduleId}`),
  putSchedule: async (payload) =>
    await instance.put(`/schedules/${payload.detailId}`, payload.editSchedule),
  getSchedulePopular: async (payload) =>
    await instance.get(`/party/${payload}/partyPage`),
  getGroupSchedule: async (payload) => await instance.get(`/schedules`),
};
