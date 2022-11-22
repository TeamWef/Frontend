import axios from "axios";
import { ServerUrl } from "../../../server";
import { getCookie } from "../customCookies";

export const addGroupApi = async (payload) => {
  console.log("api payload!!!", payload);
  const response = await axios.post(`${ServerUrl}/party`, payload, {
    headers: {
      Authorization: getCookie("token"),
    },
  });
  console.log("res==>", response);
  return response.data;
};

//그룹 불러오기
export const getGroupApi = async () => {
  const res = await axios.get(`${ServerUrl}/party`, {
    headers: {
      Authorization: getCookie("token"),
      "Content-Type": "application/json",
    },
  });
  return res;
};

//그룹 삭제하기
export const delGroupApi = async (id) => {
  console.log("API", id);
  await axios.delete(`${ServerUrl}/party/${id}`, {
    headers: {
      Authorization: getCookie("token"),
    },
  });
};

//그룹 수정하기
export const putGroupApi = async ({ id, partyName, partyIntroduction }) => {
  const group = { partyIntroduction, partyName };
  console.log("dd", group);
  await axios.put(`${ServerUrl}/party/${id}`, group, {
    headers: {
      Authorization: getCookie("token"),
    },
  });
};

// { id, editGroup }
