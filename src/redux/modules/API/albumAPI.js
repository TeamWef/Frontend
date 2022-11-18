import axios from "axios";
import { ServerUrl } from "../../../server";
import { getCookie } from "../customCookies";

// 앨범 목록 불러오기
export const getAlbumListApi = async (payload) => {
  //payload : 그룹 아이디
  const data = await axios.get(`${ServerUrl}/${payload}/album`, {
    headers: {
      Authorization: getCookie("token"),
      "Refresh-Token": getCookie("refreshToken"),
      "Content-Type": "application/json",
    },
  });
  return data.data;
};

// 앨범 상세보기
export const getAlbumDetailApi = async (payload) => {
  //payload : 앨범 아이디
  const data = await axios.get(`${ServerUrl}/album/${payload}`, {
    headers: {
      Authorization: getCookie("token"),
      "Refresh-Token": getCookie("refreshToken"),
      "Content-Type": "application/json",
    },
  });
  return data.data;
};

// 앨범 등록
export const addAlbumApi = async ({ newAlbum, partyId }) => {
  // console.log(newAlbum, partyId);
  // 폼데이터
  const form = new FormData();
  form.append("content", newAlbum.content);
  form.append("place", newAlbum.place);
  form.append("imageUrl", newAlbum.imageUrl);

  const data = await axios.post(`${ServerUrl}/${partyId}/album`, form, {
    headers: {
      Authorization: getCookie("token"),
      "Refresh-Token": getCookie("refreshToken"),
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

// 앨범 삭제
export const delAlbumApi = async (payload) => {
  await axios.delete(`${ServerUrl}/album/${payload}`, {
    headers: {
      Authorization: getCookie("token"),
      "Refresh-Token": getCookie("refreshToken"),
      "Content-Type": "application/json",
    },
  });
  return payload;
};

// 앨범 수정
export const updateAlbumApi = async (payload) => {
  const data = await axios.patch(
    `${ServerUrl}/album/${payload.id}`,
    { content: payload.contentInput },
    {
      headers: {
        Authorization: getCookie("token"),
        "Refresh-Token": getCookie("refreshToken"),
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
