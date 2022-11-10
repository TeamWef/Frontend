import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const AlbumDetail = ({ openDetailModal }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch();
  // });
  return (
    <div>
      <h1>AlbumDetail</h1>
      <p>사진</p>
      <p>장소</p>
      <p>내용</p>
      <button onClick={openDetailModal}>닫기</button>
    </div>
  );
};

export default AlbumDetail;
