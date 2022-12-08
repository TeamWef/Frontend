import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __updateMypage } from "../../../redux/modules/mypageSlice";
import { Div, Span, Flex, Button, Margin, Svg, Input } from "../../../elem";
import { useInput } from "../../../hooks/useInput";
import { useModal } from "../../../hooks/useModal";
import { checkName } from "../../home/component/check";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../../redux/modules/customCookies";

const EditMypage = ({ myProfile, modal, openModal, setModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memberName, profileImageUrl } = myProfile;

  // 이미지 State
  const [uploadImg, setUploadImg] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [username, onchangeName] = useInput(memberName);
  const [editMode, setEditMode] = useModal();

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
    if (!uploadImg && memberName === username) {
      return alert("수정할 내용이 없습니다!");
    }
    if (checkName(username) === "Name") {
      return alert("이름 형식이 올바르지 않습니다.");
    }
    const myInfo = {
      memberName: username,
      uploadImg: uploadImg,
      profile: profileImageUrl,
    };
    dispatch(__updateMypage(myInfo));
    setUploadImg("");
    openModal();
  };
  const logoutHandler = () => {
    deleteCookie("token");
    deleteCookie("refresh-token");
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    if (modal) document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  return (
    <div ref={ref}>
      <Div variant="headerModal" width="290px" pd="20px 0">
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
          <Margin mg="10px" />
          {editMode ? (
            <>
              <Flex fd="row" ai="center">
                <Input
                  variant="medium"
                  type="text"
                  width="200px"
                  maxLength="4"
                  value={username}
                  onChange={onchangeName}
                />
                <Margin mg="3px" />
                <Svg variant="edit" onClick={setEditMode} />
              </Flex>
              <Span variant="other">2~4자리 한글만 입력 가능합니다.</Span>
            </>
          ) : (
            <StNameDiv>
              <Span variant="smallBronze" width="200px">
                {username}
              </Span>
              <Svg variant="edit" onClick={setEditMode} />
            </StNameDiv>
          )}
          <Margin mg="10px" />
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
          <Button
            variant="border-medium"
            onClick={() => {
              if (window.confirm("정말 로그아웃 하시겠습니까?")) {
                logoutHandler();
              }
            }}
          >
            Logout
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

const StNameDiv = styled.div`
  display: flex;
  padding: 0 10px;
  width: 100%;
  height: 38px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #a4a19d;
`;
