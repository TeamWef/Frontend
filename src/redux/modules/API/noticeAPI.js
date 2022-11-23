import instance from "../../../shared/axios";

export const noticeApis = {
  noticeList: async () => {
    const data = await instance.get("/notification");
    console.log("noticeAPI", data);
  },
  noticeReadAll: async () => await instance.post("/notification"),
  noticeRead: async (payload) =>
    await instance.post(`/notification/${payload}`),
  noticeDeleteAll: async () => await instance.delete("/notification"),
  noticeDelete: async (payload) =>
    await instance.delete(`/notification/${payload}`),
};
