import instance from "../../../shared/axios";

export const chatApis = {
  getMessage: async (payload) => await instance.get(`/chatrooms/${payload}`),
};
