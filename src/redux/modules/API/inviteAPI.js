import instance from "../../../shared/axios";

export const inviteApis = {
  getInviteCode: async () => await instance.get(`/party/invitations`),
  addInvite: async (payload) =>
    await instance.post(`/party/invitations`, payload),
};
