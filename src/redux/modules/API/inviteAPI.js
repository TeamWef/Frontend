import instance from "../../../shared/axios";

export const inviteApis = {
  getInviteCode: async (payload) =>
    await instance.get(`/party/${payload}/invitations`),
  addInvite: async (payload) =>
    await instance.post(`/party/invitations`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
};
