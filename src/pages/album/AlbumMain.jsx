import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Flex } from "../../elem";
import { useModal } from "../../hooks/useModal";
import { __getAlbumList } from "../../redux/modules/albumSlice";
import AlbumCreate from "../album/component/AlbumCreate";

const AlbumMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const partyId = useParams().partyid;
  // console.log(partyId);
  //모달 컨트롤
  const [createModal, openCreateModal] = useModal();
  const [Change, setChange] = useState(false);

  // 앨범 불러오기
  useEffect(() => {
    dispatch(__getAlbumList(partyId));
  }, [dispatch]);

  const albumItems = useSelector((state) => state.album?.album);
  // console.log(albumItems);
  return (
    <>
      <Flex fd="row">
        <button onClick={openCreateModal}>사진 올리기</button>
        <button onClick={() => navigate(`/${partyId}`)}>
          메인 페이지로 돌아가기
        </button>
      </Flex>
      <Flex fd="row">
        {albumItems.map((albumItem) => (
          <Stimg
            onClick={() => {
              navigate(`/${partyId}/album/${albumItem.id}`);
            }}
            key={albumItem.id}
            src={albumItem.imageUrl}
          ></Stimg>
        ))}
      </Flex>
      {createModal && (
        <AlbumCreate
          openCreateModal={openCreateModal}
          partyId={partyId}
          Change={Change}
          setChange={setChange}
        />
      )}
    </>
  );
};

export default AlbumMain;

const Stimg = styled.img`
  src: ${(props) => props.src};
  width: 100px;
  height: 100px;
  margin: 5px;
  background-color: silver;
`;
