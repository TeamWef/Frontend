import instance from "../../../shared/axios";

export const groupApis = {
  getGroup: async () => {
    const res = await instance.get(`/party`);
    return res;
  },
  getMainGroupinfo: async () => {
    const res = await instance.get(`/`);
    return res;
  },
  addGroup: async (payload) => {
    const response = await instance.post(`/party`, payload);
    return response.data;
  },
  delGroup: async (id) => {
    await instance.delete(`/party/${id}`);
  },
  putGroup: async ({ id, partyName, partyIntroduction }) => {
    const group = { partyIntroduction, partyName };
    await instance.put(`/party/${id}`, group);
  },
};

export const addGroupApi = async (payload) => {
  const response = await instance.post(`/party`, payload);
  return response.data;
};

//그룹 불러오기
export const getGroupApi = async () => {
  const res = await instance.get(`/party`);
  return res;
};

//그룹 삭제하기
export const delGroupApi = async (id) => {
  await instance.delete(`/party/${id}`);
};

//그룹 수정하기
export const putGroupApi = async ({ id, partyName, partyIntroduction }) => {
  const group = { partyIntroduction, partyName };
  await instance.put(`/party/${id}`, group);
};
