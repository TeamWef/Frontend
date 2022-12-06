import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __updateMypage } from "../../../redux/modules/mypageSlice";
import { useModal } from "../../../hooks/useModal";
import { Div, Span, Flex, Button, Margin, Svg } from "../../../elem";

const EditMypage = ({ myProfile, modal, openModal, setModal }) => {
  const dispatch = useDispatch();
  const { memberName, profileImageUrl } = myProfile;

  // 이미지 State
  const [uploadImg, setUploadImg] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const imgInput = useRef();
  const ref = useRef(null);

  const clickOutSide = (e) => {
    if (modal && !ref.current.contains(e.target)) {
      setModal(false);
    }
  };

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
      return alert("수정할 내용이 없습니다🫣");
    }
    dispatch(__updateMypage(uploadImg));
    setUploadImg("");
  };

  useEffect(() => {
    if (modal) document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  return (
    <div ref={ref}>
      <Div variant="headerModal" width="290px" height="320px">
        <Flex>
          <Flex fd="row" jc="space-between">
            <Span variant="bigBronze">Profile</Span>
            <Svg
              variant="close"
              onClick={() => {
                openModal();
                setUploadImg("");
              }}
            />
          </Flex>
          {profileImageUrl === null && uploadImg === null ? (
            <Div
              variant="null"
              width="224px"
              height="144px"
              onClick={() => {
                imgInput.current.click();
              }}
            >
              <StUserImg src="/images/userProfile.jpg" />
            </Div>
          ) : (
            <StDiv
              onClick={() => {
                imgInput.current.click();
              }}
            >
              {uploadImg ? (
                <StImg src={previewImage} alt="preview" />
              ) : (
                <StImg src={profileImageUrl} alt="img" />
              )}
            </StDiv>
          )}
          <Margin mg="15px" />
          <input
            name="ImageUrl"
            style={{ display: "none" }}
            ref={imgInput}
            type="file"
            onChange={onChangeImg}
          />
          <Button variant="medium" onClick={uploadHandler}>
            Apply
          </Button>
        </Flex>
      </Div>
    </div>
  );
};

export default EditMypage;

const StDiv = styled.div`
  display: flex;
  margin: 0 auto;
  width: 144px;
  height: 144px;
  border-radius: 50%;
  overflow: hidden;
`;

const StImg = styled.img`
  width: 144px;
  height: 144px;
  overflow: hidden;
  object-fit: cover;
  cursor: pointer;
`;

const StUserImg = styled.img`
  display: flex;
  width: 50px;
  height: 50px;
`;
