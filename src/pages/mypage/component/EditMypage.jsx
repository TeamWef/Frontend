import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __updateMypage } from "../../../redux/modules/mypageSlice";
import { useModal } from "../../../hooks/useModal";

const EditMypage = ({ myProfile, openModal }) => {
  const dispatch = useDispatch();

  const { memberName, profileImageUrl } = myProfile;

  const [edit, openEdit] = useModal();
  // 이미지 State
  const [uploadImg, setUploadImg] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const imgInput = useRef();

  const onChangeImg = (e) => {
    setUploadImg(e.target.files[0]);
    // 미리보기
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = () => {
      if (reader.result) {
        setPreviewImage(reader.result);
      }
    };
  };
  const uploadHandler = () => {
    if (!uploadImg) {
      return alert("수정할 내용이 없습니다");
    }
    dispatch(__updateMypage(uploadImg));
    setUploadImg("");
    openEdit();
  };

  return (
    <StDiv>
      {uploadImg ? (
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundImage: `url(${previewImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          이미지 미리보기
        </div>
      ) : (
        <img
          src={profileImageUrl}
          alt="profileImg"
          style={{
            width: "100px",
            height: "100px",
          }}
        />
      )}
      {edit ? (
        <>
          <input
            name="ImageUrl"
            style={{ display: "none" }}
            ref={imgInput}
            type="file"
            onChange={onChangeImg}
          />
          <button
            onClick={() => {
              imgInput.current.click();
            }}
          >
            사진 등록
          </button>
          <button onClick={uploadHandler}>수정 완료</button>
          <button
            onClick={() => {
              openEdit();
              setUploadImg("");
            }}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <button onClick={openEdit}>수정하기</button>
          <button onClick={openModal}>닫기</button>
        </>
      )}
      <p>{memberName}</p>
    </StDiv>
  );
};

export default EditMypage;

const StDiv = styled.div`
  margin: 10px;
  border: solid 1px;
`;
