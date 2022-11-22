import instance from "../../../shared/axios";

// 추후 정리
// export const albumApis = {

// }

// 앨범 목록 불러오기
export const getAlbumListApi = async (payload) => {
  const data = await instance.get(`/${payload}/album`);
  return data.data;
};

// 앨범 상세보기
export const getAlbumDetailApi = async (payload) => {
  const data = await instance.get(`/album/${payload}`);
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

  const data = await instance.post(`/${partyId}/album`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

// 앨범 삭제
export const delAlbumApi = async (payload) => {
  await instance.delete(`/album/${payload}`);
};

// 앨범 수정
export const updateAlbumApi = async (payload) => {
  const data = await instance.patch(`/album/${payload.id}`, {
    content: payload.contentInput,
  });
  return data;
};
