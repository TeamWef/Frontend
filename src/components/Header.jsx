import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Mypage from "../pages/mypage/Mypage";
import Svg from "../elem/Svg";
import { Div } from "../elem";
import Notice from "../pages/notice/Notice";
import { Invite } from "../pages/invite/Invite";
import { Chat } from "../pages/chat/component/Chat";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const param = useParams();

  const [color, setColor] = useState("1");

  const goHome = () => {
    localStorage.clear();
    navigate("/");
    setColor("1");
  };

  return (
    <>
      <BaseContainer>
        <CenterBox>
          <Svg variant="mainIcon" onClick={goHome} />
          <Div fd="row">
            {param.partyId !== undefined && (
              <Div fd="row" jc="center" ai="center">
                <MenuBtn
                  bc={color === "1" ? "#F8F5F0" : ""}
                  name="Home"
                  onClick={() => {
                    navigate(`/${param.partyId}`);
                    setColor("1");
                  }}
                >
                  Home
                </MenuBtn>

                <MenuBtn
                  bc={color === "2" ? "#F8F5F0" : ""}
                  onClick={() => {
                    navigate(`/${param.partyId}/schedule`);
                    setColor("2");
                  }}
                >
                  Schedule
                </MenuBtn>
                <MenuBtn
                  bc={color === "3" ? "#F8F5F0" : ""}
                  onClick={() => {
                    navigate(`/${param.partyId}/album`);
                    setColor("3");
                  }}
                >
                  Album
                </MenuBtn>
              </Div>
            )}
            <Invite />
            <Notice />
            <UserInfo>
              <Mypage />
            </UserInfo>
          </Div>
        </CenterBox>
        {param.partyId !== undefined ? <Chat /> : null}
      </BaseContainer>
    </>
  );
};

const BaseContainer = styled.div`
  position: fixed;
  top: 0;
  background-color: #ede8e1;
  width: 100%;
  height: 74px;
  z-index: 9;
`;

const CenterBox = styled.div`
  width: 1100px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: space-between;
  margin-top: 16.5px;
`;

const UserInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: auto;
  height: 36px;
  padding: 0 15px;
  border-radius: 25px;
  margin-top: 1px;
  background-color: #f8f5f0;
`;

const MenuBtn = styled.button`
  position: relative;
  top: 2px;
  width: 90px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ bc }) => (bc ? bc : "transparent")};
  border: none;
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
`;
