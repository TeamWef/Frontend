import axios from "axios";
import { ServerUrl } from "../../../server";

// 마이페이지 불러오기
export const getMypageApi = async (payload) => {
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

// 마이페이지 수정
export const updateMypageApi = async ({ commentId, content }) => {
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
