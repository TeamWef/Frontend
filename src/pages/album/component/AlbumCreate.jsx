import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import GroupTitle from "../../../components/GroupTitle";
import { Button, Div, Flex, Img, Margin, Span, Svg } from "../../../elem";
import { useInput } from "../../../hooks/useInput";
import { __addAlbumItem } from "../../../redux/modules/albumSlice";
import LandingKakao from "./LandingKakao";

const AlbumCreate = ({ openCreateModal, partyId }) => {
  const dispatch = useDispatch();

  // 내용 State
  const [content, onChangeContent] = useInput("");
  const [albumPlace, , placeReset, setAlbumPlace] = useInput("");
  const albumItem = {
    content: content,
    place: `${albumPlace.placeName}:${albumPlace.address}`,
  };
  // console.log(albumItem);
  // 이미지 State
  const [uploadImg, setUploadImg] = useState(null);
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const imgInput = useRef();

  const onChangeImg = (e) => {
    setUploadImg(e.target.files[0]);
    setImages([...images, e.target.files[0]]);
    // 미리보기
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = () => {
      if (reader.result) {
        setPreviewImage(reader.result);
        setPreviewImages([...previewImages, reader.result]);
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
  };
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
        <input
          name="ImageUrl"
          style={{ display: "none" }}
          ref={imgInput}
          type="file"
          onChange={onChangeImg}
        />
        {uploadImg ? (
          <Div
            variant="albumBox"
            onClick={() => {
              imgInput.current.click();
            }}
          >
            <Img variant="album" src={previewImage} alt="img" />
          </Div>
        ) : (
          <Div variant="albumBox" bc="#fff" pd="25px">
            <StDashDiv
              onClick={() => {
                imgInput.current.click();
              }}
            >
              <Svg variant="photo"></Svg>
              <StSpan>이미지 가져오기</StSpan>
            </StDashDiv>
          </Div>
        )}
        <Div variant="albumBox" jc="flex-start" fd="column">
          <Flex fd="row" jc="center">
            <StSvgWrap>
              <Svg variant="location" />
            </StSvgWrap>
            <LandingKakao
              albumPlace={albumPlace}
              setAlbumPlace={setAlbumPlace}
            />
          </Flex>
          <Margin />
          <Flex fd="row" jc="center">
            <StSvgWrap mg="5px">
              <Svg variant="memo" />
            </StSvgWrap>
            <StText placeholder="Contents" onChange={onChangeContent} />
          </Flex>
        </Div>
      </Flex>
      <Flex fd="row">
        {/* {previewImages.map((image, i) => {
          return (
            <>
              {i === images.length - 1 ? null : (
                <>
                  <img src={image} alt="img" /> <button>삭제</button>
                </>
              )}
            </>
          );
        })} */}
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
  width: 450px;
  padding: 10px 10px 0 15px;
  border: 0;
  border-radius: 5px;
  min-height: 100px;
  max-height: 400px;
  font-size: 14px;
  resize: none;
  ::placeholder {
    font-size: 14px;
    opacity: 0.5;
  }
`;

const StSvgWrap = styled.div`
  display: flex;
  align-self: flex-start;
  margin: ${(props) => (props.mg ? props.mg : "10px 7px")};
`;
