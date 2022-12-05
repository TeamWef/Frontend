import React, { useState } from "react";
import KakaoMap from "./KakaoMap";
import { useModal } from "../../../hooks/useModal";
import { Button, Div, Flex, Input, Margin, Span, Svg } from "../../../elem";
import styled from "styled-components";

function LandingKakao({ albumPlace, setAlbumPlace }) {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");
  const [modal, openModal, setModal] = useModal();

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!InputText) {
      return alert("장소를 입력해주세요");
    }
    setPlace(InputText);
    setModal(true);
  };

  return (
    <Flex jc="flex-start">
      <StContainer>
        {albumPlace ? (
          <Flex fd="row" width="100%" jc="space-between" ai="center">
            <Div width="350px" height="auto" jc="flex-start">
              <Margin mg="5px" />

              <Span Span variant="other">
                <Span variant="other" fw="700" mg="0 10px">
                  {albumPlace.placeName}
                </Span>
                {albumPlace.address}
              </Span>
            </Div>
            <StDiv>
              <Vertical />
              <StBtn
                onClick={() => {
                  setAlbumPlace("");
                  setInputText("");
                }}
              >
                재검색
              </StBtn>
            </StDiv>
          </Flex>
        ) : (
          <form className="inputForm" onSubmit={handleSubmit}>
            <Flex fd="row" posi="relative">
              <Input
                variant="medium"
                width="100%"
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
        )}
      </StContainer>
      <Flex>
        {modal && (
          <KakaoMap
            searchPlace={Place}
            albumPlace={albumPlace}
            setAlbumPlace={setAlbumPlace}
            openModal={openModal}
          />
        )}
      </Flex>
    </Flex>
  );
}

export default LandingKakao;

const StContainer = styled.div`
  background-color: #fff;
  width: 450px;
  border: 0;
  border-radius: 5px;
`;

const StBtn = styled.button`
  position: absolute;
  width: 90px;
  padding-left: 15px;
  background-color: transparent;
  border: none;
  color: #a4a19d;
  cursor: pointer;
`;

const Vertical = styled.div`
  position: absolute;
  width: 5px;
  height: 18px;
  margin: 0 5px;
  border-left: 1px solid #d9d3c7;
`;

const StDiv = styled.div`
  min-height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  top: ${(props) => (props.top ? props.top : "0")};
  right: ${(props) => (props.right ? props.right : "100px")};
`;
