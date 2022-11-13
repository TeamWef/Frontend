import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useInputs } from "../../../hooks/useInput";
import { __addAlbumItem } from "../../../redux/modules/albumSlice";

const AlbumCreate = ({ openCreateModal, partyId }) => {
  const dispatch = useDispatch();

  // 내용 State
  const [albumItem, onChangeAlbumItem, reset] = useInputs({
    content: "",
    place: "",
  });

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
    } else if (!albumItem.place) {
      alert("장소를 입력해주세요!");
      return null;
    } else if (!albumItem.content) {
      alert("내용을 입력해주세요!");
      return null;
    }
    dispatch(__addAlbumItem({ newAlbum, partyId }));
    setUploadImg("");
    reset();
    openCreateModal();
  };

  return (
    <div>
      <h1>AlbumCreate</h1>
      {uploadImg ? (
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundImage: `url(${previewImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          이미지 미리보기
        </div>
      ) : (
        <>
          <input
            name="ImageUrl"
            style={{ display: "none" }}
            ref={imgInput}
            type="file"
            onChange={onChangeImg}
          />
          <button
            onClick={() => {
              imgInput.current.click();
            }}
          >
            사진 추가하기
          </button>
        </>
      )}
      장소 : <input name="place" onChange={onChangeAlbumItem} />
      내용 : <input name="content" onChange={onChangeAlbumItem} />
      <button onClick={uploadHandler}>등록완료</button>
      <button onClick={openCreateModal}>닫기</button>
    </div>
  );
};

export default AlbumCreate;
