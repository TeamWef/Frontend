import axios from "axios";
import { ServerUrl } from "../../../server";

export const addGroupApi = async (payload) => {
  const response = await axios.post(`${ServerUrl}/party`, payload, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return response;
};

//그룹 불러오기
export const getGroupApi = async () => {
  const res = await axios.get(`${ServerUrl}/party`, {
    headers: {
      Authorization: localStorage.getItem("token"),
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
      Authorization: localStorage.getItem("token"),
    },
  });
};

//그룹 수정하기
export const putGroupApi = async ({ id, editGroup }) => {
  console.log(":::::", { id, editGroup });
  await axios.put(`${ServerUrl}/party/${id}`, editGroup, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

// { id, editGroup }
