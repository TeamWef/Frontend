import React, { useState } from "react";
import KakaoMap from "./KakaoMap";
import { useModal } from "../../../hooks/useModal";
import { Button, Flex, Input, Svg } from "../../../elem";
import styled from "styled-components";

function LandingKakao({ albumPlace, setAlbumPlace }) {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");
  const [modal, openModal] = useModal();

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!InputText) {
      return alert("장소를 입력해주세요");
    }
    setPlace(InputText);
    setInputText("");
  };

  return (
    <>
      <StForm className="inputForm" onSubmit={handleSubmit}>
        <Input
          variant="medium"
          width="400px"
          placeholder="Address"
          onChange={onChange}
          value={InputText}
        />
        <button variant="small" type="submit">
          검색
        </button>
      </StForm>
      <Flex>
        <KakaoMap
          searchPlace={Place}
          albumPlace={albumPlace}
          setAlbumPlace={setAlbumPlace}
          openModal={openModal}
        />
      </Flex>
    </>
  );
}

export default LandingKakao;

const StForm = styled.form`
  display: flex;
  align-items: center;
  /* justify-content: center; */
`;
