import instance from "../../../shared/axios";

export const albumApis = {
  getAlbumList: async (payload) => await instance.get(`/${payload}/album`),
  getAlbumDetail: async (payload) => await instance.get(`/album/${payload}`),
  delAlbum: async (payload) => await instance.delete(`/album/${payload}`),
  updateAlbum: async (payload) =>
    await instance.patch(`/album/${payload.id}`, {
      content: payload.editContent,
    }),
};

// 앨범 등록 (Apis에 넣으면 imgUrl이 파일로 잡히는 현상있음)
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
