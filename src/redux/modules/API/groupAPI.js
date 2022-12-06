import instance from "../../../shared/axios";

export const groupApis = {
  getGroup: async () => await instance.get(`/party`),
  addGroup: async (payload) => await instance.post(`/party`, payload),
  delGroup: async (id) => await instance.delete(`/party/${id}`),
  putGroup: async ({ id, partyName, partyIntroduction }) =>
    await instance.put(`/party/${id}`, { partyIntroduction, partyName }),
  getOutGroup: async (payload) =>
    await instance.delete(`party/${payload}/withdrawals`),
};
