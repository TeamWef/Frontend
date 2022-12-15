import instance from "../../../shared/axios";

// 마이페이지 불러오기
export const getMypageApi = async () => {
  const data = await instance.get(`/members/mypage`);
  return data.data;
};

// 마이페이지 수정
export const updateMypageApi = async (payload) => {
  // 폼데이터
  const { memberName, uploadImg } = payload;
  // console.log(payload);
  const form = new FormData();
  if (uploadImg !== null) {
    form.append("profileImage", uploadImg);
  }
  form.append("memberName", memberName);
  // console.log(payload);
  const data = await instance.patch(`/members/mypage`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
