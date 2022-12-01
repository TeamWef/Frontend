import instance from "../../../shared/axios";

export const noticeApis = {
  noticeList: async () => await instance.get("/notifications"),
  readNotice: async (payload) =>
    await instance.put(`/notifications/${payload}`),
  deleteNoticeAll: async () => await instance.delete("/notifications"),
  deleteNotice: async (payload) =>
    await instance.delete(`/notifications/${payload}`),
};
