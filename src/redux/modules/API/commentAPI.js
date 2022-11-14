import axios from "axios";
import { ServerUrl } from "../../../server";

// 코멘트 등록
export const addCommnetApi = async (payload) => {
  console.log(payload);
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
  return data.data;
};

// 코멘트 삭제
export const delCommentApi = async (payload) => {
  // payload : 코멘트 아이디
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
export const updateCommentApi = async ({ commentId, content }) => {
  const data = await axios.patch(
    `${ServerUrl}/comments/${commentId}`,
    content,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Refresh-Token": localStorage.getItem("refreshToken"),
        "Content-Type": "application/json",
      },
    }
  );
  return data.data;
};
