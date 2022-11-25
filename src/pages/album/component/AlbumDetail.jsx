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
import { Div, Flex, Img } from "../../../elem";

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
  // console.log(myId)
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
  // console.log(albumItem);
  return (
    <Div variant="bodyContainer">
      <h1>AlbumDetail임</h1>
      <Flex fd="row">
        {profileImageUrl ? (
          <Profile src={profileImageUrl} alt="img" />
        ) : (
          <Profile src="/images/userProfile.jpg" alt="img" />
        )}
        <span>{writer}</span>
      </Flex>
      <br />
      <StImg src={imageUrl} alt="img" />
      <p>{place}</p>
      {updateMode ? (
        <input value={contentInput} onChange={onChange} />
      ) : (
        <p>{content}</p>
      )}
      <p>{beforeTime}</p>
      {updateMode ? (
        <button onClick={updateClick}>수정완료</button>
      ) : (
        <div>
          {myId === memberEmail && (
            <>
              <button
                onClick={() => {
                  setUpdateMode(true);
                  setContentInput(content);
                }}
              >
                수정
              </button>
              <button
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    dispatch(__delAlbumItem(id));
                    alert("삭제가 완료되었습니다.");
                    navigate(`/${partyId}/album`);
                  }
                }}
              >
                삭제
              </button>
            </>
          )}
          <button
            onClick={() => {
              navigate(`/${partyId}/album`);
            }}
          >
            닫기
          </button>
          <br />
          <br />
          <AlbumComments id={id} commentList={commentList} myId={myId} />
        </div>
      )}
    </Div>
  );
};

export default AlbumDetail;

const StImg = styled.img`
  width: 300px;
  height: auto;
  margin: 5px;
`;

const Profile = styled.img`
  position: relative;
  width: 20px;
  height: 20px;
`;
