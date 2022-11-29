import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Div, Flex, Margin, Span, Svg } from "../../elem";
import { useModal } from "../../hooks/useModal";
import { __getAlbumList } from "../../redux/modules/albumSlice";
import AlbumCreate from "../album/component/AlbumCreate";

const AlbumMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const partyId = useParams().partyId;
  // console.log(partyId);
  //모달 컨트롤
  const [createModal, openCreateModal] = useModal();
  const [Change, setChange] = useState(false);

  // 앨범 불러오기
  useEffect(() => {
    dispatch(__getAlbumList(partyId));
  }, [dispatch]);

  const albumItems = useSelector((state) => state.album?.album);

  return (
    <Div variant="bodyContainer">
      <Margin mg="20px 0 0 0" />
      <Flex ai="center">
        <Flex fd="row" jc="space-between" ai="center" width="1050px">
          <Span variant="bold">Album</Span>
          <Svg variant="add" onClick={openCreateModal} />
        </Flex>
        <StGreed>
          {albumItems.map((albumItem) => (
            <StImg
              onClick={() => {
                navigate(`/${partyId}/album/${albumItem.id}`);
              }}
              key={albumItem.id}
              src={albumItem.imageUrl}
            />
          ))}
        </StGreed>
      </Flex>
      {createModal && (
        <AlbumCreate
          openCreateModal={openCreateModal}
          partyId={partyId}
          Change={Change}
          setChange={setChange}
        />
      )}
    </Div>
  );
};

export default AlbumMain;

const StImg = styled.img`
  position: relative;
  width: 250px;
  height: 250px;
  object-fit: cover;
  background-color: silver;
  margin: 10px;
  transition: 0.3s;
  border-radius: 5px;
  border: 0px solid white;
  :hover {
    width: 270px;
    height: 270px;
    margin: 0;
    z-index: 10;
    border: 5px solid white;
    transform: translate(2%, 2%);
  }
`;

const StGreed = styled.div`
  position: relative;
  padding-top: 15px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
`;
