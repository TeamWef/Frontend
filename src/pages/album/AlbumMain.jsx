import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import { __getAlbumList } from "../../redux/modules/albumSlice";
import AlbumCreate from "../album/component/AlbumCreate";
import AlbumDetail from "./component/AlbumDetail";

const AlbumMain = () => {
  //모달 컨트롤
  const [createModal, openCreateModal] = useModal();
  const [detailModal, openDetailModal] = useModal();

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(__getAlbumList(1));
  // });

  return (
    <>
      <button onClick={openCreateModal}>사진 올리기</button>
      <StDiv onClick={openDetailModal}>대충 사진인 것</StDiv>
      {createModal && <AlbumCreate openCreateModal={openCreateModal} />}
      {detailModal && <AlbumDetail openDetailModal={openDetailModal} />}
    </>
  );
};

export default AlbumMain;

const StDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: silver;
`;
