import instance from "../../../shared/axios";

export const noticeApis = {
  noticeList: async () => await instance.get("/notification"),
  noticeRead: async (payload) =>
    await instance.post(`/notification/${payload}`),
  noticeDeleteAll: async () => await instance.delete("/notification"),
  noticeDelete: async (payload) =>
    await instance.delete(`/notification/${payload}`),
};
