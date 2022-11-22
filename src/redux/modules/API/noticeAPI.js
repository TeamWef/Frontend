import instance from "../../../shared/axios";

export const noticeApis = {
  noticeList: async () => await instance.get("/notice"),
  noticeCnt: async () => await instance.get("/notice/count"),
  noticeDelete: async (notificationId) =>
    await instance.delete(`notice/delete/${notificationId}`),
  noticeDeleteAll: async () => await instance.delete("notice/delete"),
};
