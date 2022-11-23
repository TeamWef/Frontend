import instance from "../../../shared/axios";

export const commentApis = {
  addComment: async (payload) =>
    await instance.post(`/${payload.id}/comments`, {
      content: payload.comment,
    }),
  delComment: async (payload) => await instance.delete(`/comments/${payload}`),
  updateComment: async ({ id, content }) =>
    await instance.put(`/comments/${id}`, { content: content }),
};

// // 코멘트 등록
// export const addCommnetApi = async (payload) => {
//   const data = await instance.post(`/${payload.id}/comments`, {
//     content: payload.comment,
//   });
//   return data;
// };

// // 코멘트 삭제
// export const delCommentApi = async (payload) => {
//   // payload : 코멘트 아이디!
//   await instance.delete(`/comments/${payload}`);
//   return payload;
// };

// // 코멘트 수정
// export const updateCommentApi = async (payload) => {
//   const { id, content } = payload;
//   const data = await instance.put(`/comments/${id}`, { content: content });
//   return data;
// };
