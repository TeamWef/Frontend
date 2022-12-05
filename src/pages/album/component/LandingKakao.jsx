import React, { useState } from "react";
import KakaoMap from "./KakaoMap";
import { useModal } from "../../../hooks/useModal";
import { Button, Flex, Input, Margin, Svg } from "../../../elem";
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
    <Flex>
      <form className="inputForm" onSubmit={handleSubmit}>
        <Flex fd="row" posi="relative">
          <Input
            variant="medium"
            width="450px"
            placeholder="Address"
            onChange={onChange}
            value={InputText}
          />
          <StDiv>
            <Vertical />
            <StBtn type="submit">장소 찾기</StBtn>
          </StDiv>
        </Flex>
      </form>
      <Flex>
        <KakaoMap
          searchPlace={Place}
          albumPlace={albumPlace}
          setAlbumPlace={setAlbumPlace}
          openModal={openModal}
        />
      </Flex>
    </Flex>
  );
}

export default LandingKakao;

const StBtn = styled.button`
  position: absolute;
  width: 100px;
  background-color: transparent;
  border: none;
  color: #a4a19d;
`;

const Vertical = styled.div`
  position: absolute;
  width: 5px;
  height: 18px;
  margin-left: 5px;
  border-left: 1px solid #d9d3c7;
`;

const StDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  top: 0px;
  right: 100px;
`;
