import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useInput } from "../../../hooks/useInput";
import {
  __changed,
  __delAlbumItem,
  __getAlbumItem,
  __updateAlbumItem,
} from "../../../redux/modules/albumSlice";
import AlbumComments from "./AlbumComments";
import jwt_decode from "jwt-decode";
import { getCookie } from "../../../redux/modules/customCookies";
import { Button, Div, Flex, Img, Margin, Span, Svg } from "../../../elem";
import GroupTitle from "../../../components/GroupTitle";

const AlbumDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const partyId = useParams().partyId;
  const id = useParams().id;

  //토큰 디코드
  const token = getCookie("token").replace("Bearer ", "");
  const decode = jwt_decode(token);
  const myId = decode.sub;

  // 앨범 정보
  const albumItem = useSelector((state) => state.album.albumItem);
  // console.log(albumItem);
  const {
    writer,
    place,
    profileImageUrl,
    imageUrl,
    beforeTime,
    content,
    commentList,
    memberEmail,
  } = albumItem;

  //수정시 state
  const [updateMode, setUpdateMode] = useState(false);
  const [contentInput, onChange, reset, setContentInput] = useInput(content);

  useEffect(() => {
    dispatch(__getAlbumItem(id));
    setContentInput(content);
  }, [dispatch, navigate]);

  const updateClick = () => {
    // console.log(id, contentInput);
    if (!contentInput) {
      return alert("내용을 입력해주세요");
    }
    dispatch(__updateAlbumItem({ id, contentInput }));
    reset();
    setContentInput(content);
    setUpdateMode(false);
  };
  console.log(albumItem);
  return (
    <Div variant="bodyContainer">
      <GroupTitle />
      <Flex fd="row" jc="space-between" width="1050px">
        <Span variant="bold">Album</Span>
        <Flex fd="row">
          {myId === memberEmail && (
            <>
              <Button
                variant="small"
                onClick={() => {
                  setUpdateMode(true);
                  setContentInput(content);
                }}
              >
                수정
              </Button>
              <Button
                variant="small"
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    dispatch(__delAlbumItem(id));
                    alert("삭제가 완료되었습니다.");
                    navigate(`/${partyId}/album`);
                  }
                }}
              >
                삭제
              </Button>
            </>
          )}
          <Margin mg="10px" />
          <Svg
            variant="close"
            onClick={() => {
              navigate(`/${partyId}/album`);
            }}
          />
        </Flex>
      </Flex>
      <Margin />
      <Flex fd="row">
        <Div variant="albumBox">
          <Img variant="album" src={imageUrl} alt="img" obf="contain" />
        </Div>
        <Div variant="albumBox" fd="column">
          <Flex jc="space-between">
            <Flex ai="center">
              <Flex fd="row" jc="space-between" width="470px">
                <Flex fd="row" ai="center">
                  {profileImageUrl ? (
                    <Img src={profileImageUrl} alt="img" />
                  ) : (
                    <Img src="/images/userProfile.jpg" alt="img" />
                  )}
                  <Span variant="mediumBronze" mg="0 0 0 5px">
                    {writer}
                  </Span>
                </Flex>
                <Flex fd="row" ai="center">
                  <Span variant="other">
                    <Span variant="other" fw="700" mg="0 5px 0 0">
                      {place?.split(":")[0]}
                    </Span>
                    {place?.split(":")[1]}
                  </Span>
                  <Svg variant="location" />
                </Flex>
              </Flex>
              <Div variant="scroll-y" width="470px" height="162px" mg="0">
                {updateMode ? (
                  <input value={contentInput} onChange={onChange} />
                ) : (
                  <Span variant="smallBronze">{content}</Span>
                )}
              </Div>
              <Span variant="smallBronze" asf="flex-start" mg="0 0 0 15px">
                {beforeTime}
              </Span>
            </Flex>
          </Flex>
          {updateMode ? (
            <button onClick={updateClick}>수정완료</button>
          ) : (
            <AlbumComments id={id} commentList={commentList} myId={myId} />
          )}
        </Div>
      </Flex>
    </Div>
  );
};

export default AlbumDetail;
