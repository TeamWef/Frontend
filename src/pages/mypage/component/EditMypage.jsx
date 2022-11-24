import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __updateMypage } from "../../../redux/modules/mypageSlice";
import { useModal } from "../../../hooks/useModal";
import { Div, Span, Flex, Button, Margin, Svg } from "../../../elem";

const EditMypage = ({ myProfile, openModal }) => {
  const dispatch = useDispatch();
  const { memberName, profileImageUrl } = myProfile;

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
  };

  return (
    <Div variant="profileEdit">
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
        <Margin mg="15px" />
        {profileImageUrl === null && uploadImg === null ? (
          <UploadForm
            onClick={() => {
              imgInput.current.click();
            }}
          >
            <ErrorImg src="/images/imgError.jpg" />
          </UploadForm>
        ) : (
          <StDiv
            onClick={() => {
              imgInput.current.click();
            }}
          >
            {uploadImg ? (
              <StImg src={previewImage} alt="preview" />
            ) : (
              <StImg src={profileImageUrl} alt="p" />
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

const UploadForm = styled.div`
  display: flex;
  width: 224px;
  height: 144px;
  margin: 0 auto;
  border: 2px dashed #d9d3c7;
  border-radius: 5px;
  position: relative;
`;

const ErrorImg = styled.img`
  width: 38px;
  height: 38px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
