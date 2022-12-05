import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import GroupTitle from "../../../components/GroupTitle";
import {
  Button,
  Div,
  Flex,
  Img,
  Input,
  Margin,
  Span,
  Svg,
} from "../../../elem";
import { useInput, useInputs } from "../../../hooks/useInput";
import { __addAlbumItem } from "../../../redux/modules/albumSlice";
import LandingKakao from "./LandingKakao";

const AlbumCreate = ({ openCreateModal, partyId }) => {
  const dispatch = useDispatch();

  // 내용 State
  const [content, onChangeContent, contentReset, setContent] = useInput("");
  const [albumPlace, , placeReset, setAlbumPlace] = useInput("");
  const albumItem = {
    content: content,
    place: `${albumPlace.placeName}:${albumPlace.address}`,
  };
  // console.log(albumItem);
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
    const newAlbum = { ...albumItem, imageUrl: uploadImg };
    // console.log(newAlbum, partyId);
    if (!uploadImg) {
      alert("사진을 추가해주세요!");
      return null;
    } else if (!albumPlace) {
      alert("장소를 입력해주세요!");
      return null;
    } else if (!albumItem.content) {
      alert("내용을 입력해주세요!");
      return null;
    }
    dispatch(__addAlbumItem({ newAlbum, partyId }));
    setUploadImg("");
    openCreateModal();
    // setChange(!Change);
  };
  // console.log(albumPlace);
  return (
    <StContainer>
      <GroupTitle />
      <Flex fd="row" jc="space-between" width="1050px">
        <Span variant="bold">Album</Span>
        <Flex fd="row">
          <Button variant="small" onClick={uploadHandler}>
            게시하기
          </Button>
          <Button variant="border-small" onClick={openCreateModal}>
            취소
          </Button>
        </Flex>
      </Flex>
      <Margin mg="30px" />
      <Flex fd="row">
        {uploadImg ? (
          <Div variant="albumBox">
            <Img variant="album" src={previewImage} alt="img" />
          </Div>
        ) : (
          <Div variant="albumBox" bc="#fff" pd="25px">
            <StDashDiv
              onClick={() => {
                imgInput.current.click();
              }}
            >
              <input
                name="ImageUrl"
                style={{ display: "none" }}
                ref={imgInput}
                type="file"
                onChange={onChangeImg}
              />
              <Svg variant="photo"></Svg>
              <StSpan>이미지 가져오기</StSpan>
            </StDashDiv>
          </Div>
        )}

        <Div variant="albumBox" jc="flex-start" fd="column">
          <Flex fd="row" jc="center" ai="center">
            <Svg variant="location" />
            {albumPlace ? (
              <Div width="400px" height="40px" bc="#fff">
                <Span variant="smallBronze">
                  {albumPlace.placeName} : {albumPlace.address}
                </Span>
              </Div>
            ) : (
              <LandingKakao
                albumPlace={albumPlace}
                setAlbumPlace={setAlbumPlace}
              />
            )}
          </Flex>
          <Flex fd="row" jc="center">
            <Svg variant="memo" />
            <StText
              variant="medium"
              width="400px"
              placeholder="Contents"
              onChange={onChangeContent}
            />
          </Flex>
        </Div>
      </Flex>
    </StContainer>
  );
};

export default AlbumCreate;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  background-color: #f8f5f0;
  width: 100%;
`;

const StDashDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 2px dashed #d9d3c7;
  border-radius: 10px;
  background-size: cover;
  background-repeat: no-repeat;
`;

const StSpan = styled.span`
  margin-top: 10px;
  font-size: 16px;
  color: #d9d3c7;
`;

const StText = styled.textarea`
  background-color: #fff;
  width: 400px;
  border: 0;
  border-radius: 5px;
  min-height: 40px;
  max-height: 400px;
  font-size: 16px;
  resize: none;
  ::placeholder {
    font-size: 14px;
    opacity: 0.5;
  }
`;
