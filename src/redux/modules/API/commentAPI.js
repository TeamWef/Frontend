import axios from "axios";
import { ServerUrl } from "../../../server";

// 코멘트 등록
export const addCommnetApi = async (payload) => {
  const data = await axios.post(
    `${ServerUrl}/${payload.id}/comments`,
    { content: payload.comment },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Refresh-Token": localStorage.getItem("refreshToken"),
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

// 코멘트 삭제
export const delCommentApi = async (payload) => {
  // payload : 코멘트 아이디!
  await axios.delete(`${ServerUrl}/comments/${payload}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Refresh-Token": localStorage.getItem("refreshToken"),
      "Content-Type": "application/json",
    },
  });
  return payload;
};

// 코멘트 수정
export const updateCommentApi = async (payload) => {
  const { id, content } = payload;
  const data = await axios.put(
    `${ServerUrl}/comments/${id}`,
    { content: content },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Refresh-Token": localStorage.getItem("refreshToken"),
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
