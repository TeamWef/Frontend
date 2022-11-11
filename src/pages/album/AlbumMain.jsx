import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import { __getAlbumList } from "../../redux/modules/albumSlice";
import AlbumCreate from "../album/component/AlbumCreate";
import AlbumDetail from "./component/AlbumDetail";

const AlbumMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 앨범 불러오기
  useEffect(() => {
    dispatch(__getAlbumList(10));
  }, [dispatch]);

  const albumItems = useSelector((state) => state.album?.album);
  // console.log(albumItems);

  //모달 컨트롤
  const [createModal, openCreateModal] = useModal();
  const [detailModal, openDetailModal] = useModal();

  return (
    <>
      <button onClick={openCreateModal}>사진 올리기</button>
      {albumItems.map((albumItem) => (
        <Stimg
          onClick={() => {
            navigate(`/album/${albumItem.id}`);
          }}
          key={albumItem.id}
          src={albumItem.imageUrl}
        ></Stimg>
      ))}
      {/* <img
        alt=""
        src="https://zero-to-one-bucket.s3.ap-northeast-2.amazonaws.com/podomarket1/efd1054a-4fad-4432-9500-429cec60235bmycat.jpg"
      ></img> */}
      {createModal && <AlbumCreate openCreateModal={openCreateModal} />}
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
